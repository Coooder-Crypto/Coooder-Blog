'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Mail, MapPin } from 'lucide-react';
import { Image, Link } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

interface AboutSidebarProps {
  name: string;
  avatar?: string;
  email?: string;
  github?: string;
  twitter?: string;
}

const sections = [
  { href: '#intro', zh: '简介', en: 'Intro' },
  { href: '#principles', zh: '原则与态度', en: 'Principles' },
  { href: '#workbench', zh: '当前聚焦', en: 'Now' },
  { href: '#experience', zh: '经历与教育', en: 'Experience' },
  { href: '#research', zh: '学术研究', en: 'Research' },
  { href: '#community', zh: '黑客松与社区', en: 'Community' },
  { href: '#uses', zh: '工作台 Uses', en: 'Uses' },
  { href: '#connect', zh: '欢迎联系', en: 'Connect' },
] as const;

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
          <MapPin size={12} aria-hidden="true" />
          {zh ? '北京 · BUPT' : 'Beijing · BUPT'}
        </span>
      </div>
      <p>AGENT HARNESS / FULLSTACK / LOCAL-FIRST</p>

      <div className="about-socials">
        {email && (
          <Link href={`mailto:${email}`} aria-label="Email Coooder">
            <Mail size={18} />
          </Link>
        )}
        {github && (
          <Link href={github} aria-label="Coooder on GitHub">
            <Github size={18} />
          </Link>
        )}
        {twitter && (
          <Link href={twitter} aria-label="Coooder on X">
            <ArrowUpRight size={18} />
          </Link>
        )}
        {email && (
          <button
            type="button"
            onClick={copyEmail}
            className="about-copy-chip"
            aria-label={zh ? '复制邮箱' : 'Copy email'}
          >
            {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
            <span>{copied ? (zh ? '已复制' : 'Copied') : zh ? '邮箱' : 'Email'}</span>
          </button>
        )}
      </div>

      <nav className="about-toc-nav" aria-label={zh ? '页面章节' : 'On this page'}>
        <span className="eyebrow">{zh ? 'INDEX · 目录' : 'INDEX'}</span>
        <ul>
          {sections.map((section, idx) => (
            <li key={section.href}>
              <a href={section.href}>
                <span>0{idx + 1}</span>
                {section[language]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
