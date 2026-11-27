'use client';

import Link from '@/components/ui/Link';
import { PixelInvader } from '@/components/ui/PixelIcons';
import siteMetadata from '@/data/siteMetadata';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <>
      <div className="pixel-divider" aria-hidden="true" />
      <div className="footer-colophon" aria-hidden="true">
        <span>── · + · ──</span>
        <span className="footer-colophon-mid">
          <PixelInvader size={13} />
          <span>EOF // COOODER.SPACE</span>
        </span>
        <span>── · + · ──</span>
      </div>
      <footer className="studio-footer">
        <span className="footer-left">
          <span className="footer-copyright">© {new Date().getFullYear()} Coooder</span>
        </span>
        <div className="footer-links">
          <Link href={`mailto:${siteMetadata.email}`}>{zh ? '邮件' : 'Email'}</Link>
          <Link href={siteMetadata.github}>GitHub</Link>
          <Link href={siteMetadata.twitter}>X</Link>
          <Link href="/now">{zh ? '现在' : 'Now'}</Link>
          <a href="/feed.xml">RSS</a>
          <a href="/llms.txt">llms.txt</a>
        </div>
      </footer>
    </>
  );
}
