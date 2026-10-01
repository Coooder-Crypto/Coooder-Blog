'use client';

import { useState, useLayoutEffect, ReactNode } from 'react';
import { LanguageContext, Language, getDefaultLanguage, getTranslation, saveLanguage } from '@/lib/i18n';

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  // Keep the static document and hydration snapshot consistent with the primary content language.
  const [language, setLanguageState] = useState<Language>('zh');

  useLayoutEffect(() => {
    setLanguageState(getDefaultLanguage());
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    saveLanguage(newLanguage);
  };

  const t = getTranslation(language);

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
