# 03. CLI 入口与命令分发

这一篇开始进入主执行链，重点看 `rust/crates/rusty-claude-cli/src/main.rs`。

## 1. 为什么这个文件值得先看

`main.rs` 很大，但它承担的是总装配角色。很多系统级问题都能从这里找到答案：

- CLI 暴露了哪些命令
- 一次性 prompt 和 REPL 是怎么分开的
- `runtime`、`tools`、`api` 在哪里被组装
- 工具定义是何时注入给模型的

所以阅读时，不要一开始盯着细节函数，而是先抓 4 个核心符号：

- `main()`
- `run()`
- `CliAction`
- `LiveCli`

## 2. 顶层入口：`main()` 与 `run()`

`main()` 非常薄，基本逻辑是：

1. 调用 `run()`
2. 如果出错，格式化错误信息
3. 以非零码退出

真正的业务入口在 `run()`。

这种写法的好处是：

- 顶层错误处理集中
- `run()` 可以直接返回 `Result`
- 更适合测试和复用

## 源码摘录：CLI 入口的真实形态

摘自 `rust/crates/rusty-claude-cli/src/main.rs`：

```rust
fn main() {
    if let Err(error) = run() {
        let message = error.to_string();
        if message.contains("`claw --help`") {
            eprintln!("error: {message}");
        } else {
            eprintln!(
                "error: {message}

Run `claw --help` for usage."
            );
        }
        std::process::exit(1);
    }
}

fn run() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().skip(1).collect();
    match parse_args(&args)? {
        CliAction::Skills { args, output_format } =>
            LiveCli::print_skills(args.as_deref(), output_format)?,
        CliAction::Prompt { prompt, model, output_format, allowed_tools, permission_mode } =>
            LiveCli::new(model, true, allowed_tools, permission_mode)?
                .run_turn_with_output(&prompt, output_format)?,
        CliAction::Repl { model, allowed_tools, permission_mode } =>
            run_repl(model, allowed_tools, permission_mode)?,
        CliAction::Help { output_format } => print_help(output_format)?,
        _ => { /* 其他分支 */ }
    }
    Ok(())
}
```

这段代码直接说明两件事：

- `main()` 只做错误出口
- 真正的命令面由 `CliAction` 驱动

## 3. `CliAction`：命令面的一次性建模

`run()` 的第一步是解析参数，然后把结果映射成 `CliAction`。这一步很关键，因为它把整个 CLI 面抽象成一个枚举。

从源码可以看到，当前命令面包含很多分支，例如：

- `Prompt`
- `Help`
- `Version`
- `Status`
- `Sandbox`
- `Agents`
- `Mcp`
- `Skills`
- `Plugins`
- `Login`
- `Logout`
- `Doctor`
- `Init`
- `Repl`
- `ResumeSession`

这说明 CLI 不是“只有 prompt 一个入口”，而是一个完整的 agent 操作面板。

## 4. 三种命令类型

从 `CliAction` 和 `run()` 的 match 分支看，CLI 命令大致可以分成三类。

### 4.1 一次性执行命令

这类命令执行完就退出，例如：

- `prompt`
- `status`
- `sandbox`
- `skills`
- `mcp`
- `login`
- `doctor`

它们通常走的是：

1. 解析参数
2. 构造 `LiveCli`
3. 直接输出文本或 JSON
4. 退出

### 4.2 交互式 REPL

`Repl` 分支会进入持续会话。这里才会出现：

- slash commands
- 多轮对话
- 流式渲染
- 工具调用往返
- session resume

### 4.3 管理和元数据命令

还有一些命令更偏“查看系统当前状态”，例如：

- `dump-manifests`
- `bootstrap-plan`
- `system-prompt`
- `version`

这些命令说明 CLI 不只是聊天入口，也承担可观察性和自检职责。

## 5. `LiveCli`：装配层的核心对象

在很多分支里，`run()` 最终都会创建 `LiveCli`。这个类型本质上是 CLI 的运行壳，它把这些东西捆在一起：

- 当前 model
- 输出格式
- permission mode
- allowed tools
- tool registry
- 运行时 client

可以把 `LiveCli` 理解成：

> 把参数、运行时、工具注册、渲染器和 provider client 组装成一个可执行 CLI 会话。

## 6. REPL 和 one-shot prompt 的差别

阅读时，一个很重要的问题是：为什么同样是“发 prompt 给模型”，REPL 和 one-shot 还要分开？

从实现角度看，两者差别至少有 4 个：

