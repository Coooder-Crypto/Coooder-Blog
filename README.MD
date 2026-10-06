# Coooder Blog

基于 Next.js 16、React 19、MDX 与 Contentlayer 的个人网站。记录 AI Agent、开发者工具与全栈工程实践，以静态文件部署到 Vercel。

A personal website built with Next.js 16, React 19, MDX, and Contentlayer. Notes on AI agents, developer tools, and fullstack engineering, statically exported for Vercel.

线上 / Live: <https://coooder-blog.vercel.app/>

## 本地开发 / Development

使用 Node.js 20+ 和仓库指定的 Yarn 版本。

```bash
yarn install --immutable
yarn dev
yarn build
yarn check:content
```

`yarn check:content` checks the generated export; run it after `yarn build`.

## 内容与语言 / Content and language

- 直接编辑 `data/blog/*.mdx`，文章与图片随仓库版本管理。Contentlayer 生成类型数据，Next.js 输出到 `out/`。
- Author posts directly in `data/blog/*.mdx`. Content and images are versioned in Git; Contentlayer feeds the static export in `out/`.
- UI、标题和摘要支持中英文；正文由 `bodyLanguage: zh | en` 指定原文语言，不自动翻译。
- Navigation, titles, and summaries support Chinese and English. `bodyLanguage` describes the actual article body; switching the UI does not translate it.
- 站点默认中文。通用页面的分享信息为中文，文章分享信息采用原文标题、摘要和语言。客户端语言偏好不会改变静态分享卡片；未提供正文译文的页面不声明英文替代 URL。
- The default static document is Chinese. Article metadata follows the original language. Client language preferences do not change crawler-visible share cards; no translated alternate URLs are claimed without translated content.

```yaml
title: 原文标题
titleEn: English title
summary: 中文摘要
summaryEn: English summary
bodyLanguage: zh
date: '2026-10-06'
tags: ['agents']
```

可用 `xPostUrl` 和 `socialSummary` 为文章添加 X 讨论链接，无需 API token。
Use optional `xPostUrl` and `socialSummary` fields to link an X discussion without an API token.

## 项目证据 / Project evidence

`data/projectsData.ts` 维护案例简介，`data/projectEvidence.ts` 维护双语实现说明、阶段限制、截图来源与固定提交版本的源码链接。

Keep case summaries in `data/projectsData.ts` and evidence in `data/projectEvidence.ts`. Evidence links are pinned to reviewed public commits. Distinguish implementation, test cases, actual test runs, and roadmap items. Do not publish company-internal work, credentials, or health data.

## 旧同步已移除 / Retired synchronization

Notion 与 GitHub/X 同步工作流、脚本、同步清单和 API 依赖已移除，不再定时拉取、创建 PR 或自动合并。现有 MDX、图片与静态社交数据保留。恢复旧实现请查阅 Git 历史。

The old Notion and GitHub/X synchronization workflows, scripts, manifest, and API dependencies have been removed. There are no scheduled content pulls, sync PRs, or auto-merges. Existing posts, images, and static social data remain; historical tooling is recoverable from Git.

构建不需要 Notion、GitHub 或 X 凭据。迁移不会读取或删除你的本地 `.env`、账户 token 或 GitHub Secrets；不再使用的凭据可由所有者另行撤销。

No Notion, GitHub, or X credentials are needed to build. This cleanup does not read or delete local `.env` files, account tokens, or GitHub Secrets; owners may revoke unused credentials separately.

## 部署 / Deployment

Vercel build command: `yarn build`; output directory: `out`.

提交、PR、合并和发布由维护者显式操作，仓库不包含自动内容同步或自动合并管线。
Commits, PRs, merges, and releases are explicit maintainer actions; this repository contains no content-sync or auto-merge pipeline.

## Contributing / 贡献

Issues and PRs are welcome. Please discuss substantial theme changes in an issue first.

## License

No license file yet. Add one if you plan to reuse the codebase (e.g. MIT).
