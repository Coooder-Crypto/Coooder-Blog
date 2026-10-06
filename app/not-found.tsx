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
        <p>{zh ? '这格漫画走丢了！' : 'PANEL NOT FOUND!'}</p>
      </div>
      <div>
        <p className="eyebrow">{zh ? '探索未结束 / 换一条路' : 'STILL EXPLORING / TRY ANOTHER ROUTE'}</p>
        <h1 id="lost-heading">{zh ? '这里还没有故事。' : 'No story on this page.'}</h1>
        <p>
          {zh
            ? '链接可能已移动，或者地址写错了。从首页重新出发，也可以去读点东西。'
            : 'This link may have moved, or the address may be mistyped. Head home or pick up a new story.'}
        </p>
        <div className="studio-actions">
          <Link href="/" className="ink-button">
            {zh ? '返回首页' : 'Back home'} ↗
          </Link>
          <Link href="/blog" className="text-link">
            {zh ? '去读文章' : 'Explore the blog'} ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
