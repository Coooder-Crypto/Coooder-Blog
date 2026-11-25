'use client';

import { useLanguage } from '@/lib/i18n';

const experiences = [
  {
    company: { en: 'Ant Group', zh: '蚂蚁集团' },
    team: { en: 'Ant Fortune · Research & Advisory Tech', zh: '蚂蚁财富 · 投研投顾技术部' },
    role: { en: 'AI Agent Engineering Intern', zh: 'Agent 应用研发实习生' },
    period: { en: 'May 2026 – Oct 2026', zh: '2026.05 – 2026.10' },
  },
  {
    company: { en: 'ByteDance', zh: '字节跳动' },
    team: { en: 'Data · Monetization Engineering & Large Frontend', zh: 'Data · 变现工程与大前端' },
    role: { en: 'Agent Development Intern', zh: 'Agent 开发实习生' },
    period: { en: 'Nov 2025 – May 2026', zh: '2025.11 – 2026.05' },
  },
  {
    company: { en: 'Thunderbit', zh: 'Thunderbit' },
    team: { en: 'Web App & Chrome Extension · LLM Workflow', zh: 'Web 端与 Chrome 扩展 · 大模型工作流' },
    role: { en: 'Frontend Development Intern', zh: '前端开发实习生' },
    period: { en: 'Jan 2024 – Jul 2024', zh: '2024.01 – 2024.07' },
  },
] as const;

const education = [
  {
    school: { en: 'Beijing University of Posts and Telecommunications (BUPT)', zh: '北京邮电大学（BUPT）' },
    degree: { en: 'M.Eng. in Communication Engineering', zh: '通信工程 · 工学硕士' },
    period: { en: '2024 – 2027', zh: '2024 – 2027' },
  },
  {
    school: { en: 'Beijing University of Posts and Telecommunications (BUPT)', zh: '北京邮电大学（BUPT）' },
    degree: { en: 'B.Eng. in Communication Engineering', zh: '通信工程 · 工学学士' },
    period: { en: '2020 – 2024', zh: '2020 – 2024' },
  },
] as const;

export default function CareerTimeline() {
  const { language } = useLanguage();
  const isChinese = language === 'zh';

  return (
    <section id="experience" className="not-prose career-section" aria-labelledby="career-heading">
      <p className="eyebrow">{isChinese ? '一路走来' : 'EXPERIENCE & EDUCATION'}</p>
      <h2 id="career-heading">{isChinese ? '经历与教育背景' : 'Experience & Education'}</h2>
      <ol className="career-timeline">
        {experiences.map((experience) => (
          <li key={experience.company.en} className="career-entry">
            <p className="career-period">{experience.period[language]}</p>
            <h3>{experience.company[language]}</h3>
            <p>{experience.team[language]}</p>
            <p className="career-role">{experience.role[language]}</p>
          </li>
        ))}
      </ol>

      <div className="education-strip">
        <span className="eyebrow">{isChinese ? '教育背景' : 'EDUCATION'}</span>
        <ul className="education-grid">
          {education.map((edu) => (
            <li key={edu.period.en} className="education-card">
              <span className="career-period">{edu.period[language]}</span>
              <h3>{edu.school[language]}</h3>
              <p>{edu.degree[language]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
