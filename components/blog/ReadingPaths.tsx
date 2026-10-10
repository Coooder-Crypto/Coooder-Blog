'use client';

import Link from '@/components/ui/Link';
import { readingPaths } from '@/data/readingPaths';
import { useLanguage } from '@/lib/i18n';
import publishedSlugs from 'app/published-slugs.json';

export default function ReadingPaths() {
  const { language } = useLanguage();
  return (
    <section className="reading-paths" aria-labelledby="reading-paths-title">
      <h2 id="reading-paths-title">{language === 'zh' ? '推荐从这里读' : 'Start here'}</h2>
      <div className="reading-path-grid">
        {readingPaths
          .map((path) => ({
            ...path,
            chapters: path.chapters.filter((chapter) => publishedSlugs.includes(chapter.slug)),
          }))
          .filter((path) => path.chapters.length > 0)
          .map((path) => (
            <article key={path.title.en}>
              <h3>{path.title[language]}</h3>
              <p>{path.description[language]}</p>
              <ol>
                {path.chapters.map((chapter, index) => (
                  <li key={chapter.slug}>
                    <Link href={`/blog/${chapter.slug}`}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      {chapter.title[language]}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          ))}
      </div>
    </section>
  );
}
