'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false });

export default function SnowfallBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  if (!enabled) return null;

  return (
    <Snowfall
      snowflakeCount={40}
      style={{
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
      }}
    />
  );
}
