'use client';

import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { Language } from './i18n';

export const getLocalizedBlogContent = (post: CoreContent<Blog>, language: Language) => {
  return {
    ...post,
    title: language === 'zh' 
      ? post.title 
      : post.titleEn || post.title,
    summary: language === 'zh' 
      ? post.summary 
      : post.summaryEn || post.summary,
  };
};