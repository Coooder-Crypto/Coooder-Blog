'use client';

import { useState, type ReactNode } from 'react';
import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';
import Link from '@/components/ui/Link';
import PixelCoverMark from '@/components/ui/PixelCoverMark';
import {
  PixelArrowRight,
  PixelArrowUpRight,
  PixelCheck,
  PixelChevronDown,
  PixelClock,
  PixelCopy,
  PixelCpu,
  PixelDatabase,
  PixelGithub,
  PixelGraph,
  PixelHeart,
  PixelMail,
  PixelPin,
  PixelShip,
  PixelTerminal,
  PixelVerified,
  PixelX,
} from '@/components/ui/PixelIcons';
import { experiences } from '@/data/experienceData';
import projectsData from '@/data/projectsData';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';

function formatShortDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso.slice(0, 10);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function projectEmblem(name: string): ReactNode {
  switch (name) {
    case 'Vital Agent Sync':
      return <PixelHeart size={15} />;
    case 'MemTable':
      return <PixelDatabase size={15} />;
    case 'AI Capital Map':
      return <PixelGraph size={15} />;
    default:
      return <PixelCpu size={15} />;
  }
}

const companyCodes: Record<string, string> = {
  'ant-group': 'ANT',
  bytedance: 'BD',
  weex: 'WX',
  circuit: 'CR',
  thunderbit: 'TB',
  longjingshi: 'LJ',
};

