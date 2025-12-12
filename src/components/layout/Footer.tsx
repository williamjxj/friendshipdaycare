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
import { cn } from '@/lib/utils';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  // In a real app, this would be the deployed domain. Using a placeholder or internal logic.
  const siteUrl = "https://friendshipdaycare.com";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(siteUrl)}`;

  return (
    <footer className="bg-muted border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo.svg"
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
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
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
                <Link href="/todays-story" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Today's Story
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  123 Montessori Lane<br />
                  Coquitlam, BC V3B 1A1
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:604-945-8504" className="hover:text-primary transition-colors">604.945.8504</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:hello@friendshipdaycare.com" className="hover:text-primary transition-colors">hello@friendshipdaycare.com</a>
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

          {/* Column 4: Mobile Access (QR Code) */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center justify-center md:justify-start gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Mobile Access
            </h3>
            <div className="bg-white p-2 rounded-lg inline-block shadow-sm mx-auto md:mx-0">
              <Image
                src={qrCodeUrl}
                alt="Scan for Mobile Access"
                width={100}
                height={100}
                className="mix-blend-multiply"
                unoptimized
              />
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-2">
              Scan to view on mobile
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Friendship Corner Daycare. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
