import type { LocalizedText } from '@/types/data';

export type ResearchTrackKey = 'foundations' | 'orchestration' | 'runtime' | 'evaluation';
export type ResearchKind = 'paper' | 'blog' | 'docs';

export interface ResearchRadarItem {
  id: string;
  track: ResearchTrackKey;
  kind: ResearchKind;
  title: string;
  venue: string;
  year: string;
  url: string;
  takeaway: LocalizedText;
  relatedSlug?: string;
  relatedLabel?: LocalizedText;
}

export const researchTracks: {
  key: ResearchTrackKey;
  num: string;
  title: LocalizedText;
  description: LocalizedText;
}[] = [
  {
    key: 'foundations',
    num: '01',
    title: { zh: '范式与基础', en: 'Foundations & Loops' },
    description: {
      zh: '理解工具调用、语言反思、记忆流与技能库等 Agent 基础循环。',
      en: 'Core agent loops: tool use, verbal reflection, memory streams, and skill libraries.',
    },
  },
  {
    key: 'orchestration',
    num: '02',
    title: { zh: '多 Agent 与编排', en: 'Multi-Agent & Orchestration' },
    description: {
      zh: '角色分工、SOP、会话协作、协议化编排与运行时组件拆解。',
      en: 'Role separation, SOPs, conversational orchestration, and runtime anatomy.',
    },
  },
  {
    key: 'runtime',
    num: '03',
    title: { zh: 'Harness / 运行时', en: 'Harness & Runtime' },
    description: {
      zh: '系统设计 > Prompt：Host、Context、Tools、Sandbox 与可执行约束。',
      en: 'System design over prompts: context, execution sandboxes, guardrails, and lifecycle.',
    },
  },
  {
    key: 'evaluation',
    num: '04',
    title: { zh: '可观测 / 安全 / 评测', en: 'Observability, Safety & Eval' },
    description: {
      zh: '轨迹回放、多环境能力基准、记忆投毒与工具滥用安全边界。',
      en: 'Tracing, trajectory replay, multi-environment benchmarks, and memory/tool security.',
    },
  },
];

