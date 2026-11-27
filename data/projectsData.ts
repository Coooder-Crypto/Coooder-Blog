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
      en: 'MemTable',
      zh: 'MemTable',
    },
    description: {
      en: 'A local-first structured ledger runtime for long-running agents — memory recalls what happened; a ledger computes what changed.',
      zh: '面向长运行 Agent 的本地优先结构化账本运行时：记忆负责回忆发生过什么，账本负责计算到底变了什么。',
    },
    problem: {
      en: 'Text and vector memory recall stories, but struggle with real data questions like training progression, trends, or task failure counts.',
      zh: '文本与向量记忆擅长回忆碎片，却很难准确回答训练进步、体重趋势或任务失败统计这类数据计算问题。',
    },
    outcome: {
      en: 'An auditable SQLite ledger MVP with proposal review, declarative extractors, fitness/agent-work packs, MCP tools, and a Hermes plugin.',
      zh: '可审计的 SQLite 账本运行时 MVP：支持提案确认、声明式提取规则、fitness/agent-work 领域包、MCP 工具与 Hermes 增强插件。',
    },
    contribution: {
      en: 'Built @memtable/core, HTTP/MCP server, CLI, fitness and agent-work packs, and Hermes/OpenClaw enhancer adapters.',
      zh: '实现 @memtable/core、HTTP/MCP 服务、CLI、fitness/agent-work 领域包及 Hermes/OpenClaw 增强适配层。',
    },
    repo: 'Coooder-Crypto/mem-table',
    builtWith: ['TypeScript', 'SQLite', 'MCP', 'Hermes'],
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
    type: 'self',
    title: {
      en: 'ByteNote',
      zh: 'ByteNote',
    },
    description: {
      en: 'An offline-first collaborative writing app with IndexedDB persistence, a reconnection sync queue, and a self-hostable Yjs service.',
      zh: '离线优先的协作文档应用：具备 IndexedDB 持久化、断网恢复同步队列与可独立自建的 Yjs 协作服务。',
    },
    contribution: {
      en: 'Designed the offline sync queue, IndexedDB persistence, Yjs collaboration, Slate editor, and full-stack integration.',
      zh: '设计离线同步队列、IndexedDB 持久化、Yjs 协作、Slate 编辑器体验与全栈集成。',
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
      en: 'Dark Forest (DFArchon)',
      zh: 'Dark Forest（DFArchon 生态）',
    },
    description: {
      en: 'Community-maintained fully onchain strategy game spanning Web Worker exploration and Aztec/Noir privacy extensions.',
      zh: '社区维护的全链上战争迷雾策略游戏生态，涵盖前端 Web Worker 探索调度与 Aztec/Noir 隐私扩展。',
    },
    contribution: {
      en: 'Maintained Web Worker map-exploration job scheduling & IndexedDB dedup; implemented player-gated Noir messaging and Aztec 5.x upgrade support.',
      zh: '维护 Web Worker 地图探索任务调度与 IndexedDB 去重；实现 Aztec/Noir 玩家门控消息模块并协助工具链升级。',
    },
    url: 'https://dfarchon.xyz/',
    builtWith: ['TypeScript', 'Web Workers', 'Aztec', 'Noir'],
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
      en: 'ETH Shanghai 2025 Public Goods 3rd Prize — an end-to-end zero-knowledge biometric authentication stack proving identity without exposing raw face embeddings.',
      zh: 'ETH Shanghai 2025 公共物品赛道三等奖：端到端零知识人脸生物认证栈，在不暴露原始人脸向量的前提下完成链上身份验真。',
    },
    contribution: {
      en: 'Built the frontend, proving backend, Pedersen/Poseidon + Groth16 flow, and Sepolia on-chain verification integration.',
      zh: '负责架构、前端、Pedersen/Poseidon + Groth16 证明链路与 Sepolia 链上合约验证集成。',
    },
    imgSrc: '/static/images/projects/ownface.webp',
    repo: 'Coooder-Crypto/OwnFace',
    builtWith: ['Next.js', 'Groth16', 'Solidity', 'ZK'],
  },
  {
    type: 'self',
    title: {
      en: 'Oh My Notion',
      zh: 'Oh My Notion',
    },
    description: {
      en: 'A local-first Notion knowledge agent with SQLite FTS5 + local embedding hybrid retrieval, grounded answers, inspectable memory, and built-in evals.',
      zh: '一个本地优先的 Notion 知识 Agent，具备 SQLite FTS5 + 本地向量混合检索、可溯源回答、可检视记忆与内置评测工具。',
    },
    repo: 'Coooder-Crypto/oh-my-notion',
    builtWith: ['Python', 'SQLite', 'FTS5', 'Hybrid RAG'],
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
    url: 'https://coooder.space/',
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
    url: 'https://www.circuit.money/',
    builtWith: ['Next.js', 'Tailwind', 'TypeScript'],
  },
  {
    type: 'self',
    title: {
      en: 'ZK Asset Raffle',
      zh: 'ZK Asset Raffle',
    },
    description: {
      en: 'ETH Beijing 2025 & Morph 1st Prize — a verifiable real-world asset (RWA) raffle protocol pairing confidential commitments, encrypted QR codes, and Merkle/ZK proofs.',
      zh: 'ETH Beijing 2025 与 Morph 双一等奖：面向实物资产的可验证公平抽奖协议，结合机密承诺、加密二维码与 Merkle/ZK 证明。',
    },
    contribution: {
      en: 'Built full-stack monorepo flows across Next.js, typed tRPC APIs, proof/redemption states, and EVM/Move contract integration.',
      zh: '负责 Next.js 前端、tRPC API、证明与领奖状态流转及 EVM/Move 合约集成。',
    },
    imgSrc: '/static/images/projects/zkassetraffle.webp',
    repo: 'Coooder-Crypto/zk-asset-raffle',
    builtWith: ['Next.js', 'tRPC', 'ZK', 'Solidity / Move'],
  },
];

export default projectsData;
