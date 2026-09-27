'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <button
      className="language-toggle"
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
      title={t('lang.switch')}
    >
      {language === 'zh' ? 'EN' : '中文'}
      <span aria-hidden="true">↗</span>
    </button>
  );
}
