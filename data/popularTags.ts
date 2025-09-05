import { BrandIconType } from '@/components/ui/BrandIcon';

type PopularTag = {
  href: string;
  iconType: BrandIconType;
  slug: string;
  title: string;
};

const popularTags: PopularTag[] = [
  {
    href: '/tags/javascript',
    iconType: 'Javascript',
    slug: 'javascript',
    title: 'JavaScript',
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
    href: '/tags/typescript',
    iconType: 'Typescript',
    slug: 'typescript',
    title: 'TypeScript',
  },
  {
    href: '/tags/vercel',
    iconType: 'Vercel',
    slug: 'vercel',
    title: 'Vercel',
  },
  {
    href: '/tags/ai',
    iconType: 'AI',
    slug: 'ai',
    title: 'AI',
  },
];

export default popularTags;
