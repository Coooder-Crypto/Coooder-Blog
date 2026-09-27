'use client';

import Link from '@/components/ui/Link';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="studio-footer">
      <div>
        <Link className="footer-wordmark" href="/">
          coooder<span aria-hidden="true">✳︎</span>
        </Link>
        <p>{language === 'zh' ? '认真构建，也保留一点好奇。' : 'Built with care. A little curiosity, always.'}</p>
      </div>
      <div className="footer-links">
        <Link href={siteMetadata.github}>GitHub ↗</Link>
        <Link href={siteMetadata.twitter}>X ↗</Link>
        <Link href="/about">{language === 'zh' ? '关于我' : 'About'} ↗</Link>
      </div>
      <span className="footer-copyright">© {new Date().getFullYear()} COOODER</span>
    </footer>
  );
}
