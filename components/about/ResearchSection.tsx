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
          <span className="research-badge">FEDERATED LEARNING · BYZANTINE RESILIENCE · MULTI-AGENT</span>
          <span className="research-venue">{zh ? '北邮研究生阶段研究工作' : 'Graduate Research @ BUPT'}</span>
        </div>
        <h3>FedTGR: Topology-Guided Byzantine-Resilient Federated Learning</h3>
        <p className="research-lead">
          {zh
            ? '把“逻辑拓扑”从联邦学习的固定通信背景提升为可调的鲁棒性控制变量：在服务器侧引入虚拟分组锚点与两级 ADMM 一致性约束，作为现有鲁棒聚合规则（Trimmed Mean、Median、Krum、RFA、Huber、FLAD）的正交增强层，并探索其向大规模 AI Agent 可信协同场景的延伸。'
            : 'Elevates virtual server-side topology from a static backdrop into a tunable robustness control variable. Combines outlier filtering with two-level grouped ADMM consensus as an orthogonal enhancement compatible with standard robust aggregators (TM, Median, Krum, RFA, Huber, FLAD), exploring extensions to resilient multi-agent coordination.'}
        </p>
        <ul className="research-highlights">
          <li>
            <strong>{zh ? '核心思路' : 'Core idea'}</strong>
            <span>
              {zh
                ? '不替换现有聚合器，而是通过“异常过滤 + 分组共识”双层机制抑制残余恶意偏差扩散。'
                : 'Augments rather than replaces aggregators via dual-layer filtering plus grouped consensus.'}
            </span>
          </li>
          <li>
            <strong>{zh ? '口径边界' : 'Scope note'}</strong>
            <span>
              {zh
                ? '主要实验基于标准联邦图像分类与多攻击消融验证，Agent 协同层属于机制迁移与系统框架映射。'
                : 'Primary ablations evaluate multi-attack federated vision benchmarks; the agent framing maps mechanism transferability.'}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
