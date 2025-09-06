'use client';

import { useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage, Language } from '@/lib/i18n';

const LanguageSwitch = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
          'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800',
          'transition-colors duration-200'
        )}
        aria-label={t('lang.switch')}
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        <ChevronDown className={clsx('h-3 w-3 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close language menu"
          />

          {/* Dropdown */}
          <div
            className={clsx(
              'absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-lg border',
              'bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900',
              'py-1'
            )}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={clsx(
                  'flex w-full items-center px-3 py-2 text-sm',
                  'text-left hover:bg-gray-50 dark:hover:bg-gray-800',
                  'transition-colors duration-150',
                  lang.code === language && 'bg-gray-50 font-medium dark:bg-gray-800'
                )}
              >
                <span className="flex-1">{lang.nativeName}</span>
                {lang.code === language && <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitch;
