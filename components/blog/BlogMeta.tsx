'use client';

import { formatDate } from 'pliny/utils/formatDate';

import type { BlogMetaProps } from '@/types/index';

import { useLanguage } from '@/lib/i18n';

const BlogMeta = ({ date, readingTime }: BlogMetaProps) => {
  const { language } = useLanguage();
  return (
    <dd className="writing-meta">
      <time dateTime={date}>{formatDate(date, language === 'zh' ? 'zh-CN' : 'en-US')}</time>
      <span>
        {Math.ceil(readingTime.minutes)} {language === 'zh' ? '分钟阅读' : 'MIN READ'}
      </span>
    </dd>
  );
};

export default BlogMeta;
