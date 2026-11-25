import { genPageMetadata } from 'app/seo';
import ResearchRadar from '@/components/library/ResearchRadar';

export const metadata = genPageMetadata({
  title: 'Agent Harness 研究雷达',
  description:
    '整理自 jarvis-brain 的 23 篇 Agent Harness 关键论文与工程文献，覆盖范式基础、多 Agent 编排、运行时与可观测安全评测四条主线。',
});

export default function LibraryPage() {
  return <ResearchRadar />;
}
