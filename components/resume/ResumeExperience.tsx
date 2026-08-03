'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, BookOpen, Github, Sparkles } from 'lucide-react';
import { formatDate } from 'pliny/utils/formatDate';

import { Link } from '@/components/ui';
import projectsData from '@/data/projectsData';
import siteMetadata from '@/data/siteMetadata';
import { getLocalizedBlogContent } from '@/lib/blogUtils';
import { useLanguage } from '@/lib/i18n';

const ResumeScene = dynamic(() => import('./ResumeScene'), {
  ssr: false,
  loading: () => <SceneFallback label="Loading spatial profile" />,
});

const experience = [
  {
    index: '01',
    company: { en: 'ByteDance', zh: '字节跳动' },
    team: { en: 'Data · Monetization Engineering & Large Frontend', zh: 'Data · 变现工程与大前端' },
    role: { en: 'Agent Development Intern', zh: 'Agent 开发实习生' },
    period: { en: 'Nov 2025 — May 2026', zh: '2025.11 — 2026.05' },
    note: {
      en: 'Explored how agents can become dependable parts of real engineering workflows.',
      zh: '探索如何让 Agent 成为真实工程工作流中可靠、可验证的一部分。',
    },
  },
  {
    index: '02',
    company: { en: 'Ant Group', zh: '蚂蚁集团' },
    team: { en: 'Ant Fortune · Financial Insurance Business Group', zh: '蚂蚁财富 · 财保事业群' },
    role: { en: 'Agent Algorithm Intern', zh: 'Agent 算法实习生' },
    period: { en: 'May 2026 — Present', zh: '2026.05 — 至今' },
    note: {
      en: 'Continuing to build and learn at the intersection of agent systems and practical products.',
      zh: '继续在 Agent 系统与真实产品的交叉地带构建、验证与学习。',
    },
  },
] as const;

const copy = {
  en: {
    kicker: 'FULLSTACK ENGINEER · AGENT BUILDER',
    title: 'Hi, I’m Coooder.',
    intro:
      'I build practical AI agents, developer tools, and fullstack systems—with clear context, repeatable execution, and evidence people can trust.',
    scroll: 'Scroll to explore',
    experience: 'Experience',
    experienceIntro: 'A path shaped by building, testing, and turning agent ideas into useful systems.',
    work: 'Selected systems',
    workIntro: 'Three projects that represent how I think about agents, data, and human control.',
    writing: 'Latest writing',
    writingIntro: 'Notes from building, breaking, verifying, and learning in public.',
    projectLink: 'Explore project',
    read: 'Read article',
    ending: 'The interface is only the beginning.',
    endingBody: 'The real work is making complex systems understandable, testable, and genuinely useful.',
    projectsCta: 'View all projects',
    blogCta: 'Read the blog',
    fallback: 'Interactive portrait unavailable',
  },
  zh: {
    kicker: '全栈工程师 · AGENT BUILDER',
    title: '你好，我是 Coooder。',
    intro: '我构建真正可用的 AI Agent、开发者工具与全栈系统：上下文清晰、执行可重复、结果有证据可验证。',
    scroll: '向下滚动探索',
    experience: '经历',
    experienceIntro: '在持续的构建与验证中，把 Agent 的想法变成真实可用的系统。',
    work: '代表项目',
    workIntro: '三个项目，呈现我如何思考 Agent、数据与人的控制权。',
    writing: '最新文章',
    writingIntro: '公开记录构建、踩坑、验证与学习过程中的思考。',
    projectLink: '探索项目',
    read: '阅读文章',
    ending: '界面只是开始。',
    endingBody: '真正重要的是，让复杂系统变得可以理解、可以验证，并且真正有用。',
    projectsCta: '查看所有项目',
    blogCta: '阅读博客',
    fallback: '互动形象暂不可用',
  },
} as const;

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#07101a]">
      <div className="relative h-60 w-60 overflow-hidden rounded-full border border-white/10 bg-white/5 p-5 shadow-2xl">
        <Image
          src="/static/images/avatar.png"
          alt="Coooder"
          fill
          priority
          sizes="240px"
          className="object-cover p-5 opacity-80"
        />
        <span className="absolute inset-x-0 bottom-5 text-center text-[10px] uppercase tracking-[0.24em] text-white/45">
          {label}
        </span>
      </div>
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#07101a]">
      <div className="h-20 w-20 animate-pulse rounded-full border border-cyan-200/30 shadow-[0_0_60px_rgba(34,211,238,0.12)]" />
    </div>
  );
}

function useSceneCapability() {
  const [capability, setCapability] = useState({ ready: false, webgl: false, reducedMotion: false, lowPower: false });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const webgl = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 720;
    setCapability({ ready: true, webgl, reducedMotion, lowPower });
  }, []);

  return capability;
}

