'use client';

import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import Link from '@/components/ui/Link';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';
import ProjectEvidence from './ProjectEvidence';
import type { ProjectEvidenceRecord } from '@/data/projectEvidence';

export default function ProjectCase({
  project,
  detailed = false,
  evidence,
}: {
  project: Project;
  index: number;
  detailed?: boolean;
  featuredLead?: boolean;
  evidence?: ProjectEvidenceRecord;
}) {
  const { language, t } = useLanguage();
  const hasDetails = project.problem || project.outcome || (project.contribution && project.contribution.en !== 'xxx');

  if (detailed) {
    return (
      <article className="case-card case-detailed">
        <div className="case-body">
          <div className="case-detailed-head-copy">
            <div className="case-detailed-title-row">
              <h3>{project.title[language]}</h3>
              {evidence && <span className="case-status">{evidence.status[language]}</span>}
            </div>
            <p>{project.description?.[language]}</p>
          </div>

          {hasDetails && (
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
              {!evidence && project.contribution && project.contribution.en !== 'xxx' && (
                <div>
                  <dt>{t('projects.contribution')}</dt>
                  <dd>{project.contribution[language]}</dd>
                </div>
              )}
            </dl>
          )}
          <div className="pixel-tag-row">
            {project.builtWith.slice(0, 4).map((tech) => (
              <span key={tech} className="pixel-tag">
                {tech}
              </span>
            ))}
          </div>
          {(project.url || project.repo) && (
            <div className="case-links">
              {project.url && (
                <Link href={project.url} className="text-link">
                  {language === 'zh' ? '访问网站' : 'Visit website'} <PixelArrowUpRight size={13} />
                </Link>
              )}
              {project.repo && (
                <Link href={`https://github.com/${project.repo}`} className="text-link">
                  {language === 'zh' ? '查看源码' : 'View source'} <PixelArrowUpRight size={13} />
                </Link>
              )}
            </div>
          )}
          {evidence && <ProjectEvidence evidence={evidence} />}
        </div>
      </article>
    );
  }

  return (
    <article className="case-card">
      <div className="case-body">
        <h3>{project.title[language]}</h3>
        <p>{project.description?.[language]}</p>
        <div className="pixel-tag-row">
          {project.builtWith.slice(0, 4).map((tech) => (
            <span key={tech} className="pixel-tag">
              {tech}
            </span>
          ))}
        </div>
        {(project.url || project.repo) && (
          <div className="case-links">
            {project.url && (
              <Link href={project.url} className="text-link">
                {language === 'zh' ? '访问网站' : 'Visit website'} <PixelArrowUpRight size={13} />
              </Link>
            )}
            {project.repo && (
              <Link href={`https://github.com/${project.repo}`} className="text-link">
                {language === 'zh' ? '查看源码' : 'View source'} <PixelArrowUpRight size={13} />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
