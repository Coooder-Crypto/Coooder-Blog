'use client';

import { ArrowUpRight, BookOpen, Cuboid, Github, Sparkles } from 'lucide-react';
import { formatDate } from 'pliny/utils/formatDate';

import siteMetadata from '@/data/siteMetadata';
import projectsData from '@/data/projectsData';
import { Link, Tag } from '@/components/ui';
import { Avatar, SnowfallBackground } from '@/components/homepage';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';
import type { Project } from '@/types/data';

const MAX_DISPLAY = 3;

function FeaturedCaseCard({ project }: { project: Project }) {
  const { language, t } = useLanguage();
  const title = project.title[language] ?? project.title.en;
  const description = project.description?.[language] ?? project.description?.en;
  const problem = project.problem?.[language] ?? project.problem?.en;
  const outcome = project.outcome?.[language] ?? project.outcome?.en;
  const contribution = project.contribution?.[language] ?? project.contribution?.en;
  const repositoryUrl = project.repo ? `https://github.com/${project.repo}` : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[0_24px_65px_-45px_rgba(15,23,42,0.55)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_32px_80px_-42px_rgba(14,116,144,0.45)] dark:border-slate-700/70 dark:bg-slate-900/65 dark:hover:border-sky-500/60">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
            {t('projects.caseStudy')}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h3>
        </div>
        <Sparkles className="mt-1 h-5 w-5 shrink-0 text-sky-500" aria-hidden="true" />
      </div>

      {description && <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>}

      <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 dark:border-slate-800">
        {problem && <CaseDetail label={t('projects.problem')} value={problem} />}
        {outcome && <CaseDetail label={t('projects.outcome')} value={outcome} />}
        {contribution && <CaseDetail label={t('projects.contribution')} value={contribution} />}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.builtWith.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm font-semibold text-sky-700 dark:text-sky-300">
          {project.url && <ProjectLink href={project.url} label={t('projects.cta.live')} />}
          {repositoryUrl && <ProjectLink href={repositoryUrl} label={t('projects.cta.code')} />}
        </div>
      </div>
    </article>
  );
}

function CaseDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">{label}</h4>
      <p className="mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 hover:text-sky-500" data-gsap-magnetic>
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

export default function Home({ posts }: { posts: any[] }) {
  const { t, language } = useLanguage();
  const featuredProjects = projectsData.filter(({ type }) => type === 'featured').slice(0, 3);

  return (
    <div className="relative pb-8">
      <SnowfallBackground />

      <section className="relative overflow-hidden py-16 sm:py-24" aria-labelledby="home-heading">
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.16),transparent_42%),radial-gradient(circle_at_15%_80%,rgba(139,92,246,0.12),transparent_36%)]" />
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] lg:gap-14">
          <div className="mx-auto w-full max-w-[340px] rounded-[2rem] border border-white/70 bg-white/55 p-2 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.55)] backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/45">
            <Avatar />
          </div>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
              {t('home.heroEyebrow')}
            </p>
            <h1
              id="home-heading"
              className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl sm:leading-[1.08]"
            >
              {t('home.heroName')}
            </h1>
            <p className="mt-5 text-xl font-medium leading-8 text-slate-800 dark:text-slate-100 sm:text-2xl">
              {t('home.heroTitle')}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t('home.heroDescription')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_-16px_rgba(8,145,178,0.85)] transition hover:-translate-y-0.5 hover:from-cyan-400 hover:to-violet-500"
                data-gsap-magnetic
              >
                <Cuboid className="h-4 w-4" aria-hidden="true" />{' '}
                {language === 'zh' ? '进入 3D 简历' : 'Enter 3D Resume'}
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-200"
                data-gsap-magnetic
              >
                {t('home.heroPrimaryCta')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
                data-gsap-magnetic
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" /> {t('home.heroSecondaryCta')}
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
              <Link
                href={siteMetadata.github}
                className="inline-flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-300"
              >
                <Github className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href={siteMetadata.twitter}
                className="inline-flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-300"
              >
                𝕏 {t('home.heroX')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="selected-work-heading">
        <SectionHeading
          eyebrow={t('home.selectedWork')}
          title={t('projects.featuredSectionTitle')}
          description={t('home.selectedWorkDescription')}
        />
        <div className="grid gap-5 lg:grid-cols-3" data-gsap-stagger>
          {featuredProjects.map((project) => (
            <FeaturedCaseCard key={project.title.en} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-500 dark:text-sky-300"
            data-gsap-magnetic
          >
            {t('projects.cta.viewAll')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="border-t border-slate-200 py-12 dark:border-slate-800 sm:py-16"
        aria-labelledby="latest-writing-heading"
      >
        <SectionHeading
          eyebrow={t('home.latestWriting')}
          title={t('home.recentPosts')}
          description={t('home.latestWritingDescription')}
        />
        <div className="grid gap-4 lg:grid-cols-3" data-gsap-stagger>
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const localizedPost = getLocalizedBlogContent(post, language);
            const { title, summary } = localizedPost;
            return (
              <article
                key={post.slug}
                className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-sky-500/60"
              >
                <time dateTime={post.date} className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {formatDate(post.date, siteMetadata.locale)}
                </time>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                  <Link href={`/blog/${post.slug}`} className="group-hover:text-sky-700 dark:group-hover:text-sky-300">
                    {title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{summary}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="shrink-0 text-sm font-semibold text-sky-700 hover:text-sky-500 dark:text-sky-300"
                  >
                    {t('home.readMore')} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        {!posts.length && <p className="text-slate-500 dark:text-slate-400">{t('home.noPosts')}</p>}
        {posts.length > MAX_DISPLAY && (
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-500 dark:text-sky-300"
              data-gsap-magnetic
            >
              {t('home.allPosts')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 max-w-2xl" data-gsap-reveal="up">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
