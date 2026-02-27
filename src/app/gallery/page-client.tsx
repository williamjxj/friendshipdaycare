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
import { scaleInMagic, shimmer, staggerContainerMagic } from '@/lib/magicui-animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBreadcrumbs, toBreadcrumbSchemaItems } from '@/lib/breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
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

    const updateSlideWidth = () => {
      slideWidthRef.current = viewport.offsetWidth;
      const idx = indexRef.current;
      gsap.set(track, { x: -idx * slideWidthRef.current });
    };

    updateSlideWidth();
    const ro = new ResizeObserver(updateSlideWidth);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [filteredImages.length]);

  // Update slide visuals whenever selected index changes
  useGSAP(() => {
    const slides = gsap.utils.toArray('.gallery-carousel-slide');
    if (!slides.length) return;

    slides.forEach((slide: any, i) => {
      const distance = i - carouselSelectedIndex;
      const isActive = i === carouselSelectedIndex;

      gsap.to(slide, {
        scale: isActive ? 1.1 : 0.85,
        opacity: isActive ? 1 : 0.4,
        filter: isActive ? 'blur(0px)' : 'blur(6px)',
        rotationY: distance * -15,
        z: isActive ? 100 : -150,
        x: distance * (typeof window !== 'undefined' && window.innerWidth < 640 ? 0 : 20),
        duration: 0.8,
        ease: 'expo.out',
        overwrite: 'auto'
      });
    });
  }, [carouselSelectedIndex, filteredImages.length]);

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

        {/* Hero Section */}
        <PageHero
          title={t('galleryPage.hero.title')}
          subtitle={t('galleryPage.hero.subtitle')}
          description={t('galleryPage.hero.description')}
          backgroundSvg={getImageUrl('/imgs/gallery/gallery_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={false}
          hideTitle={false}
          unoptimized={true}
          topContent={<Breadcrumbs items={breadcrumbs} />}
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
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
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
              className="gallery-carousel-wrap relative w-full h-[300px] sm:h-[450px] md:h-[600px] mx-auto perspective-[1500px]"
              onMouseEnter={() => setIsCarouselHoveredOrFocused(true)}
              onMouseLeave={() => setIsCarouselHoveredOrFocused(false)}
            >
              <div
                ref={viewportRef}
                className="relative w-full h-full overflow-hidden touch-pan-y select-none"
                style={{ touchAction: 'pan-y pinch-zoom' }}
                onPointerDown={onPointerDown}
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label={t('galleryPage.gallery.title')}
              >
                <div
                  ref={trackRef}
                  className="flex h-full will-change-transform"
                  style={{ width: `${filteredImages.length * 100}%` }}
                  suppressHydrationWarning
                >
                  {filteredImages.map((image, index) => {
                    const isActive = index === carouselSelectedIndex;
                    const isPrev = index === (carouselSelectedIndex - 1 + filteredImages.length) % filteredImages.length;
                    const isNext = index === (carouselSelectedIndex + 1) % filteredImages.length;

                    return (
                      <div
                        key={image.id}
                        className={cn(
                          "gallery-carousel-slide flex-shrink-0 h-full flex items-center justify-center p-2 sm:p-4 perspective-[1000px] [transform-style:preserve-3d]"
                        )}
                        style={{
                          width: `${(100 / filteredImages.length).toFixed(5)}%`,
                        }}
                        suppressHydrationWarning
                      >
                        <div
                          className={cn(
                            "relative h-full w-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 sm:border-4 border-white/20 group cursor-pointer transition-all duration-500",
                            isActive ? "shadow-primary/20" : "shadow-black/50"
                          )}
                          onClick={() => handleImageClick(index)}
                        >
                          {!loadedImages[index] && (
                            <Skeleton className="absolute inset-0 w-full h-full" />
                          )}
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            onLoad={() => handleImageLoaded(index)}
                            priority={isActive}
                          />

                          {/* Premium Overlay and Caption */}
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                            isActive ? "opacity-100" : "opacity-0"
                          )} />

                          <div className={cn(
                            "absolute bottom-0 left-0 right-0 p-8 sm:p-12 transition-all duration-700 delay-100 transform",
                            isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                          )}>
                            <h3 className="text-white text-2xl sm:text-4xl font-display font-bold mb-2 drop-shadow-2xl">
                              {image.alt}
                            </h3>
                            <div className="h-1 w-20 bg-primary rounded-full shadow-lg" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Controls */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToSlide(carouselSelectedIndex - 1)}
                    className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl hover:bg-white/20 hover:scale-110 transition-all group lg:block hidden"
                    aria-label="Previous slide"
                  >
                    <ChevronLeftIcon className="h-8 w-8 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(carouselSelectedIndex + 1)}
                    className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl hover:bg-white/20 hover:scale-110 transition-all group lg:block hidden"
                    aria-label="Next slide"
                  >
                    <ChevronRightIcon className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Modern Indicators */}
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    {filteredImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className="relative group p-2"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <div className={cn(
                          "transition-all duration-500 rounded-full",
                          index === carouselSelectedIndex
                            ? "w-10 h-3 bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                            : "w-3 h-3 bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                        )} />
                      </button>
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white drop-shadow-2xl">
              {t('galleryPage.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              {t('galleryPage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact#contact-form"
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
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-[75vh]"
            >
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                sizes="100vw"
                className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              />
            </motion.div>
          </motion.div>
        )}
      </main>
    </Suspense>
  );
}
