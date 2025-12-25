import 'css/prism.css';
import 'katex/dist/katex.css';

import type { Metadata } from 'next';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import type { Blog } from 'contentlayer/generated';
import { allBlogs } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';

import { components } from '@/components/ui';
import { PostSimple, PostLayout, PostBanner } from '@/components/layouts';
import siteMetadata from '@/data/siteMetadata';

const defaultLayout = 'PostLayout';
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }));
};

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await props.params;
  const slug = decodeURI(resolvedParams.slug.join('/'));
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Not Found',
      robots: { index: false, follow: false },
    };
  }

  const canonicalFromFrontmatter = post.canonicalUrl?.trim();
  const canonical = canonicalFromFrontmatter
    ? canonicalFromFrontmatter.startsWith('http')
      ? canonicalFromFrontmatter
      : `${siteMetadata.siteUrl}${canonicalFromFrontmatter.startsWith('/') ? '' : '/'}${canonicalFromFrontmatter}`
    : `${siteMetadata.siteUrl}/blog/${post.slug}`;
  const description = post.summary || siteMetadata.description;
  const images = Array.isArray(post.images)
    ? post.images.length > 0
      ? post.images
      : [siteMetadata.socialBanner]
    : post.images
      ? [post.images]
      : [siteMetadata.socialBanner];

  return {
    title: post.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      siteName: siteMetadata.title,
      images,
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      title: post.title,
      card: 'summary_large_image',
      images,
    },
  };
}

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
