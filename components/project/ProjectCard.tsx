import type { ProjectCardProps } from '@/types/index';

import { Zoom, Link, Image } from '@/components/ui';
import { GithubRepo } from '@/components/project';
import { useLanguage } from '@/lib/i18n';

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t, language } = useLanguage();
  const { title, description, imgSrc, url, repo, builtWith } = project;
  const localizedTitle = (title && (title[language] ?? title.en)) || '';
  const localizedDescription = description ? (description[language] ?? description.en) : undefined;
  const techStack = Array.isArray(builtWith) ? builtWith : [];
  const href = repo ? `https://github.com/${repo}` : url;
  const linkLabel = t('projects.aria.linkTo').replace('{title}', localizedTitle);

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        } flex h-full flex-col overflow-hidden rounded-lg border border-transparent shadow-nextjs dark:shadow-nextjs-dark`}
      >
        <Zoom>
          <Image
            alt={localizedTitle}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-60"
            width={1088}
            height={612}
          />
        </Zoom>

        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={linkLabel}>
                {localizedTitle}
              </Link>
            ) : (
              localizedTitle
            )}
          </h2>
          {localizedDescription && (
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{localizedDescription}</p>
          )}

          {techStack.length > 0 && (
            <div className="mb-3 flex flex-wrap space-x-1.5">
              <span className="shrink-0">{t('projects.builtWith')}</span>
              {techStack.map((tool, index) => {
                return (
                  <span key={index} className="font-semibold text-gray-600 dark:text-gray-300">
                    {tool}
                    {index !== techStack.length - 1 && ','}
                  </span>
                );
              })}
              .
            </div>
          )}
          {typeof repo === 'string' ? (
            <GithubRepo repo={repo} />
          ) : (
            href && (
              <Link
                href={href}
                className="text-primary text-base font-medium leading-6 hover:text-sky-600 dark:hover:text-sky-400"
                aria-label={linkLabel}
              >
                {t('projects.cta.learnMore')} &rarr;
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
