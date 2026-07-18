# 07. Provider 接入：API、Streaming、Auth、Prompt Cache、Telemetry

这一篇看 `api` 和 `telemetry`，以及它们如何被 CLI 和 runtime 消费。

## 1. `api` crate 的定位

`api` crate 的职责很明确：它是外部 provider 协议层，而不是运行时编排层。

从 `api/src/lib.rs` 暴露的内容看，核心能力包括：

- provider client
- 请求 / 响应类型
- SSE 解析
- OAuth 启动认证
- model alias 解析
- prompt cache
- telemetry 相关类型再导出

这个边界划分很健康，因为它避免了：

- 在 CLI 里直接处理 HTTP 细节
- 在 runtime 里直接绑定具体 provider SDK

## 源码摘录：`api` crate 暴露的能力面

摘自 `rust/crates/api/src/lib.rs`：

```rust
pub use client::{
    oauth_token_is_expired, read_base_url, read_xai_base_url, resolve_saved_oauth_token,
    resolve_startup_auth_source, MessageStream, OAuthTokenSet, ProviderClient,
};
pub use prompt_cache::{
    CacheBreakEvent, PromptCache, PromptCacheConfig, PromptCachePaths, PromptCacheRecord,
    PromptCacheStats,
};
pub use providers::anthropic::{AnthropicClient, AnthropicClient as ApiClient, AuthSource};
pub use providers::openai_compat::{OpenAiCompatClient, OpenAiCompatConfig};
pub use providers::{
    detect_provider_kind, max_tokens_for_model, resolve_model_alias, ProviderKind,
};
pub use types::{
    InputContentBlock, InputMessage, MessageRequest, MessageResponse,
    OutputContentBlock, StreamEvent, ToolChoice, ToolDefinition,
};
```

这一段很适合用来理解 `api` 的定位：它暴露的是 provider client、请求/响应类型、prompt cache 和 provider 选择逻辑。

## 2. Provider 支持不是单一路径

目前 `api` 里至少明确支持两类 provider client：

- Anthropic client
- OpenAI-compatible client

同时它还提供：

- provider kind 检测
- model alias 解析
- base URL 读取

这意味着系统并不是把 provider 写死成某一个实现，而是已经考虑兼容面。

## 3. 请求模型：消息不是字符串，而是结构化块

`api` 层的请求 / 响应类型包括：

- `MessageRequest`
- `MessageResponse`
- `InputMessage`
- `InputContentBlock`
- `OutputContentBlock`
- `ToolDefinition`
- `ToolChoice`

这和 session 层的设计是呼应的：消息从最底层开始就是结构化的，而不是纯文本。

这点对 tool calling 尤其重要，因为 provider 协议里必须能承载：

- 文本块
- tool use 块
- tool result 块

## 4. Streaming：为什么是整个系统的关键

流式响应不是“优化体验的小功能”，而是整个 agent 交互链路的基础。

CLI 在流式消费 provider 事件时，要同时处理几类事情：

- 文本 delta
- 工具调用开始
- 工具输入 JSON 片段
- usage 更新
- message stop

这也是为什么 `AssistantEvent` 会被建模成：

- `TextDelta`
- `ToolUse`
- `Usage`
- `PromptCache`
- `MessageStop`

运行时需要的不是 HTTP 原始事件，而是适合本地状态机消费的事件流。

## 源码摘录：Telemetry 是结构化事件，不是字符串日志

摘自 `rust/crates/telemetry/src/lib.rs`：

```rust
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum TelemetryEvent {
    HttpRequestStarted {
        session_id: String,
        attempt: u32,
        method: String,
        path: String,
        attributes: Map<String, Value>,
    },
    HttpRequestSucceeded {
        session_id: String,
        attempt: u32,
        method: String,
        path: String,
        status: u16,
        request_id: Option<String>,
        attributes: Map<String, Value>,
    },
    HttpRequestFailed {
        session_id: String,
        attempt: u32,
        method: String,
        path: String,
        error: String,
        retryable: bool,
        attributes: Map<String, Value>,
    },
    Analytics(AnalyticsEvent),
    SessionTrace(SessionTraceRecord),
}
```

