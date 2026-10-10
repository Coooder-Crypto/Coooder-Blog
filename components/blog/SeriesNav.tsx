'use client';

import Link from '@/components/ui/Link';
import { clawCodeSeries } from '@/data/readingPaths';
import { useLanguage } from '@/lib/i18n';
import publishedSlugs from 'app/published-slugs.json';

export default function SeriesNav({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const chapters = clawCodeSeries.chapters.filter((chapter) => publishedSlugs.includes(chapter.slug));
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) return null;
  return (
    <nav className="series-nav" aria-label={clawCodeSeries.title[language]}>
      <p>
        <strong>{clawCodeSeries.title[language]}</strong>
        <span>
          {index + 1} / {chapters.length}
        </span>
      </p>
      <ol>
        {chapters.map((chapter, chapterIndex) => (
          <li key={chapter.slug}>
            <Link href={`/blog/${chapter.slug}`} aria-current={chapterIndex === index ? 'page' : undefined}>
              <span>{chapterIndex + 1}.</span> {chapter.title[language]}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
