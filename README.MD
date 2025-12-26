# Coooder Blog

**中文简介**

这是一个开源的个人博客站点，基于 Next.js + MDX + Contentlayer 构建。内容来源于 Notion，通过同步脚本落盘为 MDX，构建时静态生成页面，部署在 Vercel。  
线上地址：<https://coooder-blog.vercel.app/>

**English**

An open-source personal blog built with Next.js + MDX + Contentlayer. Content is authored in Notion, synced to local MDX files, and statically built for Vercel.  
Live site: <https://coooder-blog.vercel.app/>

---

## Features / 特性

- Notion as the content source, synced to local MDX / Notion 作为内容源并同步到 MDX
- Static export (`output: export`) for fast, stable deploys / 静态导出部署稳定
- Tags, TOC, bilingual title/summary / 标签、目录、多语言标题与摘要
- Image localization + compression / 图片本地化与压缩
- GitHub Actions scheduled sync + auto-merge PR / 定时同步 + 自动合并 PR

---

## Tech Stack / 技术栈

- Next.js 16 + React 19
- Contentlayer2 + MDX
- Tailwind CSS + Pliny
- Notion API
- GitHub Actions + Vercel

---

## Implementation Notes / 技术实现

**Content pipeline / 内容链路**

1) Write in Notion Database  
2) Sync script pulls data → converts to MDX → writes to `data/blog/*.mdx`  
3) Contentlayer generates typed data  
4) Next.js builds & exports static site

Notion handles editing experience; the site builds from local MDX for stability and reproducibility.

---

## Local Development / 本地开发

```bash
yarn install
yarn dev
```

推荐 Node.js 20+。

---

## Notion Schema (Default) / 字段约定（默认）

| Field | Type | Description |
| --- | --- | --- |
| Title | Title | Article title / 标题 |
| Slug | Text | URL slug (optional) / URL 片段 |
| Date | Date | Publish date / 发布时间 |
| Tags | Multi-select | Tags / 标签 |
| Summary | Text | Summary / 摘要 |
| Draft | Checkbox | Draft flag / 草稿 |
| TitleEn | Text | English title (optional) |
| SummaryEn | Text | English summary (optional) |
| Layout | Text/Select | Layout (optional) |
| CanonicalUrl | URL/Text | Canonical URL (optional) |

If your fields differ, override with env vars.

---

## Environment Variables / 环境变量

```bash
NOTION_TOKEN=
NOTION_DATABASE_ID=
NOTION_INCLUDE_DRAFTS=false
NOTION_IMAGE_QUALITY=75
NOTION_IMAGE_FORMAT=webp
```

Optional field mapping:

```bash
NOTION_PROP_TITLE=Title
NOTION_PROP_SLUG=Slug
NOTION_PROP_DATE=Date
NOTION_PROP_TAGS=Tags
NOTION_PROP_SUMMARY=Summary
NOTION_PROP_TITLE_EN=TitleEn
NOTION_PROP_SUMMARY_EN=SummaryEn
NOTION_PROP_DRAFT=Draft
NOTION_PROP_LAYOUT=Layout
NOTION_PROP_CANONICAL_URL=CanonicalUrl
```

---

## Scripts / 脚本

- `yarn dev` — local dev / 本地开发
- `yarn build` — production build / 生产构建
- `yarn lint` — lint / 代码检查
- `yarn sync:blog` — Notion → MDX sync / 同步

---

## Automation (GitHub Actions) / 自动化

The `Notion Sync` workflow runs daily (UTC 02:00), pushes changes to `notion-sync`, opens a PR, and enables auto-merge.  
需要在 GitHub Secrets 中配置：

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

Note: scheduled workflows only run on the default branch.

---

## Deployment / 部署

Recommended: Vercel

1) Connect repo  
2) Build: `yarn build`  
3) Output: `out`

No Notion env vars needed in Vercel (sync happens in GitHub Actions).

---

## Contributing / 贡献

Issues and PRs are welcome.  
If you plan to change the theme or sync pipeline, please open an Issue first.

---

## License

No license file yet. Add one if you plan to reuse the codebase (e.g. MIT).
