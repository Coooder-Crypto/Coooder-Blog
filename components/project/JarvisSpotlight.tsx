'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/Link';
import { ParallaxPlate } from '@/components/ui/EditorialMotion';
import { JarvisSystemSvg } from '@/components/ui/EditorialDiagrams';
import { useLanguage } from '@/lib/i18n';

const layers = [
  {
    num: '01',
    tag: 'RUNTIME & CONFIG',
    title: { zh: '多仓库解耦', en: 'Multi-repo separation' },
    detail: {
      zh: '将上游 Agent Runtime 与提示词、路由、数据管道、部署脚本分离维护，不污染运行时源码。',
      en: 'Separates upstream agent runtime from prompts, routing, data pipelines, and host ops without forking the core.',
    },
  },
  {
    num: '02',
    tag: 'SECOND BRAIN',
    title: { zh: '证据型第二大脑', en: 'Evidence-first second brain' },
    detail: {
      zh: '基于 Git + Obsidian 的 jarvis-brain：按 inbox → sources → resources → synthesis → decisions 分层沉淀。',
      en: 'A Git-backed Obsidian vault layered by inbox, sources, resources, synthesis, and decisions for grounded retrieval.',
    },
  },
  {
    num: '03',
    tag: 'DATA BOUNDARY',
    title: { zh: '受控隐私边界', en: 'Controlled privacy boundary' },
    detail: {
      zh: '原始个人数据、凭据与外部导出留在本地数据库与忽略目录，Agent 只通过受控 CLI 读取聚合摘要。',
      en: 'Raw personal exports and credentials stay local and untracked; agents only read bounded summaries via controlled CLIs.',
    },
  },
  {
    num: '04',
    tag: 'VERIFICATION',
    title: { zh: '双模型对照研究', en: 'Dual-model review loop' },
    detail: {
      zh: '对情报与市场研究采用“一线分析 + 独立盲审质询”的只读管道，不保存签名权限，不自动下单。',
      en: 'Read-only research pipelines pair primary synthesis with blind review and adversarial checks—no signing keys or execution.',
    },
  },
] as const;

export default function JarvisSpotlight({
  compact = false,
  variant = 'full',
}: {
  compact?: boolean;
  variant?: 'full' | 'summary';
}) {
  const { language } = useLanguage();
  const zh = language === 'zh';

  if (variant === 'summary') {
    return (
      <section id="jarvis-system" className="editorial-section" aria-labelledby="jarvis-heading">
        <div className="jarvis-monolith jarvis-monolith-summary">
          <div className="jarvis-monolith-header">
            <div>
              <p className="eyebrow">PRIVATE PERSONAL STACK · LOCAL-FIRST</p>
              <h2 id="jarvis-heading">
                {zh ? (
                  <>
                    <em className="display-serif">Jarvis</em>：常驻个人 Agent 与第二大脑
                  </>
                ) : (
                  <>
                    <em className="display-serif">Jarvis</em>: Always-on personal agent &amp; second brain
                  </>
                )}
              </h2>
              <p className="jarvis-summary-desc">
                {zh
                  ? '部署在自有常驻节点上的多仓库个人系统：上游 Hermes 运行时与配置/数据/Obsidian 第二大脑完全解耦，敏感数据硬隔离，仅通过受控 CLI 与只读研究管道交互。'
                  : 'A multi-repo personal system running on a private host—decoupling upstream Hermes runtime from config, controlled Postgres summaries, and an Obsidian second brain.'}
              </p>
            </div>
            <div className="jarvis-summary-actions">
              <Link href="/#jarvis-system" className="monolith-top-link">
                {zh ? '查看完整拓扑' : 'View topology'} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/blog/repo-may-no-longer-be-source-of-truth" className="monolith-link">
                {zh ? '阅读架构文章' : 'Architecture essay'} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jarvis-system" className="editorial-section" aria-labelledby="jarvis-heading">
      <div className="jarvis-monolith">
        <div className="jarvis-monolith-header">
          <div>
            <p className="eyebrow">
              {compact ? (zh ? '02 / 正在运行的个人系统' : '02 / LIVING PERSONAL STACK') : 'LIVING SYSTEM ARCHITECTURE'}
            </p>
            <h2 id="jarvis-heading">
              {zh ? (
                <>
                  <em className="display-serif">Jarvis</em>：持续运行的个人 Agent 与第二大脑
                </>
              ) : (
                <>
                  <em className="display-serif">Jarvis</em>: Local-first personal agent &amp; second brain
                </>
              )}
            </h2>
          </div>
          <Link href="/blog/repo-may-no-longer-be-source-of-truth" className="monolith-top-link">
            {zh ? '架构思考全文' : 'Architecture essay'} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="jarvis-spotlight-top">
          <div className="jarvis-spotlight-lead">
            <span className="jarvis-badge">LOCAL-FIRST · PRIVATE HOST · READ-ONLY BOUNDARY</span>
            <p>
              {zh
                ? '除了对外公开的项目，我日常维护着一套部署在自有常驻节点上的个人 Agent 系统 Jarvis——以飞书和终端为入口，把研究笔记、日常记录、信息情报与写作草稿沉淀进受控的数据层与 Obsidian 第二大脑。这里只公开它的架构原则，不公开任何私人数据与节点凭据。'
                : 'Alongside public builds, I run Jarvis—a private, local-first personal agent stack on a dedicated host. It connects chat and terminal workflows to controlled data pipelines and an Obsidian second brain. Only the architecture principles are shared here; no personal data or host credentials are public.'}
            </p>
            <div className="jarvis-spotlight-links">
              <Link href="/blog/ai-native-engineering-design-for-agents" className="monolith-link">
                {zh ? 'AI-Native Engineering 工程观' : 'AI-Native Engineering thesis'}{' '}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/blog/how-hermes-agent-self-improves" className="monolith-link">
                {zh ? 'Hermes 四层记忆拆解' : 'Hermes four-layer memory analysis'}{' '}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/blog/context-compaction-is-not-summarization" className="monolith-link">
                {zh ? '上下文压缩与 Harness 护城河' : 'Context compaction as harness moat'}{' '}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <figure className="jarvis-editorial-plate">
            <ParallaxPlate className="jarvis-plate-frame">
              <JarvisSystemSvg />
            </ParallaxPlate>
            <figcaption>PLATE 02 — LIVE SYSTEM TOPOLOGY &amp; PRIVACY BOUNDARY</figcaption>
          </figure>
        </div>

        <ul className="jarvis-layer-grid">
          {layers.map((layer) => (
            <li key={layer.tag} className="jarvis-layer-card">
              <div className="jarvis-layer-meta">
                <span className="display-serif">{layer.num}</span>
                <span className="eyebrow">{layer.tag}</span>
              </div>
              <h3>{layer.title[language]}</h3>
              <p>{layer.detail[language]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
