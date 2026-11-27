import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const BLOG_DIR = path.resolve('data/blog');
const OUT_DIR = path.resolve('public/static/images/og');
const SITE_BANNER_PATH = path.resolve('public/static/images/social-editorial.jpg');

// 5x7 crisp 1-bit pixel bitmap for "COOODER"
const PIXEL_GLYPHS = {
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
};

function renderPixelWordmark({ x, y, cell = 12, gap = 2, fill = '#09090b' }) {
  const letters = 'COOODER'.split('');
  const rects = [];
  let cursor = 0;
  for (const ch of letters) {
    const rows = PIXEL_GLYPHS[ch];
    for (let r = 0; r < rows.length; r += 1) {
      for (let c = 0; c < rows[r].length; c += 1) {
        if (rows[r][c] === '1') {
          const rx = x + (cursor + c) * (cell + gap);
          const ry = y + r * (cell + gap);
          rects.push(`<rect x="${rx}" y="${ry}" width="${cell}" height="${cell}" fill="${fill}"/>`);
        }
      }
    }
    cursor += 6;
  }
  return rects.join('\n    ');
}

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function charWeight(ch) {
  return /[\u2e80-\u9fff\uff00-\uffef]/.test(ch) ? 1.85 : 1;
}

function wrapTitle(title, maxUnits = 28, maxLines = 3) {
  const clean = String(title).replace(/\s+/g, ' ').trim();
  const lines = [];
  let current = '';
  let units = 0;

  for (let i = 0; i < clean.length; i += 1) {
    const ch = clean[i];
    const w = charWeight(ch);
    if (units + w > maxUnits && current.trim()) {
      const punctIndex = Math.max(current.lastIndexOf('：'), current.lastIndexOf(':'), current.lastIndexOf('，'));
      const lastSpace = current.lastIndexOf(' ');
      if (punctIndex >= current.length * 0.45 && punctIndex < current.length - 1) {
        lines.push(current.slice(0, punctIndex + 1).trim());
        current = current.slice(punctIndex + 1).trimStart() + ch;
        units = [...current].reduce((acc, c) => acc + charWeight(c), 0);
      } else if (!/[\u2e80-\u9fff]/.test(ch) && lastSpace > current.length * 0.55) {
        lines.push(current.slice(0, lastSpace).trim());
        current = current.slice(lastSpace + 1) + ch;
        units = [...current].reduce((acc, c) => acc + charWeight(c), 0);
      } else {
        lines.push(current.trim());
        current = ch === ' ' ? '' : ch;
        units = current ? w : 0;
      }
      if (lines.length === maxLines - 1) {
        const rest = (current + clean.slice(i + 1)).trim();
        let lastLine = '';
        let lastUnits = 0;
        let truncated = false;
        for (const rch of rest) {
          const rw = charWeight(rch);
          if (lastUnits + rw > maxUnits - 1.5) {
            truncated = true;
            break;
          }
          lastLine += rch;
          lastUnits += rw;
        }
        lines.push((lastLine.trim() + (truncated ? '…' : '')).trim());
        return lines.slice(0, maxLines);
      }
    } else {
      current += ch;
      units += w;
    }
  }

  if (current.trim()) lines.push(current.trim());
  return lines.slice(0, maxLines);
}

