import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { slug } from 'github-slugger';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';

import { ListLayout } from 'layouts';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';
import siteMetadata from '@/data/siteMetadata';

export async function generateMetadata(props: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const resolvedParams = await props.params;
  const tag = decodeURI(resolvedParams.tag);

  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;

  // Generate paths for all tags in tag-data.json
  const existingTags = Object.keys(tagCounts);
  
  // Add common tags that might not have posts yet but are referenced in UI
  const additionalTags = ['vercel', 'ai', 'react', 'typescript'];
  
  // Combine and deduplicate tags
  const allTags = [...new Set([...existingTags, ...additionalTags])];

  const paths = allTags.map((tag) => ({
    tag: encodeURI(tag),
  }));

  return paths;
};

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await props.params;
  const tag = decodeURI(resolvedParams.tag);

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  );

  // Always return the layout, even if no posts are found
  return <ListLayout posts={filteredPosts} title={title} />;
}
