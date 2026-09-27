'use client';

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
    <section className="not-prose career-section" aria-labelledby="career-heading">
      <p className="eyebrow">{isChinese ? '一路走来' : 'THE JOURNEY SO FAR'}</p>
      <h2 id="career-heading">{isChinese ? '经历' : 'Experience'}</h2>
      <ol className="career-timeline">
        {experiences.map((experience) => (
          <li key={experience.company.en} className="career-entry">
            <p className="career-period">{experience.period[language]}</p>
            <h3>{experience.company[language]}</h3>
            <p>{experience.team[language]}</p>
            <p>{experience.role[language]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
