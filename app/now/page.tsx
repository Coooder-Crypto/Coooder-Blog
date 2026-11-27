import { genPageMetadata } from 'app/seo';
import NowView from '@/components/now/NowView';

export const metadata = genPageMetadata({
  title: 'Now — 现在在做什么',
  description:
    'Coooder 当下阶段的主线聚焦：Jarvis 第二大脑改造、Dark Forest 开源、Agent Harness 与 MemTable 实践，以及日常训练与阅读节奏。',
});

export default function NowPage() {
  return <NowView />;
}
