# 09. Context Management / Context Compaction

这一篇单独讲这个项目怎么做上下文管理、上下文压缩，以及它和 session、system prompt、provider prompt cache 的关系。

先给结论：

- 它的主线不是向量检索式长期记忆
- 而是 `Session transcript + ProjectContext + Prompt budget + PromptCache + Session compaction`
- 超长上下文时，主要策略是“摘要旧消息，保留最近消息原文继续跑”

## 1. 上下文管理分几层

这个项目的上下文管理可以拆成 5 层：

1. `Session`
   持久化的结构化会话 transcript。
2. `SystemPromptBuilder`
   组装环境信息、项目上下文、指令文件、配置等。
3. `ProjectContext`
   发现工作目录、git 状态、git diff、指令文件。
4. `PromptCache`
   跟踪 provider 视角下的 prompt 缓存命中/失效。
5. `compact_session()`
   在上下文太长时，把旧消息压成 summary，保留最近消息原文。

从现有实现看，它没有在主链路里做 embedding 检索或向量数据库召回。这里的“context management”更像：

- 控制什么进入 prompt
- 控制 prompt 的尺寸
- 在超预算时如何续写

## 2. Session 是上下文管理的底座

最底层不是纯文本字符串，而是结构化 transcript。摘自 [rust/crates/runtime/src/session.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/session.rs:17)：

```rust
pub enum MessageRole {
    System,
    User,
    Assistant,
    Tool,
}

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

这个设计很关键，因为它说明上下文里不仅有“用户说过什么”，还有：

- assistant 输出了什么
- 调过什么 tool
- tool 返回了什么
- 之前是否压缩过

所以后续 compaction 才能基于真实执行过程做摘要，而不是只压文本对话。

## 3. System prompt 的上下文不是静态模板

`SystemPromptBuilder` 会把动态环境信息拼进 system prompt。摘自 [rust/crates/runtime/src/prompt.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/prompt.rs:38)：

```rust
pub const SYSTEM_PROMPT_DYNAMIC_BOUNDARY: &str = "__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__";
const MAX_INSTRUCTION_FILE_CHARS: usize = 4_000;
const MAX_TOTAL_INSTRUCTION_CHARS: usize = 12_000;

pub struct ProjectContext {
    pub cwd: PathBuf,
    pub current_date: String,
    pub git_status: Option<String>,
    pub git_diff: Option<String>,
    pub instruction_files: Vec<ContextFile>,
}

pub struct SystemPromptBuilder {
    output_style_name: Option<String>,
    output_style_prompt: Option<String>,
    os_name: Option<String>,
    os_version: Option<String>,
    append_sections: Vec<String>,
    project_context: Option<ProjectContext>,
    config: Option<RuntimeConfig>,
}
```

这里可以直接看出三点：

1. system prompt 分成静态段和动态段
2. 动态段会注入 `ProjectContext`
3. 指令文件有硬性预算，不会无限塞

也就是说，这里的 context management 一开始就不是“把仓库里所有说明文件都扔进去”，而是做了预算控制。

## 4. `ProjectContext` 实际注入什么

上下文发现和渲染逻辑在 `prompt.rs`。摘自 [rust/crates/runtime/src/prompt.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/prompt.rs:284)：

```rust
fn render_project_context(project_context: &ProjectContext) -> String {
    let mut lines = vec!["# Project context".to_string()];
    let mut bullets = vec![
        format!("Today's date is {}.", project_context.current_date),
        format!("Working directory: {}", project_context.cwd.display()),
    ];
    if !project_context.instruction_files.is_empty() {
        bullets.push(format!(
            "Claude instruction files discovered: {}.",
            project_context.instruction_files.len()
        ));
    }
    lines.extend(prepend_bullets(bullets));
    if let Some(status) = &project_context.git_status {
        lines.push(String::new());
        lines.push("Git status snapshot:".to_string());
        lines.push(status.clone());
    }
    if let Some(diff) = &project_context.git_diff {
        lines.push(String::new());
        lines.push("Git diff snapshot:".to_string());
        lines.push(diff.clone());
    }
    lines.join("\n")
}

