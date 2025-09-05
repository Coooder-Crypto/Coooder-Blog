# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static blog site built with Next.js 15 App Router, using Contentlayer2 for MDX content management. The project is configured for static export and focuses on technical writing about frontend development, JavaScript, and web technologies.

## Development Commands

### Essential Commands
```bash
# Development
npm run dev          # Start development server with hot reload
npm start           # Alternative development command

# Production
npm run build       # Build static site for production (outputs to out/)
npm run serve       # Serve built static files locally

# Code Quality
npm run lint        # ESLint with auto-fix for app/, components/, layouts/, scripts/
```

### Content Development
```bash
# Content is processed automatically by Contentlayer2
# After adding new .mdx files, restart dev server to see changes
npm run dev

# Tag data is regenerated on each content build
# Check app/tag-data.json for tag counts
```

## Architecture

### Content System (Contentlayer2)
- **Blog posts**: `data/blog/*.mdx` → generates static pages at `/blog/[...slug]`
- **Authors**: `data/authors/*.mdx` → used in author profiles
- **Generated files**: `.contentlayer/generated/` (auto-generated, don't edit)
- **Static export**: Uses `generateStaticParams()` for all dynamic routes

### Project Structure
```
app/                    # Next.js 15 App Router
├── blog/[...slug]/     # Dynamic blog post pages
├── 3d-room/           # Three.js interactive 3D experience
├── about/             # Author/about pages
├── tags/              # Tag listing and individual tag pages
├── Main.tsx           # Homepage component
└── layout.tsx         # Root layout

components/
├── ui/                # Reusable UI components
├── homepage/          # Homepage-specific components  
├── blog/              # Blog-specific components
├── header/            # Navigation components
└── footer/            # Footer components

data/
├── blog/              # MDX blog posts (content source)
├── authors/           # MDX author profiles
├── siteMetadata.js    # Site configuration
├── headerNavLinks.ts  # Navigation configuration
└── projectsData.ts    # Projects data

layouts/               # MDX layout components
types/                 # TypeScript definitions
hooks/                 # Custom React hooks (staticized for static site)
```

### Key Technologies
- **Next.js 15**: App Router with static export (`output: 'export'`)
- **Contentlayer2**: MDX processing and type generation
- **Tailwind CSS**: Styling with typography plugin for blog content
- **Three.js + GSAP**: 3D room interactive experience
- **Static hooks**: `use-blog-stats.ts` and `use-now-playing.ts` return static data

### Content Processing Pipeline
1. MDX files in `data/blog/` are processed by Contentlayer2
2. Generates TypeScript types and JSON data in `.contentlayer/`
3. `createTagCount()` function generates `app/tag-data.json`
4. `generateStaticParams()` creates static routes for all blog posts
5. Static export builds all pages to `out/` directory

### Static Site Constraints
- No server-side functionality (pure static site)
- Images must use `unoptimized: true` in next.config.js
- All dynamic content must be pre-generated at build time
- Environment variables with `NEXT_PUBLIC_` prefix only

### 3D Room Feature
- Located in `app/3d-room/`
- Uses Three.js with custom Experience class architecture
- GSAP for animations and scroll-triggered effects
- AsScroll for smooth scrolling integration
- Self-contained with its own styles and components

## Content Guidelines

### Blog Post Structure
```yaml
---
title: 'Post Title'
date: '2025-01-01'
lastmod: '2025-01-01'  # Optional
tags: ['javascript', 'frontend', 'tutorial']
summary: 'Brief description for SEO and listings'
draft: false           # Optional, excludes from build if true
layout: 'PostLayout'   # Optional, defaults to PostLayout
---
```

### Supported MDX Features
- GitHub Flavored Markdown
- Math equations (KaTeX)
- Code syntax highlighting (Prism)
- Auto-generated table of contents
- Auto-linked headings
- Image optimization for MDX
- GitHub-style alerts/blockquotes

### Component Organization
- Components are organized by feature/domain
- UI components are generic and reusable
- Feature components are specific to their domain (blog, homepage, etc.)
- All components use TypeScript with proper typing

## Development Notes

### Adding New Blog Posts
1. Create `.mdx` file in `data/blog/`
2. Include proper frontmatter with required fields
3. Restart development server to regenerate Contentlayer
4. Content will be available at `/blog/[filename-without-extension]`

### Modifying Site Configuration
- Edit `data/siteMetadata.js` for site-wide settings
- Edit `data/headerNavLinks.ts` for navigation items
- Contentlayer config is in `contentlayer.config.ts`

### Static Export Considerations
- All external data must be fetched at build time
- No dynamic API routes or server functions
- Images and assets must be optimized manually
- All paths must be known at build time for `generateStaticParams()`

### Performance Features
- Static site generation for maximum performance
- Automatic code splitting by route
- Image optimization disabled for static export compatibility
- CSS and JS minification in production builds
- Snowfall animation on homepage for visual appeal