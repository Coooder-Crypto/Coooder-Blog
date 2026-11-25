'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

export interface RelatedPostSummary {
  slug: string;
  title: string;
  titleEn?: string;
  summary?: string;
  summaryEn?: string;
  tag?: string;
}

export default function RelatedPosts({ posts }: { posts?: RelatedPostSummary[] }) {
  const { language } = useLanguage();
  const zh = language === 'zh';

  if (!posts || posts.length === 0) return null;

  return (
    <section className="related-posts-block" aria-labelledby="related-posts-heading">
      <p className="eyebrow">{zh ? '延伸阅读' : 'FURTHER READING'}</p>
      <h2 id="related-posts-heading">{zh ? '相关文章推荐' : 'Continue exploring'}</h2>
      <div className="related-posts-grid">
        {posts.map((post) => {
          const title = zh ? post.title : post.titleEn || post.title;
          const summary = zh ? post.summary : post.summaryEn || post.summary;
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="related-post-card">
              <div className="related-post-top">
                {post.tag && <span className="eyebrow">{post.tag}</span>}
                <ArrowUpRight size={15} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              {summary && <p>{summary}</p>}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
