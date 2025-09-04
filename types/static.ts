// Static site types - no backend API dependencies
export interface SpotifyNowPlayingData {
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
}

// Keep minimal types for frontend display purposes only
export interface TagCounts {
  [tag: string]: number;
}
