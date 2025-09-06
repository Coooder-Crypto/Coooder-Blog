'use client';

import React from 'react';
import Typed from 'typed.js';

import Twemoji from '@/components/ui/Twemoji';
import { useLanguage } from '@/lib/i18n';

const TypedBios = () => {
  const el = React.useRef(null);
  const typed = React.useRef<Typed | null>(null);
  const { t } = useLanguage();

  React.useEffect(() => {
    // 销毁之前的实例
    if (typed.current) {
      typed.current.destroy();
    }

    // 创建新的实例，使用动态字符串
    const strings = [
      `${t('bio.alias')} <b class="font-medium">Coooder</b> ${t('bio.atWeb3')}`,
      `${t('bio.liveIn')} <b class="font-medium">Beijing</b>.`,
      `${t('bio.bornIn')} <b class="font-medium">Tai'an</b> ${t('bio.city')}`,
      `${t('bio.firstLanguage')} <b class="font-medium">C++</b>.`,
      t('bio.loveWebDev'),
      `${t('bio.focusing')} <b class="font-medium">${t('bio.coolestSoftware')}</b>.`,
      `${t('bio.workWith')} <b class="font-medium">Javascript/Typescript</b> ${t('bio.technologies')}`,
      `${t('bio.loveGaming')} 🎮${t('bio.favoriteGame')}`,
    ];

    typed.current = new Typed(el.current, {
      strings: strings,
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    });

    return () => typed.current?.destroy();
  }, [t]); // 依赖于翻译函数，语言变化时重新初始化

  return (
    <div>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;
