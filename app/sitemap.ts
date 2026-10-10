import { MetadataRoute } from 'next';
import { publishedPosts } from '@/lib/publishedPosts';
import siteMetadata from '@/data/siteMetadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }));

  const routes = ['', 'about', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
  }));

  return [...routes, ...blogRoutes];
}
