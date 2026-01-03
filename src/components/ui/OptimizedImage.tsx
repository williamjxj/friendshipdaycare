'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getImageUrl } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  unoptimized?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  unoptimized
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isGif = src.toLowerCase().endsWith('.gif');
  const shouldBeUnoptimized = unoptimized ?? isGif;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-muted-foreground text-xl">📷</span>
          </div>
          <p className="text-sm text-muted-foreground">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-muted-foreground/20 rounded-full animate-spin">
            <div className="w-2 h-2 bg-primary rounded-full ml-1 mt-1"></div>
          </div>
        </div>
      )}

      <Image
        src={getImageUrl(src)}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        unoptimized={shouldBeUnoptimized}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
          } ${fill ? 'object-cover' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
