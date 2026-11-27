import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';

import { BlogTags, BlogMeta, BlogNav, TableOfContents, XDiscussion } from '@/components/blog';
import { SectionContainer, ScrollTopAndComment } from '@/components/ui';
import PostHeading from '@/components/blog/PostHeading';
import SeriesNav from '@/components/blog/SeriesNav';
import RelatedPosts, { type RelatedPostSummary } from '@/components/blog/RelatedPosts';

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string; titleEn?: string };
  prev?: { path: string; title: string; titleEn?: string };
  related?: RelatedPostSummary[];
  children: ReactNode;
}

export default function PostLayout(props: LayoutProps) {
  const { content, next, prev, related, children } = props;
  const { toc, date, title, titleEn, bodyLanguage, tags, readingTime, xPostUrl, socialSummary } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />

      <article className="reading-page">
        <header>
          <div className="space-y-4 border-b border-[var(--line)] pb-8">
            <PostHeading title={title} titleEn={titleEn} bodyLanguage={bodyLanguage} />
            <dl>
              <div>
                <dt className="sr-only">Published on / 发布于</dt>
                <BlogMeta date={date} readingTime={readingTime} />
              </div>
            </dl>
            <BlogTags tags={tags} />
          </div>
        </header>
        <SeriesNav slug={content.slug} />

        {!!toc?.length && <TableOfContents toc={toc} />}

        <div className="pt-8">
          <div className="prose max-w-none dark:prose-dark">
            <div lang={bodyLanguage === 'en' ? 'en' : 'zh-CN'}>{children}</div>
            <XDiscussion xPostUrl={xPostUrl} socialSummary={socialSummary} />
          </div>
        </div>

        <footer>
          <RelatedPosts posts={related} />
          <BlogNav next={next} prev={prev} />
        </footer>
      </article>
    </SectionContainer>
  );
}
