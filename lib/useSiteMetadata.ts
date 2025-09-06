'use client';

import { useLanguage } from './i18n';
import siteMetadata from '@/data/siteMetadata';

export const useSiteMetadata = () => {
  const { t, language } = useLanguage();

  return {
    ...siteMetadata,
    title: t('home.siteTitle'),
    description: t('home.siteDescription'),
    language: language === 'zh' ? 'zh-cn' : 'en-us',
    locale: language === 'zh' ? 'zh-CN' : 'en-US',
  };
};