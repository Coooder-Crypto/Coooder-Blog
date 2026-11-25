'use client';

import { ArrowUpRight } from 'lucide-react';
import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import Link from '@/components/ui/Link';
import ProjectCase from '@/components/project/ProjectCase';
import JarvisSpotlight from '@/components/project/JarvisSpotlight';
import HarnessLab from '@/components/homepage/HarnessLab';
import GamingShelf from '@/components/gaming/GamingShelf';
import { BeijingClock, KineticTicker, ParallaxPlate, Reveal } from '@/components/ui/EditorialMotion';
import { HeroHarnessSvg } from '@/components/ui/EditorialDiagrams';
import projectsData from '@/data/projectsData';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const featured = projectsData.filter((project) => project.type === 'featured').slice(0, 3);
  const latest = posts.filter((post) => !post.draft).slice(0, 4);

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
                为 <em className="display-serif">Agent</em> 原生时代，
                <br />
                构建<em className="display-serif">可验证</em>的工程系统<span className="rust-dot">.</span>
              </>
            ) : (
              <>
                Building <em className="display-serif">verifiable</em> systems
                <br />
                for AI-native <em className="display-serif">engineering</em>
                <span className="rust-dot">.</span>
              </>
            )}
          </h1>
          <div className="hero-subrow">
            <p className="hero-description">
              {zh
                ? '我是 Coooder，专注 Agent Harness（Context / Execution / Verification）、本地优先个人系统 Jarvis 与开发者工具。这里沉淀一手实证测量、源码拆解与经得起检验的软件系统。'
                : 'I’m Coooder—focused on Agent Harnesses (Context / Execution / Verification), the local-first Jarvis stack, and developer tools. This studio collects empirical measurements, source breakdowns, and verifiable software.'}
            </p>
            <div className="studio-actions">
              <Link className="ink-button" href="/projects">
                {zh ? '查看项目与证据' : 'Explore verified builds'} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link className="secondary-button" href="/blog/ai-native-engineering-design-for-agents">
                {zh ? '阅读工程宣言' : 'Read thesis'} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="hero-stage">
          <div className="hero-stage-visual">
            <div className="stage-bar">
              <span>FIG. 01 — AGENT HARNESS ARCHITECTURE</span>
              <span>CONTEXT / EXECUTION / VERIFICATION</span>
            </div>
            <ParallaxPlate className="hero-editorial-plate">
              <HeroHarnessSvg />
            </ParallaxPlate>
          </div>

          <aside className="hero-spec-panel" aria-label={zh ? '研究与工程索引' : 'Research & engineering index'}>
            <div className="hero-spec-header">
              <span>FIELD TELEMETRY</span>
              <span className="hero-spec-status">
                <span className="status-dot" aria-hidden="true" />
                {zh ? '持续迭代' : 'ACTIVE'}
              </span>
            </div>
            <ul className="hero-spec-list">
              <li>
                <span className="hero-spec-key">01 · CORE PRINCIPLE</span>
                <p className="hero-spec-value">
                  <strong>{zh ? '先找验证闭环，再放 Agent 进入闭环。' : 'Verification loop before autonomy.'}</strong>{' '}
                  {zh ? 'Delegate · Review · Own。' : 'Delegate · Review · Own.'}
                </p>
              </li>
              <li>
                <span className="hero-spec-key">02 · LIVING SYSTEM</span>
                <p className="hero-spec-value">
                  <strong>Jarvis + jarvis-brain</strong> —{' '}
                  {zh
                    ? '常驻控制节点、受控数据边界与 Obsidian 证据型第二大脑。'
                    : 'Always-on host, controlled data boundaries & Obsidian second brain.'}
                </p>
              </li>
              <li>
                <span className="hero-spec-key">03 · EMPIRICAL RATIO (192.4 MIN)</span>
                <div className="empirical-meter" aria-label="60.7% feedback loop vs 24.0% direct code edits">
                  <div className="empirical-bar-track">
                    <span className="empirical-bar-feedback" style={{ width: '60.7%' }} />
                    <span className="empirical-bar-code" style={{ width: '24%' }} />
                  </div>
                  <div className="empirical-legend">
                    <span>
                      <i className="legend-dot legend-accent" />
                      {zh ? '60.7% 反馈验证' : '60.7% Feedback'}
                    </span>
                    <span>
                      <i className="legend-dot legend-blue" />
                      {zh ? '24.0% 改代码' : '24.0% Edits'}
                    </span>
                  </div>
                </div>
                <Link href="/blog/ai-dev-bottleneck-is-feedback-loop" className="hero-spec-link">
                  {zh ? '查看三栈实证数据' : 'Inspect 3-stack study'} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </aside>
        </Reveal>
      </section>

      <KineticTicker />

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
                    附公开源码证据的<em className="display-serif">代表构建</em>
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
                    从实践与测量里<em className="display-serif">写下来</em>
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
            <span className="eyebrow">{zh ? 'OPEN FOR CONVERSATION' : 'OPEN FOR CONVERSATION'}</span>
            <p>
              {zh ? (
                <>
                  好系统，值得认真拆解与<em className="display-serif">一起琢磨</em>
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
            <Link href={`mailto:${siteMetadata.email}`} className="ink-button">
              {zh ? '发邮件联系' : 'Say hello'} <ArrowUpRight size={15} aria-hidden="true" />
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
