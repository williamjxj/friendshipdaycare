'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TestimonialsGrid, Testimonial } from '@/components/ui/Testimonials';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function TestimonialsPage() {
  // Sample testimonials - would come from database in production
  const testimonials: Testimonial[] = [
    {
      id: 1,
      parentName: 'Sarah M.',
      childName: 'Emma',
      childAge: '4 years old',
      enrollmentDuration: 'Enrolled for 2 years',
      quote: 'Friendship Corner has been amazing for our daughter Emma. The Montessori approach has helped her become more independent and confident. The teachers are nurturing and truly care about each child\'s development. We couldn\'t be happier!',
      rating: 5,
      date: '2024-11-15',
      program: 'Preschool Program'
    },
    {
      id: 2,
      parentName: 'Michael and Jennifer K.',
      childName: 'Lucas',
      childAge: '5 years old',
      enrollmentDuration: 'Enrolled for 3 years',
      quote: 'Lucas started here when he was two and is now ready for kindergarten. The progress he\'s made is incredible. He can read, write, and has such a love for learning. The staff goes above and beyond every single day.',
      rating: 5,
      date: '2024-11-10',
      program: 'Pre-Kindergarten'
    },
    {
      id: 3,
      parentName: 'Priya S.',
      childName: 'Aiden',
      childAge: '3 years old',
      enrollmentDuration: 'Enrolled for 6 months',
      quote: 'We love how the teachers incorporate gentle Bible stories along with the Montessori curriculum. Aiden comes home excited to share what he learned each day. The multicultural environment is wonderful too!',
      rating: 5,
      date: '2024-11-05',
      program: 'Toddler Program'
    },
    {
      id: 4,
      parentName: 'David L.',
      childName: 'Sophia',
      childAge: '4 years old',
      enrollmentDuration: 'Enrolled for 1.5 years',
      quote: 'The convenience of the location near Coquitlam Station makes drop-off and pick-up so easy for working parents. But more importantly, Sophia is thriving here. She\'s made great friends and loves her teachers.',
      rating: 5,
      date: '2024-10-28',
      program: 'Preschool Program'
    },
    {
      id: 5,
      parentName: 'Linda and James T.',
      childName: 'Oliver',
      childAge: '5 years old',
      enrollmentDuration: 'Enrolled for 2.5 years',
      quote: 'The hands-on Montessori materials have made such a difference in Oliver\'s learning. He understands math concepts that seem advanced for his age. The teachers are patient and really know how to engage children.',
      rating: 5,
      date: '2024-10-20',
      program: 'Pre-Kindergarten'
    },
    {
      id: 6,
      parentName: 'Rachel W.',
      childName: 'Mia',
      childAge: '3 years old',
      enrollmentDuration: 'Enrolled for 8 months',
      quote: 'We toured several daycares before choosing Friendship Corner, and we\'re so glad we did. The facility is clean, safe, and the staff-to-child ratio is excellent. Mia is always happy to go to school!',
      rating: 5,
      date: '2024-10-15',
      program: 'Toddler Program'
    },
    {
      id: 7,
      parentName: 'Tom H.',
      childName: 'Noah',
      childAge: '4 years old',
      enrollmentDuration: 'Enrolled for 1 year',
      quote: 'The communication from the teachers is outstanding. We get daily updates about Noah\'s activities and progress. It gives us peace of mind knowing he\'s in such caring hands.',
      rating: 5,
      date: '2024-10-08',
      program: 'Preschool Program'
    },
    {
      id: 8,
      parentName: 'Emily C.',
      childName: 'Charlotte',
      childAge: '5 years old',
      enrollmentDuration: 'Enrolled for 3 years',
      quote: 'Charlotte has grown so much during her time here. She went from a shy toddler to a confident young girl ready for kindergarten. The Montessori method really works, and the staff is phenomenal.',
      rating: 5,
      date: '2024-09-30',
      program: 'Pre-Kindergarten'
    },
    {
      id: 9,
      parentName: 'Amanda R.',
      childName: 'Ethan',
      childAge: '3 years old',
      enrollmentDuration: 'Enrolled for 4 months',
      quote: 'We moved to Coquitlam and were worried about finding the right daycare for Ethan. Friendship Corner exceeded our expectations. The teachers made him feel welcome immediately, and he\'s adjusted beautifully.',
      rating: 5,
      date: '2024-09-22',
      program: 'Toddler Program'
    }
  ];

  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner message="Loading testimonials..." />}>
        <div className="min-h-screen flex flex-col">
          <SkipNavigation />
          <Header />

          <main id="main-content" className="flex-1">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                    Parent Testimonials
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Hear from families who have trusted us with their children's early education. 
                    Their stories inspire us every day.
                  </p>
                  
                  {/* Rating Summary */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-8 h-8 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="text-3xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">{testimonials.length} reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <section className="py-8 bg-card border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">5.0</div>
                    <div className="text-muted-foreground">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                    <div className="text-muted-foreground">Would Recommend</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">16+</div>
                    <div className="text-muted-foreground">Years of Service</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">200+</div>
                    <div className="text-muted-foreground">Happy Families</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TestimonialsGrid testimonials={testimonials} featured={true} />
              </div>
            </section>

            {/* What Parents Love */}
            <section className="py-20 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                  What Parents Love Most
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-primary/5 rounded-xl p-6">
                    <div className="text-4xl mb-4">👨‍🏫</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Caring Teachers
                    </h3>
                    <p className="text-muted-foreground">
                      "The teachers genuinely care about each child and their development"
                    </p>
                  </div>
                  <div className="bg-secondary/5 rounded-xl p-6">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Montessori Method
                    </h3>
                    <p className="text-muted-foreground">
                      "The hands-on learning approach has made such a difference in our child's confidence"
                    </p>
                  </div>
                  <div className="bg-accent/5 rounded-xl p-6">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Great Communication
                    </h3>
                    <p className="text-muted-foreground">
                      "Daily updates and open communication give us peace of mind"
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-primary text-primary-foreground">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Join Our Family of Happy Parents
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Experience the difference that quality Montessori education and caring 
                  teachers can make in your child's life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block"
                  >
                    Schedule a Tour
                  </Link>
                  <Link
                    href="/enrollment"
                    className="bg-primary-foreground/10 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-block"
                  >
                    Start Enrollment
                  </Link>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}
