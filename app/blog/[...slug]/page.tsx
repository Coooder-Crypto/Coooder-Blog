import 'css/prism.css';
import 'katex/dist/katex.css';

import { MDXLayoutRenderer } from 'pliny/mdx-components';
import type { Blog } from 'contentlayer/generated';
import { allBlogs } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';

import { components } from '@/components/ui';
import { PostSimple, PostLayout, PostBanner } from 'layouts';

const defaultLayout = 'PostLayout';
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }));
};

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slug = decodeURI(resolvedParams.slug.join('/'));
  const post = allBlogs.find((p) => p.slug === slug) as Blog;
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;

  const Layout = layouts[post.layout || defaultLayout];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout content={mainContent}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  );
}