const HARNESS_ASCII = [
  '┌───────────┐     ┌───────────┐     ┌──────────────┐',
  '│  CONTEXT  │ ──▶ │ EXECUTION │ ──▶ │ VERIFICATION │',
  '└─────▲─────┘     └───────────┘     └──────┬───────┘',
  '      └──────────  jarvis-brain  ◀─────────┘',
].join('\n');

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const publicPosts = posts.filter((post) => !post.draft);
  const featured = projectsData.filter((project) => project.type === 'featured').slice(0, 3);
  const latest = publicPosts.slice(0, 6);

  const [pixelAvatar, setPixelAvatar] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(featured[0]?.title.en ?? null);
  const [openExp, setOpenExp] = useState<string | null>(experiences[0]?.id ?? null);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(siteMetadata.email).catch(() => {});
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1600);
  };

  return (
    <div className="chanhdai-pixel-home">
      {/* 1. Signature Dot-Matrix Pixel + ASCII Cover Banner */}
      <div className="screen-line-bottom">
        <PixelCoverMark />
      </div>

      {/* 2. Profile Identity Row */}
      <section className="profile-header-row screen-line-bottom" aria-labelledby="home-heading">
        <div className="profile-avatar-cell">
          <button
            type="button"
            className={`profile-avatar-frame ${pixelAvatar ? 'is-pixelated' : ''}`}
            onClick={() => setPixelAvatar((prev) => !prev)}
            title={zh ? '点击切换 1-bit 像素风格' : 'Click to toggle 1-bit pixel filter'}
            aria-label={zh ? '切换头像像素效果' : 'Toggle avatar pixel filter'}
          >
            <img src={siteMetadata.image} alt="Coooder" width={88} height={88} />
            {pixelAvatar && (
              <span className="pixel-avatar-badge" aria-hidden="true">
                1-BIT
              </span>
            )}
          </button>
        </div>

        <div className="profile-identity-cell">
          <div className="profile-status-strip">
            <span className="terminal-prompt">
              <span className="prompt-caret">&gt;</span> coooder@space:~$ whoami
            </span>
            <span className="profile-sprite" title="coooder.space" aria-hidden="true">
              <PixelShip size={14} />
            </span>
          </div>
          <div className="profile-name-row">
            <h1 id="home-heading">Coooder</h1>
            <PixelVerified size={16} className="pixel-verified-icon" />
          </div>
          <p className="profile-role-row">
            {zh
              ? '做可验证的 Agent 系统，也写一线工程笔记。'
              : 'Building verifiable agent systems and writing field notes.'}
          </p>
        </div>
      </section>

      {/* 3. Two-Column Pixel Icon Metadata Grid */}
      <ul className="pixel-meta-grid" aria-label={zh ? '基本信息与链接' : 'Profile metadata and links'}>
        <li className="pixel-meta-item">
          <span className="pixel-meta-icon">
            <PixelTerminal size={13} />
          </span>
          <span>{zh ? 'AI Agent & 全栈工程师' : 'AI Agent & Fullstack Engineer'}</span>
        </li>
        <li className="pixel-meta-item">
          <span className="pixel-meta-icon">
            <PixelPin size={13} />
          </span>
          <span>{zh ? '北京 / 杭州 · BUPT' : 'Beijing / Hangzhou · BUPT'}</span>
        </li>
        <li className="pixel-meta-item">
          <span className="pixel-meta-icon">
            <PixelMail size={13} />
          </span>
          <button type="button" className="pixel-meta-copy" onClick={handleCopyEmail}>
            <span>{siteMetadata.email}</span>
            {copiedEmail ? <PixelCheck size={12} /> : <PixelCopy size={12} />}
          </button>
        </li>
        <li className="pixel-meta-item">
          <span className="pixel-meta-icon">
            <PixelClock size={13} />
          </span>
          <Link href="/now">
            {zh ? '现在在做 · 2026.11' : 'Now · Nov 2026'}
            <PixelArrowRight size={11} />
          </Link>
        </li>
        <li className="pixel-meta-item">
          <span className="pixel-meta-icon">
            <PixelGithub size={13} />
          </span>
          <Link href={siteMetadata.github}>
            github.com/Coooder-Crypto
            <PixelArrowUpRight size={11} />
          </Link>
        </li>
        <li className="pixel-meta-item">
          <span className="pixel-meta-icon">
            <PixelX size={13} />
          </span>
          <Link href={siteMetadata.twitter}>
            x.com/Coooder_Crypto
            <PixelArrowUpRight size={11} />
          </Link>
        </li>
      </ul>

      <div className="pixel-divider" aria-hidden="true" />

      {/* 4. About + Minimal RFC-style ASCII Loop */}
      <section aria-labelledby="about-heading">
        <div className="grid-section-head">
          <h2 id="about-heading" className="grid-section-title">
            <span className="section-idx" aria-hidden="true">
              [01]
            </span>
            {zh ? '关于' : 'About'}
          </h2>
          <Link href="/about" className="grid-section-more">
            <span>{zh ? '完整档案' : 'Dossier'}</span>
            <PixelArrowRight size={12} />
          </Link>
        </div>
        <div className="grid-about-body">
          <p>
            {zh ? (
              <>
                我是 <strong>Coooder</strong>，专注 <strong>Agent Harness</strong>（Context / Execution /
                Verification）、本地优先个人系统 <strong>Jarvis</strong>{' '}
                与全栈开发者工具。相信好的工程系统应当先建验证闭环，再放 Agent 进入执行链。
              </>
            ) : (
              <>
                I&apos;m <strong>Coooder</strong>, focused on <strong>Agent Harnesses</strong> (Context / Execution /
                Verification), my local-first personal stack <strong>Jarvis</strong>, and fullstack developer tools. I
                believe reliable systems start with deterministic verification loops before inviting agents in.
              </>
            )}
          </p>
          <p>
            {zh ? (
              <>
                这里沉淀公开可验证的开源项目、源码拆解与近期思考；屏幕之外，我也打独立游戏、刷爬塔与 CS2。更多近期主线见{' '}
                <Link href="/now">/now</Link>，研究文献整理见 <Link href="/library">/library</Link>。
              </>
            ) : (
              <>
                This site gathers public builds with pinned source evidence, source breakdowns, and essays. Off the
                clock, I play indie games, climb the Spire, and play CS2. See <Link href="/now">/now</Link> for current
                threads or <Link href="/library">/library</Link> for curated papers.
              </>
            )}
          </p>

          <figure className="ascii-blueprint" aria-label={zh ? 'Agent Harness 闭环示意' : 'Agent Harness loop diagram'}>
            <pre>{HARNESS_ASCII}</pre>
            <figcaption>FIG.01 // VERIFIABLE AGENT LOOP</figcaption>
          </figure>
        </div>
      </section>

      <div className="pixel-divider" aria-hidden="true" />

      {/* 5. Selected Projects (Collapsible Architectural Accordion) */}
      <section aria-labelledby="projects-heading">
        <div className="grid-section-head">
          <h2 id="projects-heading" className="grid-section-title">
            <span className="section-idx" aria-hidden="true">
              [02]
            </span>
            {zh ? '项目' : 'Projects'}
            <span className="grid-section-count">0{featured.length + 1}</span>
          </h2>
          <Link href="/projects" className="grid-section-more">
            <span>{zh ? '全部与源码证据' : 'All & evidence'}</span>
            <PixelArrowRight size={12} />
          </Link>
        </div>

        <ul className="accordion-list">
          {featured.map((project) => {
            const key = project.title.en;
            const isOpen = openProject === key;
            return (
              <li key={key} className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenProject(isOpen ? null : key)}
                >
                  <span className="pixel-emblem-box">{projectEmblem(key)}</span>
                  <div className="accordion-heading">
                    <div className="accordion-title-line">
                      <span className="accordion-title">{project.title[language]}</span>
                    </div>
                    {project.description?.[language] && (
                      <p className="accordion-subtitle">{project.description[language]}</p>
                    )}
                  </div>
                  <span className="accordion-right">
                    <PixelChevronDown size={14} className={`accordion-chevron ${isOpen ? 'is-open' : ''}`} />
                  </span>
                </button>
                {isOpen && (
                  <div className="accordion-body">
                    {project.outcome && <p className="accordion-desc">{project.outcome[language]}</p>}
                    <div className="pixel-tag-row">
                      {project.builtWith.slice(0, 4).map((tech) => (
                        <span key={tech} className="pixel-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="accordion-links">
                      {project.url && (
                        <Link href={project.url} className="text-link">
                          <span>{zh ? '在线访问' : 'Live'}</span>
                          <PixelArrowUpRight size={12} />
                        </Link>
                      )}
                      {project.repo && (
                        <Link href={`https://github.com/${project.repo}`} className="text-link">
                          <span>GitHub</span>
                          <PixelArrowUpRight size={12} />
                        </Link>
                      )}
                      <Link href="/projects" className="text-link">
                        <span>{zh ? '源码证据' : 'Evidence'}</span>
                        <PixelArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}

          {/* Jarvis Private Stack Row */}
          <li className="accordion-item">
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={openProject === 'Jarvis'}
              onClick={() => setOpenProject(openProject === 'Jarvis' ? null : 'Jarvis')}
            >
              <span className="pixel-emblem-box">
                <PixelCpu size={15} />
              </span>
              <div className="accordion-heading">
                <div className="accordion-title-line">
                  <span className="accordion-title">Jarvis</span>
                </div>
                <p className="accordion-subtitle">
                  {zh
                    ? '部署在自有常驻节点上的本地优先个人 Agent 与 Obsidian 第二大脑。'
                    : 'Private local-first personal agent stack & Git-backed Obsidian second brain.'}
                </p>
              </div>
              <span className="accordion-right">
                <PixelChevronDown
                  size={14}
                  className={`accordion-chevron ${openProject === 'Jarvis' ? 'is-open' : ''}`}
                />
              </span>
            </button>
            {openProject === 'Jarvis' && (
              <div className="accordion-body">
                <p className="accordion-desc">
                  {zh
                    ? '将上游 Hermes 运行时与配置、数据管道及 Obsidian 第二大脑完全解耦；敏感数据硬隔离，仅通过受控 CLI 与只读双模型研究管道交互。'
                    : 'Decouples upstream Hermes runtime from prompts, controlled Postgres summaries, and an Obsidian second brain with strict privacy boundaries.'}
                </p>
                <div className="pixel-tag-row">
                  {['Local-First', 'Hermes', 'Obsidian', 'Private Host'].map((tag) => (
                    <span key={tag} className="pixel-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="accordion-links">
                  <Link href="/projects#jarvis-system" className="text-link">
                    <span>{zh ? '架构原则' : 'Architecture'}</span>
                    <PixelArrowRight size={12} />
                  </Link>
                  <Link href="/blog/repo-may-no-longer-be-source-of-truth" className="text-link">
                    <span>{zh ? '设计长文' : 'Essay'}</span>
                    <PixelArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            )}
          </li>
        </ul>
      </section>

      <div className="pixel-divider" aria-hidden="true" />

      {/* 6. Experience (ChanhDai-Style Collapsible Timeline) */}
      <section aria-labelledby="experience-heading">
        <div className="grid-section-head">
          <h2 id="experience-heading" className="grid-section-title">
            <span className="section-idx" aria-hidden="true">
              [03]
            </span>
            {zh ? '经历' : 'Experience'}
            <span className="grid-section-count">0{experiences.length}</span>
          </h2>
          <Link href="/about#experience" className="grid-section-more">
            <span>{zh ? '含教育背景' : 'Full timeline'}</span>
            <PixelArrowRight size={12} />
          </Link>
        </div>

        <ul className="accordion-list">
          {experiences.map((exp) => {
            const isOpen = openExp === exp.id;
            return (
              <li key={exp.id} className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenExp(isOpen ? null : exp.id)}
                >
                  <span className="pixel-emblem-box pixel-emblem-mono">{companyCodes[exp.id] ?? 'EX'}</span>
                  <div className="accordion-heading">
                    <div className="accordion-title-line">
                      <span className="accordion-title">{exp.company[language]}</span>
                    </div>
                    <p className="accordion-subtitle">{exp.role[language]}</p>
                  </div>
                  <span className="accordion-right">
                    <span className="accordion-period">{exp.period[language]}</span>
                    <PixelChevronDown size={14} className={`accordion-chevron ${isOpen ? 'is-open' : ''}`} />
                  </span>
                </button>
                {isOpen && (
                  <div className="accordion-body">
                    <p className="accordion-desc">
                      {exp.team[language]} — {exp.summary[language]}
                    </p>
                    <div className="pixel-tag-row">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="pixel-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="pixel-divider" aria-hidden="true" />

      {/* 7. Writing */}
      <section aria-labelledby="writing-heading">
        <div className="grid-section-head">
          <h2 id="writing-heading" className="grid-section-title">
            <span className="section-idx" aria-hidden="true">
              [04]
            </span>
            {zh ? '写作' : 'Writing'}
            <span className="grid-section-count">{String(publicPosts.length).padStart(2, '0')}</span>
          </h2>
          <Link href="/blog" className="grid-section-more">
            <span>{zh ? '全部文章' : 'All posts'}</span>
            <PixelArrowRight size={12} />
          </Link>
        </div>

        <ul className="grid-writing-list">
          {latest.map((post) => {
            const { title } = getLocalizedBlogContent(post, language);
            return (
              <li key={post.slug} className="grid-writing-item">
                <Link href={`/blog/${post.slug}`} className="grid-writing-link">
                  <span className="grid-writing-title">{title}</span>
                  <span className="grid-writing-right">
                    <time dateTime={post.date}>{formatShortDate(post.date)}</time>
                    <PixelArrowUpRight size={12} className="grid-writing-arrow" />
                  </span>
                </Link>
              </li>
            );
          })}
          {!latest.length && (
            <li className="empty-note">{zh ? '新的记录正在路上。' : 'New notes are on the way.'}</li>
          )}
        </ul>
      </section>
    </div>
  );
}
