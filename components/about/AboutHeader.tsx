'use client';

import { useLanguage } from '@/lib/i18n';

export default function AboutHeader() {
  const { language } = useLanguage();

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {language === 'zh' ? '关于' : 'About'}
      </h1>
      <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
        {language === 'zh' ? '关于我，以及这个博客为何存在。' : 'More about me and why this blog exists.'}
      </p>
    </div>
  );
}