fn render_instruction_files(files: &[ContextFile]) -> String {
    let mut sections = vec!["# Claude instructions".to_string()];
    let mut remaining_chars = MAX_TOTAL_INSTRUCTION_CHARS;
    for file in files {
        if remaining_chars == 0 {
            sections.push(
                "_Additional instruction content omitted after reaching the prompt budget._"
                    .to_string(),
            );
            break;
        }
        // ...
    }
    sections.join("\n\n")
}
```

所以这层上下文主要包括：

- 当前日期
- 当前工作目录
- instruction files 数量和内容
- git status 快照
- git diff 快照

并且 instruction files 有总字符预算。

## 5. 指令文件也做了去重和预算控制

这个项目不是简单读几个 `CLAUDE.md` 就结束。它还会：

- 沿目录向上找 instruction files
- 对内容做标准化
- 按内容 hash 去重
- 超过总预算就截断

摘自 [rust/crates/runtime/src/prompt.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/prompt.rs:333)：

```rust
fn dedupe_instruction_files(files: Vec<ContextFile>) -> Vec<ContextFile> {
    let mut deduped = Vec::new();
    let mut seen_hashes = Vec::new();

    for file in files {
        let normalized = normalize_instruction_content(&file.content);
        let hash = stable_content_hash(&normalized);
        if seen_hashes.contains(&hash) {
            continue;
        }
        seen_hashes.push(hash);
        deduped.push(file);
    }

    deduped
}
```

所以它的 context management 其实比表面上更细：

- 不是只“发现文件”
- 还在做去重和预算约束

## 6. PromptCache：provider 视角的上下文缓存管理

这部分不等于 session compaction，但它也是上下文管理的一环。

`PromptCache` 记录：

- 本次请求的指纹
- 上一次请求的状态
- 是否发生 cache break
- break 是预期还是非预期
- usage 和 completion cache 统计

摘自 [rust/crates/api/src/prompt_cache.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/api/src/prompt_cache.rs:209)：

```rust
fn record_usage_internal(
    &self,
    request: &MessageRequest,
    usage: &Usage,
    response: Option<&MessageResponse>,
) -> PromptCacheRecord {
    let request_hash = request_hash_hex(request);
    let mut inner = self.lock();
    let previous = inner.previous.clone();
    let current = TrackedPromptState::from_usage(request, usage);
    let cache_break = detect_cache_break(&inner.config, previous.as_ref(), &current);

    inner.stats.tracked_requests += 1;
    apply_usage_to_stats(&mut inner.stats, usage, &request_hash, "api-response");
    // ...
    inner.previous = Some(current);
    if let Some(response) = response {
        write_completion_entry(&inner.paths, &request_hash, response);
        inner.stats.completion_cache_writes += 1;
    }
    persist_state(&inner);

    PromptCacheRecord {
        cache_break,
        stats: inner.stats.clone(),
    }
}
```

这层解决的问题不是“会话太长怎么办”，而是：

- provider 能不能复用前一次 prompt 计算
- prompt 形状发生了什么变化
- 哪次上下文变化导致缓存失效

## 7. Context compaction 的触发条件

真正的上下文压缩核心在 `compact.rs`。默认配置是：

- 保留最近 `4` 条消息
- 当可压缩部分估算 token 达到 `10_000` 时允许压缩

摘自 [rust/crates/runtime/src/compact.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/compact.rs:8)：

```rust
pub struct CompactionConfig {
    pub preserve_recent_messages: usize,
    pub max_estimated_tokens: usize,
}

impl Default for CompactionConfig {
    fn default() -> Self {
        Self {
            preserve_recent_messages: 4,
            max_estimated_tokens: 10_000,
        }
    }
}

pub fn should_compact(session: &Session, config: CompactionConfig) -> bool {
    let start = compacted_summary_prefix_len(session);
    let compactable = &session.messages[start..];

    compactable.len() > config.preserve_recent_messages
        && compactable
            .iter()
            .map(estimate_message_tokens)
            .sum::<usize>()
            >= config.max_estimated_tokens
}
```

注意这里的 token 不是 provider 精确 token，而是本地粗估。

## 8. token 估算很朴素，但足够驱动压缩

`estimate_message_tokens()` 基本就是按字符数粗估，近似成 `len / 4 + 1`。摘自 [rust/crates/runtime/src/compact.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/compact.rs:399)：

```rust
fn estimate_message_tokens(message: &ConversationMessage) -> usize {
    message
        .blocks
        .iter()
        .map(|block| match block {
            ContentBlock::Text { text } => text.len() / 4 + 1,
            ContentBlock::ToolUse { name, input, .. } => (name.len() + input.len()) / 4 + 1,
            ContentBlock::ToolResult {
                tool_name, output, ..
            } => (tool_name.len() + output.len()) / 4 + 1,
        })
        .sum()
}
```

这说明压缩触发更偏“运行时启发式策略”，而不是 provider token accounting 的精确镜像。

## 9. 压缩不是裁掉前文，而是“摘要旧消息 + 保留最近 tail”

真正压缩时，它会：

1. 找出旧消息区间
2. 保留最近几条原文
3. 把前面的消息做 summary
4. 生成一条新的 system continuation message
5. 把这条 continuation message 放在最前面

摘自 [rust/crates/runtime/src/compact.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/compact.rs:94)：

```rust
pub fn compact_session(session: &Session, config: CompactionConfig) -> CompactionResult {
    if !should_compact(session, config) {
        return CompactionResult {
            summary: String::new(),
            formatted_summary: String::new(),
            compacted_session: session.clone(),
            removed_message_count: 0,
        };
    }

    let existing_summary = session
        .messages
        .first()
        .and_then(extract_existing_compacted_summary);
    let compacted_prefix_len = usize::from(existing_summary.is_some());
    let keep_from = session
        .messages
        .len()
        .saturating_sub(config.preserve_recent_messages);
    let removed = &session.messages[compacted_prefix_len..keep_from];
    let preserved = session.messages[keep_from..].to_vec();
    let summary =
        merge_compact_summaries(existing_summary.as_deref(), &summarize_messages(removed));
    let continuation = get_compact_continuation_message(&summary, true, !preserved.is_empty());
    // ...
}
```

这就是它最核心的上下文压缩策略：

- 不是截断
- 不是只留最近消息
- 而是“旧上下文摘要化，近上下文原文化”

## 10. continuation message 怎么写

压缩后插入的不是一句很弱的提示，而是一条明确的 system continuation message。摘自 [rust/crates/runtime/src/compact.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/compact.rs:3)：

```rust
const COMPACT_CONTINUATION_PREAMBLE: &str =
    "This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.\n\n";
