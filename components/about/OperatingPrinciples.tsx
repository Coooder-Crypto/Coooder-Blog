'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

const principles = [
  {
    num: '01',
    title: { zh: '先找验证闭环，再放 Agent 进场', en: 'Verification loop before autonomy' },
    body: {
      zh: '代码生成越便宜，证明改动正确就越贵。我习惯先把构建、类型检查、测试与回滚门禁写进系统，再让 Agent 进入执行环。',
      en: 'As code generation gets cheap, proving correctness gets expensive. I build deterministic checks and rollback gates before delegating execution.',
    },
    href: '/blog/ai-native-engineering-design-for-agents',
    linkLabel: { zh: 'AI-Native Engineering', en: 'AI-Native Engineering' },
  },
  {
    num: '02',
    title: { zh: '写作与思考留给自己，正文不掺水', en: 'Keep thinking & writing human-owned' },
    body: {
      zh: 'AI 可以帮我查资料、搭脚手架、跑测试，但观点、取舍和博客正文始终由自己写出来，避免用“看起来顺滑”的模板掩盖真实判断。',
      en: 'AI helps with research, scaffolding, and tests, while judgment and article prose remain human-owned—never padded with generic filler.',
    },
    href: '/blog/ai-coding-second-payment-and-knowledge-debt',
    linkLabel: { zh: '二次付费与知识债', en: 'Second payment & knowledge debt' },
  },
  {
    num: '03',
    title: { zh: '数据主权归己，敏感边界硬隔离', en: 'Data sovereignty & hard privacy walls' },
    body: {
      zh: '在 Jarvis 与 Vital Agent Sync 的设计里，原始健康记录、凭据与私有数据永远留在受控本地层，Agent 只通过最小权限 CLI 读取聚合摘要。',
      en: 'Across Jarvis and Vital Agent Sync, raw personal exports and secrets stay isolated locally; agents only access bounded summaries through controlled CLIs.',
    },
    href: '/projects#jarvis-system',
    linkLabel: { zh: 'Jarvis 架构原则', en: 'Jarvis architecture' },
  },
  {
    num: '04',
    title: { zh: '把“已实现证据”与“阶段假设”分开说', en: 'Separate evidence from assumptions' },
    body: {
      zh: '无论是公开项目还是单项目耗时测量，都会明确标出样本边界、代码版本与未完成项——克制而可复核的记录比漂亮宣传更有生命力。',
      en: 'Whether documenting projects or single-project benchmarks, I separate verified code, sample limits, and open assumptions explicitly.',
    },
    href: '/projects',
    linkLabel: { zh: '查看项目证据体系', en: 'Inspect project evidence' },
  },
] as const;

export default function OperatingPrinciples() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <section id="principles" className="not-prose about-section" aria-labelledby="principles-heading">
      <p className="eyebrow">{zh ? '原则与态度' : 'OPERATING PRINCIPLES'}</p>
      <h2 id="principles-heading">{zh ? '我如何构建与写作' : 'How I build and write'}</h2>
      <ol className="principles-grid">
        {principles.map((item) => (
          <li key={item.num} className="principle-card">
            <span className="display-serif principle-num">{item.num}</span>
            <h3>{item.title[language]}</h3>
            <p>{item.body[language]}</p>
            <Link href={item.href} className="text-link principle-link">
              {item.linkLabel[language]} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
