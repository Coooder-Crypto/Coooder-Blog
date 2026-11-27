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
      <p className="evidence-inline-note">
        <strong>{zh ? '边界：' : 'Boundary: '}</strong>
        {evidence.boundary[language]}
      </p>
      {evidence.screenshot && (
        <details
          className="evidence-details evidence-screenshot"
          onToggle={(event) => setShowScreenshot(event.currentTarget.open)}
        >
          <summary>{zh ? '查看界面留档' : 'Archived UI capture'}</summary>
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
