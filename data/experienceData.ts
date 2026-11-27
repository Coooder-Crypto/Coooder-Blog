export interface ExperienceItem {
  id: string;
  company: { en: string; zh: string };
  team: { en: string; zh: string };
  role: { en: string; zh: string };
  period: { en: string; zh: string };
  tags: string[];
  summary: { en: string; zh: string };
}

export const experiences: ExperienceItem[] = [
  {
    id: 'ant-group',
    company: { en: 'Ant Group', zh: '蚂蚁集团' },
    team: { en: 'Ant Fortune · Research & Advisory Tech', zh: '蚂蚁财富 · 投研投顾技术部' },
    role: { en: 'AI Agent Engineering Intern', zh: 'Agent 应用研发实习生' },
    period: { en: 'May 2026 – Oct 2026', zh: '2026.05 – 2026.10' },
    tags: ['Agent Harness', 'LLM Workflow', 'TypeScript'],
    summary: {
      en: 'Worked on financial research and advisory AI agent workflows, focusing on verifiable execution loops and context engineering.',
      zh: '参与投研投顾方向的 AI Agent 应用研发，聚焦上下文工程与可验证的执行闭环。',
    },
  },
  {
    id: 'bytedance',
    company: { en: 'ByteDance', zh: '字节跳动' },
    team: { en: 'Data · Monetization Engineering & Large Frontend', zh: 'Data · 变现工程与大前端' },
    role: { en: 'Agent Development Intern', zh: 'Agent 开发实习生' },
    period: { en: 'Nov 2025 – May 2026', zh: '2025.11 – 2026.05' },
    tags: ['AI Agent', 'React', 'Node.js'],
    summary: {
      en: 'Built internal AI agent workflows and full-stack tooling across monetization engineering and large frontend platforms.',
      zh: '面向变现工程与大前端场景构建内部 AI Agent 工具链与全栈工程能力。',
    },
  },
  {
    id: 'weex',
    company: { en: 'Weex Exchange', zh: 'Weex 交易所' },
    team: { en: 'User Growth · Campaign Platform (Vue / React)', zh: '用户增长 · 活动配置与展示平台（Vue / React）' },
    role: { en: 'Frontend Development Intern', zh: '前端开发实习生' },
    period: { en: 'Feb 2025 – Jul 2025', zh: '2025.02 – 2025.07' },
    tags: ['React', 'Vue', 'Growth Platform'],
    summary: {
      en: 'Developed configurable growth campaign platforms and high-concurrency user-facing pages across Vue and React.',
      zh: '负责用户增长活动配置平台与高并发活动展示页研发，覆盖 Vue 与 React 技术栈。',
    },
  },
  {
    id: 'circuit',
    company: { en: 'Circuit (Zircuit DEX)', zh: 'Circuit（Zircuit 首个 DEX）' },
    team: { en: 'DeFi Trading & Liquidity App · circuit.money', zh: 'DeFi 交易与流动性前端应用 · circuit.money' },
    role: { en: 'Frontend Engineer (React)', zh: '前端开发工程师（React）' },
    period: { en: 'Jun 2024 – Dec 2024', zh: '2024.06 – 2024.12' },
    tags: ['Next.js', 'DeFi', 'Web3'],
    summary: {
      en: 'Shipped core swap, liquidity pool, and portfolio UI for the first decentralized exchange on Zircuit.',
      zh: '主导 Zircuit 首个 DEX 的核心交易、流动性池与资产看板前端流程迭代。',
    },
  },
  {
    id: 'thunderbit',
    company: { en: 'Thunderbit', zh: 'Thunderbit' },
    team: {
      en: 'AI SaaS No-Code Web App & Chrome Extension (Slate.js / Streaming Chatbox)',
      zh: '出海 AI SaaS 无代码平台与浏览器插件（Slate.js / 流式 Chatbox）',
    },
    role: { en: 'Frontend Development Intern', zh: '前端开发实习生' },
    period: { en: 'Dec 2023 – Jul 2024', zh: '2023.12 – 2024.07' },
    tags: ['React', 'Slate.js', 'Chrome Extension'],
    summary: {
      en: 'Built Slate.js workflow editors, streaming LLM chat interfaces, and Chrome extension UI for an AI web-scraping SaaS.',
      zh: '负责 AI 网页爬虫无代码平台的 Slate.js 编辑器、流式对话界面与 Chrome 插件端核心交互。',
    },
  },
  {
    id: 'semiconductor-company',
    company: { en: 'A Semiconductor Company', zh: '某芯片公司' },
    team: {
      en: 'Hardware Debugging Platform · Firmware & Waveform Dashboard (Vue3)',
      zh: '全流程硬件调试平台 · 固件烧录与波形看板（Vue3）',
    },
    role: { en: 'Fullstack Development Intern', zh: '全栈开发实习生' },
    period: { en: 'Sep 2022 – Apr 2023', zh: '2022.09 – 2023.04' },
    tags: ['Vue 3', 'Fullstack', 'Hardware Tools'],
    summary: {
      en: 'Built a full-lifecycle hardware debugging web platform covering firmware flashing and real-time waveform visualization.',
      zh: '参与全流程硬件调试平台研发，实现固件烧录流程与实时波形数据可视化看板。',
    },
  },
];

export const education = [
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
