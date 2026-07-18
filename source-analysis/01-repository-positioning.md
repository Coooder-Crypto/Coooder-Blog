# 01. 仓库定位与阅读入口

这一篇先不看实现细节，只解决一个问题：这个仓库到底是什么，应该从哪里开始读。

## 1. 仓库的自我描述

根目录 `README.md` 已经给出最关键的定位：

- 项目名是 `Claw Code`
- 主实现是公开的 Rust 版本
- 命令行二进制叫 `claw`
- 当前仓库的 canonical implementation 在 `rust/`

同时，根目录文档也明确说明：

- `src/` + `tests/` 是 companion Python/reference workspace
- 不是当前 primary runtime surface

因此，阅读时应该把仓库视为两层：

1. Rust 主实现层
2. Python 参考/兼容/审计层

## 2. 这不是一个“普通聊天 CLI”

如果只看 `claw prompt "..."` 这种命令，很容易误以为这只是一个带模型调用的命令行工具。但继续往下看 `USAGE.md`、`rust/README.md` 和 `ROADMAP.md`，会发现它的目标远不止于此。

这个项目真正想做的是：

- 让模型在终端里稳定工作
- 让模型可以调用工具而不是只输出文本
- 让会话、权限、沙箱、插件、MCP、子任务、周期任务这些能力成为运行时的一部分
- 让整个系统更适合被自动化代理和协作系统驱动

也就是说，它更接近：

- coding agent runtime
- tool-enabled CLI harness
- event-aware orchestration substrate

而不是单纯的“聊天壳 + API 请求”。

## 3. 顶层目录怎么理解

第一次读仓库，建议先按顶层目录理解职责：

- `rust/`
  主 Rust workspace，真正的 CLI 和运行时实现都在这里。
- `src/`
  Python 参考层，保留镜像命令、工具清单、bootstrap 图和部分端口化逻辑。
- `tests/`
  参考层和验证面的一部分，配合 `src/` 使用。
- `docs/`
  额外文档，例如容器工作流。
- `assets/`
  README 和宣传图相关资源。
- 根目录文档
  `README.md`、`USAGE.md`、`PARITY.md`、`ROADMAP.md`、`PHILOSOPHY.md` 这几份文档的价值非常高。

顶层文档里，各自承担的角色如下：

- `README.md`
  总入口，告诉你仓库现状和文档导航。
- `USAGE.md`
  命令怎么跑，哪些参数和模式存在。
- `PARITY.md`
  当前 Rust port 做到了什么、还有什么是近似实现。
- `ROADMAP.md`
  后续重点要补哪些自动恢复、事件化、worker boot 能力。
- `PHILOSOPHY.md`
  解释为什么项目会强调多 agent 协调、事件路由和自动化执行。

## 4. 这个仓库最值得看的不是“文件数量”，而是“系统边界”

源码阅读时，常见误区是顺着目录一个个翻文件。但在这个项目里，更有效的读法是先抓系统边界：

- CLI 入口和命令面在什么地方
- 运行时内核在哪里
- tool、skill、plugin、MCP 是如何分层的
- provider 协议和 telemetry 是怎样独立出来的
- parity harness 和 reference layer 为什么被保留

一旦这些边界建立起来，再读具体文件就不容易迷路。

## 5. 建议的第一轮阅读材料

如果你第一次进入仓库，我建议这样读：

1. `README.md`
2. `USAGE.md`
3. `rust/README.md`
4. `PARITY.md`
5. `ROADMAP.md`
6. `PHILOSOPHY.md`

这一步的目标不是记住命令，而是建立两个判断：

1. 当前哪些能力已经完整落地
2. 这个项目的设计优先级是什么

从文档看，设计优先级明显包括：

- 工具调用
- 权限和沙箱
- 会话恢复
- 插件和 MCP
- 面向自动化代理的 worker / task / team / cron 能力
- parity 和验证

## 6. 读源码时要有的心理模型

这个仓库比较适合用“三层模型”去读：

### 表层：人类入口

- CLI 参数
- REPL
- slash commands
- 输出渲染

### 中层：运行时骨架

- session
- config
- permission
- sandbox
- conversation loop
- hooks

### 底层：能力与协议

- tools
- skills
- plugins
- MCP
- provider API
- telemetry
- parity harness

如果没有这个三层模型，读 `rusty-claude-cli/src/main.rs` 往往会觉得“功能很多，很乱”；但带着这个模型去看，就会发现大部分逻辑其实是在做 glue code，把这三层串起来。

## 7. 这个仓库和官方 Claude Code 的关系

根目录 `README.md` 里有明确免责声明：

- 不声称拥有原始 Claude Code 源材料
- 不隶属于 Anthropic

这点很重要，因为它决定了阅读姿势：

- 不要把它当作官方源码镜像
- 应该把它当作一个公开实现、兼容实现、重写实现来读

这也解释了为什么仓库里会出现：

- parity 文档
- mock provider
- 参考层
- compat harness

这些模块存在的意义，就是帮助实现“功能面接近目标系统”，而不是字节级还原。

## 8. 这一章之后该读什么

读完这一篇，下一步建议直接进入：

- [02-rust-workspace-and-crates.md](./02-rust-workspace-and-crates.md)

因为只有先把 crate 之间的边界理清楚，后面看 CLI、runtime、tools 才不会把所有逻辑混在一起。
