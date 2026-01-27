'use client';

import { Suspense, useState } from 'react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

/**
 * Gallery page client component showcasing photos and videos.
 */
export function GalleryPageClient() {
  const { t, messages } = useLanguage();
  const categoryMessages = (messages.galleryPage?.categories ?? []) as Array<{ id: string; name: string }>;

  useLocalizedMetadata({
    title: t('seo.gallery.title'),
    description: t('seo.gallery.description'),
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = categoryMessages.length > 0 ? categoryMessages : [
    { id: 'all', name: t('galleryPage.categoriesFallback.all') },
    { id: 'classroom', name: t('galleryPage.categoriesFallback.classroom') },
    { id: 'playground', name: t('galleryPage.categoriesFallback.playground') },
    { id: 'activities', name: t('galleryPage.categoriesFallback.activities') },
  ];

  const galleryImages = [
    {
      id: 1,
      src: getImageUrl('/images/circle-time-board-2.jpg'),
      alt: 'Circle time activities',
      category: 'classroom'
    },
    {
      id: 2,
      src: getImageUrl('/images/practical-life-shelf-1.jpg'),
      alt: 'Practical life materials',
      category: 'classroom'
    },
    {
      id: 3,
      src: getImageUrl('/images/sensorial-shelf.jpg'),
      alt: 'Sensorial learning',
      category: 'classroom'
    },
    {
      id: 4,
      src: getImageUrl('/images/playground.jpg'),
      alt: 'Playground activities',
      category: 'playground'
    },
    {
      id: 5,
      src: getImageUrl('/images/language-shelf.jpg'),
      alt: 'Language materials',
      category: 'activities'
    },
    {
      id: 6,
      src: getImageUrl('/images/school-outside.jpg'),
      alt: 'Daycare exterior',
      category: 'playground'
    }
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const videoItems = [
    {
      url: getImageUrl('/videos/friendship-daycare.mp4'),
      title: t('galleryPage.video.title'),
      description: t('galleryPage.video.description'),
    }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

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
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
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
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 border-2 cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105 ring-4 ring-primary/20'
                      : 'bg-muted/70 text-muted-foreground border-border/50 hover:bg-muted hover:border-primary/50 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl border-2 border-border/50 hover:border-primary/40 transition-all duration-500"
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-72 lg:h-80 w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/80 transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white font-semibold text-lg drop-shadow-lg">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t('galleryPage.videoSection.title')}
              </h2>
              <p className="text-lg text-muted-foreground w-full max-w-none">
                {t('galleryPage.videoSection.subtitle')}
              </p>
            </div>

            <VideoPlayer videos={videoItems} />
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
