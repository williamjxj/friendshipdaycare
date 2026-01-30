'use client';

import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBreadcrumbs, toBreadcrumbSchemaItems } from '@/lib/breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery page client component showcasing photos and videos.
 */
export function GalleryPageClient() {
  const { t, messages } = useLanguage();
  const categoryMessages = (messages.galleryPage?.categories ?? []) as Array<{ id: string; name: string }>;
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  useLocalizedMetadata({
    title: t('seo.gallery.title'),
    description: t('seo.gallery.description'),
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [carouselSelectedIndex, setCarouselSelectedIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isCarouselHoveredOrFocused, setIsCarouselHoveredOrFocused] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef(950);
  const dragRef = useRef({ isDragging: false, startX: 0, startTrackX: 0 });
  const justDraggedRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const indexRef = useRef(carouselSelectedIndex);
  indexRef.current = carouselSelectedIndex;

  const handleImageLoaded = useCallback((index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  }, []);

  const categories = categoryMessages.length > 0 ? categoryMessages : [
    { id: 'all', name: t('galleryPage.categoriesFallback.all') },
    { id: 'classroom', name: t('galleryPage.categoriesFallback.classroom') },
    { id: 'playground', name: t('galleryPage.categoriesFallback.playground') },
    { id: 'activities', name: t('galleryPage.categoriesFallback.activities') },
  ];

  /** Aspect ratio = width/height; e.g. 4/3 ≈ 1.33 for photo-like proportion. Omit to use 4/3. */
  const galleryImages: Array<{
    id: number;
    src: string;
    alt: string;
    category: string;
    aspectRatio?: number;
  }> = [
    { id: 1, src: getImageUrl('/images/circle-time-board-2.jpg'), alt: 'Circle time activities', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 2, src: getImageUrl('/images/circle-time-area.jpg'), alt: 'Circle time learning space', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 3, src: getImageUrl('/images/practical-life-shelf-1.jpg'), alt: 'Practical life materials', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 4, src: getImageUrl('/images/practical-life-shelf-2.jpg'), alt: 'Practical life activities', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 5, src: getImageUrl('/images/sensorial-shelf.jpg'), alt: 'Sensorial learning', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 6, src: getImageUrl('/images/language-shelf.jpg'), alt: 'Language materials', category: 'activities', aspectRatio: 4 / 3 },
    { id: 7, src: getImageUrl('/images/math-shelf.jpg'), alt: 'Mathematics learning materials', category: 'activities', aspectRatio: 4 / 3 },
    { id: 8, src: getImageUrl('/images/culture-shelf.jpg'), alt: 'Cultural studies materials', category: 'activities', aspectRatio: 4 / 3 },
    { id: 9, src: getImageUrl('/images/art-themed-board-2.jpg'), alt: 'Art-themed display board', category: 'classroom', aspectRatio: 4 / 3 },
    { id: 10, src: getImageUrl('/images/toys.jpg'), alt: 'Toys and pretend play area', category: 'activities', aspectRatio: 4 / 3 },
    { id: 11, src: getImageUrl('/images/playground.jpg'), alt: 'Playground activities', category: 'playground', aspectRatio: 4 / 3 },
    { id: 12, src: getImageUrl('/images/slidetop-bg.jpg'), alt: 'Daycare environment', category: 'classroom', aspectRatio: 16 / 9 },
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const goToSlide = useCallback((index: number, animate = true) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const n = filteredImages.length;
    if (!viewport || !track || n === 0) return;
    const safeIndex = ((index % n) + n) % n;
    slideWidthRef.current = viewport.offsetWidth;
    const x = -safeIndex * slideWidthRef.current;
    if (tweenRef.current) tweenRef.current.kill();
    if (animate) {
      tweenRef.current = gsap.to(track, {
        x,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => { tweenRef.current = null; },
      });
    } else {
      gsap.set(track, { x });
    }
    setCarouselSelectedIndex(safeIndex);
  }, [filteredImages.length]);

  // Reset to first slide when category changes
  useEffect(() => {
    setCarouselSelectedIndex(0);
    setLoadedImages({});
    const track = trackRef.current;
    if (track) gsap.set(track, { x: 0 });
  }, [selectedCategory, filteredImages.length]);

  // Measure viewport and update slide width + track position on resize + initial position
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    // Set initial position
    slideWidthRef.current = viewport.offsetWidth;
    gsap.set(track, { x: 0 });
    const ro = new ResizeObserver(() => {
      slideWidthRef.current = viewport.offsetWidth;
      const idx = indexRef.current;
      gsap.set(track, { x: -idx * slideWidthRef.current });
    });
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [filteredImages.length]);

  // Autoplay: advance every 6s when not hovered/focused
  useEffect(() => {
    if (filteredImages.length <= 1 || isCarouselHoveredOrFocused) return;
    const id = setInterval(() => {
      goToSlide(indexRef.current + 1);
    }, 6000);
    return () => clearInterval(id);
  }, [filteredImages.length, isCarouselHoveredOrFocused, goToSlide]);

  // Pointer drag + snap (GSAP Option B: manual drag)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (filteredImages.length <= 1) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const currentX = gsap.getProperty(track, 'x');
    dragRef.current = { isDragging: true, startX: e.clientX, startTrackX: (currentX as number) ?? 0 };
    (viewport as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [filteredImages.length]);

  useEffect(() => {
    if (filteredImages.length <= 1) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const n = filteredImages.length;

    const onMove = (e: PointerEvent) => {
      if (!dragRef.current.isDragging) return;
      const sw = slideWidthRef.current;
      const minX = -(n - 1) * sw;
      const maxX = 0;
      const dx = e.clientX - dragRef.current.startX;
      let x = dragRef.current.startTrackX + dx;
      x = Math.max(minX, Math.min(maxX, x));
      gsap.set(track, { x });
    };
    const onUp = (e: PointerEvent) => {
      if (!dragRef.current.isDragging) return;
      const moved = Math.abs((gsap.getProperty(track, 'x') as number) - dragRef.current.startTrackX) > 5;
      dragRef.current.isDragging = false;
      const viewport = viewportRef.current;
      if (viewport) (viewport as HTMLElement).releasePointerCapture?.(e.pointerId);
      const currentX = gsap.getProperty(track, 'x') as number;
      const sw = slideWidthRef.current;
      const nearest = Math.round(-currentX / sw);
      const idx = Math.max(0, Math.min(n - 1, nearest));
      if (moved) {
        justDraggedRef.current = true;
        setTimeout(() => { justDraggedRef.current = false; }, 100);
      }
      goToSlide(idx);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [filteredImages.length, goToSlide]);

  const handleImageClick = (index: number) => {
    if (justDraggedRef.current) return;
    setSelectedImage(index);
  };

  // GSAP Option A: entrance when gallery section enters view + slide transition on index change
  useGSAP(
    () => {
      const section = gallerySectionRef.current;
      if (!section) return;
      const title = section.querySelector('.gallery-section-title');
      const carouselWrap = section.querySelector('.gallery-carousel-wrap');
      const dotsWrap = section.querySelector('.gallery-carousel-dots');
      const els = [title, carouselWrap, dotsWrap].filter(Boolean) as HTMLElement[];
      gsap.fromTo(
        els,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: gallerySectionRef }
  );

  // Slide transition: subtle scale/opacity when active slide changes (skip on mount)
  const prevSlideIndexRef = useRef(carouselSelectedIndex);
  useEffect(() => {
    if (prevSlideIndexRef.current === carouselSelectedIndex) return;
    const container = carouselContainerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLElement>('.gallery-carousel-slide');
    if (slides.length === 0) return;
    const activeIndex = carouselSelectedIndex % slides.length;
    gsap.to(slides, { scale: 0.98, opacity: 0.88, duration: 0.35, ease: 'power2.out' });
    gsap.to(slides[activeIndex], { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' });
    prevSlideIndexRef.current = carouselSelectedIndex;
  }, [carouselSelectedIndex]);

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner message="Loading gallery..." />}>
      <main className="flex-1">
        <BreadcrumbSchema items={toBreadcrumbSchemaItems(breadcrumbs)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        {/* Hero Section */}
        <PageHero
          title={t('galleryPage.hero.title')}
          subtitle={t('galleryPage.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/gallery/gallery_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
          unoptimized={true}
        >
          <HeroCTAButtons variant="outlined" />
        </PageHero>

        {/* Gallery Section */}
        <motion.section
          ref={gallerySectionRef}
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gallery-section-title text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t('galleryPage.gallery.title')}
              </h2>
              <p className="text-lg text-muted-foreground w-full max-w-none">
                {t('galleryPage.gallery.subtitle')}
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 border-2 cursor-pointer ${selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105 ring-4 ring-primary/20'
                      : 'bg-muted/70 text-muted-foreground border-border/50 hover:bg-muted hover:border-primary/50 hover:shadow-lg hover:scale-105'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Gallery Carousel or Empty State */}
              <div
                ref={carouselContainerRef}
                className="gallery-carousel-wrap relative w-full max-w-[950px] mx-auto"
                onMouseEnter={() => setIsCarouselHoveredOrFocused(true)}
                onMouseLeave={() => setIsCarouselHoveredOrFocused(false)}
                onFocusCapture={() => setIsCarouselHoveredOrFocused(true)}
                onBlurCapture={(e) => {
                  if (!carouselContainerRef.current?.contains(e.relatedTarget as Node)) {
                    setIsCarouselHoveredOrFocused(false);
                  }
                }}
              >
                <div
                  ref={viewportRef}
                  className="overflow-hidden w-full touch-pan-y select-none cursor-grab active:cursor-grabbing"
                  style={{ touchAction: 'pan-y pinch-zoom' }}
                  onPointerDown={onPointerDown}
                  onKeyDown={(e) => {
                    if (filteredImages.length <= 1) return;
                    if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(carouselSelectedIndex - 1); }
                    if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(carouselSelectedIndex + 1); }
                  }}
                  tabIndex={0}
                  role="region"
                  aria-roledescription="carousel"
                  aria-label={t('galleryPage.gallery.title')}
                >
                  <div
                    ref={trackRef}
                    className="flex flex-nowrap will-change-transform"
                    style={{ width: `${filteredImages.length * 100}%` }}
                  >
                    {filteredImages.map((image, index) => (
                      <div
                        key={image.id}
                        className="gallery-carousel-slide flex-shrink-0 w-full px-0"
                        style={{ width: `${100 / filteredImages.length}%`, minWidth: `${100 / filteredImages.length}%` }}
                      >
                        <div
                          className="relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl border-2 border-border/50 hover:border-primary/40 transition-all duration-500 w-full"
                          style={{ aspectRatio: image.aspectRatio ?? 4 / 3 }}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleImageClick(index)}
                          onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}
                          aria-label={image.alt}
                        >
                          {!loadedImages[index] && (
                            <Skeleton className="absolute inset-0 w-full h-full" />
                          )}
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 950px"
                            className="object-contain"
                            onLoad={() => handleImageLoaded(index)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/80 transition-all duration-500" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-white font-semibold text-lg drop-shadow-lg">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {filteredImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToSlide(carouselSelectedIndex - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 md:left-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSlide(carouselSelectedIndex + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                    <div className="gallery-carousel-dots flex justify-center gap-2 mt-4">
                      {filteredImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`h-3 w-3 rounded-full transition-all duration-200 ${
                            index === carouselSelectedIndex
                              ? 'bg-primary scale-110'
                              : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                          }`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary/85 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto px-4 text-center space-y-10 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white drop-shadow-2xl">
              {t('galleryPage.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              {t('galleryPage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:bg-white/95 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/50 ring-4 ring-white/30"
              >
                {t('galleryPage.cta.primary')}
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-10 py-5 border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white/15 hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-xl"
              >
                {t('galleryPage.cta.secondary')}
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Image Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            <div className="relative max-w-4xl w-full h-[70vh]">
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </main>
    </Suspense>
  );
}
