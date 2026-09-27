import 'css/tailwind.css';
import 'css/studio.css';
import 'css/twemoji.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'remark-github-blockquote-alert/alert.css';

import { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import Header from '@/components/header';
import Footer from '@/components/footer';
import siteMetadata from '@/data/siteMetadata';
import { SectionContainer } from '@/components/ui';
import LanguageProvider from '@/components/providers/LanguageProvider';

const FONT_OUTFIT = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

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
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
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
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} className={`${FONT_OUTFIT.variable} scroll-smooth`}>
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/tennis-racquet.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/tennis-racquet.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#ffe658" />
      <meta name="theme-color" content="#ffe658" />
      <body className="studio-body antialiased">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Skip to content / 跳到正文
          </a>
          <SectionContainer>
            <Header />
            <main id="main-content" className="site-main">
              {children}
            </main>
            <Footer />
          </SectionContainer>
        </LanguageProvider>
      </body>
    </html>
  );
}
