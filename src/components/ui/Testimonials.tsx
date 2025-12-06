'use client';

import { Star } from 'lucide-react';

export interface Testimonial {
  id: number;
  parentName: string;
  childName: string;
  childAge: string;
  enrollmentDuration: string;
  quote: string;
  rating: number;
  date: string;
  program?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
}

export function TestimonialCard({ testimonial, featured = false }: TestimonialCardProps) {
  return (
    <div className={`bg-card rounded-xl p-6 shadow-lg ${featured ? 'border-2 border-primary' : ''}`}>
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Parent Info */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{testimonial.parentName}</p>
            <p className="text-sm text-muted-foreground">
              Parent of {testimonial.childName} ({testimonial.childAge})
            </p>
            {testimonial.program && (
              <p className="text-xs text-primary mt-1">{testimonial.program}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{testimonial.enrollmentDuration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  featured?: boolean;
}

export function TestimonialsGrid({ testimonials, featured = false }: TestimonialsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          featured={featured && testimonial.rating === 5}
        />
      ))}
    </div>
  );
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <div className="space-y-6">
      {testimonials.slice(0, 3).map((testimonial) => (
        <div key={testimonial.id} className="bg-primary/5 rounded-xl p-8 border-l-4 border-primary">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < testimonial.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground text-lg">{testimonial.parentName}</p>
              <p className="text-muted-foreground">
                Parent of {testimonial.childName}, {testimonial.enrollmentDuration}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
