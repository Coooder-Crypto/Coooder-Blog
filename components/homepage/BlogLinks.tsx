'use client';

import Link from '@/components/ui/Link';
import Twemoji from '@/components/ui/Twemoji';
import { useLanguage } from '@/lib/i18n';

const BlogLinks = () => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between">
      <div className="flex flex-col space-y-1.5">
        <Link href="/blog" className="hover:underline">
          <Twemoji emoji="memo" />
          <span data-umami-event="home-link-blog" className="ml-1.5">
            {t('links.myWritings')}
          </span>
        </Link>
        <Link href="/projects" className="hover:underline">
          <Twemoji emoji="hammer-and-wrench" />
          <span data-umami-event="home-link-projects" className="ml-1.5">
            {t('links.whatBuilt')}
          </span>
        </Link>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Link href="/about" className="hover:underline">
          <Twemoji emoji="face-with-monocle" />
          <span data-umami-event="home-link-about" className="ml-1.5">
            {t('links.moreAbout')}
          </span>
        </Link>
        <Link href="/about" className="hover:underline">
          <Twemoji emoji="briefcase" />
          <span data-umami-event="home-link-resume" className="ml-1.5">
            {t('links.myCareer')}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogLinks;
