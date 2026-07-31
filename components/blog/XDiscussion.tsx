'use client';

import { Link } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

import X from 'public/static/icons/x.svg';

interface XDiscussionProps {
  xPostUrl?: string;
  socialSummary?: string;
}

export default function XDiscussion({ xPostUrl, socialSummary }: XDiscussionProps) {
  const { language } = useLanguage();

  if (!xPostUrl) return null;

  const copy =
    language === 'zh'
      ? { heading: '在 X 上继续讨论', description: '这篇文章的短版观点与讨论在 X 上持续更新。', action: '查看讨论' }
      : {
          heading: 'Continue the conversation on X',
          description: 'The short-form take and discussion for this article live on X.',
          action: 'View discussion',
        };

  return (
    <aside className="not-prose mt-10 rounded-xl border border-sky-200 bg-sky-50/70 p-5 dark:border-sky-500/30 dark:bg-sky-500/10">
      <div className="flex items-start gap-3">
        <X className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-300" />
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{copy.heading}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{socialSummary || copy.description}</p>
          <Link
            href={xPostUrl}
            className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-100"
          >
            {copy.action} &rarr;
          </Link>
        </div>
      </div>
    </aside>
  );
}
