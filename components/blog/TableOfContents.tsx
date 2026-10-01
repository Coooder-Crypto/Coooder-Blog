'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => setExpanded(desktop.matches);
    update();
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);

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
    <details
      className={clsx('article-toc space-y-4 [&_.chevron-right]:open:rotate-90', className)}
      open={expanded}
      onToggle={(event) => setExpanded(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer items-center gap-1 marker:content-none">
        <ChevronRight size={20} strokeWidth={1.5} className="chevron-right rotate-0 transition-transform" />
        <span className="text-lg font-medium">{language === 'zh' ? '文章目录' : 'Table of Contents'}</span>
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
  );
};

export default TableOfContents;
