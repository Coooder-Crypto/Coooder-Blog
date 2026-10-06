'use client';

import PageTitle from '@/components/ui/PageTitle';
import { useLanguage } from '@/lib/i18n';

export default function PostHeading({
  title,
  titleEn,
  bodyLanguage = 'zh',
}: {
  title: string;
  titleEn?: string;
  bodyLanguage?: string;
}) {
  const { language } = useLanguage();
  return (
    <div className="post-heading">
      <PageTitle>
        <span lang={language === 'en' && titleEn ? 'en' : bodyLanguage === 'en' ? 'en' : 'zh-CN'}>
          {language === 'en' ? titleEn || title : title}
        </span>
      </PageTitle>
      {language !== bodyLanguage && (
        <p className="article-language-note">
          {language === 'en'
            ? 'English title and summary · Article written in Chinese'
            : '中英文导航与摘要 · 本文正文为英文'}
        </p>
      )}
    </div>
  );
}
