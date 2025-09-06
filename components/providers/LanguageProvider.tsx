'use client';

import { useState, useEffect, ReactNode } from 'react';
import { LanguageContext, Language, getDefaultLanguage, getTranslation, saveLanguage } from '@/lib/i18n';

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLanguageState(getDefaultLanguage());
    setMounted(true);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    saveLanguage(newLanguage);
  };

  const t = getTranslation(language);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
