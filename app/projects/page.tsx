'use client';

import projectsData from '@/data/projectsData';
import ProjectCase from '@/components/project/ProjectCase';
import ProjectArchive from '@/components/project/ProjectArchive';
import JarvisSpotlight from '@/components/project/JarvisSpotlight';
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
            ? '从一个具体问题开始，把想法做成可以使用、验证与改进的系统。每项代表项目都附带核验过的公开源码入口。'
            : 'Starting with a concrete question, turning ideas into useful, verifiable software. Each selected project links to pinned public source revisions.'}
        </p>
      </header>
      <div className="pixel-divider" aria-hidden="true" />
      <section id="evidence-title" aria-labelledby="featured-heading" className="editorial-section">
        <div className="section-heading">
          <h2 id="featured-heading">{zh ? '代表项目' : 'Selected projects'}</h2>
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
            ? '证据核对于 2026.11.26，链接固定到核对时的公开版本。未重新运行各项目测试；测试链接用于展示覆盖设计，不代表生产验收。'
            : 'Evidence reviewed Nov 26, 2026; links are pinned to public revisions. Project tests were not rerun; test links show coverage design, not production acceptance.'}
        </p>
      </section>
      <JarvisSpotlight />
      <div className="pixel-divider" aria-hidden="true" />
      <section aria-labelledby="archive-heading" className="editorial-section">
        <div className="section-heading">
          <h2 id="archive-heading">{zh ? '其他项目与协作' : 'Other builds & collaborations'}</h2>
        </div>
        <ProjectArchive projects={other} />
      </section>
    </div>
  );
}
