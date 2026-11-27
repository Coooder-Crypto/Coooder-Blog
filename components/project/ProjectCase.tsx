'use client';

import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import Link from '@/components/ui/Link';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';
import ProjectEvidence from './ProjectEvidence';
import type { ProjectEvidenceRecord } from '@/data/projectEvidence';

const artworkByTitle: Record<string, string> = {
  'Vital Agent Sync': '/static/images/projects/art-vital-sync.jpg',
  MemTable: '/static/images/projects/art-memtable.jpg',
  'AI Capital Map': '/static/images/projects/art-ai-capital.jpg',
};

const shortTagline: Record<string, { zh: string; en: string }> = {
  'Vital Agent Sync': {
    zh: '面向 MCP Agent 的本地优先 Apple Health 连接器。',
    en: 'Local-first Apple Health connector for MCP agents.',
  },
  MemTable: {
    zh: '面向长运行 Agent 的本地优先结构化账本运行时。',
    en: 'Local-first structured ledger runtime for long-running agents.',
  },
  'AI Capital Map': {
    zh: '带证据溯源的 AI 产业关系图谱与候选审核平台。',
    en: 'Evidence-backed AI industry graph & review workspace.',
  },
};

export default function ProjectCase({
  project,
  index,
  evidence,
}: {
  project: Project;
  index: number;
  detailed?: boolean;
  featuredLead?: boolean;
  evidence?: ProjectEvidenceRecord;
}) {
  const { language, t } = useLanguage();
  const zh = language === 'zh';
  const artSrc = artworkByTitle[project.title.en] ?? '/static/images/projects/art-memtable.jpg';
  const primaryHref = project.url || (project.repo ? `https://github.com/${project.repo}` : '#');
  const idx = String(index + 1).padStart(2, '0');
  const caption = shortTagline[project.title.en]?.[language] ?? project.description?.[language];

  return (
    <article className="art-gallery-tile">
      <Link href={primaryHref} className="art-gallery-stage" aria-label={project.title[language]}>
        <span className="art-tile-idx" aria-hidden="true">
          {idx}
        </span>
        <img
          src={artSrc}
          alt={project.title[language]}
          className="art-gallery-img"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </Link>

      <div className="art-tile-body">
        <div className="art-tile-head">
          <h3>
            <Link href={primaryHref}>{project.title[language]}</Link>
          </h3>
          <div className="art-tile-links">
            {project.url && (
              <Link href={project.url} aria-label={`${project.title[language]} — ${zh ? '访问网站' : 'Live'}`}>
                {zh ? '访问' : 'Live'}
                <PixelArrowUpRight size={11} />
              </Link>
            )}
            {project.repo && (
              <Link
                href={`https://github.com/${project.repo}`}
                aria-label={`${project.title[language]} — GitHub`}
              >
                GitHub
                <PixelArrowUpRight size={11} />
              </Link>
            )}
          </div>
        </div>

        <p className="art-tile-caption">{caption}</p>

        <details className="art-tile-drawer">
          <summary>{zh ? '源码证据与边界' : 'Source & notes'}</summary>
          <div className="art-drawer-content">
            {evidence && <p className="art-drawer-status">{evidence.status[language]}</p>}
            {project.problem && (
              <p>
                <strong>{t('projects.problem')}：</strong>
                {project.problem[language]}
              </p>
            )}
            {project.outcome && (
              <p>
                <strong>{t('projects.outcome')}：</strong>
                {project.outcome[language]}
              </p>
            )}
            {evidence && <ProjectEvidence evidence={evidence} />}
          </div>
        </details>
      </div>
    </article>
  );
}
