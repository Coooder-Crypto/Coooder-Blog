'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

type XTimelineProps = {
  profileUrl: string;
  loadingLabel: string;
  fallbackLabel: string;
};

const WIDGET_SCRIPT_ID = 'x-platform-widgets';
const WIDGET_SCRIPT_URL = 'https://platform.twitter.com/widgets.js';

export default function XTimeline({ profileUrl, loadingLabel, fallbackLabel }: XTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isVisible) return;

    container.replaceChildren();

    const timeline = document.createElement('a');
    timeline.href = profileUrl;
    timeline.className = 'twitter-timeline';
    timeline.dataset.theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    timeline.dataset.height = '520';
    timeline.dataset.dnt = 'true';
    timeline.textContent = fallbackLabel;
    container.appendChild(timeline);

    const loadWidgets = () => window.twttr?.widgets?.load(container);
    const existingScript = document.getElementById(WIDGET_SCRIPT_ID);

    if (existingScript) {
      loadWidgets();
      return;
    }

    const script = document.createElement('script');
    script.id = WIDGET_SCRIPT_ID;
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.onload = loadWidgets;
    document.head.appendChild(script);
  }, [fallbackLabel, isVisible, profileUrl, resolvedTheme]);

  return (
    <div ref={containerRef} className="min-h-[220px] overflow-hidden rounded-lg" aria-live="polite">
      {!isVisible && <p className="p-4 text-sm text-gray-500 dark:text-gray-400">{loadingLabel}</p>}
    </div>
  );
}

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}
