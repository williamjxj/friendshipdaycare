'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CategoryAnimatedSVGProps {
    category: 'montessori' | 'outdoor' | 'activities';
    className?: string;
}

export const CategoryAnimatedSVG: React.FC<CategoryAnimatedSVGProps> = ({ category, className }) => {
    const containerVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
    };

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => {
            const delay = 1 + i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring" as const, duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

    const renderIcon = () => {
        switch (category) {
            case 'montessori':
                return (
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-32 h-32 text-primary/40"
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Books / Learning Materials Shape */}
                        <motion.path
                            d="M20 30 L40 25 L40 75 L20 80 Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="currentColor"
                            fillOpacity="0.1"
                            variants={draw}
                            custom={1}
                        />
                        <motion.path
                            d="M40 25 L60 30 L60 80 L40 75 Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="currentColor"
                            fillOpacity="0.2"
                            variants={draw}
                            custom={2}
                        />
                        <motion.path
                            d="M60 30 L80 25 L80 75 L60 80 Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="currentColor"
                            fillOpacity="0.1"
                            variants={draw}
                            custom={3}
                        />
                        {/* Bubbles of knowledge */}
                        <motion.circle
                            cx="30" cy="15" r="5"
                            fill="currentColor"
                            fillOpacity="0.3"
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="70" cy="10" r="4"
                            fill="currentColor"
                            fillOpacity="0.2"
                            animate={{ y: [5, -5, 5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.svg>
                );
            case 'outdoor':
                return (
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-32 h-32 text-secondary/40"
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Tree / Nature Shape */}
                        <motion.path
                            d="M50 80 L50 40"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            variants={draw}
                            custom={1}
                        />
                        <motion.path
                            d="M50 40 C30 40 20 60 40 70 C40 85 60 85 60 70 C80 60 70 40 50 40 Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="currentColor"
                            fillOpacity="0.2"
                            variants={draw}
                            custom={2}
                        />
                        {/* Floating Leaves */}
                        <motion.path
                            d="M75 50 Q80 45 85 50"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            animate={{ rotate: [0, 15, -15, 0], x: [0, 5, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <motion.circle
                            cx="20" cy="30" r="10"
                            fill="currentColor"
                            fillOpacity="0.1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </motion.svg>
                );
            case 'activities':
                return (
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-32 h-32 text-accent/40"
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Paint Palette / Creativity Shape */}
                        <motion.path
                            d="M30 70 C10 60 10 30 40 20 C70 10 90 40 80 70 C70 90 40 90 30 70 Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="currentColor"
                            fillOpacity="0.1"
                            variants={draw}
                            custom={1}
                        />
                        {/* Color spots */}
                        <motion.circle cx="40" cy="40" r="5" fill="currentColor" fillOpacity="0.5" variants={draw} custom={2} />
                        <motion.circle cx="60" cy="45" r="5" fill="currentColor" fillOpacity="0.3" variants={draw} custom={3} />
                        <motion.circle cx="50" cy="65" r="5" fill="currentColor" fillOpacity="0.4" variants={draw} custom={4} />
                        {/* Sparkles */}
                        <motion.path
                            d="M85 20 L85 30 M80 25 L90 25"
                            stroke="currentColor"
                            strokeWidth="1"
                            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                    </motion.svg>
                );
            default:
                return null;
        }
    };

    // Check if className contains bg-transparent to override default background
    const hasTransparentBg = className?.includes('bg-transparent') || className?.includes('!bg-transparent');
    const baseClasses = hasTransparentBg 
        ? 'absolute inset-0 flex items-center justify-center z-20'
        : 'absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20';

    return (
        <motion.div
            className={`${baseClasses} ${className || ''}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {renderIcon()}
        </motion.div>
    );
};
