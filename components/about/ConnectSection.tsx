'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import Link from '@/components/ui/Link';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';

const topics = {
  zh: [
    'Agent Harness、Context Engineering 与评测验证闭环交流',
    'Local-first 个人系统、Obsidian 第二大脑与 MCP 工具实践',
    '有趣的开源共建、黑客松组队，或 AI / 全栈工程岗位与合作机会',
  ],
  en: [
    'Agent Harnesses, context engineering, and deterministic verification loops',
    'Local-first personal tools, Obsidian second brains, and MCP workflows',
    'Open-source collaborations, hackathons, or thoughtful AI / fullstack engineering roles',
  ],
} as const;

export default function ConnectSection() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(siteMetadata.email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="connect" className="not-prose about-section connect-section" aria-labelledby="connect-heading">
      <p className="eyebrow">{zh ? 'OPEN TO TALK' : 'OPEN TO TALK'}</p>
      <h2 id="connect-heading">
        {zh ? (
          <>
            欢迎找我聊点<span className="accent-zh">具体的事</span>
          </>
        ) : (
          <>
            Always happy to talk about <em className="display-serif">real builds</em>
          </>
        )}
      </h2>
      <p className="connect-lead">
        {zh
          ? '如果你也在折腾下面这些方向，或者只是对某篇文章里的实验有不同看法，都很欢迎直接发邮件或私信交流：'
          : 'If you are exploring any of the areas below—or simply disagree with one of my notes—feel free to reach out directly:'}
      </p>
      <ul className="connect-topics">
        {topics[language].map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <div className="connect-actions">
        <button type="button" onClick={handleCopy} className="ink-button">
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {copied ? (zh ? '已复制邮箱 ✓' : 'Email copied ✓') : siteMetadata.email}
        </button>
        <Link href={`mailto:${siteMetadata.email}`} className="secondary-button">
          <Mail size={15} aria-hidden="true" />
          {zh ? '直接写信' : 'Send email'}
        </Link>
        <Link href={siteMetadata.github} className="secondary-button">
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <Link href={siteMetadata.twitter} className="secondary-button">
          X <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
