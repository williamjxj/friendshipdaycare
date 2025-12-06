'use client';

import { Suspense, useState } from 'react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'classroom', name: 'Classroom' },
    { id: 'activities', name: 'Activities' },
    { id: 'outdoor', name: 'Outdoor Play' },
    { id: 'events', name: 'Events' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: '/images/playground.jpg',
      alt: 'Outdoor playground area',
      category: 'outdoor',
      title: 'Playground Area',
      description: 'Safe and engaging outdoor space for physical development and play'
    },
    {
      id: 2,
      src: '/images/circle-time-area.jpg',
      alt: 'Circle time learning area',
      category: 'classroom',
      title: 'Circle Time Area',
      description: 'Dedicated space for group learning and community building'
    },
    {
      id: 3,
      src: '/images/sensorial-shelf.jpg',
      alt: 'Montessori sensorial materials',
      category: 'classroom',
      title: 'Sensorial Learning',
      description: 'Montessori sensorial materials for developing the senses'
    },
    {
      id: 4,
      src: '/images/language-shelf.jpg',
      alt: 'Language learning materials',
      category: 'classroom',
      title: 'Language Development',
      description: 'Rich language materials for literacy development'
    },
    {
      id: 5,
      src: '/images/practical-life-shelf-1.jpg',
      alt: 'Practical life activities shelf 1',
      category: 'activities',
      title: 'Practical Life Skills',
      description: 'Real-world activities that build independence and confidence'
    },
    {
      id: 6,
      src: '/images/practical-life-shelf-2.jpg',
      alt: 'Practical life activities shelf 2',
      category: 'activities',
      title: 'Life Skills Development',
      description: 'Additional practical life activities for skill building'
    },
    {
      id: 7,
      src: '/images/math-shelf.jpg',
      alt: 'Mathematics learning materials',
      category: 'classroom',
      title: 'Mathematics Learning',
      description: 'Concrete mathematics materials following Montessori principles'
    },
    {
      id: 8,
      src: '/images/culture-shelf.jpg',
      alt: 'Cultural studies materials',
      category: 'classroom',
      title: 'Cultural Studies',
      description: 'Exploring the world through geography, science, and culture'
    },
    {
      id: 9,
      src: '/images/circle-time-board-2.jpg',
      alt: 'Circle time display board',
      category: 'classroom',
      title: 'Learning Displays',
      description: 'Interactive displays that support daily learning routines'
    },
    {
      id: 10,
      src: '/images/art-themed-board-2.jpg',
      alt: 'Art-themed display board',
      category: 'activities',
      title: 'Creative Arts',
      description: 'Inspiring creativity through art and self-expression'
    },
    {
      id: 11,
      src: '/images/toys.jpg',
      alt: 'Toys and pretend play area',
      category: 'activities',
      title: 'Imaginative Play',
      description: 'Toys and materials that encourage imagination and creativity'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner message="Loading gallery..." />}>
      <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  Our Gallery
                </h1>
                <p className="text-xl text-muted-foreground w-full text-center leading-relaxed">
                  Take a glimpse into our vibrant learning environment and see how children thrive in our Montessori setting
                </p>
              </div>
            </div>
          </section>

          {/* Featured Carousel */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Featured Images
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore our learning environment through this interactive carousel
                </p>
              </div>

              <ImageCarousel
                images={galleryImages.map(img => ({
                  src: img.src,
                  alt: img.alt,
                  title: img.title
                }))}
                className="mb-12"
              />
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group cursor-pointer bg-muted/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-3">
                          <span className="text-2xl">🔍</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{image.title}</h3>
                      <p className="text-sm text-muted-foreground">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No images found in this category.</p>
                </div>
              )}
            </div>
          </section>

          {/* Video Gallery Section */}
          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Educational Videos
                </h2>
                <p className="text-lg text-muted-foreground w-full text-center">
                  Watch our daily activities, Montessori lessons, and gentle Bible stories designed for young learners.
                </p>
              </div>
              
              <VideoPlayer videos={[
                {
                  url: 'https://www.youtube.com/watch?v=doKkOSMaTk4', // Montessori classroom tour
                  title: '🎨 Daily Montessori Magic',
                  description: 'Watch our amazing children engage in hands-on Montessori learning activities that promote independence, creativity, and joy!',
                  thumbnail: '/images/video-thumb-1.jpg'
                },
                {
                  url: 'https://www.youtube.com/watch?v=Pk4Xi4bF0RE', // Montessori practical life
                  title: '🌟 Learning Through Joyful Play',
                  description: 'See how we combine education with super fun activities that help children develop essential life skills while having the best time!',
                  thumbnail: '/images/video-thumb-2.jpg'
                },
                {
                  url: 'https://www.youtube.com/watch?v=Yz2NiUJHmhE', // Children's Bible story
                  title: '📚 Gentle Story Time Adventures',
                  description: 'Beautiful, gentle stories that teach wonderful values, kindness, and important life lessons in the most age-appropriate way!',
                  thumbnail: '/images/video-thumb-3.jpg'
                }
              ]} />
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                  See Our Environment in Person
                </h2>
                <p className="text-xl text-primary-foreground/90 w-full text-center">
                  Schedule a visit to experience our nurturing Montessori environment firsthand and meet our dedicated educators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-block bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground/90 transition-colors"
                  >
                    Schedule a Visit
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-block border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-colors"
                  >
                    View Programs
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <ChevronRightIcon className="h-6 w-6 text-white" />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative">
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg">
                  <h3 className="font-semibold text-lg mb-1">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {filteredImages[selectedImage].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Suspense>
  );
}
