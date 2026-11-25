'use client';

import { useLanguage } from '@/lib/i18n';

const introduction = {
  en: [
    'I’m Coooder, a fullstack engineer working at the intersection of AI agents, developer tooling, and verifiable software systems.',
    'Code generation is getting cheap fast; what stays expensive is context, verification, and owning the outcome. I focus on Agent Harnesses—the Context, Execution, and Verification layers that turn probabilistic models into repeatable engineering loops.',
    'Outside team work, I maintain Jarvis, a local-first personal agent stack paired with a Git-backed Obsidian second brain (jarvis-brain). It keeps raw personal data behind controlled boundaries while turning research, measurements, and writing into reusable context.',
    'This site documents what I build, measure, and learn along the way—always separating implemented evidence from assumptions and boundaries.',
  ],
  zh: [
    '你好，我是 Coooder，一名专注 AI Agent、开发者工具与可验证软件系统的全栈工程师。',
    'AI 让代码生成变得越来越便宜，但上下文、验证闭环和承担结果依然昂贵。我最关注的是 Agent Harness——也就是让概率型模型进入真实研发链路所需的 Context、Execution 与 Verification 三层底座。',
    '在日常工作之外，我持续维护着一套本地优先的个人 Agent 系统 Jarvis 与 Git 驱动的 Obsidian 第二大脑（jarvis-brain）：把原始敏感数据隔离在受控边界之内，同时将研究、实证测量与写作沉淀为可检索、可审计的长期上下文。',
    '这个博客记录我的工程思考、源码拆解与一手实验——也尽量坚持把“已实现的证据”与“阶段假设和边界”分开陈述。',
  ],
} as const;

export default function AboutIntro() {
  const { language } = useLanguage();

  return (
    <div className="not-prose space-y-5 text-base leading-8 text-[var(--ink-secondary)] md:text-[17px]">
      {introduction[language].map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
