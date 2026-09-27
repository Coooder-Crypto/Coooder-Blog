'use client';

import { usePathname } from 'next/navigation';
import Link from '@/components/ui/Link';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import MobileNav from '@/components/header/MobileNav';
import headerNavLinks from '@/data/headerNavLinks';
import { useLanguage } from '@/lib/i18n';

export default function Header() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  return (
    <header className="studio-header">
      <Link href="/" className="studio-wordmark" aria-label={language === 'zh' ? 'Coooder 首页' : 'Coooder home'}>
        coooder<span aria-hidden="true">✳︎</span>
      </Link>
      <span className="header-caption">{language === 'zh' ? '构建者的个人手记' : 'A BUILDER’S FIELD NOTES'}</span>
      <div className="header-controls">
        <nav className="desktop-navigation" aria-label={t('nav.primary')}>
          {headerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || pathname.startsWith(link.href + '/') ? 'page' : undefined}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <LanguageSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
