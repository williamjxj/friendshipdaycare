'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-4 flex-1">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/friendship-corner-daycare-logo.png"
                alt="Friendship Corner Daycare"
                width={48}
                height={36}
                className="w-10 h-auto object-contain"
              />
              <span className="font-display font-bold text-lg text-foreground">
                Friendship Corner
              </span>
            </div>
            <div className="w-full">
              <p className="text-muted-foreground text-sm leading-relaxed text-center md:text-left">
                Providing a nurturing Montessori environment where every child is respected, encouraged, and guided to their full potential. <span className="text-primary font-semibold">Since 2008</span>
              </p>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col items-center md:items-end space-y-2 flex-shrink-0">
            <a 
              href="tel:6049458504" 
              className="text-primary font-bold text-lg hover:text-primary/80 transition-colors whitespace-nowrap"
            >
              604.945.8504
            </a>
            <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end space-y-1">
              <span>Coquitlam Centre, BC</span>
              <span>Licensed Group Daycare</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Friendship Corner Daycare. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link 
              href="/privacy" 
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
