'use client';

import { useLanguage } from '@/lib/i18n';

export default function ResearchSection() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  return (
    <section id="research" className="not-prose about-section" aria-labelledby="research-heading">
      <p className="eyebrow">{zh ? '学术研究' : 'ACADEMIC RESEARCH'}</p>
      <h2 id="research-heading">{zh ? '研究方向' : 'Research focus'}</h2>
      <div className="research-dossier-card">
        <div className="research-dossier-meta">
          <span className="research-badge">IEEE ICC (ACCEPTED) · IEEE TNSE (ACCEPTED)</span>
          <span className="research-venue">{zh ? '北邮研究生阶段研究工作' : 'Graduate Research @ BUPT'}</span>
        </div>
        <h3>FedTGR: Topology-Guided Byzantine-Resilient Federated Learning &amp; Trustworthy Multi-Agent Coordination</h3>
        <p className="research-lead">
          {zh
            ? '把“逻辑拓扑”从联邦学习的固定通信背景提升为可调的鲁棒性控制变量：在服务器侧引入虚拟分组锚点与两级 ADMM 一致性约束，作为现有鲁棒聚合规则（Trimmed Mean、Median、Krum、RFA、Huber、FLAD）的正交增强层，并进一步延伸至大规模 AI Agent 可信模型协同场景。'
            : 'Elevates virtual server-side topology from a static backdrop into a tunable robustness control variable. Combines outlier filtering with two-level grouped ADMM consensus as an orthogonal enhancement compatible with standard robust aggregators (TM, Median, Krum, RFA, Huber, FLAD), extending the framework to trustworthy large-scale multi-agent coordination.'}
        </p>
        <ul className="research-highlights">
          <li>
            <strong>{zh ? '论文成果' : 'Publications'}</strong>
            <span>
              {zh
                ? 'IEEE ICC 联邦学习第一作者（已录用）；IEEE TNSE 自主 Agent 系统专刊学生一作（已录用）。'
                : 'First author at IEEE ICC (Accepted, Byzantine-robust FL); student first author at IEEE TNSE Special Issue on Autonomous Agent Systems (Accepted).'}
            </span>
          </li>
          <li>
            <strong>{zh ? '核心思路与边界' : 'Core idea & scope'}</strong>
            <span>
              {zh
                ? '以“异常过滤 + 分组共识”正交增强现有聚合器；核心消融基于联邦视觉多攻击基准，Agent 协同层为机制迁移与系统框架映射。'
                : 'Augments existing aggregators via dual-layer filtering and grouped consensus; core ablations run on multi-attack FL benchmarks while the agent layer maps mechanism transferability.'}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
