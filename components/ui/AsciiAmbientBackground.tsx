'use client';

import { useEffect, useRef } from 'react';

const RAMP = ['.', '·', ':', '-', '+', '*'];
const CELL_W = 18;
const CELL_H = 22;
const FRAME_MS = 220; // ~4.5 FPS: retro terminal cadence, minimal CPU
const CENTER_COLUMN_WIDTH = 768;
const MIN_VIEWPORT_WIDTH = 860;

export default function AsciiAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isDark = document.documentElement.classList.contains('dark');
    let timer: number | null = null;
    let step = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (width < MIN_VIEWPORT_WIDTH) {
        canvas.width = 0;
        canvas.height = 0;
        return;
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '11px "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    };

    const draw = () => {
      if (width < MIN_VIEWPORT_WIDTH || height <= 0) return;

      ctx.clearRect(0, 0, width, height);

      const centerLeft = (width - CENTER_COLUMN_WIDTH) / 2;
      const centerRight = centerLeft + CENTER_COLUMN_WIDTH;
      const cols = Math.ceil(width / CELL_W);
      const rows = Math.ceil(height / CELL_H);
      const t = step * 0.085;

      // Two-pass alpha: keep glyph density calm and airy
      ctx.fillStyle = isDark ? 'rgba(250, 250, 250, 0.14)' : 'rgba(9, 9, 11, 0.13)';

      for (let c = 0; c < cols; c++) {
        const x = c * CELL_W + CELL_W * 0.5;
        // Skip the centered reading column + tiny 8px breathing buffer
        if (x > centerLeft - 8 && x < centerRight + 8) continue;

        for (let r = 0; r < rows; r++) {
          const y = r * CELL_H + CELL_H * 0.5;
          // Cheap layered trigonometric wave field
          const wave =
            Math.sin(c * 0.24 + t) * 0.45 +
            Math.cos(r * 0.21 - t * 0.72) * 0.35 +
            Math.sin((c + r) * 0.14 + t * 0.48) * 0.2;

          // Keep >60% of cells blank so the margins stay spacious
          if (wave < 0.26) continue;

          const norm = Math.min(0.999, (wave - 0.26) / 0.74);
          const glyph = RAMP[Math.floor(norm * RAMP.length)];
          ctx.fillText(glyph, x, y);
        }
      }
    };

    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      stop();
      draw();
      if (reducedMotion || width < MIN_VIEWPORT_WIDTH || document.hidden) return;
      timer = window.setInterval(() => {
        step += 1;
        draw();
      }, FRAME_MS);
    };

    const handleResize = () => {
      resize();
      start();
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const themeObserver = new MutationObserver(() => {
      const nextDark = document.documentElement.classList.contains('dark');
      if (nextDark !== isDark) {
        isDark = nextDark;
        draw();
      }
    });

    resize();
    start();

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-ambient-canvas" aria-hidden="true" />;
}
