'use client';

import { GitBranch, MessageCircle, Star } from 'lucide-react';

import socialActivity from '@/data/socialActivity';
import { Link } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

import GitHub from 'public/static/icons/github.svg';
import X from 'public/static/icons/x.svg';

type GitHubRepo = {
  name: string;
  fullName: string;
  description?: string | null;
  url: string;
  language?: string | null;
  stars: number;
  forks: number;
  updatedAt?: string | null;
};

type GitHubEvent = {
  type: string;
  title: string;
  repo: string;
  url?: string | null;
  createdAt?: string | null;
};

type XPost = {
  id: string;
  text: string;
  url: string;
  createdAt?: string | null;
  metrics?: {
    likes?: number;
    reposts?: number;
    replies?: number;
    quotes?: number;
  };
};

const githubRepos = (socialActivity.github?.repos || []) as unknown as ReadonlyArray<GitHubRepo>;
const githubEvents = (socialActivity.github?.events || []) as unknown as ReadonlyArray<GitHubEvent>;
const xPosts = (socialActivity.x?.posts || []) as unknown as ReadonlyArray<XPost>;

const SocialActivity = () => {
  const { t, language } = useLanguage();
  const hasGitHub = githubRepos.length > 0 || githubEvents.length > 0;
  const hasX = xPosts.length > 0;

  if (!hasGitHub && !hasX) {
    return (
      <section className="py-12" data-gsap-reveal="up">
        <SectionHeading title={t('activity.title')} description={t('activity.empty')} />
      </section>
    );
  }

  return (
    <section className="py-12" data-gsap-reveal="up">
      <SectionHeading title={t('activity.title')} description={t('activity.subtitle')} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]" data-gsap-stagger>
        <div className="rounded-lg border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/70">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GitHub className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">GitHub</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('activity.githubSubtitle')}</p>
              </div>
            </div>
            {socialActivity.github?.profileUrl && (
              <Link
                href={socialActivity.github.profileUrl}
                className="text-sm font-medium text-primary-500 hover:text-sky-600 dark:hover:text-sky-400"
              >
                @{socialActivity.github.username}
              </Link>
            )}
          </div>

          {githubRepos.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {githubRepos.slice(0, 4).map((repo) => (
                <Link
                  key={repo.fullName}
                  href={repo.url}
                  className="group block rounded-lg border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-800/70 dark:hover:border-sky-500/40 dark:hover:bg-gray-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="line-clamp-1 font-semibold text-gray-900 group-hover:text-sky-600 dark:text-gray-100 dark:group-hover:text-sky-300">
                      {repo.name}
                    </h4>
                    {repo.language && (
                      <span className="rounded bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-gray-600 dark:text-gray-300">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitBranch className="h-3.5 w-3.5" />
                      {repo.forks}
                    </span>
                    {repo.updatedAt && <span>{formatRelativeDate(repo.updatedAt, language, socialActivity.generatedAt)}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {githubEvents.length > 0 && (
            <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t('activity.recentGithubEvents')}
              </h4>
              <div className="space-y-3">
                {githubEvents.slice(0, 5).map((event, index) => (
                  <Link
                    key={`${event.type}-${event.repo}-${event.createdAt || index}`}
                    href={event.url || `https://github.com/${event.repo}`}
                    className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-gray-800 dark:text-gray-100">{event.title}</span>
                      <span className="block truncate text-sm text-gray-500 dark:text-gray-400">{event.repo}</span>
                    </span>
                    {event.createdAt && (
                      <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                        {formatRelativeDate(event.createdAt, language, socialActivity.generatedAt)}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/70">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <X className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">X</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('activity.xSubtitle')}</p>
              </div>
            </div>
            {socialActivity.x?.profileUrl && (
              <Link
                href={socialActivity.x.profileUrl}
                className="text-sm font-medium text-primary-500 hover:text-sky-600 dark:hover:text-sky-400"
              >
                @{socialActivity.x.username}
              </Link>
            )}
          </div>

          {xPosts.length > 0 ? (
            <div className="space-y-3">
              {xPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.id}
                  href={post.url}
                  className="block rounded-lg border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-800/70 dark:hover:border-sky-500/40 dark:hover:bg-gray-800"
                >
                  <p className="line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-700 dark:text-gray-200">
                    {post.text}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{post.createdAt && formatRelativeDate(post.createdAt, language, socialActivity.generatedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {(post.metrics?.replies || 0) + (post.metrics?.quotes || 0)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              {socialActivity.x?.error || t('activity.xUnavailable')}
            </p>
          )}
        </div>
      </div>

      {socialActivity.generatedAt && (
        <p className="mt-4 text-right text-xs text-gray-400 dark:text-gray-500">
          {t('activity.updatedAt')} {formatDateTime(socialActivity.generatedAt, language)}
        </p>
      )}
    </section>
  );
};

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8" data-gsap-reveal="up">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function formatRelativeDate(value: string, language: 'en' | 'zh', baseValue?: string | null) {
  const date = new Date(value);
  const baseDate = baseValue ? new Date(baseValue) : new Date();
  const diffMs = baseDate.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (!Number.isFinite(diffDays) || diffDays < 0) {
    return formatDateTime(value, language);
  }

  if (diffDays === 0) return language === 'zh' ? '今天' : 'Today';
  if (diffDays === 1) return language === 'zh' ? '昨天' : 'Yesterday';
  if (diffDays < 30) return language === 'zh' ? `${diffDays} 天前` : `${diffDays}d ago`;

  return formatDateTime(value, language);
}

function formatDateTime(value: string, language: 'en' | 'zh') {
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export default SocialActivity;
