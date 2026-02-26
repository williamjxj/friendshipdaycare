import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * A single breadcrumb item for rendering.
 */
export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Accessible breadcrumb navigation with premium animations and styling.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLOListElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const children = containerRef.current.children;

      // Entrance Animation
      gsap.fromTo(
        children,
        {
          x: -30,
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "elastic.out(1, 0.8)",
        }
      );

      // Scroll Action: Subtle slide/fade when scrolling away
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100px",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.3,
        y: -20,
        scale: 0.9,
        filter: "blur(4px)",
      });
    }
  }, { scope: containerRef });

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol
        ref={containerRef}
        className={cn(
          "flex flex-wrap items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full w-fit",
          "bg-white/15 backdrop-blur-xl border-2 border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]",
          "text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-500 hover:bg-white/20 hover:border-white/50 hover:shadow-[0_8px_40px_0_rgba(255,255,255,0.1)]",
          className
        )}
      >
        <li className="flex items-center">
          <Link
            href="/"
            className="text-primary/80 hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.href}-${idx}`} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/40 shrink-0" />
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-primary drop-shadow-sm font-bold whitespace-nowrap"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-primary/70 hover:text-primary transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