export default function ResumeExperience({ posts }: { posts: any[] }) {
  const { language } = useLanguage();
  const text = copy[language];
  const capability = useSceneCapability();
  const featured = projectsData.filter((project) => project.type === 'featured').slice(0, 3);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const sceneOpacity = useTransform(scrollYProgress, [0.82, 0.96], [1, 0.18]);

  return (
    <div className="relative left-1/2 -mt-20 w-screen -translate-x-1/2 overflow-clip bg-[#07101a] text-white selection:bg-cyan-300 selection:text-slate-950">
      <motion.div className="pointer-events-none sticky top-0 z-0 h-screen w-full" style={{ opacity: sceneOpacity }}>
        {!capability.ready ? (
          <SceneLoading />
        ) : capability.webgl ? (
          <ResumeScene
            progress={scrollYProgress}
            reducedMotion={capability.reducedMotion}
            lowPower={capability.lowPower}
          />
        ) : (
          <SceneFallback label={text.fallback} />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,26,0.82)_0%,rgba(7,16,26,0.14)_52%,rgba(7,16,26,0.34)_100%)] sm:bg-[linear-gradient(90deg,rgba(7,16,26,0.86)_0%,rgba(7,16,26,0.08)_58%,rgba(7,16,26,0.26)_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.7px,transparent_0.7px)] [background-size:7px_7px]" />
      </motion.div>

      <motion.div className="fixed left-0 top-0 z-30 h-0.5 bg-cyan-300" style={{ width: progressWidth }} />

      <main className="relative z-10 -mt-[100vh]">
        <section className="mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-16 pt-32 sm:items-center sm:px-10 sm:pb-0 lg:px-16">
          <div className="max-w-2xl pb-8 sm:pb-0">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-xs font-semibold tracking-[0.28em] text-cyan-200 sm:text-sm"
            >
              {text.kicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-8xl"
            >
              {text.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl"
            >
              {text.intro}
            </motion.p>
            <div className="mt-8 flex items-center gap-5 text-sm text-white/65">
              <Link href={siteMetadata.github} className="inline-flex items-center gap-2 hover:text-cyan-200">
                <Github className="h-4 w-4" /> GitHub
              </Link>
              <Link href={siteMetadata.twitter} className="inline-flex items-center gap-2 hover:text-cyan-200">
                𝕏
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 right-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 sm:right-10">
            {text.scroll}
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10 lg:px-16" aria-labelledby="resume-experience-heading">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-cyan-200">01 — PATH</p>
            <h2 id="resume-experience-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              {text.experience}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">{text.experienceIntro}</p>
          </div>

          <ol className="mt-24 space-y-[38vh] pb-[28vh] sm:ml-auto sm:w-[54%]">
            {experience.map((item) => (
              <li key={item.company.en} className="relative border-l border-cyan-200/35 pl-7 sm:pl-10">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.9)]" />
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.2em] text-cyan-200">NODE {item.index}</span>
                    <span className="text-xs text-white/50">{item.period[language]}</span>
                  </div>
                  <h3 className="mt-7 text-3xl font-semibold tracking-tight">{item.company[language]}</h3>
                  <p className="mt-2 text-sm font-medium text-cyan-100/80">{item.team[language]}</p>
                  <p className="mt-5 text-lg text-white">{item.role[language]}</p>
                  <p className="mt-4 max-w-lg leading-7 text-slate-300">{item.note[language]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="relative border-y border-white/10 bg-[#07101a]/80 px-6 py-28 backdrop-blur-xl sm:px-10 lg:px-16"
          aria-labelledby="resume-work-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] text-violet-200">02 — BUILDS</p>
              <h2 id="resume-work-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                {text.work}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{text.workIntro}</p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {featured.map((project, index) => {
                const title = project.title[language] ?? project.title.en;
                const description = project.description?.[language] ?? project.description?.en;
                const href = project.url || (project.repo ? `https://github.com/${project.repo}` : '/projects');
                return (
                  <article
                    key={project.title.en}
                    className="group flex min-h-[27rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 transition duration-500 hover:-translate-y-2 hover:border-cyan-200/40 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[0.22em] text-white/45">0{index + 1}</span>
                      <Sparkles className="h-4 w-4 text-cyan-200/70" />
                    </div>
                    <h3 className="mt-12 text-3xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-5 leading-7 text-slate-300">{description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.builtWith.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={href}
                      className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-cyan-200"
                    >
                      {text.projectLink} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#07101a] px-6 py-28 sm:px-10 lg:px-16" aria-labelledby="resume-writing-heading">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] text-cyan-200">03 — NOTES</p>
              <h2 id="resume-writing-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                {text.writing}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{text.writingIntro}</p>
            </div>
            <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
              {posts.map((post, index) => {
                const localized = getLocalizedBlogContent(post, language);
                return (
                  <article
                    key={post.slug}
                    className="group grid gap-5 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
                  >
                    <span className="text-sm text-white/35">0{index + 1}</span>
                    <div>
                      <time className="text-xs uppercase tracking-[0.18em] text-cyan-200/70" dateTime={post.date}>
                        {formatDate(post.date, siteMetadata.locale)}
                      </time>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight transition group-hover:text-cyan-100 sm:text-3xl">
                        {localized.title}
                      </h3>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200"
                    >
                      {text.read} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex min-h-[85vh] items-center bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.12),transparent_40%),#07101a] px-6 py-28 text-center sm:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-cyan-200">COOODER — 2026</p>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{text.ending}</h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">{text.endingBody}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-white"
              >
                {text.projectsCta} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-white/50"
              >
                <BookOpen className="h-4 w-4" /> {text.blogCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
