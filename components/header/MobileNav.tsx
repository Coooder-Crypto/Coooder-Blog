'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/ui/Link';
import { PixelClose, PixelMenu } from '@/components/ui/PixelIcons';
import headerNavLinks from '@/data/headerNavLinks';
import { useLanguage } from '@/lib/i18n';

export default function MobileNav() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="mobile-menu-trigger sm:hidden"
        onClick={() => setOpen(true)}
        aria-label={t('nav.openMenu')}
        aria-expanded={open}
      >
        <PixelMenu size={15} />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-[80]">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <DialogPanel className="mobile-menu-panel fixed inset-y-0 right-0 flex w-full max-w-xs flex-col p-6">
          <div className="flex items-center justify-between border-b border-[var(--edge)] pb-4">
            <DialogTitle className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {language === 'zh' ? '导航' : 'Navigation'}
            </DialogTitle>
            <button className="p-1.5 text-[var(--muted)] hover:text-[var(--ink)]" onClick={() => setOpen(false)} aria-label={t('nav.closeMenu')}>
              <PixelClose size={16} />
            </button>
          </div>
          <nav aria-label={t('nav.primary')} className="flex flex-col gap-4 py-8">
            {headerNavLinks.map((link, index) => (
              <Link
                className="flex items-center gap-4 text-xl font-medium"
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="eyebrow">0{index + 1}</span>
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <p className="eyebrow mt-auto">COOODER.SPACE</p>
        </DialogPanel>
      </Dialog>
    </>
  );
}
