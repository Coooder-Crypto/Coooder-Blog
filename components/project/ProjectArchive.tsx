'use client';

import Link from '@/components/ui/Link';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';

export default function ProjectArchive({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();
  return (
    <ul className="project-archive-list">
      {projects.map((project) => (
        <li key={project.title.en}>
          <div>
            <h3>{project.title[language]}</h3>
            <p>{project.description?.[language]}</p>
            <span className="archive-technologies">{project.builtWith.join(' / ')}</span>
          </div>
          <div className="archive-links">
            {project.url && (
              <Link
                href={project.url}
                aria-label={`${project.title[language]} — ${language === 'zh' ? '访问网站' : 'Visit website'}`}
              >
                {language === 'zh' ? '网站' : 'Website'} ↗
              </Link>
            )}
            {project.repo && (
              <Link
                href={`https://github.com/${project.repo}`}
                aria-label={`${project.title[language]} — ${language === 'zh' ? '查看源码' : 'View source'}`}
              >
                {language === 'zh' ? '源码' : 'Source'} ↗
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
