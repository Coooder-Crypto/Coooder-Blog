'use client';

import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';

import ListLayout from '@/components/layouts/ListLayout';
import { useLanguage } from '@/lib/i18n';

interface BlogIndexProps {
  posts: CoreContent<Blog>[];
  postsPerPage: number;
}

export default function BlogIndex({ posts, postsPerPage }: BlogIndexProps) {
  const { t } = useLanguage();
  const initialDisplayPosts = posts.slice(0, postsPerPage);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / postsPerPage),
  };

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      postsPerPage={postsPerPage}
      title={t('blog.title')}
    />
  );
}
