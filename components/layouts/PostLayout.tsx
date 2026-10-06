import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';

import { BlogTags, BlogMeta, BlogNav, TableOfContents, XDiscussion } from '@/components/blog';
import { SectionContainer, ScrollTopAndComment } from '@/components/ui';
import PostHeading from '@/components/blog/PostHeading';
import SeriesNav from '@/components/blog/SeriesNav';

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string; titleEn?: string };
  prev?: { path: string; title: string; titleEn?: string };
  children: ReactNode;
}

export default function PostLayout(props: LayoutProps) {
  const { content, next, prev, children } = props;
  const { toc, date, title, titleEn, bodyLanguage, tags, readingTime, xPostUrl, socialSummary } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />

      <article className="reading-page">
        {/*START: Header*/}
        <header>
          <div className="dark:border-gray space-y-1 border-b border-gray-200 pb-10">
            <div className="space-y-6">
              <PostHeading title={title} titleEn={titleEn} bodyLanguage={bodyLanguage} />
              <BlogTags tags={tags} />
              <dl>
                <div>
                  <dt className="sr-only">Published on / 发布于</dt>
                  <BlogMeta date={date} readingTime={readingTime} />
                </div>
              </dl>
            </div>
          </div>
        </header>
        {/*END: Header*/}
        <SeriesNav slug={content.slug} />

        {/*START: Content*/}
        <div className="grid grid-cols-1 gap-12 pt-8 lg:grid-cols-12 lg:pt-10">
          {!!toc?.length && (
            <aside className="lg:order-last lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-8">
                <TableOfContents toc={toc} />
              </div>
            </aside>
          )}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 lg:col-span-8 xl:col-span-9">
            <div className="prose max-w-none dark:prose-dark lg:prose-lg lg:pb-8">
              <div lang={bodyLanguage === 'en' ? 'en' : 'zh-CN'}>{children}</div>
              <XDiscussion xPostUrl={xPostUrl} socialSummary={socialSummary} />
            </div>
          </div>
        </div>
        {/*END: Content*/}

        {/*START: Footer*/}
        <footer>
          <BlogNav next={next} prev={prev} />
        </footer>
        {/*END: Footer*/}
      </article>
    </SectionContainer>
  );
}
