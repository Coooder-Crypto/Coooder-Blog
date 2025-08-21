// Static Spotify hook - no API dependency

import type { SpotifyNowPlayingData } from '@/types/index';

export default function useNowPlaying(): SpotifyNowPlayingData {
  // Return static "not playing" state for static site
  return { isPlaying: false };
}