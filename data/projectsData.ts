import type { Project } from '@/types/data';

const projectsData: Project[] = [
  {
    type: 'work',
    title: {
      en: 'Thunderbit: AI Web Scraper - Scrape any website in 2 click.',
      zh: 'Thunderbit：AI 网页爬虫 —— 两次点击抓取任意网站',
    },
    description: {
      en: 'AI Web Scraper - Scrape any website in 2 click.',
      zh: 'AI 网页爬虫，支持两次点击抓取任意网站内容。',
    },
    imgSrc: '/static/images/projects/thunderbit.png',
    url: 'https://thunderbit.com/',
    builtWith: ['React', 'Styled-Component', 'NextJS'],
  },
  {
    type: 'work',
    title: {
      en: 'EthPanda: NFT Collection Platform',
      zh: 'EthPanda：NFT 收藏平台',
    },
    description: {
      en: 'A comprehensive NFT collection and trading platform built with modern web technologies.',
      zh: '一个使用现代 Web 技术构建的综合 NFT 收藏与交易平台。',
    },
    imgSrc: '/static/images/projects/ethpanda.png',
    url: 'https://ethpanda.org/',
    builtWith: ['React', 'TailwindCSS', 'TRPC', 'NextJS'],
  },
  {
    type: 'self',
    title: {
      en: 'Personal website',
      zh: '个人网站',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的个人网站。',
    },
    imgSrc: '/static/images/projects/coooder-blog.png',
    url: 'https://coooder-blog.vercel.app/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'MDX'],
  },
  {
    type: 'self',
    title: {
      en: 'LXDAO Official Website',
      zh: 'LXDAO 官方网站',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的 LXDAO 官方站点。',
    },
    imgSrc: '/static/images/projects/lxdao.png',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
  {
    type: 'self',
    title: {
      en: 'Openbuild',
      zh: 'Openbuild 开发者社区',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的开发者社区网站。',
    },
    imgSrc: '/static/images/projects/openbuild.png',
    url: 'https://openbuild.xyz/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'MDX'],
  },
  {
    type: 'self',
    title: {
      en: 'MM Capital',
      zh: 'MM Capital',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的投资机构官网。',
    },
    imgSrc: '/static/images/projects/mmcapital.png',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
  {
    type: 'self',
    title: {
      en: 'Circuit',
      zh: 'Circuit',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的创意展示站点。',
    },
    imgSrc: '/static/images/projects/circuit.png',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
  {
    type: 'self',
    title: {
      en: 'ZK Asset Raffle',
      zh: 'ZK Asset Raffle',
    },
    description: {
      en: 'A Personal website built with Next.js and Tailwind CSS.',
      zh: '使用 Next.js 和 Tailwind CSS 构建的零知识资产抽奖平台。',
    },
    imgSrc: '/static/images/projects/zkassetraffle.png',
    url: 'https://lxdao.io/',
    builtWith: ['Next.js', 'Tailwind', 'Typescript'],
  },
];

export default projectsData;
