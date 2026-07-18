# 08. 测试、Parity Harness 与 Python 参考层

这一篇收尾，讲两个经常被忽略但很重要的部分：

- 这个仓库如何验证自己
- 顶层 Python 层为什么仍然保留

## 1. 如果不看验证体系，会误判这个仓库

只看主实现，很容易把它理解成“一个还在持续长大的 Rust CLI”。但一旦把 `PARITY.md`、mock harness 和 Python 参考层一起看，就会发现仓库还有另一条主线：

- 在做迁移
- 在做能力面对齐
- 在做可验证的重写

这也是为什么仓库里会同时出现：

- mock provider
- parity diff
- 参考清单
- Python 镜像层

## 2. Mock Anthropic Service：把 provider 变成可控测试依赖

`mock-anthropic-service` crate 的价值不在“能不能伪造一个接口”，而在于它是 deterministic 的。

这意味着测试时可以稳定验证：

- streaming text
- tool calling roundtrip
- permission prompt 场景
- plugin tool 路径
- 多工具回合

一旦 provider 行为可控，很多 CLI / runtime / tool 的交互才有机会被可靠测试。

## 源码摘录：parity harness 真的是脚本化场景测试

摘自 `rust/crates/rusty-claude-cli/tests/mock_parity_harness.rs`：

```rust
#[test]
#[allow(clippy::too_many_lines)]
fn clean_env_cli_reaches_mock_anthropic_service_across_scripted_parity_scenarios() {
    let cases = [
        ScenarioCase {
            name: "streaming_text",
            permission_mode: "read-only",
            allowed_tools: None,
            /* ... */
        },
        ScenarioCase {
            name: "read_file_roundtrip",
            permission_mode: "read-only",
            allowed_tools: Some("read_file"),
            /* ... */
        },
        ScenarioCase {
            name: "multi_tool_turn_roundtrip",
            permission_mode: "read-only",
            allowed_tools: Some("read_file,grep_search"),
            /* ... */
        },
        ScenarioCase {
            name: "plugin_tool_roundtrip",
            permission_mode: "workspace-write",
            allowed_tools: None,
            /* ... */
        },
    ];
}
```

即使这里只截取了测试中的一部分，也已经能看出它是在按 scenario 驱动整条 CLI 链路，而不是只测某几个 isolated function。

## 3. Mock Parity Harness：仓库验证哲学的体现

根目录和 `rust/README.md` 都提到 mock parity harness。它的组成包括：

- mock service
- CLI harness tests
- 脚本化运行入口
- scenario manifest
- parity diff 脚本

它的目的不是只测“某个函数对不对”，而是测：

- 一整个交互链路在 clean environment 下是否成立
- 关键能力是否和目标系统对齐

也就是说，它更接近系统级验证，而不是单元测试补丁。

## 4. `PARITY.md` 是阅读源码时的重要索引

很多仓库的 parity 文档只是“进度表”，但这里的 `PARITY.md` 价值更大，因为它同时告诉你：

- 哪些功能已经落地
- 哪些能力是 registry-backed 或近似实现
- 哪些 lane 后来被合并进主线
- 哪些验证场景已覆盖

因此读源码时，`PARITY.md` 不是可选材料，而是很重要的现实边界说明书。

## 5. 测试命令和验证面

仓库当前的 Rust 验证命令很明确：

- `cargo fmt`
- `cargo clippy --workspace --all-targets -- -D warnings`
- `cargo test --workspace`

这些命令应该在 `rust/` 下执行。

这说明仓库对质量的预期不是“能跑就行”，而是至少包含：

- 格式
- lint
- workspace 范围的测试

## 6. 为什么顶层 `src/` 和 `tests/` 还存在

根目录 README 已经说明，这套 Python 层不是当前主运行面。但它依然有很高价值，主要体现在两件事上。

### 6.1 它保留了参考视图

从 `src/main.py` 可以看出，这层提供了很多“镜像视图”和“摘要视图”，例如：

- command graph
- tool pool
- bootstrap graph
- route prompt
- parity audit
- setup report

这些能力对阅读者来说很有帮助，因为它们把复杂系统压缩成更容易观察的形态。

### 6.2 它保留了迁移和对照语境

Python 层里还有不少 reference data、snapshot 和子系统清单。这些内容帮助仓库保留：

- 早期概念模型
- 清单抽样
- 迁移过程中用来比对的参考面

因此，它虽然不是当前主执行层，但不是“废目录”。

## 7. 如何正确使用 Python 参考层

阅读时比较合理的姿势是：

- 把 Rust 视为主实现
- 把 Python 层视为辅助索引和对照材料

适合把 Python 层用于：

- 快速看某个子系统的摘要
- 找命令和工具的参考清单
- 理解早期模块拆分思路

## 源码摘录：Python 参考层更像“观察和对照工具箱”

摘自顶层 `src/main.py`：

```python
subparsers.add_parser('summary', help='render a Markdown summary of the Python porting workspace')
subparsers.add_parser('manifest', help='print the current Python workspace manifest')
subparsers.add_parser('parity-audit', help='compare the Python workspace against the local ignored TypeScript archive when available')
subparsers.add_parser('setup-report', help='render the startup/prefetch setup report')
subparsers.add_parser('command-graph', help='show command graph segmentation')
subparsers.add_parser('tool-pool', help='show assembled tool pool with default settings')
subparsers.add_parser('bootstrap-graph', help='show the mirrored bootstrap/runtime graph stages')
```

这段代码很能说明 Python 层的定位：它暴露的多是 summary、manifest、parity-audit、graph 这类“镜像视图”和“辅助分析命令”，而不是当前主运行时的最短执行路径。

不适合把它当作：

- 当前最权威的执行路径
- 当前行为的最终事实来源

## 8. 为什么这个仓库这么强调 parity

这是理解整个项目的关键之一。

如果目标只是“做一个能工作的 Rust 版 CLI”，完全可以不保留这么多 parity 和参考层材料。之所以保留，说明仓库的目标更接近：

- 重建一个能力面接近目标系统的公开实现
- 持续验证当前实现有没有跑偏
- 把迁移过程做成可审计、可沟通的工程过程

这和普通 side project 的心态很不一样。

## 9. 读完整套文档后，再回头看什么

读完这一组源码解析后，建议再回头看：

- 根目录 `PARITY.md`
- 根目录 `ROADMAP.md`
- 根目录 `PHILOSOPHY.md`

因为这时你已经知道：

- crate 怎么拆
- CLI 怎么跑
- runtime 怎么组织
- tool / skill / plugin / MCP 怎么接

再看这三份文档，就会更容易判断：

- 目前哪些能力已经稳
- 哪些模块还在推进
- 作者真正想把项目带到哪里去

## 10. 全套源码解析的最终结论

这组文档最后可以收束成一句话：

> Claw Code 的重点不是“终端里接一个模型”，而是“把模型、工具、权限、会话、扩展系统和验证体系整合成一个可持续演进的 coding agent runtime”。

这也是为什么整个仓库会同时包含：

- CLI
- runtime
- tools
- commands
- plugins
- MCP
- worker/task/team/cron
- mock parity harness
- Python 参考层

它们不是堆功能，而是在共同支撑一个更大的目标。
