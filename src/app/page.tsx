'use client';

import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import { RealEnvironmentShowcase } from '@/components/sections/RealEnvironmentShowcase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';

// Dynamically import VideoPlayer to prevent SSR hydration issues
const VideoPlayer = dynamic(() => import('@/components/ui/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })), { ssr: false });

export default function HomePage() {
  // Memoize videos array to prevent VideoPlayer re-renders
  const videos = useMemo(() => [
    {
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Sample Montessori video
      title: 'Today\'s Montessori Lesson',
      description: 'Join us for today\'s hands-on learning activities where children explore, discover, and develop independence through the Montessori method.'
    },
    {
      url: 'https://www.youtube.com/watch?v=HMUDVMiITOU', // Sample children's story
      title: 'Gentle Bible Story Time',
      description: 'A heartwarming animated Bible story designed to teach values, kindness, and moral lessons in a way that\'s perfect for young minds.'
    },
    {
      url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g', // Sample education video
      title: 'Creative Learning Through Play',
      description: 'See how our children learn essential skills through creative activities, group work, and imaginative play.'
    }
  ], []);
  return (
    <main id="main-content" className="flex-1">
        {/* Magical Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/slidetop-bg.jpg"
              alt="Daycare Background"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-blue-100/80"></div>
          </div>

          {/* Animated Decorative Elements */}
          <div className="absolute inset-0">
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-pink-300 rounded-full floating-animation opacity-60"></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-blue-300 rounded-full bounce-animation opacity-60"></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-300 rounded-full wiggle-animation opacity-60"></div>
            <div className="absolute bottom-20 right-10 w-14 h-14 bg-green-300 rounded-full floating-animation opacity-60"></div>

            {/* Emoji decorations */}
            <div className="absolute top-32 left-1/4 text-4xl floating-animation">🌟</div>
            <div className="absolute top-20 right-1/3 text-3xl bounce-animation">🎈</div>
            <div className="absolute bottom-32 left-1/3 text-4xl wiggle-animation">🌈</div>
            <div className="absolute bottom-20 right-1/4 text-3xl floating-animation">🦋</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-tight">
                  Where Young Minds Flourish
                </h1>
                <div className="text-2xl md:text-3xl font-medium text-primary">
                  Montessori Excellence Since 2008
                </div>
              </div>

              <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-4xl mx-auto p-8">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  A safe, nurturing, and stimulating environment designed to help children 
                  grow, explore, create, and develop a genuine love for learning.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/contact" className="bg-primary text-primary-foreground text-xl px-10 py-5 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg">
                  Schedule a Tour
                </a>
                <a href="/about" className="px-10 py-5 rounded-lg border-2 border-primary text-primary bg-white font-semibold text-xl hover:bg-primary/10 transition-all hover:scale-105 shadow-lg">
                  Learn More
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl shadow-md px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-foreground">Licensed & Safe</div>
                      <div className="text-sm text-muted-foreground">BC Licensed Facility</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card/90 backdrop-blur-sm rounded-xl shadow-md px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-foreground">Montessori Certified</div>
                      <div className="text-sm text-muted-foreground">Authentic Method</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card/90 backdrop-blur-sm rounded-xl shadow-md px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-foreground">16+ Years</div>
                      <div className="text-sm text-muted-foreground">Est. 2008</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                    Welcome to Friendship Corner Daycare
                  </h2>
                  <div className="text-xl font-semibold text-primary">
                    Nurturing Young Minds Through Montessori Excellence
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-lg p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Our Story</h3>
                      <p className="text-purple-500">Since 2008 in beautiful Coquitlam!</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We&apos;re a special place where children aged 2.5 to 5 years old come to learn, play, and make amazing friends!
                    Our Montessori magic helps every child discover their unique superpowers! 🦸‍♀️🦸‍♂️
                  </p>
                </div>
              </div>

              <div className="child-friendly-card">
                <div className="child-friendly-card-inner space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">🌟</div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-600">Our Super Mission</h3>
                      <p className="text-blue-500">Making learning FUN every day!</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We create a safe, colorful, and super exciting place where children can grow big and strong,
                    explore amazing things, create beautiful art, and have the most wonderful time with their friends! 🎨🌈
                  </p>
                </div>
              </div>
              
              {/* Super Cool Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 fun-hover">
                  <div className="text-2xl">🛡️</div>
                  <span className="font-medium text-purple-600">Super Safe Space</span>
                </div>
                <div className="flex items-center space-x-3 fun-hover">
                  <div className="text-2xl">👩‍🏫</div>
                  <span className="font-medium text-blue-600">Amazing Teachers</span>
                </div>
                <div className="flex items-center space-x-3 fun-hover">
                  <div className="text-2xl">💝</div>
                  <span className="font-medium text-pink-600">Special Care for Each Child</span>
                </div>
                <div className="flex items-center space-x-3 fun-hover">
                  <div className="text-2xl">🎓</div>
                  <span className="font-medium text-green-600">Montessori Magic</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Fun Stats Card */}
              <div className="child-friendly-card h-96">
                <div className="child-friendly-card-inner flex flex-col items-center justify-center space-y-6 h-full relative">
                  {/* Floating decorations */}
                  <div className="absolute top-4 left-4 text-2xl floating-animation">🌟</div>
                  <div className="absolute top-4 right-4 text-2xl bounce-animation">🎈</div>
                  <div className="absolute bottom-4 left-4 text-2xl wiggle-animation">🌈</div>
                  <div className="absolute bottom-4 right-4 text-2xl floating-animation">🦋</div>

                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 gradient-bg-1 rounded-full flex items-center justify-center mx-auto shadow-lg fun-hover">
                      <span className="text-white font-bold text-4xl">🏰</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold rainbow-text">Montessori Magic!</p>
                      <p className="text-purple-600 font-medium">Since 2008! ✨</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="text-center child-rounded bg-pink-100 p-3">
                      <div className="text-2xl font-bold text-pink-600">16+</div>
                      <div className="text-xs text-pink-500 font-medium">Amazing Years</div>
                    </div>
                    <div className="text-center child-rounded bg-blue-100 p-3">
                      <div className="text-2xl font-bold text-blue-600">100+</div>
                      <div className="text-xs text-blue-500 font-medium">Happy Families</div>
                    </div>
                    <div className="text-center child-rounded bg-green-100 p-3">
                      <div className="text-2xl font-bold text-green-600">30+</div>
                      <div className="text-xs text-green-500 font-medium">Little Friends</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Programs
            </h2>
            <p className="text-lg text-muted-foreground w-full text-center">
              Age-Appropriate Learning for Every Child
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Toddler Program */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-2xl">T</span>
                  </div>
                  <p className="text-primary font-semibold">30 months - 3 years</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Toddler Program</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gentle introduction to structured learning with focus on independence and social skills.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Social Skills Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Independence Building</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preschool Program */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-secondary font-bold text-2xl">P</span>
                  </div>
                  <p className="text-secondary font-semibold">3 - 4 years</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Preschool Program</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Montessori-based curriculum emphasizing hands-on learning and creative expression.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-secondary text-xs">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Creative Expression</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-secondary text-xs">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Hands-on Learning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-Kindergarten */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent font-bold text-2xl">K</span>
                  </div>
                  <p className="text-accent font-semibold">4 - 5 years</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Pre-Kindergarten</h3>
                <p className="text-muted-foreground leading-relaxed">
                  School readiness preparation with advanced Montessori materials and concepts.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">School Readiness</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Advanced Concepts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Environment Showcase */}
      <Suspense fallback={
        <div className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <LoadingSpinner size="lg" message="Loading our magical classroom..." />
            </div>
          </div>
        </div>
      }>
        <RealEnvironmentShowcase />
      </Suspense>

      {/* Daily Videos Section */}
      <section id="videos" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Daily Learning Adventures
            </h2>
            <p className="text-lg text-muted-foreground w-full text-center">
              Watch how we combine Montessori education with gentle Bible stories to create meaningful learning experiences for your child.
            </p>
          </div>
          
          <VideoPlayer videos={videos} />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Get in Touch Today
            </h2>
            <p className="text-xl text-primary-foreground/90 w-full text-center">
              Ready to give your child the best start? Contact us today to learn more about our Montessori programs and schedule a visit.
            </p>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="font-semibold text-primary-foreground mb-2">Phone</h3>
                <p className="text-primary-foreground/90">604.945.8504</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="font-semibold text-primary-foreground mb-2">Location</h3>
                <p className="text-primary-foreground/90">Near Coquitlam Station, Coquitlam, BC</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="font-semibold text-primary-foreground mb-2">Hours</h3>
                <p className="text-primary-foreground/90">Monday - Friday: 6:30 AM - 6:30 PM</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground/90 transition-colors">
                Contact Us
              </button>
              <a
                href="tel:6049458504"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
