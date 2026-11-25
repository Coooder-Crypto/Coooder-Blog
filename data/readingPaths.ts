// Order follows the published chapter numbers, not the publication dates.
export const clawCodeSeries = {
  title: { zh: 'Claw Code 源码解析', en: 'Inside Claw Code' },
  chapters: [
    { slug: 'claw-code-is-not-just-a-chat-cli', title: { zh: '认识 Agent Runtime', en: 'Meet the agent runtime' } },
    { slug: 'claw-code-cli-to-runtime', title: { zh: '从 CLI 到运行时', en: 'From CLI to runtime' } },
    { slug: 'claw-code-tools-skills-slash-commands', title: { zh: '工具与扩展系统', en: 'Tools and extensions' } },
    {
      slug: 'claw-code-context-management-compaction',
      title: { zh: '上下文与历史压缩', en: 'Context and compaction' },
    },
  ],
};

export const readingPaths = [
  {
    title: { zh: 'AI-Native Engineering 工程观', en: 'AI-Native Engineering' },
    description: {
      zh: '从三层 Harness、真实多栈耗时数据，到运行环境与二次付费的工程反思。',
      en: 'Three-layer harnesses, empirical feedback-loop data, runtime truth, and knowledge debt.',
    },
    chapters: [
      {
        slug: 'ai-native-engineering-design-for-agents',
        title: { zh: '软件工程要开始为 Agent 而设计', en: 'Designing software systems for agents' },
      },
      {
        slug: 'ai-dev-bottleneck-is-feedback-loop',
        title: { zh: '下一场竞争不是生成代码（实证数据）', en: 'The bottleneck is the feedback loop' },
      },
      {
        slug: 'repo-may-no-longer-be-source-of-truth',
        title: { zh: '代码仓库，可能不再是真相源', en: 'When the repo stops being the source of truth' },
      },
      {
        slug: 'ai-coding-second-payment-and-knowledge-debt',
        title: { zh: 'AI Coding 的二次付费与知识债', en: 'The second payment and knowledge debt' },
      },
    ],
  },
  {
    title: { zh: '选型、记忆与上下文工程', en: 'Selection, Memory & Context' },
    description: {
      zh: '从什么时候不用 Agent，到主流框架选型、四层记忆闭环与长程上下文压缩。',
      en: 'When not to use an agent, choosing a framework, four-layer memory, and compaction.',
    },
    chapters: [
      { slug: 'when-not-to-use-ai-agents', title: { zh: '什么时候不该用 Agent', en: 'When not to use an agent' } },
      { slug: 'agent-framework-comparison-guide', title: { zh: '主流框架怎么选', en: 'Choosing a framework' } },
      { slug: 'how-hermes-agent-self-improves', title: { zh: 'Hermes 四层记忆闭环', en: 'Hermes four-layer memory loop' } },
      {
        slug: 'context-compaction-is-not-summarization',
        title: { zh: '上下文压缩不是摘要', en: 'Context compaction is not summarization' },
      },
    ],
  },
  {
    ...clawCodeSeries,
    description: {
      zh: '沿着运行时、工具与上下文管理，读懂一个 Agent 系统。',
      en: 'Follow the runtime, tools, and context through a working agent system.',
    },
  },
];
