'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

type HarnessLayerKey = 'context' | 'execution' | 'verification';
type StackKey = 'total' | 'npm' | 'nextjs' | 'swift';

const harnessLayers: {
  key: HarnessLayerKey;
  num: string;
  label: { zh: string; en: string };
  role: { zh: string; en: string };
  question: { zh: string; en: string };
  summary: { zh: string; en: string };
  artifacts: { zh: string[]; en: string[] };
  snippetTitle: string;
  snippet: string[];
  href: string;
  linkLabel: { zh: string; en: string };
}[] = [
  {
    key: 'context',
    num: '01',
    label: { zh: 'Context Harness', en: 'Context Harness' },
    role: { zh: 'DELEGATE 前置条件', en: 'PREREQUISITE FOR DELEGATION' },
    question: { zh: 'Agent 如何可靠理解系统？', en: 'How does an agent understand the system?' },
    summary: {
      zh: '把过去散落在会议记忆与口口相传中的隐性前提显性化：模块边界、高风险目录、owner 与可按需回读的证据索引。',
      en: 'Makes implicit tribal knowledge explicit: module boundaries, owners, high-risk paths, and on-demand retrievable evidence.',
    },
    artifacts: {
      zh: ['AGENTS.md 契约', '目录职责地图', '按 ref 召回压缩状态', '高风险目录护栏'],
      en: ['AGENTS.md contract', 'Module boundary map', 'Ref-based compaction recall', 'High-risk path guardrails'],
    },
    snippetTitle: 'AGENTS.md · CONTEXT CONTRACT',
    snippet: [
      'scope:    jarvis-config / jarvis-brain / coooder-blog',
      'boundary: never read .env, raw health exports, or secrets/',
      'recall:   query summary CLI -> never dump raw time-series',
    ],
    href: '/blog/context-compaction-is-not-summarization',
    linkLabel: { zh: '阅读上下文压缩护城河', en: 'Read context compaction note' },
  },
  {
    key: 'execution',
    num: '02',
    label: { zh: 'Execution Harness', en: 'Execution Harness' },
    role: { zh: 'DELEGATE 受控执行', en: 'CONTROLLED EXECUTION' },
    question: { zh: 'Agent 如何稳定重复地完成动作？', en: 'How does an agent act reproducibly?' },
    summary: {
      zh: '将 build、lint、typecheck、预览、日志与部署收敛成标准化、幂等、低歧义的入口命令，让 Agent 在沙箱与受控环境中迭代。',
      en: 'Converges build, lint, typecheck, preview, and telemetry into standardized, idempotent entry points inside clear sandboxes.',
    },
    artifacts: {
      zh: ['标准单命令入口', '最小权限工具白名单', '增量缓存与快速失败', '可观测日志输出'],
      en: ['Standard CLI entrypoints', 'Least-privilege tool policy', 'Incremental build cache', 'Machine-parseable logs'],
    },
    snippetTitle: 'EXECUTION · STANDARD LOOP',
    snippet: [
      '$ yarn lint && yarn typecheck',
      '$ yarn build && yarn check:content',
      '→ deterministic exit code + structured diagnostics',
    ],
    href: '/blog/ai-native-engineering-design-for-agents',
    linkLabel: { zh: '阅读 AI-Native Engineering 宣言', en: 'Read AI-Native Engineering thesis' },
  },
  {
    key: 'verification',
    num: '03',
    label: { zh: 'Verification Harness', en: 'Verification Harness' },
    role: { zh: 'REVIEW & OWN 人类准出', en: 'HUMAN REVIEW & OWNERSHIP' },
    question: { zh: '如何证明这次改动真的正确？', en: 'How do we prove the change is correct?' },
    summary: {
      zh: '先建验证闭环，再放 Agent 进场。通过确定性校验、静态内容防泄漏扫描、固定 commit 证据与人类风险准出守住最终质量。',
      en: 'Build the verification loop before autonomy. Deterministic checks, export leak scanners, and human sign-off guard production.',
    },
    artifacts: {
      zh: ['确定性静态校验门禁', '草稿/隐私防泄漏扫描', '固定版本源码证据', '明确回滚与准出人'],
      en: ['Deterministic check gates', 'Draft & privacy leak scan', 'Commit-pinned evidence', 'Explicit rollback & owner'],
    },
    snippetTitle: 'VERIFICATION · EXPORT GATE',
    snippet: [
      '✓ 6 core routes · og:locale & canonical verified',
      '✓ 1 regression draft fixture · 0 leaks in out/',
      '✓ 3 public project cases · 40-char commit SHA pinned',
    ],
    href: '/blog/ai-dev-bottleneck-is-feedback-loop',
    linkLabel: { zh: '阅读 60.7% 反馈回路实证', en: 'Read 60.7% feedback-loop study' },
  },
];

