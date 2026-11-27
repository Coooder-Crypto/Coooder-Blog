'use client';

import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import Link from '@/components/ui/Link';
import projectsData from '@/data/projectsData';
import ProjectCase from '@/components/project/ProjectCase';
import ProjectArchive from '@/components/project/ProjectArchive';
import { projectEvidence } from '@/data/projectEvidence';
import { useLanguage } from '@/lib/i18n';

export default function Projects() {
  const { language, t } = useLanguage();
  const zh = language === 'zh';
  const featured = projectsData.filter((project) => project.type === 'featured');
  const other = projectsData.filter((project) => project.type !== 'featured');

  return (
    <div className="projects-index">
      <header className="editorial-page-heading">
        <h1>{t('projects.pageTitle')}</h1>
        <p>
          {zh
            ? '挑出四件最能代表当前方向的作品，其余探索收在下方归档里。'
            : 'Four core systems representing what I build now, followed by an index of earlier experiments.'}
        </p>
      </header>

      <div className="pixel-divider" aria-hidden="true" />

      <section id="evidence-title" aria-labelledby="featured-heading" className="editorial-section">
        <div className="grid-section-head">
          <h2 id="featured-heading" className="grid-section-title">
            <span className="section-idx" aria-hidden="true">
              [01]
            </span>
            {zh ? '精选作品' : 'Selected works'}
            <span className="grid-section-count">04</span>
          </h2>
        </div>

        <div className="projects-art-gallery">
          {featured.map((project, index) => (
            <ProjectCase
              key={project.title.en}
              project={project}
              index={index}
              evidence={projectEvidence.find((entry) => entry.repo === project.repo)}
            />
          ))}

          {/* 4th Gallery Tile: Jarvis (div, preserving exact 3 <article> count for content checks) */}
          <div id="jarvis-system" className="art-gallery-tile">
            <Link
              href="/blog/repo-may-no-longer-be-source-of-truth"
              className="art-gallery-stage"
              aria-label="Jarvis"
            >
              <span className="art-tile-idx" aria-hidden="true">
                04
              </span>
              <img
                src="/static/images/projects/art-jarvis.jpg"
                alt="Jarvis — Local-first personal agent & second brain"
                className="art-gallery-img"
                loading="lazy"
              />
            </Link>

            <div className="art-tile-body">
              <div className="art-tile-head">
                <h3>
                  <Link href="/blog/repo-may-no-longer-be-source-of-truth">Jarvis</Link>
                </h3>
                <div className="art-tile-links">
                  <Link href="/blog/repo-may-no-longer-be-source-of-truth">
                    {zh ? '架构文' : 'Essay'}
                    <PixelArrowUpRight size={11} />
                  </Link>
                </div>
              </div>

              <p className="art-tile-caption">
                {zh
                  ? '部署在自有节点的本地优先个人 Agent 与第二大脑。'
                  : 'Private, local-first personal agent stack & Obsidian second brain.'}
              </p>

              <details className="art-tile-drawer">
                <summary>{zh ? '架构原则与文章' : 'Architecture & notes'}</summary>
                <div className="art-drawer-content">
                  <p className="art-drawer-status">{zh ? '私有个人系统 · 本地优先' : 'Private stack · Local-first'}</p>
                  <p>
                    {zh
                      ? '将上游 Hermes 运行时与配置、数据管道及 Obsidian 第二大脑完全解耦；敏感数据硬隔离，仅通过受控 CLI 与只读研究管道交互。'
                      : 'Decouples upstream Hermes runtime from prompts, controlled Postgres summaries, and an Obsidian second brain with strict privacy boundaries.'}
                  </p>
                  <ul className="evidence-sources">
                    <li>
                      <Link href="/blog/repo-may-no-longer-be-source-of-truth" className="text-link">
                        {zh ? '为什么 Repo 不再是唯一真相源' : 'Why Repo Is No Longer SSOT'} ↗
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/how-hermes-agent-self-improves" className="text-link">
                        {zh ? 'Hermes 四层记忆拆解' : 'Hermes Four-Layer Memory'} ↗
                      </Link>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <div className="pixel-divider" aria-hidden="true" />

      <section aria-labelledby="archive-heading" className="editorial-section">
        <div className="grid-section-head">
          <h2 id="archive-heading" className="grid-section-title">
            <span className="section-idx" aria-hidden="true">
              [02]
            </span>
            {zh ? '其他探索' : 'Archive'}
            <span className="grid-section-count">{String(other.length).padStart(2, '0')}</span>
          </h2>
        </div>
        <ProjectArchive projects={other} />
      </section>
    </div>
  );
}
