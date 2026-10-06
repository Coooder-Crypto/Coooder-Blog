import type { LocalizedText } from '@/types/data';

interface ProjectEvidence {
  title: string;
  repo: string;
  revision: string;
  status: LocalizedText;
  implementation: LocalizedText;
  boundary: LocalizedText;
  sources: { label: LocalizedText; path: string }[];
  screenshot?: { src: string; width: number; height: number; alt: LocalizedText; caption: LocalizedText };
}

// Public repository evidence, reviewed on 2026-10-06. Pin links to the reviewed revisions.
export const projectEvidence: ProjectEvidence[] = [
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
    title: 'ByteNote',
    repo: 'Coooder-Crypto/ByteNote',
    revision: '36bed7bca0f306d0b5d66f9f754f1cde8c86ed33',
    status: { zh: '离线优先的协作文档应用', en: 'Offline-first collaborative writing' },
    implementation: {
      zh: '用 IndexedDB 保存本地笔记，通过 dirty 队列恢复联网后的同步。useSync 会检查网络和登录状态、避免重复执行同步，并在仍有待同步项时安排重试；Yjs 协作服务可独立自建。',
      en: 'Persists notes in IndexedDB and syncs a dirty queue after reconnection. useSync checks connectivity and authentication, prevents concurrent flushes, and schedules retries for pending items. The Yjs collaboration service can be self-hosted separately.',
    },
    boundary: {
      zh: '协作服务只广播房间更新，持久化由主应用负责。截图取自仓库演示，实际同步需要有效登录与服务端连接，不代表多人规模或性能基准。',
      en: 'The collaboration service broadcasts room updates; persistence belongs to the main app. These repository demo captures are not scale or performance benchmarks. Actual synchronization requires authentication and a server connection.',
    },
    sources: [
      { label: { zh: '同步队列实现', en: 'Sync queue implementation' }, path: 'hooks/network/useSync.ts' },
      { label: { zh: '架构与演示说明', en: 'Architecture and demo notes' }, path: 'README.md' },
      { label: { zh: '自建协作服务', en: 'Self-hosted collaboration' }, path: 'service/README.md' },
    ],
    screenshot: {
      src: '/static/images/projects/bytenote.webp',
      width: 1600,
      height: 608,
      alt: {
        zh: 'ByteNote 演示：离线创建笔记与恢复联网后的同步状态',
        en: 'ByteNote demo: offline note creation and synchronization after reconnecting',
      },
      caption: {
        zh: '仓库演示截图 · 离线 / 在线状态对照',
        en: 'Repository demo capture · Offline / online comparison',
      },
    },
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
