'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Smartphone
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-utils';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  // In a real app, this would be the deployed domain. Using a placeholder or internal logic.
  const siteUrl = "https://www.friendshipdaycare.com";

  return (
    <footer className="bg-muted border-t border-border pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.svg"
                    alt="Friendship Corner"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground leading-none">
                  Friendship Corner
                </span>
                <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider font-medium">
                  Montessori Daycare
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nurturing young minds through the Montessori method. We create a warm,
              safe, and inspiring environment where every child can grow, learn, and flourish.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/enrollment" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Enrollment
                </Link>
              </li>
              <li>
                <Link href="/community/todays-story" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Today's Story
                </Link>
              </li>
              <li>
                <Link href="/community/journal" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Resources</h3>
            <ul className="space-y-3">
            <li>
                <Link href="/canva" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Canva 1
                </Link>
              </li>
              <li>
                <Link href="/canva2" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Canva 2
                </Link>
              </li>
              <li>
                <Link href="/gamma" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Gamma
                </Link>
              </li>
              <li>
                <Link href="/slide-deck" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Slide Deck
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  2950 Dewdney Trunk Road<br />
                  Coquitlam, BC V3C 2J4 Canada
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:604-945-8504" className="hover:text-primary transition-colors">604.945.8504</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:friendship.care@live.ca" className="hover:text-primary transition-colors">friendship.care@live.ca</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Mon - Fri: 7:00 AM - 6:00 PM<br />
                  Sat - Sun: Closed
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Mobile Access (QR Code) */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center justify-center md:justify-start gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Mobile Access
            </h3>
            <div className="bg-white p-2 rounded-lg inline-block shadow-sm mx-auto md:mx-0">
              <QRCode
                value={siteUrl}
                size={100}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-2">
              Scan to view on mobile
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>&copy; {currentYear} Friendship Corner Daycare. All rights reserved.</p>
            <span className="hidden md:inline text-muted-foreground/40">|</span>
            <p className="flex items-center gap-1">
              Website by <a 
                href="https://www.bestitconsulting.ca" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors font-medium inline-flex items-center gap-1 min-h-[44px]"
              >
                <Image
                  src="/bestit-favicon.ico"
                  alt="Best IT Consulting"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Best IT Consulting
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link 
              href="/privacy" 
              className="hover:text-primary transition-colors min-h-[44px] flex items-center"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-primary transition-colors min-h-[44px] flex items-center"
            >
              Terms of Service
            </Link>
            <Link 
              href="/sitemap" 
              className="hover:text-primary transition-colors min-h-[44px] flex items-center"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
