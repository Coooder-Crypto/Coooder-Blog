'use client';

import clsx from 'clsx';
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from '@/components/ui/Link';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import Logo from 'public/static/images/logo.svg';
import { useLanguage } from '@/lib/i18n';

const Header = () => {
  const { t } = useLanguage();
  const headerClass =
    'mx-auto w-full max-w-6xl supports-backdrop-blur fixed left-0 right-0 top-1 z-10 bg-white/75 py-2 backdrop-blur dark:bg-dark/75 md:rounded-2xl';

  return (
    <header className={headerClass}>
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <div className="animate-wave">
            <Logo className="fill-dark dark:fill-white" />
          </div>
          <div className="group ml-2 text-xl font-bold transition duration-300">
            Coooder.Blog
            <span className="block h-0.5 max-w-0 bg-black transition-all duration-500 group-hover:max-w-[85%] dark:bg-white"></span>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={clsx(
                    'mx-1 rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2',
                    'hover:bg-gray-200 dark:hover:bg-primary-600'
                  )}
                >
                  <span>{t(link.key)}</span>
                </Link>
              ))}
          </div>
          <LanguageSwitch />
          <div
            role="separator"
            data-orientation="vertical"
            className="hidden h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-600 md:block"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
