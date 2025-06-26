'use client';

import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useState } from 'react';

interface EnvironmentImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'montessori' | 'outdoor' | 'activities';
}

export function RealEnvironmentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'montessori' | 'outdoor' | 'activities'>('all');

  const environmentImages: EnvironmentImage[] = [
    {
      src: '/images/sensorial-shelf.jpg',
      alt: 'Montessori sensorial materials shelf',
      title: 'Sensorial Materials',
      description: 'Carefully arranged Montessori sensorial materials that help children develop and refine their senses',
      category: 'montessori'
    },
    {
      src: '/images/language-shelf.jpg',
      alt: 'Language learning materials shelf',
      title: 'Language Development',
      description: 'Rich language materials including sandpaper letters, moveable alphabet, and reading materials',
      category: 'montessori'
    },
    {
      src: '/images/math-shelf.jpg',
      alt: 'Mathematics learning materials shelf',
      title: 'Mathematics Corner',
      description: 'Concrete mathematics materials that make abstract concepts tangible and understandable',
      category: 'montessori'
    },
    {
      src: '/images/practical-life-shelf-1.jpg',
      alt: 'Practical life activities shelf',
      title: 'Practical Life Skills',
      description: 'Real-world activities that build independence, concentration, and fine motor skills',
      category: 'activities'
    },
    {
      src: '/images/practical-life-shelf-2.jpg',
      alt: 'Additional practical life activities',
      title: 'Life Skills Development',
      description: 'More practical life activities including food preparation and care of environment',
      category: 'activities'
    },
    {
      src: '/images/culture-shelf.jpg',
      alt: 'Cultural studies materials shelf',
      title: 'Cultural Studies',
      description: 'Geography, science, and cultural materials that expand children\'s understanding of the world',
      category: 'montessori'
    },
    {
      src: '/images/playground.jpg',
      alt: 'Outdoor playground area',
      title: 'Outdoor Playground',
      description: 'Safe and engaging outdoor space designed for physical development and nature exploration',
      category: 'outdoor'
    },
    {
      src: '/images/circle-time-area.jpg',
      alt: 'Circle time learning area',
      title: 'Circle Time Space',
      description: 'Dedicated area for group activities, storytelling, and community building',
      category: 'activities'
    },
    {
      src: '/images/toys.jpg',
      alt: 'Toys and pretend play area',
      title: 'Imaginative Play',
      description: 'Carefully selected toys and materials that encourage creativity and imaginative play',
      category: 'activities'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Areas', icon: '🏫' },
    { id: 'montessori', name: 'Montessori Materials', icon: '📚' },
    { id: 'outdoor', name: 'Outdoor Spaces', icon: '🌳' },
    { id: 'activities', name: 'Activities', icon: '🎨' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? environmentImages 
    : environmentImages.filter(img => img.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Our Real Learning Environment
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Take a look inside our authentic Montessori classroom and see the carefully prepared environment 
            where children learn, grow, and discover their potential every day.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as 'all' | 'montessori' | 'outdoor' | 'activities')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-102'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.src}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {image.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="capitalize">{image.category.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              Experience Our Environment in Person
            </h3>
            <p className="text-muted-foreground mb-6 w-full text-center">
              These photos show just a glimpse of our carefully prepared Montessori environment.
              Schedule a visit to see how your child will thrive in our nurturing space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Schedule a Visit
              </a>
              <a
                href="/gallery"
                className="inline-block border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Full Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
