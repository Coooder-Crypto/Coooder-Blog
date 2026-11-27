'use client';

import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import Link from '@/components/ui/Link';
import { nowMeta, nowRhythmGroups, nowThreads } from '@/data/nowData';
import { useLanguage } from '@/lib/i18n';

export default function NowView() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <div className="now-page">
      <header className="editorial-page-heading">
        <p className="eyebrow">
          {nowMeta.updatedAt} · {nowMeta.location[language]}
        </p>
        <h1>{zh ? '现在' : 'Now'}</h1>
        <p>{nowMeta.lead[language]}</p>
      </header>

      <div className="pixel-divider" aria-hidden="true" />

      <section className="editorial-section" aria-labelledby="now-threads-heading">
        <div className="section-heading">
          <h2 id="now-threads-heading">{zh ? '近期推进的事' : 'Active threads'}</h2>
        </div>

        <ul className="now-threads-list">
          {nowThreads.map((item) => (
            <li key={item.num} className="now-thread-item">
              <div className="now-thread-head">
                <h3>{item.title[language]}</h3>
                <span className="eyebrow">{item.num}</span>
              </div>
              <p>{item.summary[language]}</p>
              {item.href && item.linkLabel && (
                <Link href={item.href} className="text-link">
                  {item.linkLabel[language]} <PixelArrowUpRight size={13} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="pixel-divider" aria-hidden="true" />

      <section className="editorial-section" aria-labelledby="now-rhythm-heading">
        <div className="section-heading">
          <h2 id="now-rhythm-heading">{zh ? '屏幕之外，以及明确不做的事' : 'Off the screen & intentional nos'}</h2>
        </div>

        <div className="uses-grid">
          {nowRhythmGroups.map((group) => (
            <div key={group.category.en} className="uses-card">
              <h3>{group.category[language]}</h3>
              <ul>
                {group.items[language].map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