1. 是否长期持有会话状态
2. 是否支持 slash commands
3. 是否持续渲染和累积工具往返
4. 是否支持 resume / session 管理

也就是说，REPL 并不是简单循环调用 `prompt`，而是一个完整的会话运行模式。

## 7. CLI 如何把工具能力注入给模型

这是 `main.rs` 里最关键的实现之一。

在发起模型请求前，CLI 会：

1. 构造 `GlobalToolRegistry`
2. 根据 `--allowedTools` 过滤工具集
3. 生成 provider 需要的 `ToolDefinition`
4. 随请求一起发送给上游模型

然后在流式响应中：

1. 接收 `tool_use`
2. 累积 JSON 输入
3. 交给 `CliToolExecutor`
4. 把执行结果回注给运行时

换句话说，CLI 在这里不是单纯的 I/O 层，而是模型工具调用的装配器。

## 源码摘录：工具定义是如何注入模型请求的

同样摘自 `rust/crates/rusty-claude-cli/src/main.rs`，这一段是 CLI 和 provider 请求拼接的关键：

```rust
let message_request = MessageRequest {
    model: self.model.clone(),
    max_tokens: max_tokens_for_model(&self.model),
    messages: convert_messages(&request.messages),
    system: (!request.system_prompt.is_empty()).then(|| request.system_prompt.join("\n\n")),
    tools: self
        .enable_tools
        .then(|| filter_tool_specs(&self.tool_registry, self.allowed_tools.as_ref())),
    tool_choice: self.enable_tools.then_some(ToolChoice::Auto),
    stream: true,
};
```

文档里说“CLI 会把工具能力注入给模型”，指的就是这里。`tools` 和 `tool_choice` 都是在发请求时显式挂进去的。

## 8. `AnthropicRuntimeClient` 与 provider 请求

`main.rs` 中的 `AnthropicRuntimeClient` 实现了 `runtime::ApiClient` trait。这个设计非常重要，因为它意味着：

- `runtime` 不直接依赖某个具体 HTTP 客户端
- CLI 负责把 provider client 适配成 runtime 可接受的接口

从调用链看，流程大致是：

1. `LiveCli` 构造 `AnthropicRuntimeClient`
2. `AnthropicRuntimeClient::stream()` 组装 `MessageRequest`
3. 请求里带上 system prompt、messages、tools、tool choice
4. 逐个消费流式事件
5. 转换成 `AssistantEvent`

这就是 CLI 和 `runtime::ConversationRuntime` 对接的关键桥。

## 9. `CliToolExecutor`：工具执行桥

CLI 侧还定义了 `CliToolExecutor`，它实现了 `runtime::ToolExecutor`。这说明：

- `runtime` 只要求“有一个能执行工具的对象”
- CLI 再把具体工具注册器、MCP 运行时状态和输出渲染绑定进去

`CliToolExecutor` 的职责包括：

- 拦截 `--allowedTools`
- 识别 `ToolSearch`
- 区分 runtime tool 和 builtin/plugin tool
- 调用工具后把结果格式化渲染到终端

这一步很像“本地 control plane”。

## 10. Slash command 为什么不都放在 REPL 层处理

表面上看，slash command 是 REPL 特性；但从实现上，它并没有全部硬编码在 REPL 里，而是大量依赖 `commands` crate。

这意味着：

- REPL 负责读取输入和切换控制流
- `commands` 负责 slash command 的规范定义
- CLI 负责把 slash command 接入当前会话

这个拆分让 slash command 不会变成一堆散落在 REPL 分支里的 if/else。

## 11. 阅读这个文件的建议姿势

`main.rs` 很长，建议按下面顺序看：

1. `main()` / `run()`
2. `CliAction`
3. `parse_args()`
4. `LiveCli::new(...)`
5. `AnthropicRuntimeClient`
6. `CliToolExecutor`
7. `run_repl(...)`
8. 各个 `print_*` 和 `run_*` 辅助函数

不要从头到尾顺着读，否则很容易在渲染细节和帮助文本里耗太多时间。

## 12. 这一篇的结论

这一层最关键的结论是：

- `rusty-claude-cli` 是总装配层
- 它把命令面、provider 请求、工具执行、输出渲染和会话运行组织在一起
- `CliAction` 把 CLI 能力面显式建模出来
- `LiveCli`、`AnthropicRuntimeClient`、`CliToolExecutor` 是主链路上的三个桥接点

下一篇开始进入真正的运行时内核：

- [04-runtime-core.md](./04-runtime-core.md)
