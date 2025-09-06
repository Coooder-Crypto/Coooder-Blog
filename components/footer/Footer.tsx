'use client';

import BuildWith from '@/components/footer/BuildWith';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="mb-8 mt-16 items-center justify-between space-y-4 md:mb-10 md:flex md:space-y-0">
        <BuildWith />

        <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{t('footer.copyright')} 2025</div>
          <span>{` • `}</span>
          <span>{t('footer.blogTitle')}</span>
        </div>
      </div>
    </footer>
  );
}
