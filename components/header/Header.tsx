'use client';

import { usePathname } from 'next/navigation';
import Link from '@/components/ui/Link';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { OPEN_PALETTE_EVENT } from '@/components/ui/CommandPalette';
import MobileNav from '@/components/header/MobileNav';
import { PixelSearch, PixelSpark } from '@/components/ui/PixelIcons';
import headerNavLinks from '@/data/headerNavLinks';
import { useLanguage } from '@/lib/i18n';

export default function Header() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  return (
    <div className="studio-header-bar">
      <header className="studio-header">
        <Link href="/" className="studio-wordmark" aria-label={language === 'zh' ? 'Coooder 首页' : 'Coooder home'}>
          <PixelSpark size={12} />
          <span>coooder</span>
        </Link>
        <div className="header-controls">
          <nav className="desktop-navigation" aria-label={t('nav.primary')}>
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined}>
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
          <div className="header-utilities">
            <button
              type="button"
              className="cmd-trigger"
              onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
              aria-label={language === 'zh' ? '打开全局命令面板 (⌘K)' : 'Open command palette (⌘K)'}
              title={language === 'zh' ? '搜索 (⌘K)' : 'Search (⌘K)'}
            >
              <PixelSearch size={14} />
            </button>
            <ThemeToggle />
            <LanguageSwitch />
            <MobileNav />
          </div>
        </div>
      </header>
    </div>
  );
}
