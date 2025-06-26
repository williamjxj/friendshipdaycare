'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <img
                    src="/static/friendship-corner-daycare-logo.png"
                    alt="Friendship Corner Daycare Logo"
                    className="w-16 h-12 object-contain"
                  />
                  <span className="font-display font-semibold text-lg text-foreground">
                    Friendship Corner Daycare
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <nav className="hidden md:flex space-x-8">
                  <Link href="/" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link href="/about" className="text-primary bg-primary/10 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                  <Link href="/programs" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Programs</Link>
                  <Link href="/gallery" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Gallery</Link>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                </nav>
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  About Our Daycare
                </h1>
                <p className="text-xl text-muted-foreground w-full text-center leading-relaxed">
                  Discover our commitment to Montessori excellence and nurturing young minds since 2008
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Friendship Corner Daycare (Montessori) opened its doors in January 2008 as a non-profit society dedicated to providing exceptional early childhood education in Coquitlam, BC.
                    </p>
                    <p>
                      As a Licensed Group Daycare, we serve children from 30 months to school age, creating a bridge between home and formal education through the proven Montessori method.
                    </p>
                    <p>
                      Our journey began with a simple vision: to create a place where children could grow, explore, and discover their potential in a safe, nurturing environment that feels like a second home.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-primary-foreground font-bold text-3xl">2008</span>
                    </div>
                    <p className="text-foreground font-semibold text-lg">Established</p>
                    <p className="text-muted-foreground">16+ Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Montessori Philosophy */}
          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  The Montessori Philosophy
                </h2>
                <p className="text-lg text-muted-foreground w-full text-center">
                  Our approach is rooted in Dr. Maria Montessori's educational philosophy, emphasizing respect for the child's natural development
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-card rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-2xl">🧠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Child-Centered</h3>
                  <p className="text-sm text-muted-foreground">
                    Learning follows the child's natural interests and developmental pace
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-secondary font-bold text-2xl">🤲</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Hands-On Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Specially designed materials encourage exploration and discovery
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent font-bold text-2xl">🌱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Independence</h3>
                  <p className="text-sm text-muted-foreground">
                    Children develop confidence through self-directed activities
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-2xl">🤝</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Mixed Ages</h3>
                  <p className="text-sm text-muted-foreground">
                    Multi-age classrooms foster peer learning and mentorship
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Mission & Values */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer a safe, clean, nurturing, and stimulating environment designed to help children grow, explore, create, and have fun. Our developmentally appropriate curriculum provides many opportunities for self-expression and interaction, fostering both individual growth and social development.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Our Values</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                          <span className="text-primary font-bold text-sm">✓</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Respect</h4>
                          <p className="text-sm text-muted-foreground">For each child's unique personality and learning style</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mt-1">
                          <span className="text-secondary font-bold text-sm">✓</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Safety</h4>
                          <p className="text-sm text-muted-foreground">Physical and emotional security in all activities</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                          <span className="text-accent font-bold text-sm">✓</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Excellence</h4>
                          <p className="text-sm text-muted-foreground">Continuous improvement in our programs and facilities</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                          <span className="text-primary font-bold text-sm">✓</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Community</h4>
                          <p className="text-sm text-muted-foreground">Building strong relationships with families</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-6">Why Choose Us?</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-sm">16+</span>
                        </div>
                        <span className="text-foreground font-medium">Years of Experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-secondary-foreground font-bold text-sm">✓</span>
                        </div>
                        <span className="text-foreground font-medium">Licensed & Insured</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-accent-foreground font-bold text-sm">M</span>
                        </div>
                        <span className="text-foreground font-medium">Certified Montessori Educators</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-sm">♥</span>
                        </div>
                        <span className="text-foreground font-medium">Low Student-Teacher Ratio</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Link
                      href="/programs"
                      className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
                    >
                      Explore Our Programs
                    </Link>
                  </div>
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
                  src="/static/friendship-corner-daycare-logo.png"
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
