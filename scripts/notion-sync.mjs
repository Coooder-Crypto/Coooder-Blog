import { existsSync } from 'fs';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import path from 'path';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { slug as slugify } from 'github-slugger';
import sharp from 'sharp';
import prettier from 'prettier';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID.');
  process.exit(1);
}

const CONTENT_DIR = path.join(process.cwd(), 'data', 'blog');
const IMAGE_ROOT = path.join(process.cwd(), 'public', 'static', 'images', 'notion');
const MANIFEST_PATH = path.join(process.cwd(), '.notion-sync.json');

const INCLUDE_DRAFTS = ['1', 'true'].includes((process.env.NOTION_INCLUDE_DRAFTS || '').toLowerCase());
const IMAGE_QUALITY = Number.parseInt(process.env.NOTION_IMAGE_QUALITY || '75', 10);
const IMAGE_FORMAT = (process.env.NOTION_IMAGE_FORMAT || 'webp').toLowerCase();

const PROPS = {
  title: process.env.NOTION_PROP_TITLE || 'Title',
  slug: process.env.NOTION_PROP_SLUG || 'Slug',
  date: process.env.NOTION_PROP_DATE || 'Date',
  tags: process.env.NOTION_PROP_TAGS || 'Tags',
  summary: process.env.NOTION_PROP_SUMMARY || 'Summary',
  titleEn: process.env.NOTION_PROP_TITLE_EN || 'TitleEn',
  summaryEn: process.env.NOTION_PROP_SUMMARY_EN || 'SummaryEn',
  draft: process.env.NOTION_PROP_DRAFT || 'Draft',
  layout: process.env.NOTION_PROP_LAYOUT || 'Layout',
  canonicalUrl: process.env.NOTION_PROP_CANONICAL_URL || 'CanonicalUrl',
};

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const readManifest = async () => {
  if (existsSync(MANIFEST_PATH)) {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(raw);
  }
  return { pages: {} };
};

const writeManifest = async (manifest) => {
  const payload = JSON.stringify(manifest, null, 2);
  await writeFile(MANIFEST_PATH, `${payload}\n`, 'utf8');
};

const getText = (prop) => {
  if (!prop) return '';
  if (prop.type === 'title') {
    return prop.title.map((t) => t.plain_text).join('');
  }
  if (prop.type === 'rich_text') {
    return prop.rich_text.map((t) => t.plain_text).join('');
  }
  if (prop.type === 'select') {
    return prop.select?.name ?? '';
  }
  if (prop.type === 'status') {
    return prop.status?.name ?? '';
  }
  return '';
};

const getTags = (prop) => {
  if (!prop) return [];
  if (prop.type === 'multi_select') {
    return prop.multi_select.map((item) => item.name);
  }
  return [];
};

const getDate = (prop) => {
  if (!prop) return '';
  if (prop.type === 'date') {
    return prop.date?.start ?? '';
  }
  if (prop.type === 'created_time') {
    return prop.created_time ?? '';
  }
  return '';
};

const getDraft = (prop) => {
  if (!prop) return false;
  if (prop.type === 'checkbox') {
    return prop.checkbox === true;
  }
  if (prop.type === 'select') {
    return (prop.select?.name ?? '').toLowerCase() === 'draft';
  }
  if (prop.type === 'status') {
    return (prop.status?.name ?? '').toLowerCase() === 'draft';
  }
  return false;
};

const normalizeDate = (value) => {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
};

