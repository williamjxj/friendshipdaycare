'use client';

import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { getPlaceholderUrl } from '@/lib/image-utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { School, BookOpen, TreeDeciduous, Palette } from 'lucide-react';
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
      className="relative h-full w-full group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full w-full">
              <OptimizedImage
                src={getPlaceholderUrl(image.src)}
                alt={image.alt}
                fill
                className="!h-full transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40 object-cover"
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
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('home.realEnvironment.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('home.realEnvironment.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${selectedCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-102'
                }`}
            >
              <span className="text-lg"><category.icon className="w-5 h-5" /></span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group/card bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <CardCarousel images={item.images} category={item.category} />
              </div>

              <div className="p-6 space-y-3 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-foreground group-hover/card:text-gray-800 dark:group-hover/card:text-gray-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-4 border-t border-muted">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="capitalize">{item.category.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-muted/50">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              {t('home.realEnvironment.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 w-full text-center">
              {t('home.realEnvironment.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-clay inline-block px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90"
              >
                {t('home.realEnvironment.cta.scheduleVisit')}
              </a>
              <a
                href="/gallery"
                className="inline-block border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all shadow-sm hover:shadow-md active:scale-95"
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
