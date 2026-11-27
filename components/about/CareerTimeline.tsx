'use client';

import { education, experiences } from '@/data/experienceData';
import { useLanguage } from '@/lib/i18n';

export default function CareerTimeline() {
  const { language } = useLanguage();
  const isChinese = language === 'zh';

  return (
    <section id="experience" className="not-prose career-section" aria-labelledby="career-heading">
      <p className="eyebrow">{isChinese ? '一路走来' : 'EXPERIENCE & EDUCATION'}</p>
      <h2 id="career-heading">{isChinese ? '经历与教育背景' : 'Experience & Education'}</h2>
      <ol className="career-timeline">
        {experiences.map((experience) => (
          <li key={experience.id} className="career-entry">
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
