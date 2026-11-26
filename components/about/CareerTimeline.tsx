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
    company: { en: 'Weex Exchange', zh: 'Weex 交易所' },
    team: { en: 'User Growth · Campaign Platform (Vue / React)', zh: '用户增长 · 活动配置与展示平台（Vue / React）' },
    role: { en: 'Frontend Development Intern', zh: '前端开发实习生' },
    period: { en: 'Feb 2025 – Jul 2025', zh: '2025.02 – 2025.07' },
  },
  {
    company: { en: 'Circuit (Zircuit DEX)', zh: 'Circuit（Zircuit 首个 DEX）' },
    team: { en: 'DeFi Trading & Liquidity App · circuit.money', zh: 'DeFi 交易与流动性前端应用 · circuit.money' },
    role: { en: 'Frontend Engineer (React)', zh: '前端开发工程师（React）' },
    period: { en: 'Jun 2024 – Dec 2024', zh: '2024.06 – 2024.12' },
  },
  {
    company: { en: 'Thunderbit', zh: 'Thunderbit' },
    team: { en: 'AI SaaS No-Code Web App & Chrome Extension (Slate.js / Streaming Chatbox)', zh: '出海 AI SaaS 无代码平台与浏览器插件（Slate.js / 流式 Chatbox）' },
    role: { en: 'Frontend Development Intern', zh: '前端开发实习生' },
    period: { en: 'Dec 2023 – Jul 2024', zh: '2023.12 – 2024.07' },
  },
  {
    company: { en: 'Zhongke Longjingshi Semiconductor', zh: '中科龙晶石半导体' },
    team: { en: 'Hardware Debugging Platform · Firmware & Waveform Dashboard (Vue3)', zh: '全流程硬件调试平台 · 固件烧录与波形看板（Vue3）' },
    role: { en: 'Fullstack Development Intern', zh: '全栈开发实习生' },
    period: { en: 'Sep 2022 – Apr 2023', zh: '2022.09 – 2023.04' },
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