文档里说这个项目在向 event-first 设计靠拢，说的就是这类类型定义。

## 5. 为什么 tool input 要在流式过程中累积

一个很典型的实现细节是：tool input 在流式响应中可能不是一次性完整返回的，而是由 `input_json_delta` 逐步拼起来。

因此 CLI 的 provider client 适配层必须做这些事情：

1. 识别当前是否进入 tool use block
2. 暂存 tool id、tool name
3. 持续累积 partial JSON
4. 在 block stop 时生成完整 `ToolUse` 事件

这说明 tool calling 不是“模型先生成完整 JSON，CLI 再拿到”，而是一个真正的流式协议过程。

## 6. OAuth 与启动认证

`api` crate 还负责启动时的认证来源解析，包括：

- API key
- 已保存的 OAuth token
- OAuth token 是否过期
- startup auth source 选择

这里的设计价值在于：

- 认证选择逻辑不散落在 CLI 各处
- CLI 只需要在启动时调用统一入口
- 运行时可以基于规范化的 auth source 工作

这也说明项目不只是为“本地设置一个环境变量”的场景设计，而是考虑了更完整的登录流程。

## 7. Prompt Cache：一个容易忽略的高级能力

`api` crate 里还显式暴露了：

- `PromptCache`
- `PromptCacheRecord`
- `PromptCacheStats`

CLI 在流式处理结束后，还会把最新 prompt cache 记录转成 runtime 事件回注。

这意味着 prompt cache 在系统里不是一个透明黑盒，而是：

- 可观测
- 可记录
- 可纳入 session / telemetry 分析

这里不再展开 prompt cache 的失效判断、上下文预算关系和 compaction 的联动，避免和专题重复。完整说明见：

- [09-context-management-and-compaction.md](./09-context-management-and-compaction.md)

## 8. Telemetry：把运行状态变成结构化事件

`telemetry` crate 定义了比较完整的结构化事件体系，例如：

- `AnalyticsEvent`
- `SessionTraceRecord`
- `TelemetryEvent`
- `TelemetrySink`
- `MemoryTelemetrySink`
- `JsonlTelemetrySink`

事件种类包括：

- HTTP request started
- HTTP request succeeded
- HTTP request failed
- analytics
- session trace

这说明作者明确不满足于“终端日志能看懂就行”，而是希望：

- 事件可以被下游系统消费
- 运行链路可以回放和分析
- session 内的重要动作可追踪

## 9. 为什么 `telemetry` 要独立成 crate

把 telemetry 抽成独立 crate 有两个好处：

1. 事件模型不会和 CLI、runtime 强耦合
2. 不同上层都可以复用同一套事件类型和 sink 接口

这样一来，后续无论是：

- 写 JSONL 到本地
- 接入外部观测系统
- 做 session trace 分析

都不需要改动核心运行时接口。

## 10. API 层和 Runtime 层的关系

两者关系可以概括成一句话：

- `api` 负责和 provider 说话
- `runtime` 负责和 session / tools / policy 说话

中间桥梁是：

- `ApiClient` trait
- `AssistantEvent`

这种设计最大的优点是可替换：

- provider client 可以换
- runtime 循环不用改
- mock provider 也能接进来

这正是 parity harness 能成立的前提之一。

## 11. 这一篇的结论

这部分最重要的结论是：

- `api` crate 只做协议适配，不做运行时编排
- 流式事件是 tool calling 和 REPL 体验的基础
- OAuth 和 prompt cache 已被纳入正式系统边界
- `telemetry` 把系统状态从“日志文本”提升为“结构化事件”

最后一篇看验证与参考层：

- [08-tests-parity-and-python-reference-layer.md](./08-tests-parity-and-python-reference-layer.md)
