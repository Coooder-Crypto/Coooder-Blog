'use client';

import { ArrowUpRight, Search } from 'lucide-react';
import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import Link from '@/components/ui/Link';
import ProjectCase from '@/components/project/ProjectCase';
import JarvisSpotlight from '@/components/project/JarvisSpotlight';
import HarnessLab from '@/components/homepage/HarnessLab';
import GamingShelf from '@/components/gaming/GamingShelf';
import { BeijingClock, ParallaxPlate, Reveal } from '@/components/ui/EditorialMotion';
import { HeroHarnessSvg } from '@/components/ui/EditorialDiagrams';
import { OPEN_PALETTE_EVENT } from '@/components/ui/CommandPalette';
import projectsData from '@/data/projectsData';
import { researchRadarItems } from '@/data/researchRadar';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const publicPosts = posts.filter((post) => !post.draft);
  const featured = projectsData.filter((project) => project.type === 'featured').slice(0, 3);
  const latest = publicPosts.slice(0, 4);

  return (
    <div className="field-home">
      <div className="edition-line">
        <span>39°54&apos;N · 116°24&apos;E</span>
        <span className="edition-center">EDITION 2026 · AI-NATIVE ENGINEERING</span>
        <BeijingClock />
      </div>

      <section className="awwwards-hero" aria-labelledby="home-heading">
        <Reveal className="hero-masthead">
          <p className="eyebrow hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            {zh ? 'AGENT HARNESS · LOCAL-FIRST SYSTEMS · FULLSTACK' : 'AGENT HARNESS · LOCAL-FIRST SYSTEMS · FULLSTACK'}
          </p>
          <h1 id="home-heading" className="hero-monumental">
            {zh ? (
              <>
                为 <em className="display-serif">Agent</em> 原生时代，构建
                <span className="accent-zh">可验证</span>的工程系统<span className="rust-dot">.</span>
              </>
            ) : (
              <>
                Building <em className="display-serif">verifiable</em> systems for AI-native{' '}
                <em className="display-serif">engineering</em>
                <span className="rust-dot">.</span>
              </>
            )}
          </h1>
          <div className="hero-subrow">
            <p className="hero-description">
              {zh
                ? '我是 Coooder，专注 Agent Harness（Context / Execution / Verification）、本地优先个人系统 Jarvis 与全栈开发者工具。这里沉淀一手实证测量、源码拆解与经得起检验的软件系统。'
                : 'I’m Coooder—focused on Agent Harnesses (Context / Execution / Verification), the local-first Jarvis stack, and developer tools. This studio collects empirical measurements, source breakdowns, and verifiable software.'}
            </p>
            <div className="studio-actions">
              <Link className="ink-button" href="/projects">
                {zh ? '查看项目与证据' : 'Explore builds'} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link className="secondary-button" href="/blog/ai-native-engineering-design-for-agents">
                {zh ? '阅读工程宣言' : 'Read thesis'} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="hero-stage">
          <div className="hero-stage-visual">
            <div className="stage-bar">
              <span>FIG. 01 — AGENT HARNESS ARCHITECTURE</span>
              <span>CONTEXT / EXECUTION / VERIFICATION</span>
            </div>
            <ParallaxPlate className="hero-editorial-plate">
              <HeroHarnessSvg />
            </ParallaxPlate>
          </div>

          <aside className="hero-spec-panel" aria-label={zh ? '工作室索引' : 'Studio index'}>
            <div className="hero-spec-header">
              <span>STUDIO INDEX</span>
              <span className="hero-spec-status">
                <span className="status-dot" aria-hidden="true" />
                {zh ? '持续更新' : 'LIVE'}
              </span>
            </div>
            <ul className="hero-spec-list">
              <li>
                <span className="hero-spec-key">01 · CURRENT FOCUS</span>
                <p className="hero-spec-value">
                  <strong>{zh ? 'Agent Harness & Local-First' : 'Agent Harness & Local-First'}</strong> —{' '}
                  {zh
                    ? '先建验证闭环，再放 Agent 进入执行链。'
                    : 'Build deterministic verification loops before inviting agents in.'}
                </p>
              </li>
              <li>
                <span className="hero-spec-key">02 · ARCHIVE METRICS</span>
                <div className="studio-stat-row">
                  <Link href="/blog" className="studio-stat-cell">
                    <strong className="display-serif">{publicPosts.length}</strong>
                    <span>{zh ? '公开文章' : 'Essays'}</span>
                  </Link>
                  <Link href="/library" className="studio-stat-cell">
                    <strong className="display-serif">{researchRadarItems.length}</strong>
                    <span>{zh ? '研究文献' : 'Papers'}</span>
                  </Link>
                  <Link href="/projects" className="studio-stat-cell">
                    <strong className="display-serif">{featured.length}</strong>
                    <span>{zh ? '源码证据' : 'Evidence'}</span>
                  </Link>
                </div>
              </li>
              <li>
                <span className="hero-spec-key">03 · QUICK COMMAND</span>
                <button
                  type="button"
                  className="hero-cmd-btn"
                  onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
                >
                  <Search size={14} aria-hidden="true" />
                  <span>{zh ? '全局检索文章、论文或切主题' : 'Search essays, papers, or toggle theme'}</span>
                  <span className="cmd-key-group" aria-hidden="true">
                    <kbd>⌘</kbd>
                    <kbd>K</kbd>
                  </span>
                </button>
              </li>
            </ul>
          </aside>
        </Reveal>
      </section>

      <Reveal>
        <HarnessLab />
      </Reveal>

      <section className="editorial-section" aria-labelledby="work-heading">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / {zh ? '代表项目' : 'SELECTED BUILDS'}</p>
              <h2 id="work-heading">
                {zh ? (
                  <>
                    附公开源码证据的<span className="accent-zh">代表构建</span>
                  </>
                ) : (
                  <>
                    Selected builds with <em className="display-serif">public evidence</em>
                  </>
                )}
              </h2>
            </div>
            <Link href="/projects" className="text-link">
              {zh ? '全部项目与证据' : 'All projects'} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="case-grid asymmetric-gallery">
          {featured.map((project, index) => (
            <Reveal key={project.title.en} delay={index * 0.08} className={index === 0 ? 'case-lead-wrap' : ''}>
              <ProjectCase project={project} index={index} featuredLead={index === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <JarvisSpotlight compact />
      </Reveal>

      <section className="editorial-section writing-section" aria-labelledby="writing-heading">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / {zh ? '近期文章' : 'FIELD NOTES'}</p>
              <h2 id="writing-heading">
                {zh ? (
                  <>
                    从实践与测量里<span className="accent-zh">写下来</span>
                  </>
                ) : (
                  <>
                    Notes from <em className="display-serif">building &amp; measuring</em>
                  </>
                )}
              </h2>
            </div>
            <Link href="/blog" className="text-link">
              {zh ? '所有文章' : 'All writing'} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="writing-list">
            {latest.map((post, index) => {
              const { title, summary } = getLocalizedBlogContent(post, language);
              return (
                <article className="writing-row" key={post.slug}>
                  <span className="writing-number display-serif" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="writing-meta">
                      <time dateTime={post.date}>{formatDate(post.date, zh ? 'zh-CN' : 'en-US')}</time>
                      {post.tags?.[0] && <span>{post.tags[0]}</span>}
                    </div>
                    <h3>
                      <Link href={`/blog/${post.slug}`}>{title}</Link>
                    </h3>
                    <p>{summary}</p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="round-arrow"
                    aria-label={`${zh ? '阅读' : 'Read'}: ${title}`}
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
            {!latest.length && <p className="empty-note">{zh ? '新的记录正在路上。' : 'New notes are on the way.'}</p>}
          </div>
        </Reveal>
      </section>

      <Reveal>
        <GamingShelf />
      </Reveal>

      <Reveal>
        <aside className="studio-signoff">
          <div>
            <span className="eyebrow">OPEN FOR CONVERSATION</span>
            <p>
              {zh ? (
                <>
                  好系统，值得认真拆解与<span className="accent-zh">一起琢磨</span>
                  <span className="rust-dot">.</span>
                </>
              ) : (
                <>
                  Let’s build something <em className="display-serif">verifiable</em>
                  <span className="rust-dot">.</span>
                </>
              )}
            </p>
          </div>
          <div className="signoff-actions">
            <Link href="/about#connect" className="ink-button">
              {zh ? '认识我 & 联系' : 'About & Connect'} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href={siteMetadata.github} className="secondary-button">
              GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}
