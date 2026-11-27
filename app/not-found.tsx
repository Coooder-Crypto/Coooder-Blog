'use client';

import Link from '@/components/ui/Link';
import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import { useLanguage } from '@/lib/i18n';

const ASCII_404 = [
  '█  █ █▀▀█ █  █',
  '█▄▄█ █  █ █▄▄█',
  '   █ █▄▄█    █',
].join('\n');

export default function NotFound() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <section className="comic-not-found" aria-labelledby="lost-heading">
      <div className="lost-panel" aria-hidden="true">
        <pre className="ascii-404-pre">{ASCII_404}</pre>
        <p>{zh ? 'ERR_ROUTE_NOT_FOUND // 404' : 'ERR_ROUTE_NOT_FOUND // 404'}</p>
      </div>
      <div>
        <h1 id="lost-heading">{zh ? '这个页面不存在。' : 'This page could not be found.'}</h1>
        <p>
          {zh
            ? '链接可能已移动，或者地址有误。可以从首页重新出发，或浏览全部工程文章。'
            : 'The link may have moved or the URL may be mistyped. Head back home or browse all engineering notes.'}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="ink-button">
            {zh ? '返回首页' : 'Back home'} <PixelArrowUpRight size={13} />
          </Link>
          <Link href="/blog" className="secondary-button">
            {zh ? '浏览文章' : 'Explore the blog'} <PixelArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
