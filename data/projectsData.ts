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
    problem: {
      en: 'Personal health context is useful to an agent, but it should never require giving up control of sensitive data.',
      zh: '个人健康数据能帮助 Agent 做出更好的判断，但不应以失去敏感数据控制权为代价。',
    },
    outcome: {
      en: 'A source-distributed Local Preview connecting authorized iPhone summaries to a local receiver, SQLite, and MCP queries.',
      zh: '源码分发的 Local Preview：将 iPhone 授权摘要连接到本地接收器、SQLite 与 MCP 查询。',
    },
    contribution: {
      en: 'SwiftUI client, encrypted direct sync, local SQLite, MCP tools, device revocation, and read auditing. Public implementation links are below.',
      zh: 'SwiftUI 客户端、加密直连同步、本地 SQLite、MCP 工具、设备撤销与读取审计；下方附公开实现链接。',
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
    problem: {
      en: 'AI industry research is fragmented across announcements, benchmarks, companies, and infrastructure data.',
      zh: 'AI 行业研究分散在公告、基准测试、公司与基础设施数据之间，难以形成完整判断。',
    },
    outcome: {
      en: 'An MVP with relationship filters, source inspection, and research candidate review. Preview data includes seed and inferred relationships.',
      zh: '可按关系筛选、查看来源并审核研究候选的图谱 MVP；预览数据包含 seed 与推断关系。',
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
    problem: {
      en: 'Writing tools often make collaboration depend on a stable connection and a centrally hosted workspace.',
      zh: '许多写作工具让协作依赖稳定网络与中心化工作区，离线与数据控制往往被牺牲。',
    },
    outcome: {
      en: 'An editor with IndexedDB persistence, a reconnection sync queue, and a separately self-hostable Yjs collaboration service.',
      zh: '具备 IndexedDB 持久化、联网恢复后的同步队列，以及可独立自建的 Yjs 协作服务。',
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
      en: 'Thunderbit: AI Web Scraper',
      zh: 'Thunderbit：AI 网页爬虫与无代码工作流',
    },
    description: {
      en: 'AI Web Scraper and no-code LLM workflow platform spanning web app and Chrome extension.',
      zh: '覆盖 Web 与 Chrome 扩展的 AI 网页抓取与大模型无代码工作流平台。',
    },
    contribution: {
      en: 'Built core frontend components and LLM workflow UI across the web app and Chrome extension.',
      zh: '负责 Web 端与 Chrome 扩展核心组件及大模型 Workflow 交互实现。',
    },
    imgSrc: '/static/images/projects/thunderbit.webp',
    url: 'https://thunderbit.com/',
    builtWith: ['React', 'Styled-Component', 'Next.js', 'Chrome Extension'],
  },
  {
    type: 'work',
    title: {
      en: 'EthPanda: Community & NFT Platform',
      zh: 'EthPanda：社区与 NFT 平台',
    },
    description: {
      en: 'A community and NFT collection platform built with Next.js, tRPC, and Tailwind CSS.',
      zh: '基于 Next.js、tRPC 与 Tailwind CSS 构建的社区与 NFT 收藏平台。',
    },
    contribution: {
      en: 'Implemented responsive frontend modules and tRPC-backed interactive views.',
      zh: '负责响应式前端模块与基于 tRPC 的交互页面实现。',
    },
    imgSrc: '/static/images/projects/ethpanda.webp',
    url: 'https://ethpanda.org/',
    builtWith: ['React', 'TailwindCSS', 'tRPC', 'Next.js'],
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
      en: 'Personal Website (Coooder Blog)',
      zh: '个人网站（Coooder Blog）',
    },
    description: {
      en: 'A bilingual static website for Agent Harness notes, verified project evidence, and essays, built with Next.js 16 and MDX.',
      zh: '基于 Next.js 16、Contentlayer 与 MDX 构建的双语个人网站，包含公开项目证据核对与静态导出校验。',
    },
    contribution: {
      en: 'Designed the studio UI, bilingual metadata pipeline, draft-isolation checks, and local second-brain import workflow.',
      zh: '负责站点设计、双语元信息、草稿防泄漏校验与本地第二大脑导入工作流。',
    },
    imgSrc: '/static/images/projects/coooder-blog.webp',
    url: 'https://coooder-blog.vercel.app/',
    builtWith: ['Next.js', 'Tailwind', 'TypeScript', 'MDX'],
  },
  {
    type: 'self',
    title: {
      en: 'LXDAO Official Website',
      zh: 'LXDAO 官方网站',
    },
    description: {
      en: 'The LXDAO builder community website, built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的 LXDAO 官方站点。',
    },
    contribution: {
      en: 'Contributed frontend pages and community site maintenance as an LXDAO builder.',
      zh: '作为社区 Builder 参与官网前端页面开发与维护。',
    },
    imgSrc: '/static/images/projects/lxdao.webp',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'TypeScript'],
  },
  {
    type: 'self',
    title: {
      en: 'Openbuild',
      zh: 'Openbuild 开发者社区',
    },
    description: {
      en: 'A developer community website, built with Next.js, Tailwind CSS, and MDX.',
      zh: '使用 Next.js、Tailwind CSS 与 MDX 构建的开发者社区网站。',
    },
    contribution: {
      en: 'Contributed community web modules and content presentation components.',
      zh: '参与开发者社区 Web 模块与内容展示组件构建。',
    },
    imgSrc: '/static/images/projects/openbuild.webp',
    url: 'https://openbuild.xyz/',
    builtWith: ['Next.js', 'Tailwind', 'TypeScript', 'MDX'],
  },
  {
    type: 'self',
    title: {
      en: 'MM Capital',
      zh: 'MM Capital',
    },
    description: {
      en: 'An investment firm website, built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的投资机构官网。',
    },
    contribution: {
      en: 'Implemented responsive landing pages and interactive sections.',
      zh: '负责响应式官网页面与交互模块实现。',
    },
    imgSrc: '/static/images/projects/mmcapital.webp',
    // Public URL withheld until verified; the previous LXDAO link was unrelated.
    builtWith: ['Next.js', 'Tailwind', 'TypeScript'],
  },
  {
    type: 'self',
    title: {
      en: 'Circuit DEX',
      zh: 'Circuit DEX',
    },
    description: {
      en: 'Frontend application for a decentralized exchange on Zircuit, focused on swap UI and UX iteration.',
      zh: '面向 Zircuit 生态的去中心化交易所前端应用，聚焦交易交互与体验迭代。',
    },
    contribution: {
      en: 'Developed core DEX frontend flows alongside product and design.',
      zh: '协同产品与设计完成 DEX 核心前端流程开发与体验优化。',
    },
    imgSrc: '/static/images/projects/circuit.webp',
    // Public URL withheld until verified.
    builtWith: ['Next.js', 'Tailwind', 'TypeScript'],
  },
  {
    type: 'self',
    title: {
      en: 'ZK Asset Raffle',
      zh: 'ZK Asset Raffle',
    },
    description: {
      en: 'A zero-knowledge asset raffle web application built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的零知识资产抽奖应用。',
    },
    contribution: {
      en: 'Built frontend flows and wallet/proof interaction states.',
      zh: '负责前端交互流程与钱包/零知识证明状态呈现。',
    },
    imgSrc: '/static/images/projects/zkassetraffle.webp',
    // Public URL withheld until verified.
    builtWith: ['Next.js', 'Tailwind', 'TypeScript'],
  },
];

export default projectsData;
