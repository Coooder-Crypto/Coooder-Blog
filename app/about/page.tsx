import { genPageMetadata } from 'app/seo';
import { Authors, allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { MDXLayoutRenderer } from 'pliny/mdx-components';

import AuthorLayout from '@/components/layouts/AuthorLayout';

export const metadata = genPageMetadata({
  title: '关于我',
  description:
    '认识 Coooder：探索 AI Agent、开发者工具与全栈工程的开发者，也是一名游戏爱好者。这里记录我的经历与关注方向。',
});

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  );
}
