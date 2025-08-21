// Static blog stats hooks - no database dependency

export function useBlogStats(slug: string) {
  const stats = {
    slug,
    ideas: 0,
    views: 0,
    loves: 0,
    applauses: 0,
    bullseye: 0,
  };

  return [stats, false]; // stats, isLoading
}

export function useUpdateBlogStats() {
  const trigger = () => {
    // No-op for static site
    console.log('Stats update skipped in static mode');
  };

  return trigger;
}