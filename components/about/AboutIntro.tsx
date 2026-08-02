'use client';

import { useLanguage } from '@/lib/i18n';

const introduction = {
  en: [
    'I’m Coooder, a fullstack engineer exploring AI agents, developer tools, and practical software systems.',
    'I care less about AI as a novelty and more about making it useful: clear context, repeatable execution, and feedback loops that make results trustworthy.',
    'This blog is where I document experiments and ideas around AI-native engineering, agent systems, personal tools, and the craft of building software. I write about what I build, what breaks, and what I learn along the way.',
    'AI makes first drafts cheaper; judgment, verification, and ownership still matter. I hope these notes are useful to others exploring the same frontier.',
  ],
  zh: [
    '你好，我是 Coooder，一名全栈工程师。我关注 AI Agent、开发者工具和实用的软件系统。',
    '我不把 AI 当作新奇玩具，更在意它能否真正解决问题：上下文是否清晰、执行是否可重复、结果是否有可信的反馈闭环。',
    '这个博客记录我在 AI-Native Engineering、Agent 系统、个人工具与软件工程实践中的实验和思考：我构建了什么、什么地方出了问题，以及我从中学到了什么。',
    'AI 让第一版实现变得更便宜，但判断、验证和承担结果仍然重要。希望这些记录能为同样在探索这条路径的人提供一点参考。',
  ],
} as const;

export default function AboutIntro() {
  const { language } = useLanguage();

  return (
    <div className="not-prose space-y-5 text-base leading-7 text-gray-600 dark:text-gray-300 md:text-lg md:leading-8">
      {introduction[language].map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