function truncateSubtitle(value, maxUnits = 62) {
  const clean = String(value || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  let out = '';
  let units = 0;
  for (const ch of clean) {
    const w = charWeight(ch);
    if (units + w > maxUnits) {
      const trimmed = out.replace(/\s+\S*$/, '').trim() || out.trim();
      return `${trimmed}…`;
    }
    out += ch;
    units += w;
  }
  return clean;
}

function buildSiteBannerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" shape-rendering="crispEdges">
  <defs>
    <pattern id="dotgrid" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect x="7" y="7" width="2" height="2" fill="#09090b" fill-opacity="0.12"/>
    </pattern>
    <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
      <path fill="#09090b" fill-opacity="0.08" d="M7 0h1v1H7zM6 1h1v1H6zM5 2h1v1H5zM4 3h1v1H4zM3 4h1v1H3zM2 5h1v1H2zM1 6h1v1H1zM0 7h1v1H0z"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" fill="url(#dotgrid)"/>

  <!-- Centered architectural vertical rails -->
  <rect x="96" y="0" width="1008" height="630" fill="#ffffff"/>
  <line x1="96" y1="0" x2="96" y2="630" stroke="#e4e4e7" stroke-width="2"/>
  <line x1="1104" y1="0" x2="1104" y2="630" stroke="#e4e4e7" stroke-width="2"/>

  <!-- Top bar -->
  <line x1="0" y1="84" x2="1200" y2="84" stroke="#e4e4e7" stroke-width="2"/>
  <rect x="136" y="34" width="12" height="12" fill="#09090b"/>
  <text x="162" y="47" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="18" font-weight="600" fill="#09090b">Coooder</text>
  <text x="1064" y="47" text-anchor="end" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="16" fill="#71717a">[0x00] // COOODER.SPACE</text>

  <!-- Hatched band -->
  <rect x="96" y="84" width="1008" height="32" fill="url(#hatch)"/>
  <line x1="0" y1="116" x2="1200" y2="116" stroke="#e4e4e7" stroke-width="2"/>

  <!-- Dot-matrix pixel centerpiece -->
  <rect x="96" y="116" width="1008" height="292" fill="url(#dotgrid)"/>
  <path d="M124 140h16v2h-14v14h-2zM1076 140h-16v2h14v14h2zM124 384h16v-2h-14v-14h-2zM1076 384h-16v-2h14v-14h2z" fill="#a1a1aa"/>

  <g>
    ${renderPixelWordmark({ x: 256, y: 204, cell: 14, gap: 3, fill: '#09090b' })}
  </g>

  <!-- Hatched band -->
  <line x1="0" y1="408" x2="1200" y2="408" stroke="#e4e4e7" stroke-width="2"/>
  <rect x="96" y="408" width="1008" height="32" fill="url(#hatch)"/>
  <line x1="0" y1="440" x2="1200" y2="440" stroke="#e4e4e7" stroke-width="2"/>

  <!-- Bottom copy -->
  <text x="136" y="504" font-family="'PingFang SC', 'Hiragino Sans GB', 'Helvetica Neue', sans-serif" font-size="30" font-weight="600" fill="#09090b" letter-spacing="-0.6">做可验证的 Agent 系统，也写一线工程笔记。</text>
  <text x="136" y="548" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="16" fill="#71717a" letter-spacing="0.8">AGENT HARNESS · LOCAL-FIRST SYSTEMS · FULLSTACK</text>
  <text x="1064" y="548" text-anchor="end" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="16" fill="#09090b">coooder.space</text>
</svg>`;
}

function buildPostSvg({ title, titleEn, date, tags }) {
  const lines = wrapTitle(title, 28, 3);
  const fontSize = lines.length >= 3 ? 42 : lines.length === 2 ? 48 : 54;
  const lineHeight = Math.round(fontSize * 1.3);
  const titleStartY = lines.length >= 3 ? 210 : lines.length === 2 ? 236 : 268;
  const subtitleY = titleStartY + lines.length * lineHeight + 16;
  const shortDate = String(date || '').slice(0, 10);
  const displayTags = (tags || []).slice(0, 3).map((t) => `#${String(t).toLowerCase()}`);
  const subtitle = titleEn && titleEn !== title ? truncateSubtitle(titleEn, 62) : '';

  const titleNodes = lines
    .map(
      (line, index) =>
        `<text x="136" y="${titleStartY + index * lineHeight}" font-family="'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Helvetica Neue', sans-serif" font-size="${fontSize}" font-weight="600" fill="#09090b" letter-spacing="-0.8">${escapeXml(line)}</text>`
    )
    .join('\n    ');

  let tagOffsetX = 136;
  const tagNodes = displayTags
    .map((tag) => {
      const width = Math.max(76, tag.length * 10 + 24);
      const node = `<g transform="translate(${tagOffsetX}, 456)">
      <rect x="0" y="0" width="${width}" height="32" fill="#fafafa" stroke="#e4e4e7" stroke-width="1.5"/>
      <text x="${Math.round(width / 2)}" y="21" text-anchor="middle" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="13" fill="#3f3f46">${escapeXml(tag)}</text>
    </g>`;
      tagOffsetX += width + 10;
      return node;
    })
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" shape-rendering="crispEdges">
  <defs>
    <pattern id="dotgrid" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect x="7" y="7" width="2" height="2" fill="#09090b" fill-opacity="0.11"/>
    </pattern>
    <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
      <path fill="#09090b" fill-opacity="0.08" d="M7 0h1v1H7zM6 1h1v1H6zM5 2h1v1H5zM4 3h1v1H4zM3 4h1v1H3zM2 5h1v1H2zM1 6h1v1H1zM0 7h1v1H0z"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" fill="url(#dotgrid)"/>

  <rect x="96" y="0" width="1008" height="630" fill="#ffffff"/>
  <line x1="96" y1="0" x2="96" y2="630" stroke="#e4e4e7" stroke-width="2"/>
  <line x1="1104" y1="0" x2="1104" y2="630" stroke="#e4e4e7" stroke-width="2"/>

  <!-- Top bar -->
  <line x1="0" y1="84" x2="1200" y2="84" stroke="#e4e4e7" stroke-width="2"/>
  <rect x="136" y="36" width="10" height="10" fill="#09090b"/>
  <text x="158" y="47" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="15" font-weight="600" fill="#3f3f46" letter-spacing="1.2">ESSAY // ${escapeXml(shortDate || 'COOODER')}</text>
  <text x="1064" y="47" text-anchor="end" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="15" fill="#71717a">coooder.space</text>

  <!-- Thin hatched strip -->
  <rect x="96" y="84" width="1008" height="24" fill="url(#hatch)"/>
  <line x1="0" y1="108" x2="1200" y2="108" stroke="#e4e4e7" stroke-width="2"/>

  <g>
    ${titleNodes}
  </g>

  ${
    subtitle
      ? `<text x="136" y="${subtitleY}" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="18" fill="#71717a">${escapeXml(subtitle)}</text>`
      : ''
  }

  <g>
    ${tagNodes}
  </g>

  <!-- Bottom architectural bar -->
  <line x1="0" y1="532" x2="1200" y2="532" stroke="#e4e4e7" stroke-width="2"/>
  <g>
    ${renderPixelWordmark({ x: 136, y: 562, cell: 4, gap: 1, fill: '#09090b' })}
  </g>
  <text x="1064" y="588" text-anchor="end" font-family="'SF Mono', Menlo, Monaco, monospace" font-size="14" fill="#71717a" letter-spacing="0.8">AGENT HARNESS · FIELD NOTES</text>
</svg>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  await sharp(Buffer.from(buildSiteBannerSvg()))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(SITE_BANNER_PATH);

  const files = readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
  const expectedFiles = new Set();
  let generated = 0;

  for (const file of files) {
    const raw = readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data } = matter(raw);
    if (data.draft === true) continue;

    const slug = file.replace(/\.(mdx|md)$/, '');
    const outName = `${slug}.jpg`;
    expectedFiles.add(outName);
    const svg = buildPostSvg({
      title: data.title || slug,
      titleEn: data.titleEn || '',
      date: data.date ? new Date(data.date).toISOString() : '',
      tags: Array.isArray(data.tags) ? data.tags : [],
    });

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(OUT_DIR, outName));
    generated += 1;
  }

  for (const existing of readdirSync(OUT_DIR)) {
    if (!expectedFiles.has(existing)) {
      rmSync(path.join(OUT_DIR, existing), { force: true });
    }
  }

  console.log(`Generated social-editorial.jpg + ${generated} monochrome pixel OG card(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
