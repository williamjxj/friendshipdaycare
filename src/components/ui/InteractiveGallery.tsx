'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register standard GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    category: string;
    aspectRatio?: number;
}

interface InteractiveGalleryProps {
    images: GalleryItem[];
}

export function InteractiveGallery({ images }: InteractiveGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !sliderRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>('.gallery-item');
        const totalWidth = panels.length * (panels[0].offsetWidth + 32); // 32px gap estimate/buffer

        // Horizontal Scroll Animation
        gsap.to(sliderRef.current, {
            xPercent: -100 * (panels.length - 1) / panels.length,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                // Snap to each panel (optional, can be removed for free scrolling)
                snap: 1 / (panels.length - 1),
                end: () => `+=${sliderRef.current?.offsetWidth || 3000}`, // Scroll distance based on width
                markers: false, // Set to true for debugging
            }
        });

    }, { scope: containerRef, dependencies: [images] });

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-zinc-950 py-20 min-h-screen flex items-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />

            <div className="container mx-auto px-4 z-10 block">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                    Our Memories
                </h2>
                <p className="text-zinc-400 max-w-lg mb-12">
                    Scroll down to explore the moments that make Friendship Daycare special.
                </p>
            </div>

            <div
                ref={sliderRef}
                className="flex gap-8 px-4 absolute top-1/2 left-0 w-fit -translate-y-1/2"
            >
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className="gallery-item relative flex-none w-[80vw] md:w-[600px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                            <span className="text-indigo-400 font-medium tracking-wider text-sm uppercase mb-2">{image.category}</span>
                            <h3 className="text-white text-2xl font-bold">{image.alt}</h3>
                        </div>
                    </div>
                ))}
                {/* Spacer to ensure last item is visible if needed, or refine with CSS */}
            </div>
        </section>
    );
}
