'use client';

import { useState } from 'react';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { Link, Tag } from '@/components/ui';
import { PopularTags } from '@/components/homepage';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';

interface PaginationMeta {
  totalPages: number;
  currentPage: number;
}

interface PaginationProps extends PaginationMeta {
  onPageChange: (page: number) => void;
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationMeta;
  postsPerPage?: number;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const { t } = useLanguage();
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('blog.previous')}
          </button>
        )}
        {prevPage && (
          <button onClick={() => onPageChange(currentPage - 1)} className="text-primary-500 hover:underline">
            {t('blog.previous')}
          </button>
        )}
        <span>
          {currentPage} {t('blog.pageOf')} {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('blog.next')}
          </button>
        )}
        {nextPage && (
          <button onClick={() => onPageChange(currentPage + 1)} className="text-primary-500 hover:underline">
            {t('blog.next')}
          </button>
        )}
      </nav>
    </div>
  );
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  postsPerPage,
}: ListLayoutProps) {
  const { t, language } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage ?? 1);
  const derivedPostsPerPage =
    postsPerPage ??
    (initialDisplayPosts.length || (pagination ? Math.ceil(posts.length / pagination.totalPages) : posts.length));
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const getPaginatedPosts = () => {
    if (!pagination) {
      return initialDisplayPosts.length > 0 ? initialDisplayPosts : filteredBlogPosts;
    }

    if (currentPage === pagination.currentPage && initialDisplayPosts.length > 0) {
      return initialDisplayPosts;
    }

    const start = derivedPostsPerPage * (currentPage - 1);
    return posts.slice(start, start + derivedPostsPerPage);
  };

  const displayPosts = searchValue ? filteredBlogPosts : getPaginatedPosts();

  const handlePageChange = (page: number) => {
    if (!pagination) return;
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="space-y-4">
            <div className="relative max-w-lg">
              <label>
                <span className="sr-only">{t('blog.searchArticles')}</span>
                <input
                  aria-label={t('blog.searchArticles')}
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t('blog.searchArticles')}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                />
              </label>
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <PopularTags />
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && t('blog.noPostsFound')}
          {displayPosts.map((post) => {
            const localizedPost = getLocalizedBlogContent(post, language);
            const { path, date, tags } = post;
            const { title, summary } = localizedPost;
            return (
              <li key={path} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">{t('common.publishedOn')}</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={currentPage} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
}
