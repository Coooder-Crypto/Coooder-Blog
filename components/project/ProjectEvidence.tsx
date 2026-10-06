'use client';

import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';
import { projectEvidence } from '@/data/projectEvidence';

export default function ProjectEvidence() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <section className="project-evidence editorial-section" aria-labelledby="evidence-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{zh ? '公开源码 · 实现证据' : 'PUBLIC CODE · IMPLEMENTATION EVIDENCE'}</p>
          <h2 id="evidence-title">{zh ? '让作品自己说话' : 'A closer look at the work'}</h2>
          <p>
            {zh
              ? '核对于 2026.10.06 · 以下链接固定到核对时的代码版本。'
              : 'Reviewed Oct 6, 2026 · Source links are pinned to the reviewed revisions.'}
          </p>
        </div>
      </div>
      {projectEvidence.map((project) => (
        <article className="evidence-case" key={project.repo}>
          <div className="evidence-heading">
            <h3>{project.title}</h3>
            <span>{project.status[language]}</span>
          </div>
          <div className="evidence-copy">
            <dl>
              <div>
                <dt>{zh ? '实现了什么' : 'What is implemented'}</dt>
                <dd>{project.implementation[language]}</dd>
              </div>
              <div>
                <dt>{zh ? '当前边界' : 'Current boundaries'}</dt>
                <dd>{project.boundary[language]}</dd>
              </div>
            </dl>
            <ul
              className="evidence-sources"
              aria-label={zh ? `${project.title} 公开证据` : `${project.title} public evidence`}
            >
              {project.sources.map((source) => (
                <li key={source.path}>
                  <Link
                    href={`https://github.com/${project.repo}/blob/${project.revision}/${source.path}`}
                    className="text-link"
                  >
                    {source.label[language]} ↗
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {project.screenshot && (
            <figure>
              <Zoom a11yNameButtonZoom={`${zh ? '放大截图' : 'Enlarge screenshot'} — ${project.title}`}>
                <Image
                  src={project.screenshot.src}
                  width={project.screenshot.width}
                  height={project.screenshot.height}
                  alt={project.screenshot.alt[language]}
                  loading="lazy"
                  unoptimized
                />
              </Zoom>
              <figcaption>{project.screenshot.caption[language]}</figcaption>
            </figure>
          )}
        </article>
      ))}
      <p className="evidence-review-note">
        {zh
          ? '说明：以上核对基于公开源码与文档，未重新运行各项目测试；测试链接用于展示覆盖设计，不代表生产验收。'
          : 'Review note: based on public code and documentation, without rerunning project tests. Test links illustrate coverage design, not production acceptance.'}
      </p>
    </section>
  );
}
