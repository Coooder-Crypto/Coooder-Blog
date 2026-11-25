'use client';

import { useLanguage } from '@/lib/i18n';

export default function AboutHeader() {
  const { language } = useLanguage();
  return (
    <header className="editorial-page-heading">
      <p className="eyebrow">{language === 'zh' ? '屏幕另一边的人' : 'THE PERSON BEHIND THE SCREEN'}</p>
      <h1>
        {language === 'zh' ? '关于我' : 'A little about me'}
        <span className="rust-dot">.</span>
      </h1>
      <p>
        {language === 'zh'
          ? '专注 Agent Harness、AI-Native Engineering 与本地优先工具的全栈开发者。'
          : 'A fullstack builder focused on Agent Harnesses, AI-native engineering, and local-first tools.'}
      </p>
    </header>
  );
}
