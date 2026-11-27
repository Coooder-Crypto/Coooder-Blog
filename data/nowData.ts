import type { LocalizedText } from '@/types/data';

export interface NowThread {
  num: string;
  tag: string;
  title: LocalizedText;
  summary: LocalizedText;
  href?: string;
  linkLabel?: LocalizedText;
}

export interface NowSectionGroup {
  category: LocalizedText;
  items: { zh: string[]; en: string[] };
}

// Public snapshot curated from jarvis-brain/me/now.md (private items excluded).
export const nowMeta = {
  updatedAt: '2026-11-26',
  location: { zh: '北京 · BUPT', en: 'Beijing · BUPT' },
  edition: 'NOW · 2026.11',
  lead: {
    zh: '这一页记录我这个月真正在推进的事、保持的节奏，以及明确决定暂时不做的事。灵感来自 Derek Sivers 的 Now Page——公开内容源自本地 jarvis-brain/me/now.md 的对外视图。',
    en: 'A compact snapshot of what I am actively building, reading, and intentionally saying no to this month. Inspired by the /now page movement and curated from the public view of jarvis-brain/me/now.md.',
  },
} as const;

export const nowThreads: NowThread[] = [
  {
    num: '01',
    tag: 'SECOND BRAIN · SSOT',
    title: { zh: '把 jarvis-brain 改造成真正的「个人定性大脑」', en: 'Turning jarvis-brain into a true personal SSOT' },
    summary: {
      zh: '新增 me/ 个人主干层、Agent 交互两步萃取（sources/agent-sessions/）与 visibility 隐私分层，让 AI 协作既懂上下文又守住边界。',
      en: 'Added a me/ personal core, two-step agent-session provenance, and visibility privacy walls so agents stay grounded without crossing boundaries.',
    },
    href: '/projects#jarvis-system',
    linkLabel: { zh: '查看 Jarvis 架构', en: 'Inspect Jarvis stack' },
  },
  {
    num: '02',
    tag: 'OPEN SOURCE · ONCHAIN',
    title: { zh: 'Dark Forest（DFArchon）与隐私链上模块', en: 'Dark Forest (DFArchon) & Aztec/Noir work' },
    summary: {
      zh: '持续推进 DFArchon 社区生态：维护 Web Worker 地图探索调度与去重，并探索 Aztec/Noir 玩家门控消息与工具链升级。',
      en: 'Iterating on DFArchon community builds: Web Worker exploration scheduling plus Aztec/Noir player-gated messaging and toolchain upgrades.',
    },
    href: 'https://dfarchon.xyz/',
    linkLabel: { zh: '访问 DFArchon', en: 'Visit DFArchon' },
  },
  {
    num: '03',
    tag: 'LOCAL-FIRST · LEDGER',
    title: { zh: 'Agent Harness、MemTable 与实证写作', en: 'Agent Harnesses, MemTable & empirical writing' },
    summary: {
      zh: '继续打磨「记忆负责回忆，账本负责计算」的本地优先工具栈（Vital Agent Sync / MemTable），并把一线实践写成可复核的文章。',
      en: 'Refining local-first tools around “memory recalls, ledger computes” (Vital Agent Sync / MemTable) and documenting empirical engineering notes.',
    },
    href: '/projects',
    linkLabel: { zh: '查看代表构建', en: 'Explore builds' },
  },
  {
    num: '04',
    tag: 'MILESTONE · 2027 M.ENG.',
    title: { zh: '北邮硕士中期推进与秋招收尾', en: 'BUPT M.Eng. mid-term & recruiting wrap-up' },
    summary: {
      zh: '推进研究生中期答辩与学术收尾，同时完成秋招阶段的面试与职业方向取舍。',
      en: 'Advancing graduate mid-term milestones at BUPT alongside autumn engineering interviews and career decisions.',
    },
    href: '/about#experience',
    linkLabel: { zh: '查看完整经历', en: 'View background' },
  },
];

export const nowRhythmGroups: NowSectionGroup[] = [
  {
    category: { zh: '身体与日常节奏', en: 'TRAINING & DAILY RHYTHM' },
    items: {
      zh: [
        '每周 4 次力量训练（腿背 / 胸肩分化）+ 2 次有氧跑步 + 周日完全休息',
        '规律作息与食堂轻食，用周均趋势而非单日波动做复盘',
        '晚间保留固定放松时段，不让娱乐侵占白天主线',
      ],
      en: [
        '4x weekly strength training (legs/back & chest/shoulders) + 2x running + Sunday rest',
        'Consistent schedule and simple meals, tracking weekly trends instead of daily noise',
        'Dedicated evening downtime so daytime focus stays protected',
      ],
    },
  },
  {
    category: { zh: '最近在看 / 在玩', en: 'WATCHING, READING & PLAYING' },
    items: {
      zh: [
        '影视：正在追《火线（The Wire）》',
        '游戏：晚间适量 CS2 沙二、杀戮尖塔与 Dark Forest',
        '阅读：持续养成睡前看书习惯，同时追踪 Agent Harness 前沿论文',
      ],
      en: [
        'Watching: The Wire',
        'Playing: Counter-Strike 2 (Dust II), Slay the Spire, and Dark Forest in the evenings',
        'Reading: Building a bedtime reading habit alongside Agent Harness research papers',
      ],
    },
  },
  {
    category: { zh: '明确暂缓 / 不做的事', en: 'EXPLICITLY NOT DOING' },
    items: {
      zh: [
        '不再为了追求「泛用框架感」造当前用不上的轮子',
        '不用 AI 顺滑模板替自己写博客正文——思考与文字留给自己',
        '不把未经真实运行核验的数字当作已完成结论对外展示',
      ],
      en: [
        'No longer building speculative generic frameworks before real usage demands them',
        'No AI filler in blog prose — thinking and writing remain human-owned',
        'Never presenting unverified assumptions or targets as measured production results',
      ],
    },
  },
];
