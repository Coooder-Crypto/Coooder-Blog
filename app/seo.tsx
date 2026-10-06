import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
}

export function genPageMetadata({
  title,
  description = siteMetadata.description,
  image,
  ...rest
}: PageSEOProps & Omit<Metadata, 'title' | 'description'>): Metadata {
  const shareTitle = `${title} | ${siteMetadata.title}`;
  return {
    title,
    description,
    alternates: { canonical: './' },
    openGraph: {
      title: shareTitle,
      description,
      url: './',
      siteName: siteMetadata.title,
      images: image
        ? [image]
        : [
            {
              url: siteMetadata.socialBanner,
              width: 1200,
              height: 630,
              alt: 'Coooder 的漫画工作室：AI Agent、开发者工具与工程实践',
            },
          ],
      locale: siteMetadata.openGraphLocale,
      type: 'website',
    },
    twitter: {
      title: shareTitle,
      description,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  };
}
