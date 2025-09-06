'use client';

import { createContext, useContext } from 'react';

// Language type
export type Language = 'en' | 'zh';

// Language context
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation keys type
export interface Translations {
  [key: string]: string;
}

// Language data
export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.3droom': '3D Room',
    'nav.about': 'About',

    // Homepage
    'home.greeting': 'Hi! I am',
    'home.recentPosts': 'Recent Posts',
    'home.allPosts': 'All Posts',
    'home.readMore': 'Read more',
    'home.noPosts': 'No posts found.',
    'home.happyReading': 'Happy reading',
    'home.quote':
      "The greatest danger in times of turbulence is not the turbulence; it is to act with your yesterday's logic.",
    'home.imName': "I'm",
    'home.fullstackEngineer': 'a dedicated Fullstack Engineer',
    'home.siteTitle': "Coooder's Blog - Coding Adventure",
    'home.siteDescription': 'My desire to practice my skills and share my acquired knowledge fuels my endeavors.',

    // About/Bio
    'bio.alias': "I'm aliased as",
    'bio.atWeb3': 'at Web3.',
    'bio.liveIn': 'I live in',
    'bio.bornIn': 'I was born in the beautiful',
    'bio.city': 'city.',
    'bio.firstLanguage': 'My first programming language I learned was',
    'bio.loveWebDev': 'I love web development.',
    'bio.focusing': "I'm focusing on building",
    'bio.coolestSoftware': 'the Coolest software',
    'bio.workWith': 'I work mostly with',
    'bio.technologies': 'technologies.',
    'bio.loveGaming': 'I love playing video game',
    'bio.favoriteGame': ', OW is my favorite one.',
    'bio.description1': 'I started learning to code in 2020 when I started college.',
    'bio.description2': 'I landed my first job as a Front-end Developer in 2021.',
    'bio.description3': 'I have a passion for JavaScript/Typescript and website development.',
    'bio.description4': 'I started this blog to practice my skill and share my knowledge.',

    // Links
    'links.myWritings': 'My writings',
    'links.whatBuilt': 'What have I built?',
    'links.moreAbout': 'More about me and myself',
    'links.myCareer': 'My career',

    // Footer
    'footer.buildWith': 'Build with',
    'footer.copyright': 'Copyright ©',
    'footer.blogTitle': "Coooder's Blog - Coding Adventure",

    // Blog
    'blog.title': 'All Posts',
    'blog.searchArticles': 'Search articles',
    'blog.noPostsFound': 'No posts found.',
    'blog.previous': 'Previous',
    'blog.next': 'Next',
    'blog.pageOf': 'of',

    // Common
    'common.publishedOn': 'Published on',
    'common.readArticle': 'Read',

    // Language Switcher
    'lang.switch': 'Language',
    'lang.en': 'English',
    'lang.zh': '中文',
  },
  zh: {
    // Navigation
    'nav.blog': '博客',
    'nav.projects': '项目',
    'nav.3droom': '3D 房间',
    'nav.about': '关于',

    // Homepage
    'home.greeting': '你好！我是',
    'home.recentPosts': '最新文章',
    'home.allPosts': '所有文章',
    'home.readMore': '阅读更多',
    'home.noPosts': '暂无文章。',
    'home.happyReading': '愉快阅读',
    'home.quote': '在动荡时期，最大的危险不是动荡本身，而是用昨天的逻辑来面对最新的动荡。',
    'home.imName': '我是',
    'home.fullstackEngineer': '一名专注的全栈工程师',
    'home.siteTitle': 'Coooder 的博客 - 编程冒险',
    'home.siteDescription': '我渴望练习技能并分享所获得的知识，这是我努力的动力。',

    // About/Bio
    'bio.alias': '我的别名是',
    'bio.atWeb3': '在 Web3 领域。',
    'bio.liveIn': '我住在',
    'bio.bornIn': '我出生在美丽的',
    'bio.city': '市。',
    'bio.firstLanguage': '我学习的第一门编程语言是',
    'bio.loveWebDev': '我热爱 Web 开发。',
    'bio.focusing': '我专注于构建',
    'bio.coolestSoftware': '最酷的软件',
    'bio.workWith': '我主要使用',
    'bio.technologies': '技术栈工作。',
    'bio.loveGaming': '我喜欢玩电子游戏',
    'bio.favoriteGame': '，守望先锋是我最喜欢的。',
    'bio.description1': '我在 2020 年上大学时开始学习编程。',
    'bio.description2': '我在 2021 年获得了第一份前端开发工作。',
    'bio.description3': '我对 JavaScript/TypeScript 和网站开发充满热情。',
    'bio.description4': '我创建这个博客来练习技能并分享知识。',

    // Links
    'links.myWritings': '我的文章',
    'links.whatBuilt': '我构建了什么？',
    'links.moreAbout': '更多关于我自己',
    'links.myCareer': '我的职业生涯',

    // Footer
    'footer.buildWith': '构建于',
    'footer.copyright': '版权所有 ©',
    'footer.blogTitle': 'Coooder 的博客 - 编程冒险',

    // Blog
    'blog.title': '所有文章',
    'blog.searchArticles': '搜索文章',
    'blog.noPostsFound': '未找到文章。',
    'blog.previous': '上一页',
    'blog.next': '下一页',
    'blog.pageOf': '共',

    // Common
    'common.publishedOn': '发布于',
    'common.readArticle': '阅读',

    // Language Switcher
    'lang.switch': '语言',
    'lang.en': 'English',
    'lang.zh': '中文',
  },
};

// Get translation function
export const getTranslation =
  (language: Language) =>
  (key: string): string => {
    return translations[language][key] || key;
  };

// Default language detection
export const getDefaultLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    // Check localStorage first
    const stored = localStorage.getItem('language');
    if (stored && (stored === 'en' || stored === 'zh')) {
      return stored as Language;
    }

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
  }

  return 'en';
};

// Save language preference
export const saveLanguage = (language: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
};
