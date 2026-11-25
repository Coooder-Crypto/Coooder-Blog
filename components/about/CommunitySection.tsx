'use client';

import { ArrowUpRight, Award, Code2, Users } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

const communityItems = [
  {
    icon: 'award' as const,
    tag: 'HACKATHON · ETH BEIJING',
    title: { zh: 'Public Goods 赛道三等奖', en: 'Public Goods Track · 3rd Prize' },
    detail: {
      zh: '在 ETH Beijing 黑客松中与团队从零构建并完成现场演示，聚焦公共物品与开发者协作体验。',
      en: 'Shipped and pitched an end-to-end prototype in the Public Goods track at ETH Beijing.',
    },
  },
  {
    icon: 'award' as const,
    tag: 'HACKATHON · ETHGLOBAL BANGKOK',
    title: { zh: 'WorldCoin 赛道获奖项目', en: 'ETHGlobal Bangkok · WorldCoin Award' },
    detail: {
      zh: '参与 ETHGlobal 曼谷黑客松，围绕零知识身份与前端交互链路完成高强度 48 小时交付。',
      en: 'Built and delivered a 48-hour prototype in Bangkok focused on verifiable identity and frontend UX.',
    },
  },
  {
    icon: 'code' as const,
    tag: 'OPEN SOURCE · SINCE 2023',
    title: { zh: 'DFArchon（Dark Forest 生态）', en: 'DFArchon (Dark Forest Ecosystem)' },
    detail: {
      zh: '自 2023 年起参与全链上游戏 Dark Forest 社区开发，深度参与 Web Worker 地图探索分片、调度与任务去重架构。',
      en: 'Contributing since 2023 to Web Worker map-exploration sharding, scheduling, and task deduplication in the Dark Forest ecosystem.',
    },
    href: 'https://github.com/dfarchon',
    linkLabel: { zh: '查看组织仓库', en: 'View GitHub org' },
  },
  {
    icon: 'users' as const,
    tag: 'COMMUNITY · BUILDER & LEAD',
    title: { zh: 'BUPT3DAO 前会长 · LXDAO Builder', en: 'Former President, BUPT3DAO · LXDAO Builder' },
    detail: {
      zh: '曾任北京邮电大学区块链协会会长，联动 LXDAO、EthPanda、PlanckerDAO 等社区组织技术分享、产品调研与黑客松共创。',
      en: 'Led the BUPT Blockchain Association and contributed as an LXDAO builder & S10 product researcher across open communities.',
    },
    href: 'https://lxdao.io/',
    linkLabel: { zh: '了解 LXDAO', en: 'Visit LXDAO' },
  },
] as const;

export default function CommunitySection() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  const renderIcon = (type: 'award' | 'code' | 'users') => {
    if (type === 'award') return <Award size={16} aria-hidden="true" />;
    if (type === 'code') return <Code2 size={16} aria-hidden="true" />;
    return <Users size={16} aria-hidden="true" />;
  };

  return (
    <section id="community" className="not-prose about-section" aria-labelledby="community-heading">
      <p className="eyebrow">{zh ? '黑客松 · 开源 · 社区' : 'HACKATHONS · OPEN SOURCE · COMMUNITY'}</p>
      <h2 id="community-heading">{zh ? '在社区与黑客松里折腾' : 'Building in public with communities'}</h2>
      <ul className="community-grid">
        {communityItems.map((item) => (
          <li key={item.tag} className="community-card">
            <div className="community-card-top">
              <span className="community-icon">{renderIcon(item.icon)}</span>
              <span className="eyebrow">{item.tag}</span>
            </div>
            <h3>{item.title[language]}</h3>
            <p>{item.detail[language]}</p>
            {'href' in item && item.href && (
              <Link href={item.href} className="text-link community-link">
                {item.linkLabel[language]} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
