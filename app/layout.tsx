import 'css/tailwind.css';
import 'css/studio.css';
import 'css/gaming.css';
import 'css/reading.css';
import 'css/identity.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'remark-github-blockquote-alert/alert.css';

import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

import { sortPosts } from 'pliny/utils/contentlayer';
import Header from '@/components/header';
import Footer from '@/components/footer';
import siteMetadata from '@/data/siteMetadata';
import { SectionContainer } from '@/components/ui';
import AsciiAmbientBackground from '@/components/ui/AsciiAmbientBackground';
import CommandPalette, { type CommandPostItem } from '@/components/ui/CommandPalette';
import LanguageProvider from '@/components/providers/LanguageProvider';
import { publishedPosts } from '@/lib/publishedPosts';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: 'Coooder — Agent Harness 与全栈工程',
      },
    ],
    locale: siteMetadata.openGraphLocale,
    type: 'website',
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const commandPosts: CommandPostItem[] = sortPosts([...publishedPosts]).map((post) => ({
    slug: post.slug,
    title: post.title,
    titleEn: post.titleEn,
    summary: post.summary,
    summaryEn: post.summaryEn,
    tags: post.tags ?? [],
    date: post.date,
  }));

  return (
    <html lang={siteMetadata.language} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/coooder-32.png" />
        <link rel="icon" type="image/svg+xml" href="/static/favicons/coooder.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/coooder-180.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title={siteMetadata.title} href="/feed.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#09090b" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="studio-body antialiased">
        <LanguageProvider>
          <CommandPalette posts={commandPosts} />
          <a href="#main-content" className="skip-link">
            Skip to content / 跳到正文
          </a>
          <AsciiAmbientBackground />
          <div className="architectural-shell">
            <Header />
            <SectionContainer>
              <main id="main-content" className="site-main">
                {children}
              </main>
              <Footer />
            </SectionContainer>
          </div>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
