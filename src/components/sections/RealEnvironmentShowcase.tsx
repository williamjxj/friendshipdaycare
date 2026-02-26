'use client';

import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { getPlaceholderUrl } from '@/lib/image-utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { School, BookOpen, TreeDeciduous, Palette, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnvironmentImageSet {
  images: {
    src: string;
    alt: string;
  }[];
  title: string;
  description: string;
  category: 'montessori' | 'outdoor' | 'activities';
}

// Grouping the 16 images into 9 cards (2 images each)
const ENVIRONMENT_DATA: EnvironmentImageSet[] = [
  {
    images: [
      { src: 'home/1.jpeg', alt: 'Montessori classroom view 1' },
      { src: 'home/2.jpeg', alt: 'Montessori classroom view 2' }
    ],
    title: 'Sensorial Materials',
    description: 'Carefully arranged Montessori sensorial materials that help children develop and refine their senses',
    category: 'montessori'
  },
  {
    images: [
      { src: 'home/3.jpeg', alt: 'Language learning 1' },
      { src: 'home/4.jpeg', alt: 'Language learning 2' }
    ],
    title: 'Language Development',
    description: 'Rich language materials including sandpaper letters, moveable alphabet, and reading materials',
    category: 'montessori'
  },
  {
    images: [
      { src: 'home/5.jpeg', alt: 'Mathematics corner 1' },
      { src: 'home/6.jpeg', alt: 'Mathematics corner 2' }
    ],
    title: 'Mathematics Corner',
    description: 'Concrete mathematics materials that make abstract concepts tangible and understandable',
    category: 'montessori'
  },
  {
    images: [
      { src: 'home/7.jpeg', alt: 'Practical life 1' },
      { src: 'home/8.jpeg', alt: 'Practical life 2' }
    ],
    title: 'Practical Life Skills',
    description: 'Real-world activities that build independence, concentration, and fine motor skills',
    category: 'activities'
  },
  {
    images: [
      { src: 'home/9.jpeg', alt: 'Life skills 1' },
      { src: 'home/10.jpeg', alt: 'Life skills 2' }
    ],
    title: 'Life Skills Development',
    description: 'More practical life activities including food preparation and care of environment',
    category: 'activities'
  },
  {
    images: [
      { src: 'home/11.jpeg', alt: 'Cultural studies 1' },
      { src: 'home/12.jpeg', alt: 'Cultural studies 2' }
    ],
    title: 'Cultural Studies',
    description: 'Geography, science, and cultural materials that expand children\'s understanding of the world',
    category: 'montessori'
  },
  {
    images: [
      { src: 'home/13.jpeg', alt: 'Outdoor area 1' },
      { src: 'home/14.jpeg', alt: 'Outdoor area 2' }
    ],
    title: 'Outdoor Playground',
    description: 'Safe and engaging outdoor space designed for physical development and nature exploration',
    category: 'outdoor'
  },
  {
    images: [
      { src: 'home/15.jpeg', alt: 'Circle time area 1' },
      { src: 'home/16.jpeg', alt: 'Circle time area 2' }
    ],
    title: 'Circle Time Space',
    description: 'Dedicated area for group activities, storytelling, and community building',
    category: 'activities'
  },
  {
    images: [
      { src: 'home/1.jpeg', alt: 'Imaginative play 1' },
      { src: 'home/3.jpeg', alt: 'Imaginative play 2' }
    ],
    title: 'Imaginative Play',
    description: 'Carefully selected toys and materials that encourage creativity and imaginative play',
    category: 'activities'
  }
];


// ... existing imports

const getCategories = (t: (key: string) => string) => [
  { id: 'all', name: t('home.realEnvironment.categories.all'), icon: School },
  { id: 'montessori', name: t('home.realEnvironment.categories.montessori'), icon: BookOpen },
  { id: 'outdoor', name: t('home.realEnvironment.categories.outdoor'), icon: TreeDeciduous },
  { id: 'activities', name: t('home.realEnvironment.categories.activities'), icon: Palette }
] as const;

