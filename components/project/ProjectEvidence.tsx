'use client';

import { useState } from 'react';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';
import type { ProjectEvidenceRecord } from '@/data/projectEvidence';

export default function ProjectEvidence({ evidence }: { evidence: ProjectEvidenceRecord }) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const [showScreenshot, setShowScreenshot] = useState(false);
  return (
    <div className="case-evidence">
      <ul className="evidence-sources" aria-label={`${evidence.title} — ${zh ? '公开证据' : 'Public evidence'}`}>
        {evidence.sources.map((source) => (
          <li key={source.path}>
            <Link
              href={`https://github.com/${evidence.repo}/blob/${evidence.revision}/${source.path}`}
              className="text-link"
            >
              {source.label[language]} ↗
            </Link>
          </li>
        ))}
      </ul>
      <details className="evidence-details">
        <summary>{zh ? '实现细节与当前边界' : 'Implementation and current boundaries'}</summary>
        <dl>
          <div>
            <dt>{zh ? '实现了什么' : 'What is implemented'}</dt>
            <dd>{evidence.implementation[language]}</dd>
          </div>
          <div>
            <dt>{zh ? '当前边界' : 'Current boundaries'}</dt>
            <dd>{evidence.boundary[language]}</dd>
          </div>
        </dl>
      </details>
      {evidence.screenshot && (
        <details
          className="evidence-details evidence-screenshot"
          onToggle={(event) => setShowScreenshot(event.currentTarget.open)}
        >
          <summary>
            {zh ? '查看演示截图' : 'View demo screenshot'} <span>{evidence.title}</span>
          </summary>
          {showScreenshot && (
            <figure>
              <Zoom a11yNameButtonZoom={`${zh ? '放大截图' : 'Enlarge screenshot'} — ${evidence.title}`}>
                <Image
                  src={evidence.screenshot.src}
                  width={evidence.screenshot.width}
                  height={evidence.screenshot.height}
                  alt={evidence.screenshot.alt[language]}
                  loading="lazy"
                  unoptimized
                />
              </Zoom>
              <figcaption>{evidence.screenshot.caption[language]}</figcaption>
            </figure>
          )}
        </details>
      )}
    </div>
  );
}