const COMPACT_RECENT_MESSAGES_NOTE: &str = "Recent messages are preserved verbatim.";
const COMPACT_DIRECT_RESUME_INSTRUCTION: &str = "Continue the conversation from where it left off without asking the user any further questions. Resume directly — do not acknowledge the summary, do not recap what was happening, and do not preface with continuation text.";
```

这说明作者非常明确地在做“续写控制”，目标是：

- 不让模型重新寒暄
- 不让模型把 summary 当新任务重复复述
- 直接从原对话断点继续

## 11. summary 里保留什么信息

`summarize_messages()` 不只是把旧内容拼成短文，而是尽量提取任务状态，包括：

- 旧消息数量和角色分布
- 触达过的 tool 名称
- 最近用户请求
- pending work
- key files
- current work
- key timeline

如果之前已经压缩过，还会通过 `merge_compact_summaries()` 合并成：

- `Previously compacted context`
- `Newly compacted context`
- `Key timeline`

这意味着它的 compaction 是“滚动摘要”而不是每次重写一份完全新的摘要。

## 12. 自动压缩和手动压缩是两条路径

### 手动压缩

CLI 有 `/compact` 入口，最终直接走 `runtime.compact(CompactionConfig::default())`。见 [rust/crates/rusty-claude-cli/src/main.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/rusty-claude-cli/src/main.rs:3791)。

### 自动压缩

`ConversationRuntime` 每轮会看累计输入 token 是否超过阈值。默认阈值是 `100_000`，可由环境变量 `CLAUDE_CODE_AUTO_COMPACT_INPUT_TOKENS` 控制。摘自 [rust/crates/runtime/src/conversation.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/conversation.rs:517)：

```rust
fn maybe_auto_compact(&mut self) -> Option<AutoCompactionEvent> {
    if self.usage_tracker.cumulative_usage().input_tokens
        < self.auto_compaction_input_tokens_threshold
    {
        return None;
    }

    let result = compact_session(
        &self.session,
        CompactionConfig {
            max_estimated_tokens: 0,
            ..CompactionConfig::default()
        },
    );

    if result.removed_message_count == 0 {
        return None;
    }

    self.session = result.compacted_session;
    Some(AutoCompactionEvent {
        removed_message_count: result.removed_message_count,
    })
}
```

这里有个关键细节：自动压缩时把 `max_estimated_tokens` 改成 `0`，等于说一旦累计输入过线，就强制尝试做 compaction。

## 13. `summary_compression.rs` 是二级压缩，不是主会话 compaction

仓库里还有一层摘要压缩器，默认预算是：

- 最多 `1200` 字符
- 最多 `24` 行
- 单行最多 `160` 字符

摘自 [rust/crates/runtime/src/summary_compression.rs](/Users/coooder/Code/Agent/claw-code/rust/crates/runtime/src/summary_compression.rs:3)：

```rust
const DEFAULT_MAX_CHARS: usize = 1_200;
const DEFAULT_MAX_LINES: usize = 24;
const DEFAULT_MAX_LINE_CHARS: usize = 160;

pub fn compress_summary_text(summary: &str) -> String {
    compress_summary(summary, SummaryCompressionBudget::default()).summary
}
```

它做的事情包括：

- collapse whitespace
- 去重重复行
- 保留高优先级行
- 超预算时补省略提示

但从当前调用看，它更多用于把长摘要再压成适合事件记录/状态展示的短文本，例如 lane event 结果，而不是替代 `compact_session()` 成为主上下文压缩机制。

## 14. 这一套机制解决了什么问题

这套 context management / compaction 机制解决的是：

- prompt 不至于无限增长
- instruction files 不会无上限注入
- 长 session 能在断上下文后续跑
- 旧任务状态不会完全丢失
- provider 侧的 prompt cache 变化可观测

但它没有解决的是：

- 跨会话的语义检索式长期记忆
- 基于 embedding 的历史召回
- 自动从整个代码库抽取“最相关片段”的高级 RAG

这几点在当前主链路里都不明显。

## 15. 一句话总结

如果只用一句话概括：

> 这个项目的上下文管理主要依靠结构化 session、动态 system prompt、指令文件预算、provider prompt cache 和“摘要旧消息 + 保留最近原文”的 compaction 机制，而不是向量检索式长期记忆。
