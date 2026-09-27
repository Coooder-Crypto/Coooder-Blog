import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';

import { genPageMetadata } from 'app/seo';
import BlogIndex from '@/components/blog/BlogIndex';

const POSTS_PER_PAGE = 10;

export const metadata = genPageMetadata({
  title: 'Blog',
  description: 'Writing about AI agents, developer tools, fullstack systems, and practical software engineering.',
});

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs));

  return <BlogIndex posts={posts} postsPerPage={POSTS_PER_PAGE} />;
}
