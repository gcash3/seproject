// src/components/video-player.tsx
"use client"

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VideoPlayerProps {
  src?: string;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

export function VideoPlayer({ src, onProgress, onComplete }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!src) return;

    // Initialize YouTube Player API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    let player: any;

    // Create YouTube Player
    window.onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player(iframeRef.current, {
        height: '100%',
        width: '100%',
        videoId: getYouTubeVideoId(src),
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onStateChange: onPlayerStateChange,
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
          }
        }
      });
    };

    // Handle player state changes
    const onPlayerStateChange = (event: any) => {
      if (event.data === (window as any).YT.PlayerState.PLAYING) {
        startTracking(event.target);
        setIsPlaying(true);
      } else {
        stopTracking();
        setIsPlaying(false);
      }
    };

    let progressInterval: NodeJS.Timeout;

    const startTracking = (player: any) => {
      progressInterval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progressPercent = (currentTime / duration) * 100;
        
        setCurrentTime(currentTime);
        setProgress(progressPercent);
        onProgress(progressPercent);

        if (progressPercent >= 90) {
          onComplete();
        }
      }, 1000);
    };

    const stopTracking = () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };

    return () => {
      stopTracking();
    };
  }, [src, onProgress, onComplete]);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : '';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!src) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-white">
        Video not available
      </div>
    );
  }

  return (
    <div className="relative group w-full aspect-video bg-black">
      <div ref={iframeRef} className="w-full h-full" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <Progress value={progress} className="mb-2" />
        <div className="flex items-center justify-between text-white text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}