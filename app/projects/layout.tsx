import type { ReactNode } from 'react';

import { genPageMetadata } from 'app/seo';

export const metadata = genPageMetadata({
  title: '项目',
  description:
    'Coooder 的项目案例：本地优先的健康数据连接器、AI 产业图谱与协作文档工具。附公开源码、实现证据与项目边界。',
});

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
