'use client';

import siteMetadata from '@/data/siteMetadata';

import Link from '@/components/ui/Link';
import BrandIcon from '@/components/ui/BrandIcon';
import { useLanguage } from '@/lib/i18n';

const BuildWith = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center space-x-1">
      <span className="mr-1 text-gray-500 dark:text-gray-400">{t('footer.buildWith')}</span>

      <div className="flex space-x-1.5">
        <Link href="https://nextjs.org?ref=coooder.dev">
          <BrandIcon type="NextJS" className="h-5 w-5" />
        </Link>
        <Link href="https://tailwindcss.com?ref=coooder.dev">
          <BrandIcon type="TailwindCSS" className="h-5 w-5" />
        </Link>
        <Link href="https://www.typescriptlang.org?ref=coooder.dev">
          <BrandIcon type="Typescript" className="h-5 w-5" />
        </Link>
      </div>
      {/* <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
    <Link href={siteMetadata.siteRepo} className="text-gray-500 underline underline-offset-4 dark:text-gray-400">
      <span>View source</span>
    </Link> */}
    </div>
  );
};

export default BuildWith;