const normalizeSlug = (raw, fallback, usedSlugs, pageId) => {
  const base = raw ? raw.trim() : '';
  const slugCandidate = (base || fallback)
    .split('/')
    .map((segment) => slugify(segment))
    .filter(Boolean)
    .join('/');
  let slug = slugCandidate || pageId.slice(0, 8);
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${pageId.slice(0, 6)}`;
  }
  usedSlugs.add(slug);
  return slug;
};

const ensureDir = async (dir) => {
  await mkdir(dir, { recursive: true });
};

const getOutputExtension = (contentType) => {
  if (contentType?.includes('gif')) return 'gif';
  if (IMAGE_FORMAT === 'jpeg') return 'jpg';
  if (IMAGE_FORMAT === 'jpg') return 'jpg';
  if (IMAGE_FORMAT === 'png') return 'png';
  return 'webp';
};

const downloadAndOptimizeImage = async (buffer, outputPath, contentType) => {
  if (contentType?.includes('gif')) {
    await writeFile(outputPath, buffer);
    return;
  }

  const pipeline = sharp(buffer);
  if (IMAGE_FORMAT === 'jpeg' || IMAGE_FORMAT === 'jpg') {
    await pipeline.jpeg({ quality: IMAGE_QUALITY, mozjpeg: true }).toFile(outputPath);
    return;
  }
  if (IMAGE_FORMAT === 'png') {
    await pipeline.png({ quality: IMAGE_QUALITY }).toFile(outputPath);
    return;
  }
  await pipeline.webp({ quality: IMAGE_QUALITY }).toFile(outputPath);
};

const rewriteImages = async (markdown, slug) => {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const urlMap = new Map();
  let imageIndex = 1;
  let updated = markdown;
  let imageDirReady = false;
  const imageDir = path.join(IMAGE_ROOT, slug);

  for (const match of markdown.matchAll(imageRegex)) {
    const alt = match[1];
    const rawTarget = match[2];
    const url = rawTarget.split(' ')[0].trim();
    if (!/^https?:\/\//i.test(url)) {
      continue;
    }

    let localUrl = urlMap.get(url);
    if (!localUrl) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Image download failed: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type') || '';
        const buffer = Buffer.from(await response.arrayBuffer());
        const extension = getOutputExtension(contentType);
        const fileName = `image-${String(imageIndex).padStart(2, '0')}.${extension}`;
        const outputPath = path.join(imageDir, fileName);
        const localPath = `/static/images/notion/${slug}/${fileName}`;

        if (!imageDirReady) {
          await ensureDir(imageDir);
          imageDirReady = true;
        }

        await downloadAndOptimizeImage(buffer, outputPath, contentType);
        urlMap.set(url, localPath);
        localUrl = localPath;
        imageIndex += 1;
      } catch (error) {
        console.warn(`Image skipped: ${url}`);
        continue;
      }
    }

    updated = updated.replace(match[0], `![${alt}](${localUrl})`);
  }

  return updated;
};

const buildFrontmatter = (data) => {
  const formatYamlString = (value) => `'${String(value).replace(/'/g, "''")}'`;
  const formatYamlArray = (values) => `[${values.map((value) => formatYamlString(value)).join(', ')}]`;

  const lines = [
    '---',
    `title: ${formatYamlString(data.title)}`,
    data.titleEn ? `titleEn: ${formatYamlString(data.titleEn)}` : null,
    data.summary ? `summary: ${formatYamlString(data.summary)}` : null,
    data.summaryEn ? `summaryEn: ${formatYamlString(data.summaryEn)}` : null,
    `date: ${formatYamlString(data.date)}`,
    data.lastmod ? `lastmod: ${formatYamlString(data.lastmod)}` : null,
    `tags: ${formatYamlArray(data.tags ?? [])}`,
    data.draft ? 'draft: true' : 'draft: false',
    data.layout ? `layout: ${formatYamlString(data.layout)}` : null,
    data.canonicalUrl ? `canonicalUrl: ${formatYamlString(data.canonicalUrl)}` : null,
    '---',
  ].filter(Boolean);

  return `${lines.join('\n')}\n\n`;
};

const queryAllPages = async () => {
  const pages = [];
  let cursor = undefined;

  do {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...response.results);
    cursor = response.next_cursor;
  } while (cursor);

  return pages;
};

const main = async () => {
  const manifest = await readManifest();
  const existingPages = manifest.pages || {};
  const nextManifest = { updatedAt: new Date().toISOString(), pages: {} };
  const usedSlugs = new Set();

  await ensureDir(CONTENT_DIR);
  await ensureDir(IMAGE_ROOT);

  const pages = await queryAllPages();

  for (const page of pages) {
    if (page.archived || page.in_trash) continue;
    const props = page.properties || {};
    const title = getText(props[PROPS.title]) || 'Untitled';
    const slug = normalizeSlug(getText(props[PROPS.slug]), title, usedSlugs, page.id);
    const dateValue = normalizeDate(getDate(props[PROPS.date]) || page.created_time);
    const lastmod = normalizeDate(page.last_edited_time);
    const tags = getTags(props[PROPS.tags]);
    const summary = getText(props[PROPS.summary]);
    const titleEn = getText(props[PROPS.titleEn]);
    const summaryEn = getText(props[PROPS.summaryEn]);
    const layout = getText(props[PROPS.layout]);
    const canonicalUrl = getText(props[PROPS.canonicalUrl]);
    const draft = getDraft(props[PROPS.draft]);

    if (draft && !INCLUDE_DRAFTS) {
      continue;
    }

    const imageDir = path.join(IMAGE_ROOT, slug);
    await rm(imageDir, { recursive: true, force: true });

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);
    const markdown = typeof mdString === 'string' ? mdString : mdString?.parent || '';
    const updatedMarkdown = await rewriteImages(markdown, slug);

    const frontmatter = buildFrontmatter({
      title,
      titleEn,
      summary,
      summaryEn,
      date: dateValue,
      lastmod,
      tags,
      draft,
      layout,
      canonicalUrl,
    });

    const outputPath = path.join(CONTENT_DIR, `${slug}.mdx`);
    let formattedBody = updatedMarkdown.trim();
    try {
      formattedBody = await prettier.format(`${formattedBody}\n`, { parser: 'mdx' });
    } catch (error) {
      console.warn(`Prettier failed for ${slug}, using raw output.`);
    }
    if (!formattedBody.endsWith('\n')) {
      formattedBody = `${formattedBody}\n`;
    }
    const output = `${frontmatter}${formattedBody}`;
    await ensureDir(path.dirname(outputPath));
    await writeFile(outputPath, output, 'utf8');

    nextManifest.pages[page.id] = {
      slug,
      filePath: path.relative(process.cwd(), outputPath),
    };
  }

  for (const [pageId, entry] of Object.entries(existingPages)) {
    if (nextManifest.pages[pageId]) continue;
    if (entry?.filePath) {
      const targetPath = path.join(process.cwd(), entry.filePath);
      await rm(targetPath, { force: true });
    }
    if (entry?.slug) {
      const imageDir = path.join(IMAGE_ROOT, entry.slug);
      await rm(imageDir, { recursive: true, force: true });
    }
  }

  await writeManifest(nextManifest);
  console.log(`Notion sync complete: ${Object.keys(nextManifest.pages).length} posts`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
