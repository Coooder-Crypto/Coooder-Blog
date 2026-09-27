import { genPageMetadata } from 'app/seo';

// Keep bookmarked URLs usable on the static export without a second resume implementation.
export { default } from '../about/page';

export const metadata = genPageMetadata({
  title: 'About',
  alternates: { canonical: '/about' },
  robots: { index: false, follow: true },
});
