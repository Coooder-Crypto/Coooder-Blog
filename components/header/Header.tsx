'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from '@/components/ui/Link';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { OPEN_PALETTE_EVENT } from '@/components/ui/CommandPalette';
import MobileNav from '@/components/header/MobileNav';
import headerNavLinks from '@/data/headerNavLinks';
import { useLanguage } from '@/lib/i18n';

export default function Header() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  return (
    <header className="studio-header">
      <Link href="/" className="studio-wordmark" aria-label={language === 'zh' ? 'Coooder 首页' : 'Coooder home'}>
        coooder<span aria-hidden="true">.</span>
      </Link>
      <span className="header-caption">
        <span className="live-pulse-dot" aria-hidden="true" />
        {language === 'zh' ? 'AGENT HARNESS · 工程手记' : 'AGENT HARNESS · FIELD NOTES'}
      </span>
      <div className="header-controls">
        <nav className="desktop-navigation" aria-label={t('nav.primary')}>
          {headerNavLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined}>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="nav-link-label">{t(link.key)}</span>
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="cmd-trigger"
          onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          aria-label={language === 'zh' ? '打开全局命令面板 (⌘K)' : 'Open command palette (⌘K)'}
          title={language === 'zh' ? '快速搜索与操作 (⌘K)' : 'Quick search & actions (⌘K)'}
        >
          <Search size={13} aria-hidden="true" />
          <span className="cmd-key-group" aria-hidden="true">
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </span>
        </button>
        <ThemeToggle />
        <LanguageSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