function CardCarousel({ images, category }: { images: { src: string; alt: string }[], category: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Auto-play functionality - only when hovered
  useEffect(() => {
    if (!emblaApi || images.length <= 1 || !isHovered) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [emblaApi, images.length, isHovered]);

  return (
    <div
      className="relative h-full w-full min-w-0 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden h-full min-w-0 w-full" ref={emblaRef}>
        <div className="flex h-full min-w-0">
          {images.map((image, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full w-full overflow-hidden">
              <OptimizedImage
                src={getPlaceholderUrl(image.src)}
                alt={image.alt}
                fill
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out scale-100 group-hover/image:scale-[1.2]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-[15] pointer-events-none" />

      {/* Navigation Buttons - visible only when hovered */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-lg transition-all duration-300 z-40 h-8 w-8 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="w-4 h-4 text-gray-800" />
          </button>

          <button
            onClick={scrollNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-lg transition-all duration-300 z-40 h-8 w-8 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Next image"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-800" />
          </button>
        </>
      )}

      {/* Indicators - visible only when hovered */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === selectedIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export function RealEnvironmentShowcase() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'montessori' | 'outdoor' | 'activities'>('all');

  const filteredData = useMemo(() => {
    return selectedCategory === 'all'
      ? ENVIRONMENT_DATA
      : ENVIRONMENT_DATA.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(() => getCategories(t), [t]);

  return (

    <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden relative">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-w-0">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground drop-shadow-sm bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('home.realEnvironment.title')}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground w-full max-w-5xl mx-auto leading-relaxed font-medium px-4">
            {t('home.realEnvironment.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 border-2 cursor-pointer ${selectedCategory === category.id
                ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105 ring-4 ring-primary/20 hover:ring-primary/30'
                : 'bg-white/70 dark:bg-card/70 backdrop-blur-md text-muted-foreground border-border/50 hover:bg-white dark:hover:bg-card hover:border-primary/50 hover:shadow-lg hover:scale-105'
                }`}
            >
              <span className="text-xl"><category.icon className="w-5 h-5 md:w-6 md:h-6" /></span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Images Grid - min-w-0 on grid children to prevent carousel overflow on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredData.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group/card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 flex flex-col h-full bg-white dark:bg-card border-2 border-border/50 hover:border-primary/40 cursor-pointer min-w-0"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative h-80 lg:h-96 overflow-hidden shrink-0 group/image min-w-0">
                <CardCarousel images={item.images} category={item.category} />
              </div>

              <div className="p-8 lg:p-10 space-y-5 flex flex-col flex-grow relative bg-gradient-to-b from-white to-muted/20 dark:from-card dark:to-muted/10">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-60 group-hover/card:opacity-100 transition-opacity duration-300" />
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-foreground group-hover/card:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow text-base lg:text-lg font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Experience Our Environment in Person */}
        <div className="text-center mt-28">
          <div className="glass-panel rounded-3xl p-12 lg:p-16 max-w-5xl mx-auto shadow-2xl relative overflow-hidden group/cta border-2 border-border/50 hover:border-primary/30 transition-all duration-500">
            {/* Lucide icon on hover */}
            <div className="absolute top-8 right-8 opacity-0 group-hover/cta:opacity-100 scale-75 group-hover/cta:scale-100 transition-all duration-300 pointer-events-none text-primary">
              <MapPin className="w-12 h-12" aria-hidden />
            </div>
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover/cta:opacity-10 transition-opacity duration-700 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
            </div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('home.realEnvironment.cta.title')}
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 w-full max-w-5xl mx-auto leading-relaxed font-medium">
              {t('home.realEnvironment.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact#contact-form"
                className="btn-premium text-lg px-10 py-5 hover:scale-105 transition-transform duration-300"
              >
                {t('home.realEnvironment.cta.scheduleVisit')}
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full border-2 border-primary text-primary font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('home.realEnvironment.cta.viewGallery')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
