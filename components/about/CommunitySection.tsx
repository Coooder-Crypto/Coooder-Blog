'use client';

import { ArrowUpRight, Award, Code2, Users } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';

const communityItems = [
  {
    icon: 'award' as const,
    tag: 'HACKATHON · ETH BEIJING 2025 & MORPH',
    title: { zh: 'zkAssetRaffle · 双赛道一等奖', en: 'zkAssetRaffle · Dual 1st Prize' },
    detail: {
      zh: '获 ETH Beijing 2025 Public Goods 一等奖与 Morph Hackathon 一等奖：用 TEE 机密承诺、加密二维码与 Merkle/ZK 证明构建实物资产可验证公平抽奖协议。',
      en: '1st Prize in ETH Beijing 2025 Public Goods and Morph Hackathon: a verifiable RWA raffle protocol pairing confidential commitments, encrypted QR codes, and Merkle/ZK proofs.',
    },
    href: 'https://github.com/Coooder-Crypto/zk-asset-raffle',
    linkLabel: { zh: '查看仓库', en: 'View repository' },
  },
  {
    icon: 'award' as const,
    tag: 'HACKATHON · ETH SHANGHAI 2025 & ETH BEIJING 2024',
    title: { zh: 'OwnFace & Proof of Discord', en: 'OwnFace & Proof of Discord' },
    detail: {
      zh: 'OwnFace（零知识人脸生物认证栈）获 ETH Shanghai 2025 二等奖；zkp-discord（ZK Email 身份证明）获 ETH Beijing 2024 三等奖与 Scroll 二等奖。',
      en: 'OwnFace (ZK biometric auth stack) won 2nd Prize at ETH Shanghai 2025; zkp-discord (ZK Email verification) won 3rd Prize at ETH Beijing 2024 and 2nd Prize at Scroll Hackathon.',
    },
    href: 'https://github.com/Coooder-Crypto/OwnFace',
    linkLabel: { zh: '查看 OwnFace', en: 'View OwnFace' },
  },
  {
    icon: 'code' as const,
    tag: 'OPEN SOURCE · SINCE 2023',
    title: { zh: 'DFArchon（Dark Forest 生态）', en: 'DFArchon (Dark Forest Ecosystem)' },
    detail: {
      zh: '自 2023 年起参与全链上游戏 Dark Forest 社区开发，覆盖 Web Worker 地图探索分片/调度去重，以及 Aztec/Noir 隐私消息模块与工具链升级。',
      en: 'Contributing since 2023 to Dark Forest Web Worker map-exploration scheduling and deduplication, plus Aztec/Noir privacy messaging modules and toolchain upgrades.',
    },
    href: 'https://github.com/dfarchon',
    linkLabel: { zh: '查看组织仓库', en: 'View GitHub org' },
  },
  {
    icon: 'users' as const,
    tag: 'COMMUNITY · BUILDER & LEAD',
    title: { zh: 'BUPT3DAO 前会长 · LXDAO & ETHPanda', en: 'Former President, BUPT3DAO · LXDAO & ETHPanda' },
    detail: {
      zh: '曾任北京邮电大学区块链协会会长，长期作为 LXDAO 与 ETHPanda 全栈贡献者参与社区平台、黑客松评审系统与开发者生态共创。',
      en: 'Former president of BUPT Blockchain Association; long-term fullstack contributor across LXDAO and ETHPanda community tooling and hackathon platforms.',
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
