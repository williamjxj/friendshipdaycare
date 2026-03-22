'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  GridAndDotBackgrounds,
  sectionGridDotPresets,
  useSectionGridDotHover,
} from '@/components/ui/GridAndDotBackgrounds';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery section for single-page app: categories, carousel, lightbox.
 */
export function GallerySectionContent() {
  const { t, messages } = useLanguage();
  const { isSectionHovered, gridDotSectionHoverProps } = useSectionGridDotHover();
  const categoryMessages = (messages.galleryPage?.categories ?? []) as Array<{ id: string; name: string }>;

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

  const galleryImages: Array<{
    id: number;
    src: string;
    alt: string;
    category: string;
    aspectRatio?: number;
  }> = [
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

  useEffect(() => {
    setCarouselSelectedIndex(0);
    setLoadedImages({});
    const track = trackRef.current;
    if (track) gsap.set(track, { x: 0 });
  }, [selectedCategory, filteredImages.length]);

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

  useEffect(() => {
    if (filteredImages.length <= 1 || isCarouselHoveredOrFocused) return;
    const id = setInterval(() => {
      goToSlide(indexRef.current + 1);
    }, 6000);
    return () => clearInterval(id);
  }, [filteredImages.length, isCarouselHoveredOrFocused, goToSlide]);

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
      const vp = viewportRef.current;
      if (vp) (vp as HTMLElement).releasePointerCapture?.(e.pointerId);
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

  useGSAP(
    () => {
      const section = gallerySectionRef.current;
      if (!section) return;
      const title = section.querySelector('.gallery-section-title');
      const filters = section.querySelector('.gallery-category-filters');
      const carouselWrap = section.querySelector('.gallery-carousel-wrap');
      const els = [title, filters, carouselWrap].filter(Boolean) as HTMLElement[];
      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: gallerySectionRef }
  );

  const prevSlideIndexRef = useRef(carouselSelectedIndex);
  useEffect(() => {
    if (prevSlideIndexRef.current === carouselSelectedIndex) return;
    prevSlideIndexRef.current = carouselSelectedIndex;
  }, [carouselSelectedIndex]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedImage !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, closeModal]);

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
    <>
      {/* Gallery Section */}
      <motion.section
        id="gallery"
        ref={gallerySectionRef}
        className="relative py-20 bg-card overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        {...gridDotSectionHoverProps}
      >
        <GridAndDotBackgrounds
          backdropOnly
          isSectionHovered={isSectionHovered}
          {...sectionGridDotPresets.gallery}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-section-title text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t('galleryPage.gallery.title')}
            </h2>
            <p className="text-lg text-muted-foreground w-full max-w-none">
              {t('galleryPage.gallery.subtitle')}
            </p>
          </div>

          <div className="gallery-category-filters flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'rounded-full px-6 py-3 font-bold transition-all duration-300',
                  selectedCategory === category.id && 'ring-2 ring-primary/30 shadow-lg'
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div
            ref={carouselContainerRef}
            className="gallery-carousel-wrap relative w-full h-[300px] sm:h-[450px] md:h-[600px] mx-auto"
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

                  return (
                    <div
                      key={image.id}
                      className={cn(
                        "gallery-carousel-slide shrink-0 h-full flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-40"
                      )}
                      style={{
                        width: `${(100 / filteredImages.length).toFixed(5)}%`,
                      }}
                      suppressHydrationWarning
                    >
                      <div
                        className={cn(
                          "gallery-carousel-card relative h-full w-full rounded-xl overflow-hidden shadow hover:shadow-xl bg-white/50 dark:bg-card/80 backdrop-blur-sm border-0 cursor-pointer transition-all duration-300 origin-center",
                          isActive ? "shadow-xl ring-2 ring-primary/30 scale-[1.02]" : "shadow scale-[0.98]"
                        )}
                        onClick={() => handleImageClick(index)}
                      >
                        {!loadedImages[index] && (
                          <Skeleton className="absolute inset-0 w-full h-full" />
                        )}
                        <div className="absolute inset-0">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                            className="object-cover"
                            onLoad={() => handleImageLoaded(index)}
                            priority={isActive}
                          />
                        </div>

                        {/* Removed bottom left text description overlay for gallery images */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {filteredImages.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => goToSlide(carouselSelectedIndex - 1)}
                  className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full bg-background/90 backdrop-blur-md border-border shadow-xl hover:bg-background hover:scale-110 transition-all lg:flex hidden"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => goToSlide(carouselSelectedIndex + 1)}
                  className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full bg-background/90 backdrop-blur-md border-border shadow-xl hover:bg-background hover:scale-110 transition-all lg:flex hidden"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {filteredImages.map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon-sm"
                      className="h-auto p-1.5"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === carouselSelectedIndex ? 'true' : undefined}
                    >
                      <span
                        className={cn(
                          "block rounded-full transition-all duration-300",
                          index === carouselSelectedIndex
                            ? "w-8 h-2.5 bg-primary"
                            : "w-2.5 h-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                        )}
                      />
                    </Button>
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
              href="/#contact-form"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:bg-white/95 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/50 ring-4 ring-white/30"
            >
              {t('galleryPage.cta.primary')}
            </Link>
            <Link
              href="/#programs"
              className="inline-flex items-center justify-center px-10 py-5 border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white/15 hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-xl"
            >
              {t('galleryPage.cta.secondary')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Image Modal - AnimatePresence for exit animation */}
      <AnimatePresence mode="wait">
        {selectedImage !== null && (
          <motion.div
            key="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="absolute inset-4 flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full h-[75vh] pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredImages[selectedImage!].src}
                  alt={filteredImages[selectedImage!].alt}
                  fill
                  sizes="100vw"
                  className="object-contain drop-shadow-2xl rounded-lg"
                />
              </motion.div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
