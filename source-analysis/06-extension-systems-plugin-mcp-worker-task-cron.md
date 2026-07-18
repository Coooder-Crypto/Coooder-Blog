# 06. 扩展系统：Plugin、MCP、Worker、Task、Team、Cron

前面几篇主要围绕主执行链。这一篇看项目为什么会引入大量“平台化”扩展能力。

## 1. 这部分为什么重要

如果只把仓库当成一个本地 coding CLI，这一层会显得很“超纲”；但只要把它当成 agent harness，这些模块就非常合理。

它们解决的不是“怎么输出文字”，而是：

- 怎么扩展能力边界
- 怎么接外部系统
- 怎么做多任务和后台任务
- 怎么让自动化代理在没有人工盯着终端时也能运行

## 2. Plugin：显式建模的扩展包

`plugins` crate 从一开始就没有把插件做成松散脚本，而是做成了完整的 manifest 模型。

核心类型包括：

- `PluginManifest`
- `PluginMetadata`
- `PluginToolManifest`
- `PluginCommandManifest`
- `PluginHooks`
- `PluginLifecycle`

manifest 中可以声明的东西至少有：

- 插件名称、版本、描述
- 权限集合
- 默认启用状态
- hooks
- lifecycle
- tools
- commands

这意味着插件可以同时扩展三个维度：

1. 运行时行为
2. 工具面
3. 命令面

## 源码摘录：Plugin manifest 不是散装约定

摘自 `rust/crates/plugins/src/lib.rs`：

```rust
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PluginManifest {
    pub name: String,
    pub version: String,
    pub description: String,
    pub permissions: Vec<PluginPermission>,
    #[serde(rename = "defaultEnabled", default)]
    pub default_enabled: bool,
    #[serde(default)]
    pub hooks: PluginHooks,
    #[serde(default)]
    pub lifecycle: PluginLifecycle,
    #[serde(default)]
    pub tools: Vec<PluginToolManifest>,
    #[serde(default)]
    pub commands: Vec<PluginCommandManifest>,
}
```

这段代码已经说明插件系统是正式建模的，不是“目录里放几个脚本，CLI 自己猜怎么跑”。

## 3. Plugin 为什么单独成 crate

如果插件逻辑散落在 CLI 或 runtime 里，会有两个问题：

- 插件目录结构、manifest 解析、安装状态管理会污染主逻辑
- 插件的 hooks / tools / commands 也很难独立测试

独立成 crate 的好处是：

- 插件是一个明确的子系统
- 主运行时只依赖插件暴露出来的模型和接口
- CLI 可以在不理解插件内部细节的前提下做安装、启停、列举和更新

## 4. Plugin Tool 的接线方式

插件工具最终会被包装进 `GlobalToolRegistry`。也就是说，插件工具不是独立旁路，而是和内置工具、运行时工具统一进入同一个工具面。

这个设计很关键，因为它带来两个结果：

1. 插件工具也受统一权限体系约束
2. 模型不需要区分“这是内置工具还是插件工具”，只需要看统一的工具定义列表

## 5. Hooks 与 Lifecycle：插件不只是“加个命令”

插件 manifest 中的 `hooks` 和 `lifecycle` 说明插件系统不是只给用户加几个命令，而是能参与运行时事件。

例如：

- `PreToolUse`
- `PostToolUse`
- `PostToolUseFailure`
- `Init`
- `Shutdown`

这会让插件有机会接入：

- 记录
- 审计
- 外部通知
- 运行前检查
- 资源清理

这也是为什么这个项目越来越像平台而不是单体 CLI。

## 6. MCP：把外部服务能力收束进统一工具面

MCP 相关逻辑主要分布在 `runtime` crate：

- `mcp.rs`
- `mcp_client.rs`
- `mcp_stdio.rs`
- `mcp_tool_bridge.rs`
- `mcp_lifecycle_hardened.rs`

从类型设计看，它不仅支持“列出一下 MCP server”，而是完整建模了：

- transport 类型
- stdio / SSE / HTTP / WS / SDK / managed proxy
- server config
- resource list/read
- tool bridge
- degraded mode 和 lifecycle phase

这说明项目不是把 MCP 当附属插件，而是当成系统级能力面来处理。

## 7. 为什么 MCP 相关代码会很多

MCP 集成难点不在“能不能连上”，而在：

- 怎么发现工具
- 怎么调用资源
- 怎么处理部分失败
- 怎么做生命周期和退化状态
- 怎么把外部工具转换成统一 tool surface

