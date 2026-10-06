'use client';

import StudioImage from '@/components/ui/StudioImage';
import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';

const artwork: Record<string, 'health' | 'map' | 'notes'> = {
  'Vital Agent Sync': 'health',
  'AI Capital Map': 'map',
  ByteNote: 'notes',
};

export default function ProjectCase({
  project,
  index,
  detailed = false,
}: {
  project: Project;
  index: number;
  detailed?: boolean;
}) {
  const { language, t } = useLanguage();
  const illustration = artwork[project.title.en];
  const hasDetails = project.problem || project.outcome || (project.contribution && project.contribution.en !== 'xxx');
  return (
    <article className={`case-card ${detailed ? 'case-detailed' : ''}`}>
      {illustration && (
        <div className="case-art">
          <StudioImage
            artwork={illustration}
            alt=""
            sizes={
              detailed
                ? '(max-width: 760px) calc(100vw - 32px), (max-width: 1440px) 33vw, 400px'
                : '(max-width: 760px) 96px, (max-width: 1440px) 33vw, 400px'
            }
          />
        </div>
      )}
      <div className="case-body">
        <div className="case-index">
          <span>EXPERIMENT / {String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true">↗</span>
        </div>
        <h3>{project.title[language]}</h3>
        <p>{project.description?.[language]}</p>
        {detailed && hasDetails && (
          <dl className="case-details">
            {project.problem && (
              <div>
                <dt>{t('projects.problem')}</dt>
                <dd>{project.problem[language]}</dd>
              </div>
            )}
            {project.outcome && (
              <div>
                <dt>{t('projects.outcome')}</dt>
                <dd>{project.outcome[language]}</dd>
              </div>
            )}
            {project.contribution && project.contribution.en !== 'xxx' && (
              <div>
                <dt>{t('projects.contribution')}</dt>
                <dd>{project.contribution[language]}</dd>
              </div>
            )}
          </dl>
        )}
        <div className="case-technologies">{project.builtWith.slice(0, 4).join(' / ')}</div>
        {(project.url || project.repo) && (
          <div className="case-links">
            {project.url && (
              <Link href={project.url} className="text-link">
                {language === 'zh' ? '访问网站' : 'Visit website'} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            )}
            {project.repo && (
              <Link href={`https://github.com/${project.repo}`} className="text-link">
                {language === 'zh' ? '查看源码' : 'View source'} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
