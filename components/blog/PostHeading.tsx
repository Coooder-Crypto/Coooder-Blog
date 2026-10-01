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
      <PageTitle>{language === 'en' ? titleEn || title : title}</PageTitle>
      {language !== bodyLanguage && (
        <p className="article-language-note">
          {language === 'en'
            ? 'This article is written in Chinese. The language switch changes the interface and available titles, not the article body.'
            : '本文正文为英文。语言切换仅影响界面和已有译名，不会自动翻译正文。'}
        </p>
      )}
    </div>
  );
}
