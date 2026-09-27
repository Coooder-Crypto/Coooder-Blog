import type { ReactNode } from 'react';

import { genPageMetadata } from 'app/seo';

export const metadata = genPageMetadata({
  title: 'Projects',
  description: 'Selected work across AI agents, data systems, developer tools, and collaborative software.',
});

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
