'use client';

import projectsData from '@/data/projectsData';
import ProjectCase from '@/components/project/ProjectCase';
import ProjectEvidence from '@/components/project/ProjectEvidence';
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
      <section aria-labelledby="featured-heading" className="editorial-section">
        <div className="section-heading">
          <h2 id="featured-heading">{zh ? '代表项目' : 'Selected experiments'}</h2>
          <span className="eyebrow">01 — {String(featured.length).padStart(2, '0')}</span>
        </div>
        <div className="case-grid">
          {featured.map((project, index) => (
            <ProjectCase key={project.title.en} project={project} index={index} detailed />
          ))}
        </div>
      </section>
      <ProjectEvidence />
      <section aria-labelledby="archive-heading" className="editorial-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{zh ? '更多探索' : 'FROM THE ARCHIVE'}</p>
            <h2 id="archive-heading">{zh ? '其他项目与协作' : 'Other builds & collaborations'}</h2>
          </div>
        </div>
        <div className="project-archive">
          {other.map((project, index) => (
            <ProjectCase key={project.title.en} project={project} index={featured.length + index} detailed />
          ))}
        </div>
      </section>
    </div>
  );
}
