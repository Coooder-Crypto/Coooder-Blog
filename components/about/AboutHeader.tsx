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
          ? '一个全栈工程师，和他持续更新的构建手记。'
          : 'A fullstack engineer, and a collection of things learned along the way.'}
      </p>
    </header>
  );
}
