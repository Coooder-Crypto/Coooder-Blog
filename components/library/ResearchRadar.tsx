'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import Link from '@/components/ui/Link';
import {
  researchRadarItems,
  researchTracks,
  type ResearchKind,
  type ResearchTrackKey,
} from '@/data/researchRadar';
import { useLanguage } from '@/lib/i18n';

export default function ResearchRadar() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  const [selectedTrack, setSelectedTrack] = useState<'all' | ResearchTrackKey>('all');
  const [selectedKind, setSelectedKind] = useState<'all' | ResearchKind>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return researchRadarItems.filter((item) => {
      if (selectedTrack !== 'all' && item.track !== selectedTrack) return false;
      if (selectedKind !== 'all' && item.kind !== selectedKind) return false;
      if (!q) return true;
      return `${item.title} ${item.venue} ${item.takeaway.zh} ${item.takeaway.en}`.toLowerCase().includes(q);
    });
  }, [query, selectedKind, selectedTrack]);

  const kindLabels: Record<'all' | ResearchKind, { zh: string; en: string }> = {
    all: { zh: '全部形态', en: 'All formats' },
    paper: { zh: '论文', en: 'Papers' },
    blog: { zh: '工程博客', en: 'Engineering' },
    docs: { zh: '官方文档', en: 'Docs' },
  };

  return (
    <div className="radar-page">
      <header className="editorial-page-heading">
        <p className="eyebrow">{zh ? 'CURATED FROM JARVIS-BRAIN · 文献雷达' : 'CURATED FROM JARVIS-BRAIN · RESEARCH RADAR'}</p>
        <h1>
          {zh ? (
            <>
              Agent Harness <em className="display-serif">研究雷达</em>
              <span className="rust-dot">.</span>
            </>
          ) : (
            <>
              Agent Harness <em className="display-serif">Research Radar</em>
              <span className="rust-dot">.</span>
            </>
          )}
        </h1>
        <p>
          {zh
            ? '持续跟踪 Agent 从“单次 LLM 调用”走向“受控运行系统”的关键论文与工程文献。按系统组件而非热度归类——每一条都落到一个具体工程问题：上下文、执行、验证、编排、安全或可观测性。'
            : 'Tracking the key papers and engineering manuals taking agents from single LLM calls to controlled runtime systems—organized by system layer rather than hype.'}
        </p>
      </header>

      <section className="radar-tracks-overview" aria-label={zh ? '四条研究主线' : 'Four research tracks'}>
        {researchTracks.map((track) => {
          const count = researchRadarItems.filter((item) => item.track === track.key).length;
          const active = selectedTrack === track.key;
          return (
            <button
              key={track.key}
              type="button"
              onClick={() => setSelectedTrack(active ? 'all' : track.key)}
              className={`radar-track-card ${active ? 'active' : ''}`}
              aria-pressed={active}
            >
              <div className="radar-track-top">
                <span className="display-serif">{track.num}</span>
                <span className="eyebrow">{count} ITEMS</span>
              </div>
              <h2>{track.title[language]}</h2>
              <p>{track.description[language]}</p>
            </button>
          );
        })}
      </section>

      <div className="radar-toolbar">
        <div className="radar-search-wrap">
          <Search size={15} className="radar-search-icon" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={zh ? '按标题、机构或关键机制筛选…' : 'Filter by title, venue, or mechanism…'}
            aria-label={zh ? '筛选研究文献' : 'Filter research items'}
            className="radar-search-input"
          />
        </div>
        <div className="radar-filter-pills" role="group" aria-label={zh ? '按文献形态筛选' : 'Filter by format'}>
          {(['all', 'paper', 'blog', 'docs'] as const).map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setSelectedKind(kind)}
              className={`blog-category-tab ${selectedKind === kind ? 'active' : ''}`}
            >
              {kindLabels[kind][language]}
            </button>
          ))}
          {selectedTrack !== 'all' && (
            <button type="button" onClick={() => setSelectedTrack('all')} className="radar-reset-btn">
              {zh ? '重置主线' : 'Reset track'}
            </button>
          )}
        </div>
      </div>

      <p className="radar-status" role="status">
        {zh
          ? `当前显示 ${filtered.length} / ${researchRadarItems.length} 条已核验公开来源（核验于 2026.08，不代表逐篇全量精读）。`
          : `Showing ${filtered.length} of ${researchRadarItems.length} verified public sources (URLs audited Aug 2026).`}
      </p>

      <ol className="radar-list">
        {filtered.map((item, index) => {
          const track = researchTracks.find((t) => t.key === item.track);
          return (
            <li key={item.id} className="radar-row">
              <span className="radar-num display-serif" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="radar-row-main">
                <div className="radar-row-meta">
                  <span className={`radar-kind-badge kind-${item.kind}`}>{item.kind.toUpperCase()}</span>
                  <span>{item.venue}</span>
                  <span>{item.year}</span>
                  {track && <span className="radar-track-pill">{track.title[language]}</span>}
                </div>
                <h3>
                  <Link href={item.url}>
                    {item.title} <ArrowUpRight size={15} className="inline align-text-bottom" aria-hidden="true" />
                  </Link>
                </h3>
                <p>{item.takeaway[language]}</p>
                {item.relatedSlug && item.relatedLabel && (
                  <Link href={`/blog/${item.relatedSlug}`} className="radar-related-link">
                    {item.relatedLabel[language]} <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                )}
              </div>
              <Link href={item.url} className="round-arrow" aria-label={`${zh ? '打开原文' : 'Open source'}: ${item.title}`}>
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="empty-note">{zh ? '没有匹配当前筛选条件的文献。' : 'No matching research items.'}</li>
        )}
      </ol>
    </div>
  );
}
