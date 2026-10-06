import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import { transformSync } from 'esbuild';

// Inspect the actual static output consumed by crawlers, not client-only state.
function readPage(route) {
  const path = route ? `out/${route}.html` : 'out/index.html';
  assert.ok(existsSync(path), `Build first: missing ${path}`);
  const nodes = [];
  const visit = (node) => {
    nodes.push(node);
    node.children?.forEach(visit);
  };
  visit(fromHtmlIsomorphic(readFileSync(path, 'utf8')));
  const meta = (key) =>
    nodes.find((node) => node.tagName === 'meta' && (node.properties.name === key || node.properties.property === key))
      ?.properties.content;
  const canonical = nodes.find((node) => node.tagName === 'link' && node.properties.rel?.includes('canonical'))
    ?.properties.href;
  assert.equal(meta('description'), meta('og:description'), `${route}: OG description`);
  assert.equal(meta('description'), meta('twitter:description'), `${route}: Twitter description`);
  assert.equal(meta('og:title'), meta('twitter:title'), `${route}: share title`);
  assert.equal(meta('og:image'), meta('twitter:image'), `${route}: share image`);
  assert.ok(
    canonical && new URL(canonical).origin === 'https://coooder-blog.vercel.app',
    `${route}: absolute canonical`
  );
  assert.ok(
    !nodes.some((node) => node.tagName === 'link' && node.properties.hrefLang),
    `${route}: no untranslated language alternate`
  );
  return { nodes, meta, canonical };
}

for (const route of ['', 'blog', 'projects', 'about', 'tags', 'resume']) {
  const { meta } = readPage(route);
  assert.equal(meta('og:locale'), 'zh_CN', `${route}: default locale`);
}

const posts = JSON.parse(readFileSync('.contentlayer/generated/Blog/_index.json', 'utf8'));
for (const post of posts.filter((item) => !item.draft)) {
  const { nodes, meta } = readPage(`blog/${post.slug}`);
  const language = post.bodyLanguage === 'en' ? 'en' : 'zh-CN';
  assert.equal(meta('og:locale'), language === 'en' ? 'en_US' : 'zh_CN');
  assert.equal(meta('og:title'), post.title);
  assert.ok(
    nodes.some((node) => node.tagName === 'div' && node.properties.lang === language),
    `${post.slug}: article body language`
  );
  const structured = nodes.find((node) => node.tagName === 'script' && node.properties.type === 'application/ld+json');
  assert.ok(structured, `${post.slug}: structured data`);
  assert.equal(JSON.parse(structured.children.map((child) => child.value || '').join('')).inLanguage, language);
}

const source = readFileSync('data/projectEvidence.ts', 'utf8');
const { code } = transformSync(source, { loader: 'ts', format: 'esm' });
const { projectEvidence } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const { nodes } = readPage('projects');
for (const project of projectEvidence) {
  assert.match(project.revision, /^[a-f0-9]{40}$/);
  assert.ok(project.sources.length >= 2);
  for (const source of project.sources) {
    const href = `https://github.com/${project.repo}/blob/${project.revision}/${source.path}`;
    assert.ok(
      nodes.some((node) => node.tagName === 'a' && node.properties.href === href),
      `Missing evidence link: ${href}`
    );
    assert.ok(source.label.zh && source.label.en);
  }
  if (project.screenshot) assert.ok(existsSync(`public${project.screenshot.src}`));
}

for (const file of [
  '.github/workflows/notion-sync.yml',
  '.github/workflows/social-sync.yml',
  'scripts/notion-sync.mjs',
  'scripts/social-sync.mjs',
  '.notion-sync.json',
]) {
  assert.ok(!existsSync(file), `Retired sync must remain removed: ${file}`);
}
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
assert.ok(!pkg.scripts['sync:blog'] && !pkg.scripts['sync:social']);
assert.ok(!pkg.dependencies['@notionhq/client'] && !pkg.dependencies['notion-to-md']);
console.log(
  `Content checks passed: 6 pages, ${posts.filter((post) => !post.draft).length} articles, ${projectEvidence.length} project evidence records, and retired sync tooling.`
);
