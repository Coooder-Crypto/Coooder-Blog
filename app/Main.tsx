'use client';

import Snowfall from 'react-snowfall';
import { formatDate } from 'pliny/utils/formatDate';

import siteMetadata from '@/data/siteMetadata';
import projectsData from '@/data/projectsData';
import { Tag, Link, Twemoji } from '@/components/ui';
import {
  Avatar,
  Heading,
  Greeting,
  TypedBios,
  BlogLinks,
  ShortDescription,
  SpotifyNowPlaying,
} from '@/components/homepage';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';

const MAX_DISPLAY = 5;

function ProjectCard({ project }: { project: any }) {
  const { t, language } = useLanguage();
  const { title, description, imgSrc, url, repo, builtWith } = project;
  const localizedTitle = (title && (title[language] ?? title.en)) || '';
  const localizedDescription = description ? (description[language] ?? description.en) : undefined;
  const techStack = Array.isArray(builtWith) ? builtWith : [];
  const href = repo ? `https://github.com/${repo}` : url;
  const linkLabel = t('projects.aria.linkTo').replace('{title}', localizedTitle);

  return (
    <div className="group cursor-pointer rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
      {imgSrc && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={imgSrc}
            alt={localizedTitle}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{localizedTitle}</h3>

        {localizedDescription && (
          <p className="line-clamp-2 text-gray-600 dark:text-gray-300">{localizedDescription}</p>
        )}

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="text-xs text-gray-500">
                {t('projects.moreTech').replace('{count}', String(techStack.length - 3))}
              </span>
            )}
          </div>
        )}

        {href && (
          <div className="pt-2">
            <Link
              href={href}
              aria-label={linkLabel}
              className="text-primary inline-flex items-center hover:text-sky-600 dark:hover:text-sky-400"
            >
              <span className="text-sm font-medium">
                {repo ? t('projects.cta.viewCode') : t('projects.cta.visitProject')}
              </span>
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home({ posts }) {
  const { t, language } = useLanguage();
  const workProjects = projectsData.filter(({ type }) => type === 'work');

  return (
    <div className="relative">
      <Snowfall
        snowflakeCount={60}
        style={{
          zIndex: -1,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />

      {/* Introduce myself */}
      <div className="mt-8 dark:divide-gray-700 md:mt-8">
        <Greeting />
        <div className="flex flex-col justify-between md:my-4 md:pb-8 xl:flex-row">
          <Avatar />
          <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
            <Heading />
            <TypedBios />
            <ShortDescription />
            <BlogLinks />
            <SpotifyNowPlaying />
            <p className="flex">
              <span className="mr-2">{t('home.happyReading')}</span>
              <Twemoji emoji="clinking-beer-mugs" />
            </p>
          </div>
        </div>
      </div>

      {/* Professional Work */}
      <div className="py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">{t('projects.workSectionTitle')}</h2>
          <div className="mx-auto h-1 w-16 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{t('projects.workSectionSubtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {workProjects.map((project, index) => (
            <ProjectCard key={`${project.title.en}-${index}`} project={project} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="text-primary inline-flex items-center hover:text-sky-600 dark:hover:text-sky-400"
          >
            <span className="font-medium">{t('projects.cta.viewAll')}</span>
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* List all post */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 py-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {t('home.recentPosts')}
          </h1>
          <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">{t('home.siteDescription')}</p>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && t('home.noPosts')}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const localizedPost = getLocalizedBlogContent(post, language);
            const { slug, date, tags } = post;
            const { title, summary } = localizedPost;
            return (
              <li key={slug} className="py-6">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">{t('common.publishedOn')}</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
                          aria-label={`${t('common.readArticle')} "${title}"`}
                        >
                          {t('home.readMore')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
            aria-label={t('home.allPosts')}
          >
            {t('home.allPosts')} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
