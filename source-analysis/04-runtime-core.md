# 04. 运行时内核：Session、Config、Permission、Sandbox、Conversation

这一篇进入 `runtime` crate。这个 crate 是整个系统的核心，因为它定义了“会话怎么存在、对话怎么循环、权限怎么生效、配置怎么合并”。

## 1. 为什么 `runtime` 是核心

`rust/crates/runtime/src/lib.rs` 暴露的模块已经足够说明问题：

- `session`
- `conversation`
- `config`
- `permissions`
- `permission_enforcer`
- `sandbox`
- `prompt`
- `hooks`
- `usage`
- `mcp*`
- `worker_boot`
- `task_registry`
- `team_cron_registry`

这基本覆盖了一个 agent harness 的核心运行时要素。

## 2. Session：对话状态的数据模型

`session.rs` 定义了核心会话结构：

- `Session`
- `ConversationMessage`
- `ContentBlock`
- `MessageRole`
- `SessionCompaction`
- `SessionFork`

这里的设计很值得注意：

- 消息不是纯文本，而是 `ContentBlock` 数组
- `ContentBlock` 既可以是文本，也可以是 `ToolUse`、`ToolResult`
- 这意味着会话从设计上就把工具调用视为一等公民

`Session` 还负责：

- 生成 session id
- 保存 / 加载
- JSONL snapshot
- compaction 元数据
- fork provenance

也就是说，会话层不是一个临时内存结构，而是持久化对象。

## 源码摘录：Session 数据结构不是纯文本日志

摘自 `rust/crates/runtime/src/session.rs`：

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ContentBlock {
    Text {
        text: String,
    },
    ToolUse {
        id: String,
        name: String,
        input: String,
    },
    ToolResult {
        tool_use_id: String,
        tool_name: String,
        output: String,
        is_error: bool,
    },
}

#[derive(Debug, Clone)]
pub struct Session {
    pub version: u32,
    pub session_id: String,
    pub created_at_ms: u64,
    pub updated_at_ms: u64,
    pub messages: Vec<ConversationMessage>,
    pub compaction: Option<SessionCompaction>,
    pub fork: Option<SessionFork>,
    persistence: Option<SessionPersistence>,
}
```

这段代码很重要，因为它直接说明 session 从设计上就把工具调用和工具结果纳入了消息模型。

## 3. ConversationRuntime：真正的对话主循环

`conversation.rs` 里的 `ConversationRuntime<C, T>` 是另一个关键点。

它接收两类抽象依赖：

- `ApiClient`
- `ToolExecutor`

也就是说，运行时并不关心“底层 HTTP 是什么实现”或“工具怎么执行”，只要求：

- 能向模型流式发请求
- 能执行模型提出的工具调用

这是一个非常标准的 runtime 设计：把外部世界都变成 trait 边界，再在 CLI 层注入具体实现。

`ConversationRuntime` 自身持有的状态包括：

- `session`
- `permission_policy`
- `system_prompt`
- `usage_tracker`
- `hook_runner`
- compaction 阈值
- session tracer

所以它的定位很明确：协调一次 assistant turn 的完整循环。

这里先点到为止：`runtime` 确实持有 session、system prompt 和 auto-compaction threshold，但“上下文怎么注入、什么时候压缩、压缩成什么形态”这一整条链路已经单独移到专题文档：

- [09-context-management-and-compaction.md](./09-context-management-and-compaction.md)

## 4. 对话主循环在做什么

虽然不需要逐行读代码，但最好先知道它的大致工作顺序：

1. 把当前 session 和 system prompt 组装成 `ApiRequest`
2. 调用 `ApiClient::stream()`
3. 接收 `AssistantEvent`
4. 遇到 `ToolUse` 时，通过 `ToolExecutor` 本地执行
5. 把 tool result 作为消息写回会话
6. 持续迭代，直到消息停止或达到迭代上限
7. 汇总 usage、prompt cache、tool result、assistant messages

这条链路说明：真正的“agent 行为”不是 CLI 里的循环，而是 `ConversationRuntime` 控制的模型-工具往返。

## 源码摘录：ConversationRuntime 的核心边界

摘自 `rust/crates/runtime/src/conversation.rs`：

```rust
pub trait ApiClient {
    fn stream(&mut self, request: ApiRequest) -> Result<Vec<AssistantEvent>, RuntimeError>;
}

pub trait ToolExecutor {
    fn execute(&mut self, tool_name: &str, input: &str) -> Result<String, ToolError>;
}

