'use client';

import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

export default function NotFound() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <section className="comic-not-found" aria-labelledby="lost-heading">
      <div className="lost-panel" aria-hidden="true">
        <span>404</span>
        <p>{zh ? 'PAGE NOT FOUND' : 'PAGE NOT FOUND'}</p>
      </div>
      <div>
        <p className="eyebrow">{zh ? 'ROUTE MISSING' : 'ROUTE MISSING'}</p>
        <h1 id="lost-heading">{zh ? '这个页面不存在。' : 'This page could not be found.'}</h1>
        <p>
          {zh
            ? '链接可能已移动，或者地址有误。可以从首页重新出发，或浏览全部工程文章。'
            : 'The link may have moved or the URL may be mistyped. Head back home or browse all engineering notes.'}
        </p>
        <div className="studio-actions">
          <Link href="/" className="ink-button">
            {zh ? '返回首页' : 'Back home'} ↗
          </Link>
          <Link href="/blog" className="secondary-button">
            {zh ? '浏览文章' : 'Explore the blog'} ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
