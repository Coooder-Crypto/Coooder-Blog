'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';

const artwork: Record<string, string> = {
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
  return (
    <article className={`case-card ${detailed ? 'case-detailed' : ''}`}>
      {illustration && (
        <div className="case-art">
          <Image
            src={`/static/images/studio/${illustration}-comic.webp`}
            alt=""
            width={1536}
            height={1024}
            sizes="(max-width: 760px) 100vw, 33vw"
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
        {detailed && (
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
        <div className="case-links">
          {project.url && (
            <Link href={project.url} className="text-link">
              {t('projects.cta.live')} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
          {project.repo && (
            <Link href={`https://github.com/${project.repo}`} className="text-link">
              {t('projects.cta.code')} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
