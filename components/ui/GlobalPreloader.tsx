'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './Preloader';

export default function GlobalPreloader({ children }: { children: React.ReactNode }) {
  // Start with null to determine loading state first
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if preloader has already been shown in this session
    const hasShownPreloader = sessionStorage.getItem('hasShownPreloader');

    if (hasShownPreloader === 'true') {
      // Already shown in this session, skip animation completely
      setIsLoading(false);
      return;
    }

    // First time in this session, show animation
    setIsLoading(true);

    // Disable scrolling and interactions while loading
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.pointerEvents = 'none';

    // Hide loader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mark as shown for this session
      sessionStorage.setItem('hasShownPreloader', 'true');
      // Restore interactions
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.pointerEvents = '';
    }, 2500);

    return () => {
      clearTimeout(timer);
      // Cleanup styles
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.pointerEvents = '';
    };
  }, []);

  // Don't render anything until we determine if loading is needed
  if (isLoading === null) {
    return <div className="h-screen bg-white" />;
  }

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      {children}
    </>
  );
}
