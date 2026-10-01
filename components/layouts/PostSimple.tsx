import { ReactNode } from 'react';
import PostHeading from '@/components/blog/PostHeading';
import BlogNav from '@/components/blog/BlogNav';
import TableOfContents from '@/components/blog/TableOfContents';

import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { BlogTags, BlogMeta, XDiscussion } from '@/components/blog';
import { SectionContainer, ScrollTopAndComment } from '@/components/ui';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string; titleEn?: string };
  prev?: { path: string; title: string; titleEn?: string };
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { date, title, tags, readingTime, xPostUrl, socialSummary } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />

      <article className="reading-page">
        <div>
          <header>
            <div className="dark:border-gray space-y-1 border-b border-gray-200 pb-10">
              <div className="space-y-6">
                <PostHeading title={title} titleEn={content.titleEn} bodyLanguage={content.bodyLanguage} />
                <BlogTags tags={tags} />
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <BlogMeta date={date} readingTime={readingTime} />
                  </div>
                </dl>
              </div>
            </div>
          </header>
          <TableOfContents toc={content.toc} />

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">
                <div lang={content.bodyLanguage === 'en' ? 'en' : 'zh-CN'}>{children}</div>
                <XDiscussion xPostUrl={xPostUrl} socialSummary={socialSummary} />
              </div>
            </div>

            <footer>
              <BlogNav prev={prev} next={next} />
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
