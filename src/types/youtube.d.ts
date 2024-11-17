// src/types/youtube.d.ts
interface YouTubePlayer {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

interface YT {
  Player: new (
    elementId: string,
    config: {
      videoId: string;
      playerVars?: {
        start?: number;
        controls?: number;
        modestbranding?: number;
        rel?: number;
      };
      events?: {
        onReady?: (event: YouTubeEvent) => void;
        onStateChange?: (event: YouTubeEvent) => void;
      };
    }
  ) => YouTubePlayer;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};