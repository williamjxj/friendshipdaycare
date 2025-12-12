'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <PlayIcon className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">Loading video player...</p>
      </div>
    </div>
  )
});

interface VideoPlayerProps {
  videos: {
    url: string;
    title: string;
    description: string;
    thumbnail?: string;
  }[];
  className?: string;
}

export function VideoPlayer({ videos, className = '' }: VideoPlayerProps) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentVideoData = videos[currentVideo];

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="relative bg-muted rounded-xl overflow-hidden aspect-video flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <PlayIcon className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Loading video player...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Video Player */}
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        <ReactPlayer
          src={currentVideoData.url}
          width="100%"
          height="100%"
          playing={playing}
          controls={true}
          light={currentVideoData.thumbnail}
          playIcon={
            <div className="bg-primary/90 hover:bg-primary p-4 rounded-full transition-all duration-200 hover:scale-110">
              <PlayIcon className="w-8 h-8 text-primary-foreground" />
            </div>
          }
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>

      {/* Video Info */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {currentVideoData.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {currentVideoData.description}
        </p>
      </div>

      {/* Video Playlist */}
      {videos.length > 1 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">More Videos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentVideo(index);
                  setPlaying(false);
                }}
                className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentVideo
                    ? 'border-primary shadow-lg'
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {video.thumbnail ? (
                    <>
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-200" />
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <PlayIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {video.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
