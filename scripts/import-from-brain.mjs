#!/usr/bin/env node
/**
 * Local, explicit one-way importer from jarvis-brain/output/writing into data/blog/.
 * - Never runs automatically or calls external APIs.
 * - Defaults to `draft: true` so every imported article requires explicit human review.
 * - Converts Obsidian image embeds (`![[...]]`) into optimized WebP files under public/static/images/blog/<slug>/.
 * - Blocks common privacy leaks (private IPs, tokens, credentials) before writing.
 *
 * Usage:
 *   node scripts/import-from-brain.mjs <note-file.md> --slug <target-slug> [--brain <path>] [--publish]
 *   node scripts/import-from-brain.mjs --scan [--brain <path>]
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const args = process.argv.slice(2);
const flagValue = (name) => {
  const index = args.indexOf(name);
  return index !== -1 ? args[index + 1] : undefined;
};
const hasFlag = (name) => args.includes(name);

const brainRoot = path.resolve(flagValue('--brain') || path.join('..', 'Jarvis', 'jarvis-brain'));
const writingDir = path.join(brainRoot, 'output', 'writing');
const assetsDir = path.join(brainRoot, 'inbox', 'assets');

const REDLINE_PATTERNS = [
  { label: 'Tailscale / private IP', pattern: /\b(?:100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d+\.\d+|192\.168\.\d+\.\d+)\b/ },
  { label: 'API key or token', pattern: /\b(?:sk-[A-Za-z0-9_-]{12,}|secret_[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9]{20,})\b/ },
  { label: 'Database connection string', pattern: /postgresql:\/\/[^\s'"]+:[^\s'"]+@/i },
  { label: 'Env secret assignment', pattern: /\b(?:API_KEY|NOTION_TOKEN|PASSWORD|SECRET)\s*=\s*[^\s<]{6,}/ },
];

function checkPrivacyRedlines(text, sourceLabel) {
  const hits = REDLINE_PATTERNS.filter(({ pattern }) => pattern.test(text)).map(({ label }) => label);
  if (hits.length > 0) {
    throw new Error(`Privacy redline triggered in ${sourceLabel}: ${hits.join(', ')}. Redact before importing.`);
  }
}

function slugifyAsset(filename, index) {
  const base = path.basename(filename, path.extname(filename)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${base || `figure-${index + 1}`}.webp`;
}

async function importNote(notePath, slug, publish = false) {
  if (!existsSync(notePath)) {
    throw new Error(`Note not found: ${notePath}`);
  }
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid --slug "${slug}". Use lowercase kebab-case (e.g. my-new-essay).`);
  }

  const raw = readFileSync(notePath, 'utf8');
  const parsed = matter(raw);
  checkPrivacyRedlines(parsed.content, notePath);

  let body = parsed.content.trim();
  const titleMatch = body.match(/^#\s+(.+)\n+/);
  const title = parsed.data.title || (titleMatch ? titleMatch[1].trim() : path.basename(notePath, '.md'));
  if (titleMatch) {
    body = body.slice(titleMatch[0].length).trim();
  }

  const imageMatches = [...body.matchAll(/!\[\[([^\]]+)\]\]/g)];
  const convertedImages = [];
  if (imageMatches.length > 0) {
    const destDir = path.resolve('public', 'static', 'images', 'blog', slug);
    mkdirSync(destDir, { recursive: true });
    for (let i = 0; i < imageMatches.length; i += 1) {
      const [fullMatch, embedTarget] = imageMatches[i];
      const [assetName, caption] = embedTarget.split('|').map((s) => s.trim());
      const srcAsset = path.join(assetsDir, assetName);
      if (!existsSync(srcAsset)) {
        throw new Error(`Referenced Obsidian asset missing: ${srcAsset}`);
      }
      const outName = slugifyAsset(assetName, i);
      const outFile = path.join(destDir, outName);
      await sharp(srcAsset).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(outFile);
      const webPath = `/static/images/blog/${slug}/${outName}`;
      convertedImages.push(webPath);
      body = body.replace(fullMatch, `![${caption || title}](${webPath})`);
    }
  }

  // Convert remaining Obsidian wikilinks to plain readable labels so internal vault paths never leak.
  body = body.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2').replace(/\[\[([^\]]+)\]\]/g, (_, target) => {
    const parts = target.split('/');
    return parts[parts.length - 1];
  });

  const date =
    parsed.data.created instanceof Date
      ? parsed.data.created.toISOString().slice(0, 10)
      : String(parsed.data.created || new Date().toISOString().slice(0, 10)).slice(0, 10);

  const frontmatter = {
    title,
    titleEn: parsed.data.titleEn || title,
    bodyLanguage: parsed.data.bodyLanguage || 'zh',
    summary: parsed.data.summary || `整理自个人笔记：${title}`,
    summaryEn: parsed.data.summaryEn || `Adapted from personal notes: ${title}`,
    date,
    lastmod: date,
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : ['agents'],
    ...(convertedImages.length ? { images: [convertedImages[0]] } : {}),
    draft: !publish,
  };

  const outPath = path.resolve('data', 'blog', `${slug}.mdx`);
  const mdx = matter.stringify(`${body}\n`, frontmatter);
  writeFileSync(outPath, mdx, 'utf8');
  console.log(`Imported ${path.basename(notePath)} -> data/blog/${slug}.mdx (draft: ${frontmatter.draft}, images: ${convertedImages.length})`);
}

async function main() {
  if (hasFlag('--scan')) {
    if (!existsSync(writingDir)) {
      console.error(`Writing directory not found: ${writingDir}`);
      process.exit(1);
    }
    const files = readdirSync(writingDir).filter((file) => file.endsWith('.md') && file !== 'index.md');
    let imported = 0;
    for (const file of files) {
      const fullPath = path.join(writingDir, file);
      const parsed = matter(readFileSync(fullPath, 'utf8'));
      if (parsed.data.publish_target === 'blog' && parsed.data.public_safe === true && parsed.data.slug) {
        await importNote(fullPath, String(parsed.data.slug), hasFlag('--publish'));
        imported += 1;
      }
    }
    console.log(
      imported > 0
        ? `Done: imported ${imported} note(s). Review the generated MDX files and run yarn check.`
        : 'No notes marked with `publish_target: blog`, `public_safe: true`, and `slug` in jarvis-brain/output/writing.'
    );
    return;
  }

  const inputArg = args.find((arg) => !arg.startsWith('--'));
  const slug = flagValue('--slug');
  if (!inputArg || !slug) {
    console.log('Usage:');
    console.log('  yarn brain:import <note.md> --slug <kebab-slug> [--publish]');
    console.log('  yarn brain:import --scan [--publish]');
    process.exit(1);
  }
  const resolved = existsSync(inputArg) ? path.resolve(inputArg) : path.join(writingDir, inputArg);
  await importNote(resolved, slug, hasFlag('--publish'));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
