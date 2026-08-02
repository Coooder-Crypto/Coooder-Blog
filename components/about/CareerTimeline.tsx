'use client';

import { BriefcaseBusiness, CalendarDays } from 'lucide-react';

import { useLanguage } from '@/lib/i18n';

const experiences = [
  {
    company: { en: 'ByteDance', zh: '字节跳动' },
    team: { en: 'Data · Monetization Engineering & Large Frontend', zh: 'Data · 变现工程与大前端' },
    role: { en: 'Agent Development Intern', zh: 'Agent 开发实习生' },
    period: { en: 'Nov 2025 – May 2026', zh: '2025.11 – 2026.05' },
  },
  {
    company: { en: 'Ant Group', zh: '蚂蚁集团' },
    team: { en: 'Ant Fortune · Financial Insurance Business Group', zh: '蚂蚁财富 · 财保事业群' },
    role: { en: 'Agent Algorithm Intern', zh: 'Agent 算法实习生' },
    period: { en: 'May 2026 – Present', zh: '2026.05 – 至今' },
  },
] as const;

export default function CareerTimeline() {
  const { language } = useLanguage();
  const isChinese = language === 'zh';

  return (
    <section
      className="not-prose mt-12 border-t border-gray-200 pt-10 dark:border-gray-700"
      aria-labelledby="career-heading"
    >
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
          <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="career-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {isChinese ? '经历' : 'Experience'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isChinese ? '在 AI Agent 方向持续学习与实践。' : 'Learning and building in the AI agent space.'}
          </p>
        </div>
      </div>

      <ol className="relative ml-3 border-l border-sky-200 dark:border-sky-500/30">
        {experiences.map((experience) => (
          <li key={experience.company.en} className="relative ml-7 pb-9 last:pb-0">
            <span className="absolute -left-[2.1rem] top-1.5 h-3 w-3 rounded-full border-[3px] border-white bg-sky-500 shadow-sm dark:border-gray-900" />
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/70 dark:hover:border-sky-500/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {experience.company[language]}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">{experience.team[language]}</p>
                  <p className="mt-3 text-base text-gray-700 dark:text-gray-200">{experience.role[language]}</p>
                </div>
                <p className="inline-flex shrink-0 items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {experience.period[language]}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
