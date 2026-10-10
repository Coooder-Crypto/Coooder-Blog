'use client';

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
        <p className="eyebrow">{zh ? '构建 / 实验 / 迭代' : 'BUILD / EXPERIMENT / ITERATE'}</p>
        <h1>
          {t('projects.pageTitle')}
          <span className="rust-dot">.</span>
        </h1>
        <p>
          {zh
            ? '从一个问题开始，把想法变成可以使用、验证与改进的系统。'
            : 'Starting with a question. Making something useful, testable, and a little better each time.'}
        </p>
      </header>
      <section id="evidence-title" aria-labelledby="featured-heading" className="editorial-section">
        <div className="section-heading">
          <h2 id="featured-heading">{zh ? '代表项目' : 'Selected experiments'}</h2>
          <span className="eyebrow">01 — {String(featured.length).padStart(2, '0')}</span>
        </div>
        <div className="case-grid project-cases">
          {featured.map((project, index) => (
            <ProjectCase
              key={project.title.en}
              project={project}
              index={index}
              detailed
              evidence={projectEvidence.find((entry) => entry.repo === project.repo)}
            />
          ))}
        </div>
        <p className="evidence-review-note">
          {zh
            ? '证据核对于 2026.10.06，链接固定到核对时的公开版本。未重新运行各项目测试；测试链接用于展示覆盖设计，不代表生产验收。'
            : 'Evidence reviewed Oct 6, 2026; links are pinned to public revisions. Project tests were not rerun; test links show coverage design, not production acceptance.'}
        </p>
      </section>
      <section aria-labelledby="archive-heading" className="editorial-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{zh ? '更多探索' : 'FROM THE ARCHIVE'}</p>
            <h2 id="archive-heading">{zh ? '其他项目与协作' : 'Other builds & collaborations'}</h2>
          </div>
        </div>
        <ProjectArchive projects={other} />
      </section>
    </div>
  );
}
