import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const BLOG_DIR = path.resolve('data/blog');
const OUT_DIR = path.resolve('public/static/images/og');

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

function wrapTitle(title, maxUnits = 26, maxLines = 3) {
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

function truncateSubtitle(value, maxUnits = 60) {
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

function buildSvg({ title, titleEn, date, tags }) {
  const lines = wrapTitle(title, 29, 3);
  const fontSize = lines.length >= 3 ? 44 : lines.length === 2 ? 48 : 54;
  const lineHeight = Math.round(fontSize * 1.28);
  const titleStartY = lines.length >= 3 ? 218 : lines.length === 2 ? 236 : 262;
  const subtitleY = titleStartY + lines.length * lineHeight + 18;
  const shortDate = String(date || '').slice(0, 10);
  const displayTags = (tags || []).slice(0, 2).map((t) => String(t).toUpperCase());
  const subtitle = titleEn && titleEn !== title ? truncateSubtitle(titleEn, 62) : '';

  const gridLines = [];
  for (let x = 48; x < 1200; x += 48) {
    gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#e9e5da" stroke-width="1"/>`);
  }
  for (let y = 48; y < 630; y += 48) {
    gridLines.push(`<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#e9e5da" stroke-width="1"/>`);
  }

  const titleNodes = lines
    .map(
      (line, index) =>
        `<text x="104" y="${titleStartY + index * lineHeight}" font-family="'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Helvetica Neue', sans-serif" font-size="${fontSize}" font-weight="700" fill="#171614" letter-spacing="-0.8">${escapeXml(line)}</text>`
    )
    .join('\n    ');

  let tagOffsetX = 104;
  const tagNodes = displayTags
    .map((tag) => {
      const width = Math.max(82, tag.length * 10 + 30);
      const node = `<g transform="translate(${tagOffsetX}, 474)">
      <rect x="0" y="0" width="${width}" height="32" rx="16" fill="#f6f4ee" stroke="#ddd8cc" stroke-width="1.2"/>
      <text x="${Math.round(width / 2)}" y="21" text-anchor="middle" font-family="'JetBrains Mono', 'SF Mono', Menlo, monospace" font-size="13" font-weight="600" fill="#57534e" letter-spacing="0.8">${escapeXml(tag)}</text>
    </g>`;
      tagOffsetX += width + 12;
      return node;
    })
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f4ee"/>
  <g opacity="0.65">
    ${gridLines.join('\n    ')}
  </g>
  <rect x="52" y="48" width="1096" height="534" rx="22" fill="#ffffff" stroke="#ded9cc" stroke-width="1.5"/>
  <line x1="52" y1="118" x2="1148" y2="118" stroke="#ebe7dc" stroke-width="1.2"/>

  <circle cx="96" cy="84" r="6" fill="#c2492a"/>
  <text x="116" y="89" font-family="'JetBrains Mono', 'SF Mono', Menlo, monospace" font-size="15" font-weight="600" fill="#57534e" letter-spacing="1.6">ESSAY · ${escapeXml(shortDate || 'COOODER')}</text>
  <text x="1104" y="89" text-anchor="end" font-family="'JetBrains Mono', 'SF Mono', Menlo, monospace" font-size="15" fill="#78716c" letter-spacing="0.4">coooder-blog.vercel.app</text>

  <g opacity="0.88">
    <circle cx="1012" cy="336" r="118" fill="none" stroke="#e4dfd2" stroke-width="1.4" stroke-dasharray="5 7"/>
    <circle cx="1012" cy="336" r="80" fill="none" stroke="#9aa8d6" stroke-width="1.3" stroke-dasharray="4 6"/>
    <circle cx="1012" cy="336" r="46" fill="#f8ebe6" stroke="#c2492a" stroke-width="1.6"/>
    <polygon points="1012,308 1036,336 1012,364 988,336" fill="#ffffff" stroke="#171614" stroke-width="1.8"/>
    <circle cx="1012" cy="336" r="7" fill="#c2492a"/>
  </g>

  <g>
    ${titleNodes}
  </g>

  ${
    subtitle
      ? `<text x="104" y="${subtitleY}" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="22" fill="#b84426">${escapeXml(subtitle)}</text>`
      : ''
  }

  <g>
    ${tagNodes}
  </g>

  <line x1="104" y1="530" x2="1096" y2="530" stroke="#f0ece2" stroke-width="1.2"/>
  <text x="104" y="562" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="800" fill="#171614" letter-spacing="-0.6">coooder<tspan fill="#c2492a">.</tspan></text>
  <text x="1096" y="560" text-anchor="end" font-family="'JetBrains Mono', 'SF Mono', Menlo, monospace" font-size="13" fill="#78716c" letter-spacing="1.2">AGENT HARNESS · AI-NATIVE ENGINEERING</text>
</svg>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
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
    const svg = buildSvg({
      title: data.title || slug,
      titleEn: data.titleEn || '',
      date: data.date ? new Date(data.date).toISOString() : '',
      tags: Array.isArray(data.tags) ? data.tags : [],
    });

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(OUT_DIR, outName));
    generated += 1;
  }

  for (const existing of readdirSync(OUT_DIR)) {
    if (!expectedFiles.has(existing)) {
      rmSync(path.join(OUT_DIR, existing), { force: true });
    }
  }

  console.log(`Generated ${generated} per-post Swiss OG card(s) in public/static/images/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
