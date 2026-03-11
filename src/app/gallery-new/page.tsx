'use client';

import React from 'react';
import { InteractiveGallery } from '@/components/ui/InteractiveGallery';
import { getImageUrl } from '@/lib/image-utils';

// Helper to reconstruct similar data to the real gallery page
// In a real refactor, we would lift this data or import it constants
const galleryImages = [
    { id: 1, src: getImageUrl('/images/circle-time-board-2.jpg'), alt: 'Circle time activities at Friendship Daycare Coquitlam - Montessori classroom learning', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 2, src: getImageUrl('/images/circle-time-area.jpg'), alt: 'Circle time learning space at Friendship Daycare Coquitlam - Montessori preschool', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 3, src: getImageUrl('/images/practical-life-shelf-1.jpg'), alt: 'Practical life Montessori materials at Friendship Daycare Coquitlam', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 4, src: getImageUrl('/images/practical-life-shelf-2.jpg'), alt: 'Practical life activities at Friendship Daycare Coquitlam - toddler program', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 5, src: getImageUrl('/images/sensorial-shelf.jpg'), alt: 'Sensorial learning materials at Friendship Daycare Coquitlam - Montessori preschool', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 6, src: getImageUrl('/images/language-shelf.jpg'), alt: 'Language materials at Friendship Daycare Coquitlam - early literacy Montessori', category: 'activities', aspectRatio: 4 / 3 },
    { id: 7, src: getImageUrl('/images/math-shelf.jpg'), alt: 'Mathematics learning materials at Friendship Daycare Coquitlam - Montessori curriculum', category: 'activities', aspectRatio: 4 / 3 },
    { id: 8, src: getImageUrl('/images/culture-shelf.jpg'), alt: 'Cultural studies materials at Friendship Daycare Coquitlam - Montessori activities', category: 'activities', aspectRatio: 4 / 3 },
    { id: 9, src: getImageUrl('/images/art-themed-board-2.jpg'), alt: 'Art-themed display board at Friendship Daycare Coquitlam - children\'s creative work', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 10, src: getImageUrl('/images/toys.jpg'), alt: 'Toys and pretend play area at Friendship Daycare Coquitlam - Montessori activities', category: 'activities', aspectRatio: 4 / 3 },
    { id: 11, src: getImageUrl('/images/playground.jpg'), alt: 'Playground activities at Friendship Daycare Coquitlam - outdoor play space', category: 'playground', aspectRatio: 4 / 3 },
    { id: 12, src: getImageUrl('/images/slidetop-bg.jpg'), alt: 'Daycare environment at Friendship Daycare Coquitlam - Montessori classroom and facilities', category: 'classroom', aspectRatio: 16 / 9 },
];

export default function GalleryTopPage() {
    return (
        <main className="bg-zinc-900 min-h-screen">
            {/* Introduction Spacer to allow scrolling *into* the gallery */}
            <section className="h-screen flex items-center justify-center bg-zinc-950 text-white p-8 border-b border-indigo-500/20">
                <div className="text-center space-y-6 max-w-2xl">
                    <p className="text-indigo-400 font-semibold tracking-wider uppercase">Prototype</p>
                    <h1 className="text-5xl md:text-7xl font-display font-bold">GSAP Gallery</h1>
                    <p className="text-xl text-zinc-400">
                        Scroll down to experience the new horizontal interaction.
                        This is a proof of concept for the Friendship Daycare gallery update.
                    </p>
                    <div className="animate-bounce pt-12">
                        ↓
                    </div>
                </div>
            </section>

            {/* The Gallery Component */}
            <InteractiveGallery images={galleryImages} />

            {/* Footer Spacer to allow scrolling *out of* the gallery */}
            <section className="h-screen flex items-center justify-center bg-zinc-950 text-white p-8 border-t border-indigo-500/20">
                <div className="text-center">
                    <h2 className="text-4xl font-display font-bold mb-4">Continue Exploring</h2>
                    <p className="text-zinc-400">The rest of the page content would go here.</p>
                </div>
            </section>
        </main>
    );
}
