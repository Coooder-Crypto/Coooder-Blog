'use client';

import { useState } from 'react';
import { Image, Link } from '@/components/ui';
import { PixelCheck, PixelCopy, PixelGithub, PixelMail, PixelPin, PixelX } from '@/components/ui/PixelIcons';
import { useLanguage } from '@/lib/i18n';

interface AboutSidebarProps {
  name: string;
  avatar?: string;
  email?: string;
  github?: string;
  twitter?: string;
}

export default function AboutSidebar({ name, avatar, email, github, twitter }: AboutSidebarProps) {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (!email) return;
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <aside className="about-profile">
      <Image src={avatar || '/static/images/avatar.png'} alt="Coooder" width={430} height={430} />
      <div className="about-profile-head">
        <h3>{name}</h3>
        <span className="about-location">
          <PixelPin size={12} />
          {zh ? '北京 / 杭州 · BUPT' : 'Beijing / Hangzhou · BUPT'}
        </span>
      </div>

      <div className="about-socials">
        {email && (
          <Link href={`mailto:${email}`} aria-label="Email Coooder">
            <PixelMail size={16} />
          </Link>
        )}
        {github && (
          <Link href={github} aria-label="Coooder on GitHub">
            <PixelGithub size={16} />
          </Link>
        )}
        {twitter && (
          <Link href={twitter} aria-label="Coooder on X">
            <PixelX size={16} />
          </Link>
        )}
        {email && (
          <button
            type="button"
            onClick={copyEmail}
            className="about-copy-chip"
            aria-label={zh ? '复制邮箱' : 'Copy email'}
          >
            {copied ? <PixelCheck size={12} /> : <PixelCopy size={12} />}
            <span>{copied ? (zh ? '已复制' : 'Copied') : zh ? '邮箱' : 'Email'}</span>
          </button>
        )}
      </div>
    </aside>
  );
}
