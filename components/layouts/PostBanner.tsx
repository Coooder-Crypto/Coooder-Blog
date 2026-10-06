import { ReactNode } from 'react';
import PostHeading from '@/components/blog/PostHeading';
import SeriesNav from '@/components/blog/SeriesNav';
import BlogNav from '@/components/blog/BlogNav';
import TableOfContents from '@/components/blog/TableOfContents';
import Bleed from 'pliny/ui/Bleed';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { XDiscussion } from '@/components/blog';
import { Image, SectionContainer, ScrollTopAndComment } from '@/components/ui';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string; titleEn?: string };
  prev?: { path: string; title: string; titleEn?: string };
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { slug, title, images, xPostUrl, socialSummary } = content;
  const displayImage = images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400';

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="reading-page">
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PostHeading title={title} titleEn={content.titleEn} bodyLanguage={content.bodyLanguage} />
            </div>
          </div>
          <TableOfContents toc={content.toc} />
          <SeriesNav slug={content.slug} />
          <div className="prose max-w-none py-4 dark:prose-invert">
            <div lang={content.bodyLanguage === 'en' ? 'en' : 'zh-CN'}>{children}</div>
            <XDiscussion xPostUrl={xPostUrl} socialSummary={socialSummary} />
          </div>
          <footer>
            <BlogNav prev={prev} next={next} />
          </footer>
        </div>
      </article>
    </SectionContainer>
  );
}
