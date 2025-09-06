'use client';

import { useLanguage } from '@/lib/i18n';

const ShortDescription = () => {
  const { t } = useLanguage();

  return (
    <div className="mb-4 mt-4">
      <p>{t('bio.description1')}</p>
      <p>{t('bio.description2')}</p>
      <p>{t('bio.description3')}</p>
      <p>{t('bio.description4')}</p>
    </div>
  );
};

export default ShortDescription;
