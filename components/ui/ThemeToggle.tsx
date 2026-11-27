'use client';

import { useSyncExternalStore } from 'react';
import { PixelMoon, PixelSun } from '@/components/ui/PixelIcons';
import { useLanguage } from '@/lib/i18n';

const THEME_EVENT = 'coooder-theme-change';

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

export default function ThemeToggle() {
  const { language } = useLanguage();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === 'dark';

  const handleToggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Ignore storage errors in private browsing.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={
        isDark
          ? language === 'zh'
            ? '切换到浅色模式'
            : 'Switch to light mode'
          : language === 'zh'
            ? '切换到深色模式'
            : 'Switch to dark mode'
      }
      title={isDark ? (language === 'zh' ? '浅色模式' : 'Light mode') : language === 'zh' ? '深色模式' : 'Dark mode'}
    >
      {isDark ? <PixelSun size={14} /> : <PixelMoon size={14} />}
    </button>
  );
}
