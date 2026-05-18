'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { businessProfile } from '@/lib/business-profile';

/** Minimal header for /welcome — logo + call only, one screen form focus */
export function WelcomeCompactHeader() {
  const tel = businessProfile.telephone.replace(/\D/g, '');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-2 px-3 sm:h-12 sm:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <div className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
            <Image src="/logo.png" alt="" fill className="object-contain" sizes="36px" priority unoptimized />
          </div>
          <span className="truncate font-display text-sm font-bold text-primary sm:text-base">
            Friendship Corner
          </span>
        </Link>
        <a
          href={`tel:${tel.length === 10 ? `+1${tel}` : `+${tel}`}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-md transition-colors hover:bg-primary/90 sm:text-sm"
          aria-label="Call us"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden min-[400px]:inline">{businessProfile.telephone}</span>
          <span className="min-[400px]:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}
