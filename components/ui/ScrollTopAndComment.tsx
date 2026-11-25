'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false);
  const { language } = useLanguage();
  const zh = language === 'zh';

  useEffect(() => {
    const handleWindowScroll = () => {
      setShow(window.scrollY > 360);
    };

    handleWindowScroll();
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label={zh ? '返回顶部' : 'Back to top'}
      title={zh ? '返回顶部' : 'Back to top'}
      className="swiss-scroll-top"
    >
      <ArrowUp size={15} aria-hidden="true" />
      <span>TOP</span>
    </button>
  );
};

export default ScrollTopAndComment;
