'use client';

import { useLanguage } from '@/lib/i18n';

export default function AboutHeader() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <header className="editorial-page-heading">
      <p className="eyebrow">{zh ? 'PERSONAL DOSSIER · 屏幕另一边的人' : 'PERSONAL DOSSIER · BEHIND THE SCREEN'}</p>
      <h1>
        {zh ? (
          <>
            关于 <em className="display-serif">Coooder</em>
            <span className="rust-dot">.</span>
          </>
        ) : (
          <>
            About <em className="display-serif">Coooder</em>
            <span className="rust-dot">.</span>
          </>
        )}
      </h1>
      <p>
        {zh
          ? '专注 Agent Harness、AI-Native Engineering 与本地优先个人系统的全栈工程师——这里汇总我的工程原则、经历、学术研究、黑客松足迹与日常工作台。'
          : 'A fullstack engineer focused on Agent Harnesses, AI-native engineering, and local-first personal systems—a complete window into my principles, experience, research, hackathons, and daily workbench.'}
      </p>
    </header>
  );
}
