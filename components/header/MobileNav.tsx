'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from '@/components/ui/Link';
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
        <Menu size={24} aria-hidden="true" />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-[80]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel className="mobile-menu-panel fixed inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-stone-600 p-8">
          <div className="flex items-center justify-between border-b border-stone-400 pb-6">
            <DialogTitle className="font-serif text-2xl">{language === 'zh' ? '随处看看' : 'Look around'}</DialogTitle>
            <button className="p-2" onClick={() => setOpen(false)} aria-label={t('nav.closeMenu')}>
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label={t('nav.primary')} className="flex flex-col gap-6 py-10">
            {headerNavLinks.map((link, index) => (
              <Link
                className="flex items-center gap-6 text-3xl"
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
          <p className="eyebrow mt-auto">COOODER / FIELD NOTES</p>
        </DialogPanel>
      </Dialog>
    </>
  );
}
