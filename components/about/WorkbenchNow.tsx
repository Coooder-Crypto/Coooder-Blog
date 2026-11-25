'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

const focusItems = [
  {
    label: '01 / HARNESS',
    title: { zh: 'Agent Harness 三层底座', en: 'Three-layer Agent Harness' },
    summary: {
      zh: '围绕 Context（上下文地图）、Execution（标准执行入口）与 Verification（可验证准出闭环）重构软件工程流程。',
      en: 'Structuring Context, Execution, and Verification harnesses so agents can operate safely inside real engineering loops.',
    },
    href: '/blog/ai-native-engineering-design-for-agents',
    cta: { zh: '阅读工程观', en: 'Read thesis' },
  },
  {
    label: '02 / PERSONAL STACK',
    title: { zh: 'Jarvis 与证据型第二大脑', en: 'Jarvis & evidence-first brain' },
    summary: {
      zh: '用本地优先的 Obsidian Vault（jarvis-brain）与受控数据 CLI，把长期研究、判断与写作沉淀成可检索、可审计的上下文。',
      en: 'Running a local-first Obsidian vault (jarvis-brain) with controlled data CLIs so research, writing, and decisions stay grounded.',
    },
    href: '/projects#jarvis-system',
    cta: { zh: '查看系统架构', en: 'Explore stack' },
  },
  {
    label: '03 / EMPIRICAL DATA',
    title: { zh: '用真实测量检验 AI 协作', en: 'Measuring real AI loops' },
    summary: {
      zh: '不满足于直觉和演示，记录真实多栈项目的耗时分布与上下文压缩对照，区分“已验证证据”与“阶段假设”。',
      en: 'Instrumenting multi-stack execution time and context compaction probes while separating verified evidence from assumptions.',
    },
    href: '/blog/ai-dev-bottleneck-is-feedback-loop',
    cta: { zh: '查看实证数据', en: 'See measurements' },
  },
] as const;

export default function WorkbenchNow() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <section id="workbench" className="not-prose workbench-now" aria-labelledby="workbench-now-heading">
      <p className="eyebrow">{zh ? '当前聚焦与工作台' : 'NOW & WORKBENCH'}</p>
      <h2 id="workbench-now-heading">{zh ? '最近在深挖的三条主线' : 'Three threads I focus on right now'}</h2>
      <ul className="workbench-now-grid">
        {focusItems.map((item) => (
          <li key={item.label} className="workbench-now-card">
            <span className="eyebrow">{item.label}</span>
            <h3>{item.title[language]}</h3>
            <p>{item.summary[language]}</p>
            <Link href={item.href} className="text-link">
              {item.cta[language]} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
