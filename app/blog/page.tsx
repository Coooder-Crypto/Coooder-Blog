import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';

import { genPageMetadata } from 'app/seo';
import BlogIndex from '@/components/blog/BlogIndex';

const POSTS_PER_PAGE = 10;

export const metadata = genPageMetadata({
  title: '博客',
  description: '关于 AI Agent、源码解析、开发者工具与全栈工程的实践笔记。支持中英文标题与摘要，正文保留原文语言。',
});

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs));

  return <BlogIndex posts={posts} postsPerPage={POSTS_PER_PAGE} />;
}
