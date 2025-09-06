'use client';

import React from 'react';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { useLanguage } from '@/lib/i18n';

const POSTS_PER_PAGE = 5;

interface PageProps {
  params: Promise<{ page: string }>;
}

export default function Page({ params }: PageProps) {
  const { t } = useLanguage();
  const [resolvedParams, setResolvedParams] = React.useState<{ page: string } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = parseInt(resolvedParams.page);
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
