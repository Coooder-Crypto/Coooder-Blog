import type { Project } from '@/types/data';

const projectsData: Project[] = [
  {
    type: 'featured',
    title: {
      en: 'Vital Agent Sync',
      zh: 'Vital Agent Sync',
    },
    description: {
      en: 'A local-first Apple Health connector that brings user-authorized HealthKit summaries to MCP-compatible agents.',
      zh: '面向 MCP Agent 的本地优先 Apple Health 连接器，让用户授权的 HealthKit 摘要安全进入 Agent 工作流。',
    },
    contribution: {
      en: 'iOS, encrypted direct sync, local SQLite, MCP runtime, CLI, and privacy-first onboarding.',
      zh: '涵盖 iOS、加密直连同步、本地 SQLite、MCP runtime、CLI 与隐私优先的配对流程。',
    },
    imgSrc: '/static/images/projects/vital-agent-sync.webp',
    repo: 'Coooder-Crypto/vital-agent-sync',
    builtWith: ['SwiftUI', 'HealthKit', 'TypeScript', 'MCP'],
  },
  {
    type: 'featured',
    title: {
      en: 'AI Capital Map',
      zh: 'AI Capital Map',
    },
    description: {
      en: 'An evidence-backed AI industry graph for exploring companies, models, infrastructure, metrics, and research relationships.',
      zh: '一个带证据溯源的 AI 产业图谱，用于探索公司、模型、基础设施、指标与研究关系。',
    },
    contribution: {
      en: 'Built the graph exploration, evidence review workflow, research timeline, API layer, and PostgreSQL-backed data path.',
      zh: '构建图谱浏览、证据审核流、研究时间线、API 层及 PostgreSQL 数据路径。',
    },
    repo: 'Coooder-Crypto/ai-capital',
    url: 'https://ai-capital-liard.vercel.app',
    builtWith: ['Next.js', 'TypeScript', 'PostgreSQL', 'Data Research'],
  },
  {
    type: 'featured',
    title: {
      en: 'ByteNote',
      zh: 'ByteNote',
    },
    description: {
      en: 'An offline-first collaborative writing app with structured editing, automatic sync, self-hosted collaboration, and AI assistance.',
      zh: '一款离线优先的协作文档应用，包含结构化编辑、自动同步、自托管协作与 AI 辅助。',
    },
    contribution: {
      en: 'Designed the offline sync queue, IndexedDB persistence, Yjs collaboration, editor experience, and full-stack integration.',
      zh: '设计离线同步队列、IndexedDB 持久化、Yjs 协作、编辑器体验与全栈集成。',
    },
    imgSrc: '/static/images/projects/bytenote.webp',
    repo: 'Coooder-Crypto/ByteNote',
    url: 'https://byte-note.vercel.app',
    builtWith: ['Next.js', 'Slate', 'Yjs', 'PostgreSQL'],
  },
  {
    type: 'work',
    title: {
      en: 'Thunderbit: AI Web Scraper - Scrape any website in 2 click.',
      zh: 'Thunderbit：AI 网页爬虫 —— 两次点击抓取任意网站',
    },
    description: {
      en: 'AI Web Scraper - Scrape any website in 2 click.',
      zh: 'AI 网页爬虫，支持两次点击抓取任意网站内容。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/thunderbit.webp',
    url: 'https://thunderbit.com/',
    builtWith: ['React', 'Styled-Component', 'NextJS'],
  },
  {
    type: 'work',
    title: {
      en: 'EthPanda: NFT Collection Platform',
      zh: 'EthPanda：NFT 收藏平台',
    },
    description: {
      en: 'A comprehensive NFT collection and trading platform built with modern web technologies.',
      zh: '一个使用现代 Web 技术构建的综合 NFT 收藏与交易平台。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/ethpanda.webp',
    url: 'https://ethpanda.org/',
    builtWith: ['React', 'TailwindCSS', 'TRPC', 'NextJS'],
  },
  {
    type: 'self',
    title: {
      en: 'YieldPilot',
      zh: 'YieldPilot',
    },
    description: {
      en: 'A treasury survivability simulator that turns stress tests and risk signals into versioned governance proposal drafts.',
      zh: '一个金库生存能力模拟器，将压力测试与风险信号转化为可审计的治理提案草案。',
    },
    contribution: {
      en: 'Implemented the deterministic stress engine, risk scoring, policy recommendations, proposal builder, and audit trail.',
      zh: '实现可复现压力引擎、风险评分、策略建议、提案生成器与审计轨迹。',
    },
    repo: 'Coooder-Crypto/YieldPilot',
    builtWith: ['Next.js', 'Prisma', 'PostgreSQL', 'Sui'],
  },
  {
    type: 'self',
    title: {
      en: 'OwnFace',
      zh: 'OwnFace',
    },
    description: {
      en: 'A zero-knowledge biometric authentication stack that proves identity without exposing raw face embeddings.',
      zh: '一个零知识生物认证系统，在不暴露原始人脸向量的前提下完成身份验证。',
    },
    contribution: {
      en: 'Built the frontend, proving backend, Groth16 circuit flow, and on-chain verification integration.',
      zh: '构建前端、证明后端、Groth16 电路链路与链上验证集成。',
    },
    imgSrc: '/static/images/projects/ownface.webp',
    repo: 'Coooder-Crypto/OwnFace',
    builtWith: ['Next.js', 'Circom', 'Solidity', 'Groth16'],
  },
  {
    type: 'self',
    title: {
      en: 'Oh My Notion',
      zh: 'Oh My Notion',
    },
    description: {
      en: 'A local-first Notion knowledge agent with hybrid retrieval, grounded answers, memory, skills, and evaluation tooling.',
      zh: '一个本地优先的 Notion 知识 Agent，具备混合检索、可溯源回答、记忆、技能路由与评测工具。',
    },
    repo: 'Coooder-Crypto/oh-my-notion',
    builtWith: ['Python', 'SQLite', 'LlamaIndex', 'FTS5'],
  },
  {
    type: 'self',
    title: {
      en: 'MCP-Arena',
      zh: 'MCP-Arena',
    },
    description: {
      en: 'A hackathon prototype for a public MCP service marketplace with quality signals and stake-slash-reward incentives.',
      zh: '一个黑客松原型：面向 MCP 服务的公开市场，探索质量信号与 stake-slash-reward 激励。',
    },
    repo: 'Coooder-Crypto/MCP-Arena',
    url: 'https://mcp-arena.vercel.app',
    builtWith: ['TypeScript', 'MCP', 'Web3', 'Hackathon'],
  },
  {
    type: 'self',
    title: {
      en: 'ByteChat',
      zh: 'ByteChat',
    },
    description: {
      en: 'A real-time chat system spanning Web, Android WebView, a JS bridge, WebSocket messaging, and PostgreSQL persistence.',
      zh: '一个覆盖 Web、Android WebView、JSBridge、WebSocket 消息与 PostgreSQL 持久化的实时聊天系统。',
    },
    repo: 'Coooder-Crypto/ByteChat',
    builtWith: ['React', 'Next.js', 'Koa', 'WebSocket'],
  },
  {
    type: 'self',
    title: {
      en: 'Personal website',
      zh: '个人网站',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的个人网站。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/coooder-blog.webp',
    url: 'https://coooder-blog.vercel.app/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'MDX'],
  },
  {
    type: 'self',
    title: {
      en: 'LXDAO Official Website',
      zh: 'LXDAO 官方网站',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的 LXDAO 官方站点。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/lxdao.webp',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
  {
    type: 'self',
    title: {
      en: 'Openbuild',
      zh: 'Openbuild 开发者社区',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的开发者社区网站。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/openbuild.webp',
    url: 'https://openbuild.xyz/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'MDX'],
  },
  {
    type: 'self',
    title: {
      en: 'MM Capital',
      zh: 'MM Capital',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的投资机构官网。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/mmcapital.webp',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
  {
    type: 'self',
    title: {
      en: 'Circuit',
      zh: 'Circuit',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的创意展示站点。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/circuit.webp',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
  {
    type: 'self',
    title: {
      en: 'ZK Asset Raffle',
      zh: 'ZK Asset Raffle',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的零知识资产抽奖平台。',
    },
    contribution: {
      en: 'xxx',
      zh: 'xxx',
    },
    imgSrc: '/static/images/projects/zkassetraffle.webp',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
];

export default projectsData;
