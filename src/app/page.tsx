'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import { RealEnvironmentShowcase } from '@/components/sections/RealEnvironmentShowcase';
import dynamic from 'next/dynamic';

// Dynamically import VideoPlayer to prevent SSR hydration issues
const VideoPlayer = dynamic(() => import('@/components/ui/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <span className="text-primary font-bold text-2xl">▶</span>
        </div>
        <p className="text-muted-foreground">Loading video player...</p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <SkipNavigation />
        {/* Simple Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <img
                    src="/images/friendship-corner-daycare-logo.png"
                    alt="Friendship Corner Daycare Logo"
                    className="w-16 h-12 object-contain"
                  />
                  <span className="font-display font-semibold text-lg text-foreground">
                    Friendship Corner Daycare
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <nav className="hidden md:flex space-x-8">
                  <a href="#home" className="text-primary bg-primary/10 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                  <a href="/about" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">About</a>
                  <a href="/programs" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Programs</a>
                  <a href="/gallery" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Gallery</a>
                  <a href="#contact" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                </nav>
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <main id="main-content" className="flex-1">
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                  Where Little Dreams Take Flight
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground w-full text-center leading-relaxed">
                  Montessori Daycare Excellence Since 2008 • A safe, clean, nurturing, and stimulating environment designed to help children grow, explore, create, and have fun.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors text-center">
                    Enroll Now
                  </a>
                  <a href="/about" className="inline-block border-2 border-primary text-primary bg-background/80 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-colors text-center">
                    Learn More
                  </a>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">✓</span>
                    </div>
                    <span className="text-sm font-medium">Licensed Group Daycare</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold text-sm">M</span>
                    </div>
                    <span className="text-sm font-medium">Montessori Method</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground font-bold text-sm">16</span>
                    </div>
                    <span className="text-sm font-medium">Years of Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                      About Friendship Corner Daycare
                    </h2>
                    <p className="text-lg text-primary font-semibold">
                      Montessori Excellence Since 2008
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Friendship Corner Daycare (Montessori), a non-profit society, opened in January 2008 in Coquitlam, BC. We are a Licensed Group Daycare for children from 30 months to school age.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer a safe, clean, nurturing, and stimulating environment designed to help children grow, explore, create, and have fun. A developmentally appropriate curriculum provides many opportunities for self-expression and interaction.
                    </p>
                  </div>
                  
                  {/* Key Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Safe Environment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Qualified Staff</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-accent font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Individual Attention</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Montessori Method</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center space-y-4 z-10 relative">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-primary-foreground font-bold text-3xl">M</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-lg">Montessori Excellence</p>
                      <p className="text-muted-foreground">Since 2008</p>
                    </div>
                    <div className="flex justify-center space-x-8 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">16+</div>
                        <div className="text-xs text-muted-foreground">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">100+</div>
                        <div className="text-xs text-muted-foreground">Families</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">30+</div>
                        <div className="text-xs text-muted-foreground">Children</div>
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
          <RealEnvironmentShowcase />

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
              
              <VideoPlayer videos={[
                {
                  url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Sample Montessori video
                  title: 'Today&apos;s Montessori Lesson',
                  description: 'Join us for today&apos;s hands-on learning activities where children explore, discover, and develop independence through the Montessori method.'
                },
                {
                  url: 'https://www.youtube.com/watch?v=HMUDVMiITOU', // Sample children's story
                  title: 'Gentle Bible Story Time',
                  description: 'A heartwarming animated Bible story designed to teach values, kindness, and moral lessons in a way that&apos;s perfect for young minds.'
                },
                {
                  url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g', // Sample education video
                  title: 'Creative Learning Through Play',
                  description: 'See how our children learn essential skills through creative activities, group work, and imaginative play.'
                }
              ]} />
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

        {/* Footer */}
        <footer className="bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <img
                  src="/images/friendship-corner-daycare-logo.png"
                  alt="Friendship Corner Daycare Logo"
                  className="w-16 h-12 object-contain"
                />
                <span className="font-display font-semibold text-lg text-foreground">
                  Friendship Corner Daycare
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 Friendship Corner Daycare. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Montessori Excellence Since 2008 • Licensed Group Daycare • 604.945.8504
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