pub struct ConversationRuntime<C, T> {
    session: Session,
    api_client: C,
    tool_executor: T,
    permission_policy: PermissionPolicy,
    system_prompt: Vec<String>,
    max_iterations: usize,
    usage_tracker: UsageTracker,
    hook_runner: HookRunner,
    auto_compaction_input_tokens_threshold: u32,
    hook_abort_signal: HookAbortSignal,
    hook_progress_reporter: Option<Box<dyn HookProgressReporter>>,
    session_tracer: Option<SessionTracer>,
}
```

这一段是 runtime 的骨架。它说明运行时只依赖两个外部边界：

- 能不能向模型流式拿事件
- 能不能执行工具

## 5. Config：配置发现与合并

`config.rs` 提供了完整的配置模型：

- `ConfigLoader`
- `RuntimeConfig`
- `RuntimeFeatureConfig`
- `RuntimePluginConfig`
- `RuntimeHookConfig`
- `RuntimePermissionRuleConfig`
- `McpConfigCollection`
- `OAuthConfig`

设计重点在两个方面：

### 5.1 配置来源是显式建模的

`ConfigSource` 分为：

- `User`
- `Project`
- `Local`

也就是说，配置不是简单地“读几个 JSON 文件”，而是保留了 scope 信息。

### 5.2 合并结果是 feature-oriented 的

最终配置不会只保留原始键值，而会被解析成：

- hooks 配置
- plugins 配置
- mcp 配置
- oauth 配置
- model 配置
- permission 配置
- sandbox 配置

这让下游子系统不需要自己重复解析原始配置。

## 源码摘录：配置优先级不是口头约定，是代码里的固定顺序

摘自 `rust/crates/runtime/src/config.rs`：

```rust
pub fn discover(&self) -> Vec<ConfigEntry> {
    let user_legacy_path = self.config_home.parent().map_or_else(
        || PathBuf::from(".claw.json"),
        |parent| parent.join(".claw.json"),
    );
    vec![
        ConfigEntry {
            source: ConfigSource::User,
            path: user_legacy_path,
        },
        ConfigEntry {
            source: ConfigSource::User,
            path: self.config_home.join("settings.json"),
        },
        ConfigEntry {
            source: ConfigSource::Project,
            path: self.cwd.join(".claw.json"),
        },
        ConfigEntry {
            source: ConfigSource::Project,
            path: self.cwd.join(".claw").join("settings.json"),
        },
        ConfigEntry {
            source: ConfigSource::Local,
            path: self.cwd.join(".claw").join("settings.local.json"),
        },
    ]
}
```

所以文档里提到的用户级、项目级、本地级覆盖顺序，不是推断，而是代码里明确写死的。

## 6. Permission：权限不是附属功能，而是运行时的一等公民

`runtime` 里权限相关逻辑至少有两层：

- `permissions.rs`
- `permission_enforcer.rs`

从接口设计看，它并不是简单地“执行前检查一下字符串”，而是明确建模了：

- `PermissionMode`
- `PermissionPolicy`
- `PermissionContext`
- `PermissionOutcome`
- prompt / override / request 等流程对象

再结合 `tools` crate 中每个 tool 自带的 `required_permission`，可以看出权限系统工作方式是：

1. 工具声明自己需要的权限级别
2. 运行时建立统一 `PermissionPolicy`
3. 执行前由 enforcer 做检查
4. 如果不满足，就阻断工具执行

这使得权限不依赖“模型是否听话”，而依赖运行时强制约束。

## 7. Sandbox：运行环境状态建模

`sandbox.rs` 的价值在于，它把“当前执行环境是否隔离、是否容器化、文件系统怎么挂载”变成了显式类型。

这包括：

- `SandboxConfig`
- `SandboxStatus`
- `SandboxRequest`
- `FilesystemIsolationMode`
- 容器环境检测

这对 agent 系统尤其重要，因为很多工具调用并不只是“执行命令”这么简单，而是要回答：

- 现在允许写文件吗
- 网络是否隔离
- 是不是容器内
- 是否需要切换执行方式

## 8. Prompt、Hook、Usage、Compaction

`runtime` 里还有几块经常被忽略但很重要的内容。

### 8.1 Prompt

`prompt.rs` 负责 system prompt 拼装和项目上下文注入。这是模型行为边界的重要来源。

### 8.2 Hook

`hooks.rs` 允许在工具生命周期前后插入外部命令或行为。这是自动化系统和外部 orchestration 对接的重要扩展点。

### 8.3 Usage

`usage.rs` 提供 token 和成本统计，不只是给用户看，更是后续自动化调度和可观察性的基础。

### 8.4 Compaction

`compact.rs` 和 `summary_compression.rs` 说明系统已经在考虑长会话上下文管理问题，而不是把所有历史无限累积。

这一块在本篇不再展开，避免和专题重复。建议直接跳到：

- [09-context-management-and-compaction.md](./09-context-management-and-compaction.md)

## 9. 运行时为什么会包含 MCP、Worker、Task、Team、Cron

很多人第一次看 `runtime` 会疑惑：为什么会话层里会出现这些看起来更“高级”的模块？

原因是这个仓库的目标本来就不是极简聊天 CLI，而是面向自动化代理的运行时。因此运行时需要承担：

- 统一状态机
- 统一事件模型
- 统一策略和恢复能力

把这类模块放在 `runtime`，而不是散落在 CLI 或插件里，是合理的，因为它们都依赖会话、权限、配置和状态机。

## 10. 阅读顺序建议

在 `runtime` crate 里，建议这样读：

1. `lib.rs`
2. `session.rs`
3. `conversation.rs`
4. `config.rs`
5. `permissions.rs`
6. `permission_enforcer.rs`
7. `sandbox.rs`
8. `prompt.rs`
9. `hooks.rs`
10. `usage.rs`
11. 再根据兴趣看 `mcp*`、`worker_boot.rs`、`task_registry.rs`、`team_cron_registry.rs`

## 11. 这一篇的结论

最关键的结论有三条：

1. `runtime` crate 定义了真正的 agent 运行模型。
2. `ConversationRuntime` 通过 `ApiClient` 和 `ToolExecutor` 两个 trait，把模型调用和工具执行解耦。
3. Session、Config、Permission、Sandbox 不是边缘能力，而是这个系统能否稳定运行的底层前提。

下一篇开始看最容易混淆、也最值得看的三套机制：

- [05-tools-skills-and-slash-commands.md](./05-tools-skills-and-slash-commands.md)