const empiricalStacks: Record<
  StackKey,
  {
    label: { zh: string; en: string };
    totalMin: number;
    feedbackPct: number;
    codePct: number;
    otherPct: number;
    feedbackMin: number;
    codeMin: number;
    otherMin: number;
    highlights: { label: { zh: string; en: string }; value: string }[];
  }
> = {
  total: {
    label: { zh: '三栈合计', en: 'All 3 Stacks' },
    totalMin: 192.4,
    feedbackPct: 60.7,
    codePct: 24.0,
    otherPct: 15.3,
    feedbackMin: 116.8,
    codeMin: 46.2,
    otherMin: 29.4,
    highlights: [
      { label: { zh: '反馈基础设施', en: 'Feedback infrastructure' }, value: '116.8 min (60.7%)' },
      { label: { zh: '直接修改代码', en: 'Direct code edits' }, value: '46.2 min (24.0%)' },
      { label: { zh: '阅读与排查工具', en: 'Reading & investigation' }, value: '29.4 min (15.3%)' },
    ],
  },
  npm: {
    label: { zh: 'npm Package', en: 'npm Package' },
    totalMin: 159.6,
    feedbackPct: 60.4,
    codePct: 25.9,
    otherPct: 13.7,
    feedbackMin: 96.4,
    codeMin: 41.4,
    otherMin: 21.8,
    highlights: [
      { label: { zh: '质量与发布验证', en: 'Quality & release validation' }, value: '72.8 min' },
      { label: { zh: '测试与 Git/CI', en: 'Tests + Git / CI' }, value: '20.9 min' },
      { label: { zh: '构建与依赖准备', en: 'Build & dependency setup' }, value: '2.7 min' },
    ],
  },
  nextjs: {
    label: { zh: 'Next.js App', en: 'Next.js App' },
    totalMin: 19.0,
    feedbackPct: 59.5,
    codePct: 13.7,
    otherPct: 26.8,
    feedbackMin: 11.3,
    codeMin: 2.6,
    otherMin: 5.1,
    highlights: [
      { label: { zh: '类型检查与校验', en: 'Typecheck & validation' }, value: '4.0 min' },
      { label: { zh: '生产构建 next build', en: 'Production next build' }, value: '3.7 min' },
      { label: { zh: 'Git / CI / 测试与依赖', en: 'Git / CI / tests & deps' }, value: '3.6 min' },
    ],
  },
  swift: {
    label: { zh: 'Swift / iOS', en: 'Swift / iOS' },
    totalMin: 13.8,
    feedbackPct: 65.9,
    codePct: 15.9,
    otherPct: 18.1,
    feedbackMin: 9.1,
    codeMin: 2.2,
    otherMin: 2.5,
    highlights: [
      { label: { zh: 'xcodebuild build', en: 'xcodebuild build' }, value: '5.0 min' },
      { label: { zh: 'Swift 类型检查与校验', en: 'Swift typecheck & lint' }, value: '2.2 min' },
      { label: { zh: 'xcodebuild test + CI', en: 'xcodebuild test + CI' }, value: '1.9 min' },
    ],
  },
};

