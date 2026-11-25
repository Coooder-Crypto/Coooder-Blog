import { BrandIconType } from '@/components/ui/BrandIcon';

type PopularTag = {
  href: string;
  iconType: BrandIconType;
  slug: string;
  title: string;
};

const popularTags: PopularTag[] = [
  {
    href: '/tags/agents',
    iconType: 'AI',
    slug: 'agents',
    title: 'Agents',
  },
  {
    href: '/tags/agent-harness',
    iconType: 'Bash',
    slug: 'agent-harness',
    title: 'Agent Harness',
  },
  {
    href: '/tags/ai-native-engineering',
    iconType: 'Git',
    slug: 'ai-native-engineering',
    title: 'AI-Native',
  },
  {
    href: '/tags/architecture',
    iconType: 'Markdown',
    slug: 'architecture',
    title: 'Architecture',
  },
  {
    href: '/tags/react',
    iconType: 'React',
    slug: 'react',
    title: 'React',
  },
  {
    href: '/tags/nextjs',
    iconType: 'NextJS',
    slug: 'nextjs',
    title: 'Next.js',
  },
  {
    href: '/tags/javascript',
    iconType: 'Javascript',
    slug: 'javascript',
    title: 'JavaScript',
  },
];

export default popularTags;
