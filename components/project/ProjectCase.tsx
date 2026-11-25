'use client';

import type { ComponentType } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import { ByteNoteSvg, CapitalMapSvg, VitalSyncSvg } from '@/components/ui/EditorialDiagrams';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';
import ProjectEvidence from './ProjectEvidence';
import type { ProjectEvidenceRecord } from '@/data/projectEvidence';

const projectDiagrams: Record<string, ComponentType<{ className?: string }>> = {
  'Vital Agent Sync': VitalSyncSvg,
  'AI Capital Map': CapitalMapSvg,
  ByteNote: ByteNoteSvg,
};

export default function ProjectCase({
  project,
  index,
  detailed = false,
  featuredLead = false,
  evidence,
}: {
  project: Project;
  index: number;
  detailed?: boolean;
  featuredLead?: boolean;
  evidence?: ProjectEvidenceRecord;
}) {
  const { language, t } = useLanguage();
  const Diagram = projectDiagrams[project.title.en];
  const hasDetails = project.problem || project.outcome || (project.contribution && project.contribution.en !== 'xxx');
  return (
    <article className={`case-card ${detailed ? 'case-detailed' : ''} ${featuredLead ? 'case-lead' : ''}`}>
      {Diagram && (
        <div className="case-art">
          <Diagram />
        </div>
      )}
      <div className="case-body">
        <div className="case-index">
          <span className="case-serif-num display-serif">{String(index + 1).padStart(2, '0')}</span>
          <span className="case-index-tag">CASE STUDY</span>
        </div>
        <h3>{project.title[language]}</h3>
        {evidence && <p className="case-status">{evidence.status[language]}</p>}
        <p>{project.description?.[language]}</p>
        {featuredLead && project.problem && <p className="case-lead-note">{project.problem[language]}</p>}
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
            {!evidence && project.contribution && project.contribution.en !== 'xxx' && (
              <div>
                <dt>{t('projects.contribution')}</dt>
                <dd>{project.contribution[language]}</dd>
              </div>
            )}
          </dl>
        )}
        <div className="case-technologies">{project.builtWith.slice(0, 4).join(' · ')}</div>
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
        {evidence && <ProjectEvidence evidence={evidence} />}
      </div>
    </article>
  );
}
