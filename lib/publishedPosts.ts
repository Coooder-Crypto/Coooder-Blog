import { allBlogs } from 'contentlayer/generated';

// A draft must never reach public routes, client props, metadata, or navigation.
// Keep the same boundary in development so a preview matches a production export.
export const publishedPosts = allBlogs.filter((post) => post.draft !== true);
