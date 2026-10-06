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
    title: { zh: '先判断，再选框架', en: 'Decide before you build' },
    description: {
      zh: '从什么时候不用 Agent，到如何选择合适的框架。',
      en: 'When not to use an agent, then how to choose a framework.',
    },
    chapters: [
      { slug: 'when-not-to-use-ai-agents', title: { zh: '什么时候不该用 Agent', en: 'When not to use an agent' } },
      { slug: 'agent-framework-comparison-guide', title: { zh: '主流框架怎么选', en: 'Choosing a framework' } },
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
