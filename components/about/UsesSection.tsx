'use client';

import { useLanguage } from '@/lib/i18n';

const setupGroups = [
  {
    category: { zh: 'AGENT & 编程闭环', en: 'AGENT & CODING LOOP' },
    items: {
      zh: ['Codex / Claude Code 协作开发', '自有常驻节点运行 Hermes + Jarvis', '强校验 CLI（lint / typecheck / check:content）'],
      en: ['Codex / Claude Code workflows', 'Dedicated host running Hermes + Jarvis', 'Deterministic verification CLIs'],
    },
  },
  {
    category: { zh: '知识管理与写作', en: 'SECOND BRAIN & WRITING' },
    items: {
      zh: ['Obsidian（Git 同步 jarvis-brain）', '五层笔记流：inbox → sources → resources → synthesis → decisions', '本地显式脚本导入 MDX 发布'],
      en: ['Obsidian (Git-backed jarvis-brain)', 'Layered vault: inbox → sources → synthesis → decisions', 'Explicit local MDX import script'],
    },
  },
  {
    category: { zh: '主力技术栈', en: 'CORE ENGINEERING STACK' },
    items: {
      zh: ['TypeScript · Next.js · React · Tailwind CSS', 'Python · PostgreSQL · SQLite · MCP', 'SwiftUI（本地工具）· Docker · Linux systemd'],
      en: ['TypeScript · Next.js · React · Tailwind CSS', 'Python · PostgreSQL · SQLite · MCP', 'SwiftUI (local tools) · Docker · systemd'],
    },
  },
  {
    category: { zh: '屏幕之外的日常', en: 'OFF THE SCREEN' },
    items: {
      zh: ['320Hz 显示器 + CS2 沙二 / Apex / 怪物猎人 / 杀戮尖塔', '规律力量训练与数据化复盘', '喜欢折腾硬件（以前折腾过硬破 Switch）与个人自动化'],
      en: ['320Hz monitor · CS2 (Dust II), Apex, Monster Hunter, Slay the Spire', 'Regular strength training & quantified reviews', 'Hardware tinkering & personal automation pipelines'],
    },
  },
] as const;

export default function UsesSection() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <section id="uses" className="not-prose about-section" aria-labelledby="uses-heading">
      <p className="eyebrow">{zh ? '工作台与日常' : 'USES & DIGITAL WORKBENCH'}</p>
      <h2 id="uses-heading">{zh ? '我现在在用什么' : 'Tools, stack & life off-duty'}</h2>
      <div className="uses-grid">
        {setupGroups.map((group) => (
          <div key={group.category.en} className="uses-card">
            <h3>{group.category[language]}</h3>
            <ul>
              {group.items[language].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
