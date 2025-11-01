'use client';

import { genPageMetadata } from 'app/seo';

import projectsData from '@/data/projectsData';
import { Link } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

export default function Projects() {
  const { t } = useLanguage();
  const workProjects = projectsData.filter(({ type }) => type === 'work');
  const sideProjects = projectsData.filter(({ type }) => type === 'self');

  return (
    <div className="projects-container">
      {/* Simple Header like Blog Page */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('projects.pageTitle')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('projects.pageDescription')}</p>
        </div>
      </div>

      {/* Projects Grid with Parallax Cards */}
      <div className="relative">
        {/* Work Projects */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
                {t('projects.workSectionTitle')}
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <div className="grid gap-12 md:gap-24">
              {workProjects.map((project, index) => (
                <ParallaxProjectCard key={project.title.en} project={project} reverse={index % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Side Projects */}
        <section className="bg-gray-50 py-24 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
                {t('projects.sideSectionTitle')}
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-green-500 to-blue-500"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sideProjects.map((project, index) => (
                <CompactProjectCard key={`${project.title.en}-${index}`} project={project} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ParallaxProjectCard({ project, reverse = false }: { project: any; reverse?: boolean }) {
  const { t, language } = useLanguage();
  const { title, description, imgSrc, url, repo, builtWith } = project;
  const localizedTitle = (title && (title[language] ?? title.en)) || '';
  const localizedDescription = description ? (description[language] ?? description.en) : undefined;
  const href = repo ? `https://github.com/${repo}` : url;
  const linkLabel = t('projects.aria.linkTo').replace('{title}', localizedTitle);

  return (
    <div
      className={`project-card flex flex-col items-center gap-12 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Project Image */}
      <div className="md:w-1/2">
        <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={imgSrc}
            alt={localizedTitle}
            className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      {/* Project Info */}
      <div className="md:w-1/2">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{localizedTitle}</h3>

          {localizedDescription && (
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{localizedDescription}</p>
          )}

          {builtWith && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('projects.builtWith')}</h4>
              <div className="flex flex-wrap gap-2">
                {builtWith.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {href && (
            <div className="pt-4">
              <Link
                href={href}
                aria-label={linkLabel}
                className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
              >
                <span>{repo ? t('projects.cta.viewCode') : t('projects.cta.visitProject')}</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactProjectCard({ project }: { project: any }) {
  const { t, language } = useLanguage();
  const { title, description, imgSrc, url, repo, builtWith } = project;
  const displayTech = Array.isArray(builtWith) ? builtWith : [];
  const primaryTech = displayTech.slice(0, 3);
  const remainingTechCount = Math.max(displayTech.length - primaryTech.length, 0);
  const localizedTitle = (title && (title[language] ?? title.en)) || '';
  const localizedDescription = description ? (description[language] ?? description.en) : undefined;
  const liveLabel = t('projects.aria.linkTo').replace('{title}', localizedTitle);

  return (
    <article className="project-card side-project-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white/95 shadow-[0_18px_45px_-30px_rgba(30,41,59,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(30,64,175,0.6)] dark:border-gray-700/60 dark:bg-gray-800/80">
      <div className="relative overflow-hidden">
        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={localizedTitle}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
              {t('projects.previewComingSoon')}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-sky-400">
          {localizedTitle}
        </h3>

        {localizedDescription && (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {localizedDescription}
          </p>
        )}

        {primaryTech.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {primaryTech.map((tech, i) => (
              <span
                key={i}
                className="rounded-full border border-slate-200/70 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-600 transition-colors duration-200 group-hover:border-blue-200 group-hover:text-blue-600 dark:border-slate-600 dark:text-slate-300 dark:group-hover:border-sky-500/60 dark:group-hover:text-sky-300"
              >
                {tech}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-700/80 dark:text-slate-300">
                {t('projects.moreTech').replace('{count}', String(remainingTechCount))}
              </span>
            )}
          </div>
        )}

        {(repo || url) && (
          <div className="mt-auto flex items-center justify-between pt-4 text-sm font-medium">
            <div className="flex items-center gap-3 text-blue-600 dark:text-sky-300">
              {url && (
                <Link
                  href={url}
                  aria-label={liveLabel}
                  className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10"
                >
                  <span>{t('projects.cta.live')}</span>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
              )}
              {repo && (
                <Link
                  href={`https://github.com/${repo}`}
                  aria-label={t('projects.aria.linkTo').replace('{title}', localizedTitle)}
                  className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10"
                >
                  <span>{t('projects.cta.code')}</span>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6l-6 6 6 6" />
                  </svg>
                </Link>
              )}
            </div>

            <svg
              className="h-5 w-5 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-sky-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        )}
      </div>
    </article>
  );
}
