'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import ReactPlayer to avoid hydration mismatch
// casting to any to avoid strict type mismatch with dynamic loading of sub-package
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface HeroVideoBackgroundProps {
    videoId: string;
    overlayColor?: string;
    className?: string;
    fallbackImage?: string;
}

export function HeroVideoBackground({
    videoId,
    overlayColor = 'bg-black/30',
    className,
    fallbackImage,
}: HeroVideoBackgroundProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
            {/* Fallback Image (visible until video loads) */}
            {fallbackImage && (
                <div
                    className={cn(
                        "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
                        isLoaded ? "opacity-0" : "opacity-100"
                    )}
                    style={{ backgroundImage: `url(${fallbackImage})` }}
                />
            )}

            {/* YouTube Player Wrapper */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full pointer-events-none">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    playing={isPlaying}
                    loop={true}
                    muted={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    onReady={() => {
                        setIsLoaded(true);
                        setIsPlaying(true);
                    }}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                showinfo: 0,
                                rel: 0,
                                iv_load_policy: 3,
                                disablekb: 1,
                                fs: 0,
                                playsinline: 1,
                            },
                        },
                    }}
                />
            </div>

            {/* Overlay */}
            <div className={cn('absolute inset-0', overlayColor)} />

            {/* Gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background/90" />
        </div>
    );
}
