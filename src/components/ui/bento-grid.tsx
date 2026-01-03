'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;

        // Stagger animation for children
        gsap.fromTo(
            gridRef.current.children,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <div
            ref={gridRef}
            className={cn(
                'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <Card
            variant="interactive"
            className={cn(
                'row-span-1 p-6 flex flex-col justify-between space-y-4',
                className
            )}
        >
            <div className="space-y-4">
                {header}
                <div className="transition duration-300">
                    <div className="transition-transform duration-500 group-hover:scale-[1.2] origin-left inline-block">
                        {icon}
                    </div>
                    <CardTitle className="mb-2 mt-4 text-xl">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                        {description}
                    </CardDescription>
                </div>
            </div>
        </Card>
    );
};
