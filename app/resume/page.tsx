import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';

import { genPageMetadata } from 'app/seo';
import ResumeExperience from '@/components/resume/ResumeExperience';

export const metadata = genPageMetadata({
  title: '3D Resume',
  description: 'An interactive introduction to Coooder, his experience, projects, and writing.',
});

export default function ResumePage() {
  const posts = allCoreContent(sortPosts(allBlogs)).slice(0, 3);

  return <ResumeExperience posts={posts} />;
}
