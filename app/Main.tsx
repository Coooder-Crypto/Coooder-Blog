'use client';

import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import Link from '@/components/ui/Link';
import ProjectCase from '@/components/project/ProjectCase';
import projectsData from '@/data/projectsData';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';
import { getLocalizedBlogContent } from '@/lib/blogUtils';

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const featured = projectsData.filter((project) => project.type === 'featured').slice(0, 3);
  const latest = posts.filter((post) => !post.draft).slice(0, 3);

  return (
    <div className="field-home">
      <div className="edition-line">
        <span>{zh ? '一个开发者的持续探索' : 'AN INDEPENDENT CORNER OF THE INTERNET'}</span>
        <span>
          BEIJING, CN <span aria-hidden="true">↗</span>
        </span>
      </div>
      <section className="studio-hero" aria-labelledby="home-heading">
        <figure className="studio-portrait">
          <Image
            src="/static/images/studio/workshop-comic.webp"
            alt={
              zh
                ? '鲜艳的美漫工作室：开发者与小机器人一起动手构建'
                : 'A vibrant comic-book developer and robot building together in their workshop'
            }
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="comic-sticker" aria-hidden="true">
            {zh ? '动手开造！' : 'LET’S BUILD!'}
          </span>
          <figcaption>
            <span>FIG. 01 — {zh ? '一直在构建' : 'ALWAYS A WORK IN PROGRESS'}</span>
            <span aria-hidden="true">✳︎</span>
          </figcaption>
        </figure>
        <div className="studio-intro">
          <p className="eyebrow">{zh ? '全栈工程师 / AGENT 探索者' : 'FULLSTACK ENGINEER / AGENT EXPLORER'}</p>
          <h1 id="home-heading">
            <span className="hero-greeting">{zh ? '嘿！我是' : 'HEY! I’M'}</span>
            <br />
            <span className="hero-name">
              Coooder<span className="rust-dot">!</span>
            </span>
          </h1>
          <p className="hero-statement">
            {zh ? (
              <>
                <span className="block">把好奇心，</span>
                <span className="block">做成真正有用的东西。</span>
              </>
            ) : (
              'Turning curiosity into things that work.'
            )}
          </p>
          <p className="hero-description">
            {zh
              ? '我构建 AI Agent、开发者工具与实用的软件系统。这里记录我的实验、踩坑，以及一路学到的东西。'
              : 'I build AI agents, developer tools, and practical software. This is where I share the experiments, the loose ends, and what I learn along the way.'}
          </p>
          <div className="studio-actions">
            <Link className="ink-button" href="/projects">
              {zh ? '看看我的项目' : 'Explore my work'} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/about">
              {zh ? '更多关于我' : 'A little about me'} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="studio-note">
            <span className="note-star" aria-hidden="true">
              ✳︎
            </span>
            <p>{zh ? '保持好奇。认真构建。持续验证。' : 'Stay curious. Build thoughtfully. Keep testing.'}</p>
          </div>
        </div>
      </section>
      <div className="interlude">
        <span>{zh ? '动手构建 / 大胆试错 / 继续探索' : 'BUILD. BREAK. LEARN. REPEAT.'}</span>
        <ArrowDown size={16} aria-hidden="true" />
      </div>

      <section className="editorial-section" aria-labelledby="work-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / {zh ? '构建' : 'THE WORKBENCH'}</p>
            <h2 id="work-heading">{zh ? '一些认真做的东西' : 'Selected experiments'}</h2>
          </div>
          <Link href="/projects" className="text-link">
            {zh ? '全部项目' : 'All projects'} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="case-grid">
          {featured.map((project, index) => (
            <ProjectCase key={project.title.en} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="editorial-section writing-section" aria-labelledby="writing-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / {zh ? '记录' : 'FIELD NOTES'}</p>
            <h2 id="writing-heading">{zh ? '从实践里写下来' : 'Notes from the process'}</h2>
          </div>
          <Link href="/blog" className="text-link">
            {zh ? '所有文章' : 'All writing'} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="writing-list">
          {latest.map((post, index) => {
            const { title, summary } = getLocalizedBlogContent(post, language);
            return (
              <article className="writing-row" key={post.slug}>
                <span className="writing-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <div className="writing-meta">
                    <time dateTime={post.date}>{formatDate(post.date, zh ? 'zh-CN' : 'en-US')}</time>
                    <span>{post.tags?.[0]}</span>
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
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
          {!latest.length && <p className="empty-note">{zh ? '新的记录正在路上。' : 'New notes are on the way.'}</p>}
        </div>
      </section>
      <aside className="studio-signoff">
        <p>{zh ? '好东西，值得一起琢磨。' : 'Good things start with a conversation.'}</p>
        <Link href={siteMetadata.github} className="text-link">
          GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
