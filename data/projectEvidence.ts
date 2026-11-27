import type { LocalizedText } from '@/types/data';

export interface ProjectEvidenceRecord {
  title: string;
  repo: string;
  revision: string;
  status: LocalizedText;
  implementation: LocalizedText;
  boundary: LocalizedText;
  sources: { label: LocalizedText; path: string }[];
  screenshot?: { src: string; width: number; height: number; alt: LocalizedText; caption: LocalizedText };
}

// Public repository evidence, reviewed on 2026-11-26. Pin links to the reviewed revisions.
export const projectEvidence: ProjectEvidenceRecord[] = [
  {
    title: 'Vital Agent Sync',
    repo: 'Coooder-Crypto/vital-agent-sync',
    revision: '68238e89872ced9c0758dff5f654e3354a882f47',
    status: { zh: '源码分发 · Local Preview 0.5.3', en: 'Source-distributed · Local Preview 0.5.3' },
    implementation: {
      zh: '将用户授权的 HealthKit 摘要同步到自有接收器，写入本地 SQLite，再通过 MCP 提供查询。公开源码包含设备撤销、读取审计，以及加密传输的重放、篡改与密钥轮换测试用例。',
      en: 'Syncs authorized HealthKit summaries to a user-owned receiver and local SQLite, then exposes queries through MCP. Public code includes device revocation, read auditing, and test cases for replay, tampering, and key rotation in encrypted transport.',
    },
    boundary: {
      zh: '当前重点是 Mac + iPhone 的可信局域网预览，iOS 需自行从源码安装并用真机验证。不是医疗服务；本地存储不代表模型推理也在本地。这里不展示真实健康数据或配对凭据。',
      en: 'The current priority is a trusted-LAN preview on Mac and iPhone. iOS requires a source build and physical-device validation. This is not a medical service; local storage does not imply local model inference. No real health data or pairing credentials are shown here.',
    },
    sources: [
      { label: { zh: '当前阶段与隐私边界', en: 'Status and privacy boundaries' }, path: 'README.md' },
      { label: { zh: 'MCP 查询与读取审计', en: 'MCP queries and read auditing' }, path: 'packages/local/src/mcp.ts' },
      {
        label: { zh: '加密传输测试用例', en: 'Encrypted transport test cases' },
        path: 'packages/local/tests/direct-transport.test.ts',
      },
    ],
  },
  {
    title: 'MemTable',
    repo: 'Coooder-Crypto/mem-table',
    revision: '68c3ab7d13b7f939d7397a49ce48a0eb3c5bddd0',
    status: { zh: '结构化 Agent 账本运行时 · v0.1 Alpha', en: 'Structured agent ledger runtime · v0.1 Alpha' },
    implementation: {
      zh: '基于 node:sqlite 构建本地账本核心，通过声明式规则从对话与事件中生成待确认提案（proposal），落账后提供带来源追踪的结构化聚合查询与 MCP/HTTP 接口，附 fitness 与 agent-work 领域包及 Hermes 适配插件。',
      en: 'Implements a local node:sqlite ledger core that turns observed agent events into reviewable proposals, commits schema-checked records with source tracing, and exposes aggregations over MCP/HTTP alongside fitness/agent-work packs and a Hermes plugin.',
    },
    boundary: {
      zh: '当前为早期 v0.1 Alpha MVP，watch 模式为轻量轮询，HTTP 与 MCP 需分进程运行；定位是补齐结构化计算层，而非替代全文检索或向量记忆。',
      en: 'Early v0.1 Alpha MVP: watch uses lightweight polling and HTTP/MCP run in separate processes. Designed to complement text/vector memory with structured computation, not replace it.',
    },
    sources: [
      { label: { zh: '账本运行时核心', en: 'Ledger runtime core' }, path: 'packages/core/src/runtime/memtable-runtime.ts' },
      { label: { zh: 'MCP 溯源与查询接口', en: 'MCP tracing & query surface' }, path: 'packages/server/src/mcp.ts' },
      { label: { zh: '运行时回归测试', en: 'Runtime test suite' }, path: 'packages/core/test/runtime.test.mjs' },
    ],
  },
  {
    title: 'AI Capital Map',
    repo: 'Coooder-Crypto/ai-capital',
    revision: '62d8ab606595a00efd0b06ab689125743cd4037a',
    status: { zh: 'AI 产业图谱与研究候选平台 · MVP', en: 'AI industry graph and research review platform · MVP' },
    implementation: {
      zh: '按关系类型、置信度与深度探索实体图谱，并为关系保留来源与证据。公开仓库提供候选审核、PostgreSQL 数据路径和证据审核校验脚本；图谱渲染对关系数量设有上限。',
      en: 'Explores entity relationships by type, confidence, and depth while retaining sources and evidence. The public repository includes candidate review, a PostgreSQL data path, and evidence-review validation scripts. Graph rendering caps the number of visible edges.',
    },
    boundary: {
      zh: '公开预览包含 MVP seed 数据与推断关系，不等于实时、全面核实的行业数据库。阅读关系时需要结合来源、证据强度与审核状态，不能把推断当成已确认事实。',
      en: 'The public preview includes MVP seed data and inferred relationships, not a real-time, fully verified industry database. Read each relationship alongside its sources, evidence strength, and review status; inference is not confirmation.',
    },
    sources: [
      { label: { zh: '图谱筛选实现', en: 'Graph filtering implementation' }, path: 'src/lib/graph.ts' },
      {
        label: { zh: '证据审核校验脚本', en: 'Evidence-review validation script' },
        path: 'scripts/validate-evidence-review.mjs',
      },
      { label: { zh: '能力与数据说明', en: 'Capabilities and data notes' }, path: 'README.md' },
    ],
    screenshot: {
      src: '/static/images/projects/ai-capital-demo.webp',
      width: 1280,
      height: 720,
      alt: {
        zh: 'AI Capital Map：筛选器、实体列表及围绕 OpenAI 的产业关系图谱',
        en: 'AI Capital Map: filters, entities, and an industry graph centered on OpenAI',
      },
      caption: {
        zh: '公开预览截图 · 2026.10.05 · 非实时数据',
        en: 'Public preview capture · Oct 5, 2026 · Not live data',
      },
    },
  },
];
