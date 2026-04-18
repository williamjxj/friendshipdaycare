import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-utils';

/** Public paths for brand marketing assets (fixed placements site-wide). */
export const BRAND_ASSET_PATHS = {
  ad: '/ad.png',
  logo: '/daycare-logo.png',
  canvaClassroom: '/collects/canva-1.png',
} as const;

/** R2 path when configured; otherwise a committed public asset so local/dev never 404s. */
export function classroomPhotoSrc(): string {
  try {
    return getImageUrl(BRAND_ASSET_PATHS.canvaClassroom);
  } catch {
    return '/assets/flyer-0320.png';
  }
}

type BrandVisualBaseProps = {
  className?: string;
  /** When true, loads eagerly (e.g. above-the-fold contact column). */
  priority?: boolean;
};

type BrandCanvaClassroomPhotoProps = BrandVisualBaseProps & {
  badgeLabel?: string;
  imageClassName?: string;
  badgeClassName?: string;
};

/**
 * Warm classroom photo — forms, team pages, resource hero accents.
 */
export function BrandCanvaClassroomPhoto({
  className,
  priority,
  badgeLabel,
  imageClassName,
  badgeClassName,
}: BrandCanvaClassroomPhotoProps) {
  return (
    <div
      className={cn(
        'group relative w-full max-w-md min-w-[280px] shrink-0 overflow-visible rounded-2xl border-2 border-border/70 bg-card shadow-xl ring-1 ring-black/5 dark:ring-white/10',
        className,
      )}
    >
      <div
        className={cn(
          'relative aspect-3/4 min-h-64 w-full overflow-hidden rounded-[calc(var(--radius-xl)-2px)] transform-gpu origin-center',
          imageClassName,
        )}
      >
        <Image
          src={classroomPhotoSrc()}
          alt="Child learning at Friendship Corner Daycare in Coquitlam"
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 1024px) 90vw, 400px"
          priority={priority}
        />
      </div>
      {badgeLabel ? (
        <div
          className={cn(
            'pointer-events-none absolute bottom-2 right-2 z-20 w-44 -rotate-6 rounded-2xl border border-white/70 bg-primary px-3 py-2 text-center shadow-2xl ring-4 ring-white/30 dark:border-white/20',
            badgeClassName,
          )}
        >
          <span className="block text-xs font-extrabold tracking-[0.06em] text-primary-foreground">
            {badgeLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Promotional graphic — enrollment strip, programs CTA, funding page.
 */
export function BrandAdPromoCard({ className, priority }: BrandVisualBaseProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-border bg-muted/50 p-2 sm:p-3 shadow-lg',
        className,
      )}
    >
      <div className="relative mx-auto aspect-16/10 w-full max-h-65 sm:max-h-75">
        <Image
          src={BRAND_ASSET_PATHS.ad}
          alt="Friendship Corner Daycare — programs and community"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, min(900px, 90vw)"
          priority={priority}
        />
      </div>
    </div>
  );
}

/**
 * Compact logo mark for section headers and secondary pages (not a duplicate nav logo).
 */
export function BrandLogoMark({
  className,
  size = 'md',
}: BrandVisualBaseProps & { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 48 : size === 'md' ? 72 : 96;
  return (
    <div className={cn('relative shrink-0', className)} style={{ width: dim, height: dim }}>
      <Image
        src={BRAND_ASSET_PATHS.logo}
        alt="Friendship Corner Daycare logo"
        width={dim}
        height={dim}
        className="object-contain drop-shadow-sm"
        style={{ width: 'auto', height: 'auto' }}
        sizes={`${dim}px`}
      />
    </div>
  );
}

/**
 * Resources hero: logo + classroom photo side-by-side (server-safe).
 */
export function BrandResourcesHeroStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mt-10 flex w-full max-w-3xl mx-auto flex-wrap items-center justify-center gap-8 sm:gap-10',
        className,
      )}
    >
      <BrandLogoMark size="lg" className="opacity-95" />
      <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-xl border-2 border-gray-200 shadow-lg dark:border-gray-600 sm:h-44 sm:w-36">
        <Image
          src={classroomPhotoSrc()}
          alt="Daycare classroom moment at Friendship Corner"
          fill
          className="object-cover object-[center_25%]"
          sizes="144px"
        />
      </div>
    </div>
  );
}
