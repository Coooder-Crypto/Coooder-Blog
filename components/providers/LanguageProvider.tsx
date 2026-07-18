'use client';

import { useState, useEffect, ReactNode } from 'react';
import { LanguageContext, Language, getDefaultLanguage, getTranslation, saveLanguage } from '@/lib/i18n';

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    setLanguageState(getDefaultLanguage());
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    saveLanguage(newLanguage);
  };

  const t = getTranslation(language);

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
