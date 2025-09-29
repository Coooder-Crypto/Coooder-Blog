'use client';

import ListLayout from '@/components/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { useLanguage } from '@/lib/i18n';

const POSTS_PER_PAGE = 5;

export default function BlogPage() {
  const { t } = useLanguage();
  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('blog.title')}
    />
  );
}
