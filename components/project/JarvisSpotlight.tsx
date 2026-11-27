'use client';

import { PixelArrowUpRight } from '@/components/ui/PixelIcons';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

const layers = [
  {
    title: { zh: '多仓库解耦', en: 'Multi-repo separation' },
    detail: {
      zh: '将上游 Agent Runtime 与提示词、路由、数据管道、部署脚本分离维护，不污染运行时源码。',
      en: 'Separates upstream agent runtime from prompts, routing, data pipelines, and host ops without forking the core.',
    },
  },
  {
    title: { zh: '证据型第二大脑', en: 'Evidence-first second brain' },
    detail: {
      zh: '基于 Git + Obsidian 的 jarvis-brain：以 me/ 个人主干、agent-sessions 交互萃取与 visibility 隐私分层组织长期上下文。',
      en: 'A Git-backed Obsidian vault combining a me/ personal core, distilled agent-sessions provenance, and visibility privacy boundaries.',
    },
  },
  {
    title: { zh: '受控隐私边界', en: 'Controlled privacy boundary' },
    detail: {
      zh: '原始个人数据、凭据与外部导出留在本地数据库与忽略目录，Agent 只通过受控 CLI 读取聚合摘要。',
      en: 'Raw personal exports and credentials stay local and untracked; agents only read bounded summaries via controlled CLIs.',
    },
  },
  {
    title: { zh: '双模型对照研究', en: 'Dual-model review loop' },
    detail: {
      zh: '对情报与市场研究采用“一线分析 + 独立盲审质询”的只读管道，不保存签名权限，不自动下单。',
      en: 'Read-only research pipelines pair primary synthesis with blind review and adversarial checks—no signing keys or execution.',
    },
  },
] as const;

export default function JarvisSpotlight() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <section id="jarvis-system" className="editorial-section" aria-labelledby="jarvis-heading">
      <div className="pixel-divider" aria-hidden="true" />
      <div className="jarvis-editorial">
        <p className="jarvis-editorial-kicker">
          {zh ? '私有个人系统 · 本地优先' : 'Private personal stack · Local-first'}
        </p>
        <h2 id="jarvis-heading">
          {zh ? 'Jarvis：常驻个人 Agent 与第二大脑' : 'Jarvis: Always-on personal agent & second brain'}
        </h2>
        <p className="jarvis-editorial-desc">
          {zh
            ? '除了对外公开的项目，我日常维护着一套部署在自有常驻节点上的个人 Agent 系统 Jarvis——以飞书和终端为入口，把研究笔记、日常记录、信息情报与写作草稿沉淀进受控的数据层与 Obsidian 第二大脑。这里只公开架构原则，不公开任何私人数据与凭据。'
            : 'Alongside public builds, I run Jarvis—a private, local-first personal agent stack on a dedicated host. It connects chat and terminal workflows to controlled data pipelines and an Obsidian second brain. Only the architecture principles are shared here.'}
        </p>

        <ul className="jarvis-editorial-layers">
          {layers.map((layer) => (
            <li key={layer.title.en}>
              <h3>{layer.title[language]}</h3>
              <p>{layer.detail[language]}</p>
            </li>
          ))}
        </ul>

        <div className="jarvis-editorial-links">
          <Link href="/blog/repo-may-no-longer-be-source-of-truth" className="text-link">
            {zh ? '阅读架构文章' : 'Architecture essay'} <PixelArrowUpRight size={13} />
          </Link>
          <Link href="/blog/how-hermes-agent-self-improves" className="text-link">
            {zh ? 'Hermes 四层记忆拆解' : 'Hermes four-layer memory'} <PixelArrowUpRight size={13} />
          </Link>
          <Link href="/blog/context-compaction-is-not-summarization" className="text-link">
            {zh ? '上下文压缩与 Harness' : 'Context compaction'} <PixelArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
