'use client';

import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';

const Heading = () => {
  const { t } = useLanguage();

  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      {t('home.imName')} <span>{siteMetadata.fullName}</span> - {t('home.fullstackEngineer')}
    </h1>
  );
};

export default Heading;
