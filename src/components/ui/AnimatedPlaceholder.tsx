'use client';

import React from 'react';

interface AnimatedPlaceholderProps {
    className?: string;
}

export const AnimatedPlaceholder: React.FC<AnimatedPlaceholderProps> = ({ className }) => {
    return (
        <div className={`relative w-full h-full overflow-hidden bg-muted/20 flex items-center justify-center ${className}`}>
            {/* Animated SVG elements */}
            <svg
                className="w-24 h-24 text-primary/20 animate-[magic-float_6s_ease-in-out_infinite]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
                <path
                    d="M50 20V80M20 50H80"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-[pulse-soft_3s_ease-in-out_infinite]"
                />
                <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.5" />
            </svg>

            {/* Decorative floating bits */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-secondary/30 animate-[magic-float_4s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-accent/30 animate-[magic-float_5s_ease-in-out_infinite_reverse]" />
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/30 animate-[magic-float_3s_ease-in-out_infinite]" />

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
        </div>
    );
};
