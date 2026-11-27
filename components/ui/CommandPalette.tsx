'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Copy,
  FileText,
  FolderGit2,
  Languages,
  Moon,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import siteMetadata from '@/data/siteMetadata';
import { researchRadarItems } from '@/data/researchRadar';

export interface CommandPostItem {
  slug: string;
  title: string;
  titleEn?: string;
  summary?: string;
  summaryEn?: string;
  tags: string[];
  date: string;
}

interface PaletteEntry {
  id: string;
  group: 'nav' | 'action' | 'post' | 'radar';
  title: string;
  subtitle?: string;
  keywords: string;
  badge?: string;
  external?: boolean;
  onSelect: () => void;
}

export const OPEN_PALETTE_EVENT = 'coooder-open-palette';
const THEME_EVENT = 'coooder-theme-change';

export default function CommandPalette({ posts }: { posts: CommandPostItem[] }) {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const zh = language === 'zh';

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPalette = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
    setCopiedEmail(false);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery('');
            setActiveIndex(0);
            setCopiedEmail(false);
          }
          return !prev;
        });
      }
    };
    const onOpenEvent = () => openPalette();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    };
  }, [openPalette]);

  const navigate = useCallback(
    (href: string) => {
      closePalette();
      router.push(href);
    },
    [closePalette, router]
  );

  const entries = useMemo<PaletteEntry[]>(() => {
    const toggleTheme = () => {
      const nextIsDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', nextIsDark);
      try {
        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
      } catch {
        // Ignore private browsing storage errors.
      }
      window.dispatchEvent(new Event(THEME_EVENT));
      closePalette();
    };

    const toggleLanguage = () => {
      setLanguage(zh ? 'en' : 'zh');
      closePalette();
    };

    const copyEmail = () => {
      navigator.clipboard?.writeText(siteMetadata.email).catch(() => {});
      setCopiedEmail(true);
      window.setTimeout(() => closePalette(), 550);
    };

    const navItems: PaletteEntry[] = [
      {
        id: 'nav-home',
        group: 'nav',
        title: zh ? '首页' : 'Home',
        subtitle: zh ? 'Agent Harness 工程主页与实证实验室' : 'Studio home & interactive Harness Lab',
        keywords: 'home index 首页',
        onSelect: () => navigate('/'),
      },
      {
        id: 'nav-lab',
        group: 'nav',
        title: zh ? '交互式 Harness & 实证实验室' : 'Interactive Harness & Empirical Lab',
        subtitle: zh ? '三层底座切换与 192.4 分钟三栈耗时拆解' : '3-layer explorer & 192.4-min multi-stack data',
        keywords: 'lab harness empirical benchmark 实验室 实证 数据',
        onSelect: () => navigate('/#harness-lab'),
      },
      {
        id: 'nav-projects',
        group: 'nav',
        title: zh ? '项目与公开证据' : 'Projects & Public Evidence',
        subtitle: zh ? 'Vital Agent Sync · MemTable · AI Capital Map · Jarvis' : 'Verified builds & Jarvis stack',
        keywords: 'projects work jarvis vital memtable capital bytenote 项目 证据',
        onSelect: () => navigate('/projects'),
      },
      {
        id: 'nav-now',
        group: 'nav',
        title: zh ? '现在在做什么 (/now)' : 'Now — Current Focus (/now)',
        subtitle: zh ? '本月主线、训练与阅读节奏，以及明确暂缓事项' : 'Active threads, off-screen rhythm & intentional nos',
        keywords: 'now current focus status 现在 主线 近况',
        onSelect: () => navigate('/now'),
      },
      {
        id: 'nav-jarvis',
        group: 'nav',
        title: zh ? 'Jarvis 个人系统架构' : 'Jarvis Local-First Stack',
        subtitle: zh ? '常驻节点、受控隐私边界与第二大脑' : 'Always-on host, privacy boundary & second brain',
        keywords: 'jarvis brain obsidian hermes 架构 第二大脑',
        onSelect: () => navigate('/projects#jarvis-system'),
      },
      {
        id: 'nav-blog',
        group: 'nav',
        title: zh ? '全部工程文章' : 'All Blog Posts',
        subtitle: zh ? `${posts.length} 篇已发布文章与 3 条阅读路线` : `${posts.length} published essays & reading paths`,
        keywords: 'blog writing articles posts 博客 文章',
        onSelect: () => navigate('/blog'),
      },
      {
        id: 'nav-library',
        group: 'nav',
        title: zh ? 'Agent Harness 研究雷达' : 'Agent Harness Research Radar',
        subtitle: zh ? `${researchRadarItems.length} 篇精选论文与顶级工程文献` : `${researchRadarItems.length} curated papers & engineering essays`,
        keywords: 'library radar papers research 书架 雷达 论文',
        onSelect: () => navigate('/library'),
      },
      {
        id: 'nav-about',
        group: 'nav',
        title: zh ? '关于我与工作台' : 'About & Workbench',
        subtitle: zh ? '经历、当前聚焦与工程原则' : 'Background, current focus & principles',
        keywords: 'about bio resume experience 关于 经历',
        onSelect: () => navigate('/about'),
      },
    ];

    const actionItems: PaletteEntry[] = [
      {
        id: 'action-theme',
        group: 'action',
        title: zh ? '切换浅色 / 深色模式' : 'Toggle Light / Dark Theme',
        subtitle: zh ? '即时切换全站与矢量图主题' : 'Switch paper & obsidian theme tokens',
        keywords: 'theme dark light mode 主题 深色 浅色 暗黑',
        badge: 'THEME',
        onSelect: toggleTheme,
      },
      {
        id: 'action-lang',
        group: 'action',
        title: zh ? 'Switch UI to English' : '切换界面为中文',
        subtitle: zh ? '切换导航、项目与文章双语摘要' : 'Toggle bilingual navigation and summaries',
        keywords: 'language english chinese zh en 语言 中文 英文',
        badge: zh ? 'EN' : '中文',
        onSelect: toggleLanguage,
      },
      {
        id: 'action-email',
        group: 'action',
        title: copiedEmail ? (zh ? '已复制邮箱地址 ✓' : 'Email copied ✓') : zh ? '复制联系邮箱' : 'Copy Email Address',
        subtitle: siteMetadata.email,
        keywords: 'email mail contact copy 邮箱 联系',
        badge: copiedEmail ? 'COPIED' : 'COPY',
        onSelect: copyEmail,
      },
      {
        id: 'action-github',
        group: 'action',
        title: 'GitHub',
        subtitle: 'github.com/Coooder-Crypto',
        keywords: 'github code source repo 开源',
        external: true,
        onSelect: () => {
          closePalette();
          window.open(siteMetadata.github, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'action-x',
        group: 'action',
        title: 'X (Twitter)',
        subtitle: '@Coooder_Crypto',
        keywords: 'x twitter social 推特',
        external: true,
        onSelect: () => {
          closePalette();
          window.open(siteMetadata.twitter, '_blank', 'noopener,noreferrer');
        },
      },
    ];

    const postItems: PaletteEntry[] = posts.map((post) => {
      const localizedTitle = zh ? post.title : post.titleEn || post.title;
      const localizedSummary = zh ? post.summary : post.summaryEn || post.summary;
      return {
        id: `post-${post.slug}`,
        group: 'post',
        title: localizedTitle,
        subtitle: localizedSummary,
        keywords: [post.title, post.titleEn, post.summary, post.summaryEn, post.tags.join(' ')].filter(Boolean).join(' '),
        badge: post.tags[0],
        onSelect: () => navigate(`/blog/${post.slug}`),
      };
    });

    const radarItems: PaletteEntry[] = researchRadarItems.map((item) => ({
      id: `radar-${item.id}`,
      group: 'radar',
      title: item.title,
      subtitle: `${item.venue} · ${item.takeaway[language]}`,
      keywords: `${item.title} ${item.venue} ${item.track} ${item.takeaway.zh} ${item.takeaway.en}`,
      badge: item.kind.toUpperCase(),
      external: true,
      onSelect: () => {
        closePalette();
        window.open(item.url, '_blank', 'noopener,noreferrer');
      },
    }));

    return [...navItems, ...actionItems, ...postItems, ...radarItems];
  }, [closePalette, copiedEmail, language, navigate, posts, setLanguage, zh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Show navigation, actions, and top 6 latest essays by default for quick scanning.
      return [
        ...entries.filter((e) => e.group === 'nav'),
        ...entries.filter((e) => e.group === 'action'),
        ...entries.filter((e) => e.group === 'post').slice(0, 6),
      ];
    }
    return entries.filter((entry) => `${entry.title} ${entry.subtitle || ''} ${entry.keywords}`.toLowerCase().includes(q));
  }, [entries, query]);

  const safeActiveIndex = filtered.length ? Math.min(activeIndex, filtered.length - 1) : 0;

  const groupLabels: Record<PaletteEntry['group'], string> = {
    nav: zh ? '页面导航' : 'NAVIGATION',
    action: zh ? '快捷操作' : 'ACTIONS',
    post: zh ? '博客文章' : 'ARTICLES',
    radar: zh ? '研究雷达文献' : 'RESEARCH RADAR',
  };

  const renderIcon = (entry: PaletteEntry) => {
    if (entry.id === 'action-theme') return <Sun size={15} className="cmd-item-icon" aria-hidden="true" />;
    if (entry.id === 'action-lang') return <Languages size={15} className="cmd-item-icon" aria-hidden="true" />;
    if (entry.id === 'action-email')
      return copiedEmail ? (
        <Check size={15} className="cmd-item-icon cmd-icon-accent" aria-hidden="true" />
      ) : (
        <Copy size={15} className="cmd-item-icon" aria-hidden="true" />
      );
    if (entry.group === 'nav') return <Compass size={15} className="cmd-item-icon" aria-hidden="true" />;
    if (entry.group === 'post') return <FileText size={15} className="cmd-item-icon" aria-hidden="true" />;
    if (entry.group === 'radar') return <BookOpen size={15} className="cmd-item-icon" aria-hidden="true" />;
    if (entry.id === 'action-github') return <FolderGit2 size={15} className="cmd-item-icon" aria-hidden="true" />;
    return <Sparkles size={15} className="cmd-item-icon" aria-hidden="true" />;
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      filtered[safeActiveIndex]?.onSelect();
    }
  };

  const groupedOrder: PaletteEntry['group'][] = ['nav', 'action', 'post', 'radar'];

  return (
    <Dialog open={open} onClose={closePalette} initialFocus={inputRef} className="cmd-dialog">
      <div className="cmd-backdrop" aria-hidden="true" />
      <div className="cmd-positioner">
        <DialogPanel className="cmd-panel">
          <div className="cmd-input-row">
            <Search size={17} className="cmd-search-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={
                zh ? '搜索 22 篇文章、研究论文、项目或执行快捷操作…' : 'Search articles, research papers, projects, or actions…'
              }
              aria-label={zh ? '全局命令面板搜索' : 'Command palette search'}
              className="cmd-input"
            />
            <kbd className="cmd-kbd">ESC</kbd>
          </div>

          <div className="cmd-results" role="listbox" aria-label={zh ? '命令结果' : 'Command results'}>
            {filtered.length === 0 ? (
              <div className="cmd-empty">
                <Moon size={18} aria-hidden="true" />
                <p>{zh ? '没有找到匹配的页面、文章或论文。' : 'No matching pages, articles, or papers found.'}</p>
              </div>
            ) : (
              groupedOrder.map((group) => {
                const items = filtered
                  .map((entry, flatIndex) => ({ entry, flatIndex }))
                  .filter(({ entry }) => entry.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} className="cmd-group">
                    <div className="cmd-group-label">{groupLabels[group]}</div>
                    {items.map(({ entry, flatIndex }) => {
                      const active = flatIndex === safeActiveIndex;
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          className={`cmd-item ${active ? 'active' : ''}`}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={entry.onSelect}
                        >
                          {renderIcon(entry)}
                          <div className="cmd-item-copy">
                            <span className="cmd-item-title">{entry.title}</span>
                            {entry.subtitle && <span className="cmd-item-sub">{entry.subtitle}</span>}
                          </div>
                          {entry.badge && <span className="cmd-item-badge">{entry.badge}</span>}
                          {entry.external && <ArrowUpRight size={14} className="cmd-item-ext" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          <div className="cmd-footer">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> {zh ? '选择' : 'Navigate'}
            </span>
            <span>
              <kbd>↵</kbd> {zh ? '确认' : 'Open'}
            </span>
            <span className="cmd-footer-right">
              {filtered.length} {zh ? '项结果' : 'results'}
            </span>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
