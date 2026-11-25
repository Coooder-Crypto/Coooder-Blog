'use client';

import { useState, type HTMLAttributes } from 'react';
import { Check, Link2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface ArticleHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 2 | 3;
}

function ArticleHeading({ level, id, className, children, ...rest }: ArticleHeadingProps) {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const zh = language === 'zh';

  const handleCopyAnchor = async () => {
    if (!id || typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, '', `#${id}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.hash = id;
    }
  };

  const Tag = level === 2 ? 'h2' : 'h3';
  const mergedClass = ['article-anchor-heading', className].filter(Boolean).join(' ');

  return (
    <Tag id={id} className={mergedClass} {...rest}>
      {children}
      {id && (
        <button
          type="button"
          onClick={handleCopyAnchor}
          className={`article-heading-copy${copied ? ' copied' : ''}`}
          aria-label={zh ? '复制该章节链接' : 'Copy section link'}
          title={zh ? '复制章节链接' : 'Copy link to section'}
        >
          {copied ? <Check size={13} aria-hidden="true" /> : <Link2 size={13} aria-hidden="true" />}
          <span>{copied ? (zh ? '已复制' : 'Copied') : '#'}</span>
        </button>
      )}
    </Tag>
  );
}

export function ArticleH2(props: HTMLAttributes<HTMLHeadingElement>) {
  return <ArticleHeading level={2} {...props} />;
}

export function ArticleH3(props: HTMLAttributes<HTMLHeadingElement>) {
  return <ArticleHeading level={3} {...props} />;
}