`mcp_lifecycle_hardened.rs` 这种命名已经直接说明作者关心的是“稳定接入”，而不是只做 happy path。

## 8. Worker / Task / Team / Cron：往 orchestration 方向走

这一组模块是整个仓库最能体现“agent runtime”取向的地方。

### 8.1 Task

`Task*` 工具和 `task_registry` 负责后台任务模型。

这让系统不只能做同步的“一问一答”，还能建模：

- 创建任务
- 查询状态
- 更新任务
- 停止任务
- 拉取输出

### 8.2 Worker

`worker_boot` 和 `Worker*` 工具说明系统在认真处理“编码 worker 的启动流程”。

它关心的不是普通命令执行，而是：

- trust gate
- ready handshake
- prompt misdelivery
- stale startup
- restart / terminate

这和 `ROADMAP.md` 里的 worker boot 目标完全一致。

## 源码摘录：Task / Worker / Team 是正式工具面的一部分

摘自 `rust/crates/tools/src/lib.rs`：

```rust
ToolSpec {
    name: "TaskCreate",
    description: "Create a background task that runs in a separate subprocess.",
    input_schema: json!({
        "type": "object",
        "properties": {
            "prompt": { "type": "string" },
            "description": { "type": "string" }
        },
        "required": ["prompt"],
        "additionalProperties": false
    }),
    required_permission: PermissionMode::DangerFullAccess,
},
ToolSpec {
    name: "WorkerCreate",
    description: "Create a coding worker boot session with trust-gate and prompt-delivery guards.",
    input_schema: json!({
        "type": "object",
        "properties": {
            "cwd": { "type": "string" },
            "trusted_roots": {
                "type": "array",
                "items": { "type": "string" }
            },
            "auto_recover_prompt_misdelivery": { "type": "boolean" }
        },
        "required": ["cwd"],
        "additionalProperties": false
    }),
    required_permission: PermissionMode::DangerFullAccess,
},
ToolSpec {
    name: "TeamCreate",
    description: "Create a team of sub-agents for parallel task execution.",
    input_schema: json!({
        "type": "object",
        "properties": {
            "name": { "type": "string" },
            "tasks": { "type": "array" }
        },
        "required": ["name", "tasks"],
        "additionalProperties": false
    }),
    required_permission: PermissionMode::DangerFullAccess,
},
```

所以这里不是“未来可能会支持这些能力”，而是这些能力已经作为 tool surface 的一部分存在。

### 8.3 Team

`Team*` 对象把多个任务关联成一个 team。它背后的意图是：

- 并行执行
- 多 worker 协作
- 上层系统可以按 team 而不是单 task 观察进度

### 8.4 Cron

`Cron*` 工具和 `team_cron_registry` 表明系统支持周期性任务，而不是只支持前台对话。

这会让 harness 更适合：

- 巡检
- 定时分析
- 自动任务重跑
- 例行 agent 工作流

## 9. 为什么这些能力会落在 runtime / tools，而不是单独一个“高级功能包”

因为它们都依赖主运行时能力：

- 权限模式
- 会话状态
- 工具执行
- 配置
- 生命周期事件

如果把这些能力孤立出去，就会产生两套状态机。当前设计选择的是：

- 把状态和策略放在 runtime
- 把调用面暴露在 tools
- 把用户入口留在 CLI / commands

这是一种更可控的分层。

## 10. 这部分和 `ROADMAP.md` 的关系

如果只读代码，这些模块容易显得“提前设计过度”；但结合 `ROADMAP.md` 再看，会发现它们其实是在朝明确目标演进：

- ready-handshake lifecycle
- structured session control API
- canonical lane event schema
- failure taxonomy
- recovery recipes
- green-ness contract
- typed task packet
- policy engine

也就是说，代码里的这些系统并不是偶然出现的，而是路线图的一部分。

## 11. 这一篇的结论

这里最重要的结论是：

- Plugin 扩展的是本地能力和生命周期
- MCP 扩展的是外部工具和资源接入
- Worker / Task / Team / Cron 扩展的是任务编排和自动执行能力

三者叠加起来，这个仓库已经明显不是“单一 REPL 应用”，而是在构建一个可扩展 agent platform。

下一篇看 provider 协议层：

- [07-api-streaming-auth-and-telemetry.md](./07-api-streaming-auth-and-telemetry.md)
