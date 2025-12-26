import type readingTime from 'reading-time';

import type projectsData from '@/data/projectsData';

export type ProjectDataType = (typeof projectsData)[0];

export interface ProjectCardProps {
  project: ProjectDataType;
}

export type ReadingTime = ReturnType<typeof readingTime>;

export interface BlogMetaProps {
  date: string;
  readingTime: ReadingTime;
}

export interface ScrollButtonProps {
  onClick: () => void;
  ariaLabel: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
