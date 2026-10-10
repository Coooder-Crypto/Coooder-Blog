import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { publishedPosts } from '@/lib/publishedPosts';

import Main from './Main';

export default async function Page() {
  const sortedPosts = sortPosts([...publishedPosts]);
  const posts = allCoreContent(sortedPosts);

  return <Main posts={posts} />;
}
