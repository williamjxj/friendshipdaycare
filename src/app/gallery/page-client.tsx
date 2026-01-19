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

/**
 * Gallery page client component showcasing photos and videos.
 */
export function GalleryPageClient() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'classroom', name: 'Classroom' },
    { id: 'playground', name: 'Playground' },
    { id: 'activities', name: 'Activities' },
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
      url: '/videos/friendship-daycare.mp4',
      title: 'Daily Adventures',
      description: 'A peek into our classroom - see the joy, learning, and growth happening every day at Friendship Corner Daycare.'
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
          title="Daycare Gallery in Coquitlam"
          subtitle="Explore our Montessori classrooms, activities, and spaces"
          backgroundSvg={getImageUrl('/imgs/gallery/gallery_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
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
                Montessori Daycare Moments
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how our Coquitlam Montessori daycare inspires curiosity and joyful learning.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-medium">{image.alt}</p>
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
                See Our Montessori Daycare in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Watch a glimpse of daily routines and learning moments at our Coquitlam daycare.
              </p>
            </div>

            <VideoPlayer videos={videoItems} />
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Want to See It In Person?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Schedule a tour and experience our Coquitlam Montessori daycare firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Programs
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