export default function HarnessLab() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const [activeLayer, setActiveLayer] = useState<HarnessLayerKey>('verification');
  const [activeStack, setActiveStack] = useState<StackKey>('total');

  const currentLayer = harnessLayers.find((layer) => layer.key === activeLayer) || harnessLayers[2];
  const currentStack = empiricalStacks[activeStack];

  return (
    <section id="harness-lab" className="editorial-section" aria-labelledby="harness-lab-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{zh ? 'INTERACTIVE LAB / 方法论与一手实证' : 'INTERACTIVE LAB / METHOD & MEASUREMENTS'}</p>
          <h2 id="harness-lab-heading">
            {zh ? (
              <>
                <em className="display-serif">Agent Harness</em> 三层底座与反馈回路实测
              </>
            ) : (
              <>
                Interactive <em className="display-serif">Agent Harness</em> &amp; feedback-loop telemetry
              </>
            )}
          </h2>
        </div>
        <Link href="/library" className="text-link">
          {zh ? '查看 23 篇研究文献雷达' : 'Open Research Radar'} <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="harness-lab-grid">
        {/* Left: Interactive 3-Layer Harness Explorer */}
        <div className="lab-card">
          <div className="lab-card-header">
            <span className="eyebrow">01 · THREE-LAYER HARNESS</span>
            <span className="lab-role-pill">
              <ShieldCheck size={13} aria-hidden="true" />
              {currentLayer.role[language]}
            </span>
          </div>

          <div className="lab-tab-strip" role="tablist" aria-label={zh ? '切换 Harness 层级' : 'Switch harness layer'}>
            {harnessLayers.map((layer) => {
              const selected = layer.key === activeLayer;
              return (
                <button
                  key={layer.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`lab-tab-btn ${selected ? 'active' : ''}`}
                  onClick={() => setActiveLayer(layer.key)}
                >
                  {selected && (
                    <motion.span
                      layoutId="harness-tab-bg"
                      className="lab-tab-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="lab-tab-label">
                    <i>{layer.num}</i> {layer.label[language]}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentLayer.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lab-layer-body"
            >
              <h3>{currentLayer.question[language]}</h3>
              <p className="lab-layer-summary">{currentLayer.summary[language]}</p>

              <ul className="lab-artifact-chips">
                {currentLayer.artifacts[language].map((artifact) => (
                  <li key={artifact}>
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>{artifact}</span>
                  </li>
                ))}
              </ul>

              <div className="lab-terminal">
                <div className="lab-terminal-bar">
                  <Terminal size={12} aria-hidden="true" />
                  <span>{currentLayer.snippetTitle}</span>
                </div>
                <pre>
                  <code>{currentLayer.snippet.join('\n')}</code>
                </pre>
              </div>

              <Link href={currentLayer.href} className="text-link lab-footer-link">
                {currentLayer.linkLabel[language]} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Interactive 192.4-Min Empirical Feedback-Loop Visualizer */}
        <div className="lab-card">
          <div className="lab-card-header">
            <span className="eyebrow">02 · EMPIRICAL EXECUTION STUDY</span>
            <span className="lab-mono-metric">{currentStack.totalMin.toFixed(1)} MIN</span>
          </div>

          <div className="lab-stack-strip" role="tablist" aria-label={zh ? '切换技术栈实测数据' : 'Switch measured stack'}>
            {(Object.keys(empiricalStacks) as StackKey[]).map((key) => {
              const selected = key === activeStack;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`lab-stack-btn ${selected ? 'active' : ''}`}
                  onClick={() => setActiveStack(key)}
                >
                  {empiricalStacks[key].label[language]}
                </button>
              );
            })}
          </div>

          <div className="lab-empirical-body">
            <div className="lab-big-stat">
              <span className="display-serif lab-big-number">{currentStack.feedbackPct.toFixed(1)}%</span>
              <div>
                <strong>{zh ? '花在构建、校验、测试与 CI 反馈回路' : 'Spent on build, checks, tests & CI feedback'}</strong>
                <p>
                  {zh
                    ? `直接改代码仅占 ${currentStack.codePct.toFixed(1)}%（${currentStack.codeMin.toFixed(1)} 分钟）`
                    : `Direct code edits took only ${currentStack.codePct.toFixed(1)}% (${currentStack.codeMin.toFixed(1)} min)`}
                </p>
              </div>
            </div>

            <div className="lab-bars">
              <div className="lab-bar-row">
                <div className="lab-bar-label">
                  <span>{zh ? '反馈基础设施（Feedback Loop）' : 'Feedback Infrastructure'}</span>
                  <span>
                    {currentStack.feedbackPct.toFixed(1)}% · {currentStack.feedbackMin.toFixed(1)}m
                  </span>
                </div>
                <div className="lab-bar-track">
                  <motion.div
                    className="lab-bar-fill fill-accent"
                    animate={{ width: `${currentStack.feedbackPct}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  />
                </div>
              </div>

              <div className="lab-bar-row">
                <div className="lab-bar-label">
                  <span>{zh ? '直接修改代码（Direct Edits）' : 'Direct Code Changes'}</span>
                  <span>
                    {currentStack.codePct.toFixed(1)}% · {currentStack.codeMin.toFixed(1)}m
                  </span>
                </div>
                <div className="lab-bar-track">
                  <motion.div
                    className="lab-bar-fill fill-blue"
                    animate={{ width: `${currentStack.codePct}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  />
                </div>
              </div>

              <div className="lab-bar-row">
                <div className="lab-bar-label">
                  <span>{zh ? '阅读排查与其他（Other Tools）' : 'Reading & Investigation'}</span>
                  <span>
                    {currentStack.otherPct.toFixed(1)}% · {currentStack.otherMin.toFixed(1)}m
                  </span>
                </div>
                <div className="lab-bar-track">
                  <motion.div
                    className="lab-bar-fill fill-muted"
                    animate={{ width: `${currentStack.otherPct}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  />
                </div>
              </div>
            </div>

            <dl className="lab-breakdown-list">
              {currentStack.highlights.map((item) => (
                <div key={item.label.en}>
                  <dt>{item.label[language]}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="lab-empirical-footer">
              <span className="lab-caveat">
                {zh ? '单项目三栈实证样本，非通用行业基准。' : 'Single-project 3-stack study, not a universal benchmark.'}
              </span>
              <Link href="/blog/ai-dev-bottleneck-is-feedback-loop" className="text-link">
                {zh ? '读完整实证分析' : 'Full analysis'} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
