'use client';

import clsx from 'clsx';
import { useLanguage } from '@/lib/i18n';

const Greeting = () => {
  const { t } = useLanguage();
  const className = clsx(
    'bg-gradient-to-r from-gray-500 to-slate-400 dark:bg-gradient-to-l dark:from-blue-800 dark:to-primary-600',
    'mb-8 bg-clip-text text-xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-4xl md:leading-[86px]'
  );

  return <div className={className}>{t('home.quote')}</div>;
};

export default Greeting;
