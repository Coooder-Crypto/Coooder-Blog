'use client';

import { useState } from 'react';

// 5x7 crisp 1-bit pixel font bitmap for "COOODER"
const GLYPHS: Record<string, string[]> = {
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
};

const WORD = 'COOODER'.split('');

const ASCII_WORDMARK = [
  '█▀▀ █▀█ █▀█ █▀█ █▀▄ █▀▀ █▀█',
  '█   █ █ █ █ █ █ █ █ █▀▀ █▀▄',
  '▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀  ▀▀▀ ▀ ▀',
].join('\n');

interface PixelCell {
  key: string;
  x: number;
  y: number;
}

const PIXELS: PixelCell[] = (() => {
  const cells: PixelCell[] = [];
  let cursorX = 0;
  for (let i = 0; i < WORD.length; i++) {
    const rows = GLYPHS[WORD[i]];
    for (let y = 0; y < rows.length; y++) {
      for (let x = 0; x < rows[y].length; x++) {
        if (rows[y][x] === '1') {
          cells.push({ key: `${i}-${x}-${y}`, x: cursorX + x, y });
        }
      }
    }
    cursorX += 6;
  }
  return cells;
})();

const GRID_WIDTH = WORD.length * 6 - 1;
const GRID_HEIGHT = 7;

type CoverMode = 'pixel' | 'ascii' | 'wire';
const MODES: CoverMode[] = ['pixel', 'ascii', 'wire'];

export default function PixelCoverMark() {
  const [mode, setMode] = useState<CoverMode>('pixel');

  const cycleMode = () => {
    setMode((current) => {
      const nextIndex = (MODES.indexOf(current) + 1) % MODES.length;
      return MODES[nextIndex];
    });
  };

  return (
    <div
      className="pixel-cover-canvas"
      role="button"
      tabIndex={0}
      aria-label="Coooder pixel and ASCII banner"
      title="Click to cycle PIXEL / ASCII / WIRE"
      onClick={cycleMode}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          cycleMode();
        }
      }}
    >
      <div className="pixel-cover-corner pixel-cover-tl" aria-hidden="true" />
      <div className="pixel-cover-corner pixel-cover-tr" aria-hidden="true" />
      <div className="pixel-cover-corner pixel-cover-bl" aria-hidden="true" />
      <div className="pixel-cover-corner pixel-cover-br" aria-hidden="true" />

      {/* Sparse quiet ASCII starfield accents in outer negative space */}
      <span className="ascii-star ascii-star-1" aria-hidden="true">
        +
      </span>
      <span className="ascii-star ascii-star-2" aria-hidden="true">
        ·
      </span>
      <span className="ascii-star ascii-star-3" aria-hidden="true">
        *
      </span>
      <span className="ascii-star ascii-star-4" aria-hidden="true">
        +
      </span>

      <span className="pixel-cover-index" aria-hidden="true">
        [0x00] // COOODER.SPACE
      </span>

      {mode === 'ascii' ? (
        <div className="ascii-banner-wrap" aria-hidden="true">
          <pre className="ascii-wordmark-pre">{ASCII_WORDMARK}</pre>
          <span className="ascii-wordmark-sub">── agent harness · local-first ──</span>
        </div>
      ) : (
        <svg
          viewBox={`0 0 ${GRID_WIDTH * 10} ${GRID_HEIGHT * 10}`}
          className={`pixel-wordmark-svg ${mode === 'wire' ? 'is-outlined' : ''}`}
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {PIXELS.map((cell) => (
            <rect
              key={cell.key}
              x={cell.x * 10 + 1}
              y={cell.y * 10 + 1}
              width={8}
              height={8}
              className="pixel-wordmark-cell"
            />
          ))}
        </svg>
      )}

      <div
        className="pixel-mode-switch"
        role="group"
        aria-label="Banner render mode"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        {MODES.map((item) => (
          <button
            key={item}
            type="button"
            className={`pixel-mode-btn ${mode === item ? 'is-active' : ''}`}
            onClick={() => setMode(item)}
            aria-pressed={mode === item}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
