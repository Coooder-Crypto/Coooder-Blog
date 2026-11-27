'use client';

import Link from '@/components/ui/Link';
import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import type { Project } from '@/types/data';
import { useLanguage } from '@/lib/i18n';

export default function ProjectArchive({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <ul className="quiet-archive-list">
      {projects.map((project) => {
        const primaryHref = project.url || (project.repo ? `https://github.com/${project.repo}` : null);
        const linkLabel = project.url ? (zh ? '访问' : 'Live') : project.repo ? 'GitHub' : null;
        const primaryTech = project.builtWith.slice(0, 2).join(' · ');

        return (
          <li key={project.title.en} className="quiet-archive-row">
            {primaryHref ? (
              <Link href={primaryHref} className="quiet-archive-link">
                <span className="quiet-archive-title">{project.title[language]}</span>
                <span className="quiet-archive-meta">
                  <span className="quiet-archive-tech">{primaryTech}</span>
                  {linkLabel && (
                    <span className="quiet-archive-action">
                      {linkLabel}
                      <PixelArrowUpRight size={11} />
                    </span>
                  )}
                </span>
              </Link>
            ) : (
              <div className="quiet-archive-link">
                <span className="quiet-archive-title">{project.title[language]}</span>
                <span className="quiet-archive-meta">
                  <span className="quiet-archive-tech">{primaryTech}</span>
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
