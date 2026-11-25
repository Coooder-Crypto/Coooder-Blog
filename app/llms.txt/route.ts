import { sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import { publishedPosts } from '@/lib/publishedPosts';
import { projectEvidence } from '@/data/projectEvidence';

export const dynamic = 'force-static';

export function GET() {
  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '');
  const posts = sortPosts([...publishedPosts]);

  const lines = [
    `# ${siteMetadata.title}`,
    '',
    `> ${siteMetadata.description}`,
    '',
    '## Overview',
    '',
    `- Author: Coooder (Beijing, China)`,
    `- Focus: Agent Harness (Context / Execution / Verification), AI-Native Engineering, Local-First Personal Systems (Jarvis), Fullstack TypeScript & Python`,
    `- Site: ${siteUrl}`,
    `- RSS Feed: ${siteUrl}/feed.xml`,
    `- About / Personal Dossier: ${siteUrl}/about`,
    `- Projects: ${siteUrl}/projects`,
    `- Agent Harness Research Radar: ${siteUrl}/library`,
    `- GitHub: ${siteMetadata.github}`,
    `- X: ${siteMetadata.twitter}`,
    `- Email: ${siteMetadata.email}`,
    '',
    '## Featured Public Projects',
    '',
    ...projectEvidence.map(
      (project) =>
        `- ${project.title} (${project.status.en}): ${project.implementation.en} — https://github.com/${project.repo}`
    ),
    '',
    '## Published Essays & Engineering Notes',
    '',
    ...posts.map((post) => {
      const date = post.date.slice(0, 10);
      const summary = post.summaryEn || post.summary || '';
      const titleLine = post.titleEn ? `${post.title} / ${post.titleEn}` : post.title;
      return `- [${titleLine}](${siteUrl}/blog/${post.slug}) (${date}): ${summary}`;
    }),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
