'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { clsx } from 'clsx';
import { ChevronRight, List, X } from 'lucide-react';

import { Link } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

type TocItem = {
  value: string;
  url: string;
  depth: number;
};

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { language } = useLanguage();
  const { toc = [], className } = props;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastInlineToc, setPastInlineToc] = useState(false);
  const [destination, setDestination] = useState<string | null>(null);
  const inlineToc = useRef<HTMLDetailsElement>(null);
  const label = language === 'zh' ? '文章目录' : 'Table of Contents';

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      setExpanded(desktop.matches);
      if (desktop.matches) setMobileOpen(false);
    };
    update();
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => setPastInlineToc((inlineToc.current?.getBoundingClientRect().bottom ?? 0) < 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen || !destination) return;
    // Wait until the dialog releases its scroll lock and restores focus.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const heading = document.getElementById(decodeURIComponent(destination.slice(1)));
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
          heading.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        setDestination(null);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [mobileOpen, destination]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1,
    });

    toc.forEach(({ url }) => {
      const element = document.getElementById(decodeURIComponent(url.replace(/^#/, '')));

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <>
      <details
        ref={inlineToc}
        className={clsx('article-toc space-y-4 [&_.chevron-right]:open:rotate-90', className)}
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary className="flex cursor-pointer items-center gap-1 marker:content-none">
          <ChevronRight size={20} strokeWidth={1.5} className="chevron-right rotate-0 transition-transform" />
          <span className="text-lg font-medium">{label}</span>
        </summary>

        <ul className="flex flex-col space-y-2">
          {toc.map(({ value, depth, url }) => (
            <li
              key={url}
              className={clsx('text-gray-500 dark:text-gray-400', {
                'text-primary-600 underline underline-offset-4': activeId === url,
              })}
              style={{ paddingLeft: Math.max(0, depth - 2) * 16 }}
            >
              <Link href={url} aria-current={activeId === url ? 'location' : undefined}>
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      {pastInlineToc && (
        <button
          className="mobile-toc-trigger"
          onClick={() => setMobileOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
        >
          <List size={18} aria-hidden="true" /> {language === 'zh' ? '目录' : 'Contents'}
        </button>
      )}
      <Dialog open={mobileOpen} onClose={setMobileOpen} className="mobile-toc-dialog">
        <div className="mobile-toc-backdrop" aria-hidden="true" />
        <DialogPanel className="mobile-toc-panel">
          <div className="mobile-toc-header">
            <DialogTitle>{label}</DialogTitle>
            <button onClick={() => setMobileOpen(false)} aria-label={language === 'zh' ? '关闭目录' : 'Close contents'}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label={label}>
            <ul>
              {toc.map(({ value, depth, url }) => (
                <li key={url} style={{ paddingLeft: Math.max(0, depth - 2) * 12 }}>
                  <a
                    href={url}
                    aria-current={activeId === url ? 'location' : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      window.history.pushState(null, '', url);
                      setActiveId(url);
                      setDestination(url);
                      setMobileOpen(false);
                    }}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default TableOfContents;