// Curated from jarvis-brain/sources/agent-harness-research (URLs verified 2026-08-08).
export const researchRadarItems: ResearchRadarItem[] = [
  // 01. Foundations
  {
    id: 'react',
    track: 'foundations',
    kind: 'paper',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    venue: 'arXiv',
    year: '2022',
    url: 'https://arxiv.org/abs/2210.03629',
    takeaway: {
      zh: '推理轨迹与行动交错执行，建立“想一步、做一步、看结果”的基础 Agent 循环。',
      en: 'Interleaves reasoning traces with grounded actions, establishing the canonical observe-think-act loop.',
    },
  },
  {
    id: 'reflexion',
    track: 'foundations',
    kind: 'paper',
    title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2303.11366',
    takeaway: {
      zh: '不更新模型权重，而是用语言反思与情景记忆改善下一轮尝试。',
      en: 'Improves subsequent trials through verbal self-reflection and episodic memory rather than weight updates.',
    },
    relatedSlug: 'how-hermes-agent-self-improves',
    relatedLabel: { zh: '延伸：Hermes 四层记忆闭环', en: 'Related: Hermes memory loop' },
  },
  {
    id: 'toolformer',
    track: 'foundations',
    kind: 'paper',
    title: 'Toolformer: Language Models Can Teach Themselves to Use Tools',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2302.04761',
    takeaway: {
      zh: '探索模型自主判断“何时、如何调用外部 API”的早期工具范式。',
      en: 'Early paradigm showing how language models decide when and how to invoke external APIs.',
    },
  },
  {
    id: 'generative-agents',
    track: 'foundations',
    kind: 'paper',
    title: 'Generative Agents: Interactive Simulacra of Human Behavior',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2304.03442',
    takeaway: {
      zh: '记忆流 + 定期反思 + 分层规划，支撑跨时间窗口的连贯状态。',
      en: 'Combines memory streams, periodic reflection, and planning for long-horizon coherent state.',
    },
  },
  {
    id: 'voyager',
    track: 'foundations',
    kind: 'paper',
    title: 'Voyager: An Open-Ended Embodied Agent with Large Language Models',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2305.16291',
    takeaway: {
      zh: '用可执行技能库与课程式探索构建持续复用的程序性记忆。',
      en: 'Demonstrates procedural memory via an ever-growing library of verified executable skills.',
    },
    relatedSlug: 'how-hermes-agent-self-improves',
    relatedLabel: { zh: '延伸：程序性技能沉淀', en: 'Related: Procedural skills' },
  },
  {
    id: 'llm-agents-survey',
    track: 'foundations',
    kind: 'paper',
    title: 'The Rise and Potential of Large Language Model Based Agents: A Survey',
    venue: 'arXiv Survey',
    year: '2023',
    url: 'https://arxiv.org/abs/2309.07864',
    takeaway: {
      zh: '覆盖感知、规划、记忆、工具与社会化协作的全局架构综述。',
      en: 'Comprehensive architectural survey spanning perception, planning, memory, and tool ecosystems.',
    },
  },
  {
    id: 'lilian-weng',
    track: 'foundations',
    kind: 'blog',
    title: 'LLM Powered Autonomous Agents',
    venue: 'Lilian Weng',
    year: '2023',
    url: 'https://lilianweng.github.io/posts/2023-06-23-agent/',
    takeaway: {
      zh: '最清晰的入门心智模型：把 Agent 拆解为 Planning、Memory 与 Tool Use 三件套。',
      en: 'Clear foundational mental model breaking autonomous agents into planning, memory, and tool use.',
    },
  },

  // 02. Orchestration
  {
    id: 'metagpt',
    track: 'orchestration',
    kind: 'paper',
    title: 'MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2308.00352',
    takeaway: {
      zh: '用标准作业程序（SOP）与结构化中间产物约束多角色幻觉扩散。',
      en: 'Encodes SOPs and structured intermediate artifacts to curb compounding hallucinations across roles.',
    },
  },
  {
    id: 'autogen',
    track: 'orchestration',
    kind: 'paper',
    title: 'AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2308.08155',
    takeaway: {
      zh: '将多 Agent 协作、代码执行与 Human-in-the-Loop 抽象为可编程会话流。',
      en: 'Models multi-agent collaboration, code execution, and human-in-the-loop checkpoints as conversations.',
    },
    relatedSlug: 'agent-framework-comparison-guide',
    relatedLabel: { zh: '延伸：主流框架选型', en: 'Related: Framework guide' },
  },
  {
    id: 'multi-agent-orchestration',
    track: 'orchestration',
    kind: 'paper',
    title: 'The Orchestration of Multi-Agent Systems: Architectures, Protocols, and Enterprise Adoption',
    venue: 'arXiv',
    year: '2026',
    url: 'https://arxiv.org/abs/2601.13671',
    takeaway: {
      zh: '面向生产与企业落地的编排拓扑、通信协议与治理框架对比。',
      en: 'Compares production orchestration topologies, agent protocols, and enterprise governance patterns.',
    },
  },
  {
    id: 'langchain-harness-anatomy',
    track: 'orchestration',
    kind: 'blog',
    title: 'The Anatomy of an Agent Harness',
    venue: 'LangChain',
    year: '2026',
    url: 'https://www.langchain.com/blog/the-anatomy-of-an-agent-harness',
    takeaway: {
      zh: '从运行时组件视角拆解 Agent Harness，说明编排与环境约束如何决定上限。',
      en: 'Dissects runtime harness components, showing how orchestration and environment constraints set reliability.',
    },
    relatedSlug: 'claw-code-cli-to-runtime',
    relatedLabel: { zh: '延伸：Claw Code 运行时', en: 'Related: Claw Code runtime' },
  },

  // 03. Harness / Runtime
  {
    id: 'code-as-agent-harness',
    track: 'runtime',
    kind: 'paper',
    title: 'Code as Agent Harness',
    venue: 'arXiv',
    year: '2026',
    url: 'https://arxiv.org/abs/2605.18747',
    takeaway: {
      zh: '把代码、类型系统、测试与确定性校验直接作为 Agent 的执行约束载体。',
      en: 'Uses code, type systems, tests, and deterministic checks as the primary execution harness for agents.',
    },
    relatedSlug: 'ai-native-engineering-design-for-agents',
    relatedLabel: { zh: '延伸：AI-Native Engineering', en: 'Related: AI-Native thesis' },
  },
  {
    id: 'anthropic-effective-agents',
    track: 'runtime',
    kind: 'blog',
    title: 'Building Effective Agents',
    venue: 'Anthropic Research',
    year: '2024',
    url: 'https://www.anthropic.com/research/building-effective-agents',
    takeaway: {
      zh: '区分确定性 Workflow 与开放式 Agent，强调简单可组合模式、工具文档与护栏优先。',
      en: 'Distinguishes deterministic workflows from autonomous agents, favoring composable patterns and clear tool specs.',
    },
    relatedSlug: 'when-not-to-use-ai-agents',
    relatedLabel: { zh: '延伸：何时不该用 Agent', en: 'Related: When not to use agents' },
  },
  {
    id: 'anthropic-claude-code',
    track: 'runtime',
    kind: 'blog',
    title: 'Best Practices for Building Agents with Claude Code',
    venue: 'Anthropic Engineering',
    year: '2025',
    url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
    takeaway: {
      zh: '一线 Coding Agent 工程手册：上下文分层、验证先于生成、沙箱与会话管理实践。',
      en: 'Field manual for coding harnesses: layered context, verify-first loops, sandboxing, and session hygiene.',
    },
    relatedSlug: 'context-compaction-is-not-summarization',
    relatedLabel: { zh: '延伸：上下文压缩护城河', en: 'Related: Compaction moat' },
  },
  {
    id: 'mongodb-harness',
    track: 'runtime',
    kind: 'blog',
    title: 'The Agent Harness: Why the LLM Is the Smallest Part of Your Agent System',
    venue: 'MongoDB Engineering',
    year: '2026',
    url: 'https://www.mongodb.com/company/blog/technical/agent-harness-why-llm-is-smallest-part-of-your-agent-system',
    takeaway: {
      zh: '把 Agent 视为完整系统工程问题：状态、重试、工具协议与存储远比单次模型调用重。',
      en: 'Frames agents as systems engineering: state, retries, tool protocols, and storage outweigh the raw LLM call.',
    },
  },
  {
    id: 'microsoft-agent-harnesses',
    track: 'runtime',
    kind: 'docs',
    title: 'Agent Harnesses',
    venue: 'Microsoft Learn',
    year: '2026',
    url: 'https://learn.microsoft.com/en-us/agent-framework/agents/harness',
    takeaway: {
      zh: '对照 Host、Context、Tools、Gateway 与生命周期管理的企业级 Harness 抽象。',
      en: 'Reference architecture mapping Host, Context, Tools, Gateway, and agent lifecycle boundaries.',
    },
  },
  {
    id: 'openai-agents-sdk',
    track: 'runtime',
    kind: 'docs',
    title: 'OpenAI Agents SDK Guide',
    venue: 'OpenAI Docs',
    year: '2025',
    url: 'https://platform.openai.com/docs/guides/agents',
    takeaway: {
      zh: '把循环执行、Handoffs、输入输出 Guardrails 与 Tracing 封装为极简运行时原语。',
      en: 'Minimalist runtime primitives for agent loops, handoffs, input/output guardrails, and tracing.',
    },
  },
  {
    id: 'hf-smolagents',
    track: 'runtime',
    kind: 'docs',
    title: 'smolagents: Code-First Lightweight Agents',
    venue: 'Hugging Face Docs',
    year: '2025',
    url: 'https://huggingface.co/docs/smolagents/index',
    takeaway: {
      zh: '以可执行代码替代冗长 JSON 工具调用，并强调隔离执行沙箱的重要性。',
      en: 'Favors executable code actions over verbose JSON schemas alongside isolated execution sandboxes.',
    },
  },
  {
    id: 'latent-space-autonomy',
    track: 'runtime',
    kind: 'blog',
    title: 'The Anatomy of Autonomy',
    venue: 'Latent Space',
    year: '2025',
    url: 'https://www.latent.space/p/agents',
    takeaway: {
      zh: '串联 Autonomy、Context Engineering 与 Evaluation 三条主线的工业界实践观察。',
      en: 'Industry field synthesis connecting autonomy levels, context engineering, and evaluation loops.',
    },
  },

  // 04. Observability / Safety / Evaluation
  {
    id: 'agentops',
    track: 'evaluation',
    kind: 'paper',
    title: 'AgentOps: Enabling Observability of LLM Agents',
    venue: 'arXiv',
    year: '2024',
    url: 'https://arxiv.org/abs/2411.05285',
    takeaway: {
      zh: '系统定义轨迹采集、确定性回放与 Agent CI/CD，让黑盒执行变得可审计。',
      en: 'Defines trajectory capture, replayability, and Agent CI/CD so black-box runs become auditable.',
    },
  },
  {
    id: 'agentbench',
    track: 'evaluation',
    kind: 'paper',
    title: 'AgentBench: Evaluating LLMs as Agents',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2308.03688',
    takeaway: {
      zh: '覆盖 OS、DB、Web 等多交互环境的早期系统化 Agent 能力评测基准。',
      en: 'Multi-environment benchmark evaluating LLMs across OS, database, and web interaction tasks.',
    },
  },
  {
    id: 'agent-security-bench',
    track: 'evaluation',
    kind: 'paper',
    title: 'Agent Security Bench (ASB): Hacking LLM Agents via Memory and Tool Exploitation',
    venue: 'arXiv',
    year: '2024',
    url: 'https://arxiv.org/abs/2410.02644',
    takeaway: {
      zh: '直指真实攻击面：记忆投毒、提示注入与恶意工具调用——解释为何必须坚持最小权限。',
      en: 'Benchmarks real attack surfaces—memory poisoning, prompt injection, and tool abuse—validating least privilege.',
    },
  },
  {
    id: 'ai-agent-systems-survey',
    track: 'evaluation',
    kind: 'paper',
    title: 'AI Agent Systems: Architectures, Applications, and Evaluation',
    venue: 'arXiv Survey',
    year: '2026',
    url: 'https://arxiv.org/abs/2601.01743',
    takeaway: {
      zh: '从架构、场景到评测指标的系统级综述，适合作为搭建评测体系的对照地图。',
      en: 'System-level survey connecting architecture choices directly to evaluation metrics and failure modes.',
    },
  },
];
