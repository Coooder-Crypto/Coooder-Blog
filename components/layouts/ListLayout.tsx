'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { Link, Tag } from '@/components/ui';
import { PopularTags } from '@/components/homepage';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';
import ReadingPaths from '@/components/blog/ReadingPaths';

const queryEvent = 'blog-query-change';
const subscribeToQuery = (notify: () => void) => {
  window.addEventListener('popstate', notify);
  window.addEventListener(queryEvent, notify);
  return () => {
    window.removeEventListener('popstate', notify);
    window.removeEventListener(queryEvent, notify);
  };
};
const getQuery = () => window.location.search;
const getServerQuery = () => '';

function updateQuery(query: string, page: number, push = false) {
  const url = new URL(window.location.href);
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  if (page > 1) url.searchParams.set('page', String(page));
  else url.searchParams.delete('page');
  const target = `${url.pathname}${url.search}${url.hash}`;
  if (push) window.history.pushState(null, '', target);
  else window.history.replaceState(null, '', target);
  window.dispatchEvent(new Event(queryEvent));
}

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
  showReadingPaths?: boolean;
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
  showReadingPaths = false,
}: ListLayoutProps) {
  const { t, language } = useLanguage();
  const queryString = useSyncExternalStore(subscribeToQuery, getQuery, getServerQuery);
  const query = new URLSearchParams(queryString);
  const searchValue = query.get('q') ?? '';
  const pageParam = query.get('page');
  const requestedPage = pageParam && /^[1-9]\d*$/.test(pageParam) ? Number(pageParam) : 1;
  const derivedPostsPerPage =
    postsPerPage ??
    (initialDisplayPosts.length || (pagination ? Math.ceil(posts.length / pagination.totalPages) : posts.length));
  const filteredBlogPosts = posts.filter((post) => {
    const localizedPost = getLocalizedBlogContent(post, language);
    const searchContent = [
      localizedPost.title,
      localizedPost.summary,
      post.title,
      post.titleEn,
      post.summary,
      post.summaryEn,
      post.tags?.join(' '),
    ]
      .filter(Boolean)
      .join(' ');
    return searchContent.toLowerCase().includes(searchValue.trim().toLowerCase());
  });
  const totalPages = pagination
    ? Math.max(1, Math.ceil(filteredBlogPosts.length / Math.max(1, derivedPostsPerPage)))
    : 1;
  const currentPage = Math.min(requestedPage, totalPages);
  const start = derivedPostsPerPage * (currentPage - 1);
  const displayPosts = pagination ? filteredBlogPosts.slice(start, start + derivedPostsPerPage) : filteredBlogPosts;

  useEffect(() => {
    if (pageParam !== null && pageParam !== (currentPage > 1 ? String(currentPage) : null)) {
      updateQuery(searchValue, currentPage);
    }
  }, [pageParam, currentPage, searchValue]);

  const handlePageChange = (page: number) => {
    if (!pagination) return;
    if (page < 1 || page > totalPages) return;
    updateQuery(searchValue, page, true);
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  };

  return (
    <>
      <div className="blog-index">
        <header className="editorial-page-heading">
          <p className="eyebrow">{language === 'zh' ? '实践 / 思考 / 记录' : 'EXPERIMENTS / IDEAS / OBSERVATIONS'}</p>
          <h1>
            {title}
            <span className="rust-dot">.</span>
          </h1>
          <p>
            {language === 'zh'
              ? '关于 Agent、开发工具与软件工程。一边构建，一边记录。'
              : 'On agents, developer tools, and the craft of software. Notes from doing the work.'}
          </p>
        </header>
        {showReadingPaths && !searchValue.trim() && currentPage === 1 && <ReadingPaths />}
        <div className="blog-toolbar">
          <div className="relative max-w-[420px]">
            <label>
              <span className="sr-only">{t('blog.searchArticles')}</span>
              <input
                aria-label={t('blog.searchArticles')}
                type="search"
                value={searchValue}
                onChange={(e) => updateQuery(e.target.value, 1)}
                placeholder={t('blog.searchArticles')}
                className="blog-search"
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
        {searchValue.trim() && (
          <p className="blog-search-status" role="status">
            {language === 'zh'
              ? `找到 ${filteredBlogPosts.length} 篇文章`
              : `${filteredBlogPosts.length} articles found`}
          </p>
        )}
        <ul className="blog-posts">
          {!filteredBlogPosts.length && <li role="status">{t('blog.noPostsFound')}</li>}
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
                      <time dateTime={date}>{formatDate(date, language === 'zh' ? 'zh-CN' : 'en-US')}</time>
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
      {pagination && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
}
