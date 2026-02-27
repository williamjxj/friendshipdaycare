'use client';

import { cn } from '@/lib/utils';

interface HeroSideBackgroundProps {
  className?: string;
  variant?: 'gradient' | 'pattern' | 'organic';
}

/**
 * Decorative background SVG component to fill left and right blank spaces
 * in hero sections when images use object-contain
 */
export function HeroSideBackground({
  className,
  variant = 'organic',
}: HeroSideBackgroundProps) {
  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          className
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-primary/10 to-transparent" />
      </div>
    );
  }

  if (variant === 'pattern') {
    return (
      <div
        className={cn(
          'absolute inset-0 pointer-events-none overflow-hidden',
          className
        )}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <defs>
            <linearGradient id="sideGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="sideGradientReverse" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Left side pattern */}
          <g>
            <rect x="0" y="0" width="300" height="400" fill="url(#sideGradient)" />
            {/* Decorative circles */}
            <circle cx="50" cy="80" r="30" fill="hsl(var(--secondary))" opacity="0.1" />
            <circle cx="120" cy="150" r="25" fill="hsl(var(--accent))" opacity="0.08" />
            <circle cx="80" cy="250" r="35" fill="hsl(var(--primary))" opacity="0.1" />
            <circle cx="200" cy="320" r="20" fill="hsl(var(--secondary))" opacity="0.08" />
          </g>
          
          {/* Right side pattern */}
          <g>
            <rect x="900" y="0" width="300" height="400" fill="url(#sideGradientReverse)" />
            {/* Decorative circles */}
            <circle cx="1150" cy="100" r="30" fill="hsl(var(--secondary))" opacity="0.1" />
            <circle cx="1080" cy="180" r="25" fill="hsl(var(--accent))" opacity="0.08" />
            <circle cx="1120" cy="280" r="35" fill="hsl(var(--primary))" opacity="0.1" />
            <circle cx="1000" cy="350" r="20" fill="hsl(var(--secondary))" opacity="0.08" />
          </g>
        </svg>
      </div>
    );
  }

  // Default: organic variant with warm cream/gold tones (avoids gray cast)
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1920 600"
      >
        <defs>
          {/* Left side gradient - Warm cream at top, soft gold at bottom */}
          <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(255, 250, 240)" stopOpacity="0.12" />
            <stop offset="20%" stopColor="rgb(255, 248, 230)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="rgb(255, 243, 205)" stopOpacity="0.06" />
            <stop offset="80%" stopColor="rgb(245, 230, 180)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          {/* Right side gradient - Warm cream at top, soft gold at bottom */}
          <linearGradient id="rightGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgb(255, 250, 240)" stopOpacity="0.12" />
            <stop offset="20%" stopColor="rgb(255, 248, 230)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="rgb(255, 243, 205)" stopOpacity="0.06" />
            <stop offset="80%" stopColor="rgb(245, 230, 180)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          {/* Soft blur filter for organic shapes */}
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
        </defs>
        
        {/* Left side organic shapes */}
        <g>
          {/* Base gradient fill */}
          <rect x="0" y="0" width="400" height="600" fill="url(#leftGradient)" />
          
          {/* Organic blob shapes - Warm cream and soft gold tones */}
          <ellipse
            cx="150"
            cy="120"
            rx="80"
            ry="100"
            fill="rgb(255, 250, 240)"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="250"
            cy="200"
            rx="90"
            ry="70"
            fill="rgb(255, 245, 220)"
            opacity="0.08"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="100"
            cy="400"
            rx="70"
            ry="85"
            fill="rgb(245, 222, 179)"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="320"
            cy="480"
            rx="60"
            ry="75"
            fill="rgb(238, 232, 205)"
            opacity="0.08"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="200"
            cy="350"
            rx="50"
            ry="60"
            fill="rgb(255, 248, 220)"
            opacity="0.09"
            filter="url(#softBlur)"
          />
          
          {/* Subtle wave pattern - Warm tones */}
          <path
            d="M0,200 Q100,180 200,200 T400,200 L400,600 L0,600 Z"
            fill="rgb(255, 250, 235)"
            opacity="0.06"
          />
          <path
            d="M0,350 Q120,330 240,350 T400,350 L400,600 L0,600 Z"
            fill="rgb(245, 222, 179)"
            opacity="0.08"
          />
          <path
            d="M0,500 Q150,480 300,500 T400,500 L400,600 L0,600 Z"
            fill="rgb(238, 232, 205)"
            opacity="0.07"
          />
        </g>
        
        {/* Right side organic shapes */}
        <g>
          {/* Base gradient fill */}
          <rect x="1520" y="0" width="400" height="600" fill="url(#rightGradient)" />
          
          {/* Organic blob shapes - Warm cream and soft gold tones */}
          <ellipse
            cx="1770"
            cy="150"
            rx="85"
            ry="95"
            fill="rgb(255, 250, 240)"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="1670"
            cy="220"
            rx="90"
            ry="70"
            fill="rgb(255, 245, 220)"
            opacity="0.08"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="1820"
            cy="420"
            rx="75"
            ry="80"
            fill="rgb(245, 222, 179)"
            opacity="0.1"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="1600"
            cy="500"
            rx="65"
            ry="70"
            fill="rgb(238, 232, 205)"
            opacity="0.08"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="1720"
            cy="370"
            rx="50"
            ry="60"
            fill="rgb(255, 248, 220)"
            opacity="0.09"
            filter="url(#softBlur)"
          />
          
          {/* Subtle wave pattern - Warm tones */}
          <path
            d="M1520,180 Q1620,200 1720,180 T1920,180 L1920,600 L1520,600 Z"
            fill="rgb(255, 250, 235)"
            opacity="0.06"
          />
          <path
            d="M1520,380 Q1640,400 1760,380 T1920,380 L1920,600 L1520,600 Z"
            fill="rgb(245, 222, 179)"
            opacity="0.08"
          />
          <path
            d="M1520,530 Q1670,510 1820,530 T1920,530 L1920,600 L1520,600 Z"
            fill="rgb(238, 232, 205)"
            opacity="0.07"
          />
        </g>
      </svg>
    </div>
  );
}

