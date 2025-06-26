'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { GoogleMap } from '@/components/ui/GoogleMap';
import Link from 'next/link';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', childAge: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
                  <Link href="/about" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">About</Link>
                  <Link href="/programs" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Programs</Link>
                  <Link href="/gallery" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Gallery</Link>
                  <Link href="/contact" className="text-primary bg-primary/10 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
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
                  Contact Us
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground w-full leading-relaxed text-center">
                  Ready to give your child the best start? Get in touch with us today to learn more about our programs.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                      Get in Touch
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      We'd love to hear from you! Whether you have questions about our programs, want to schedule a visit, or are ready to enroll your child, we're here to help.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <p className="text-muted-foreground">604.945.8504</p>
                        <p className="text-sm text-muted-foreground">Monday - Friday: 6:30 AM - 6:30 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                        <p className="text-muted-foreground">Near Coquitlam Station</p>
                        <p className="text-muted-foreground">Coquitlam, BC</p>
                        <p className="text-sm text-muted-foreground">Convenient public transit access</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ClockIcon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday</p>
                        <p className="text-muted-foreground">6:30 AM - 6:30 PM</p>
                        <p className="text-sm text-muted-foreground">Closed weekends and holidays</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <EnvelopeIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">info@friendshipcorner.ca</p>
                        <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <a
                        href="tel:6049458504"
                        className="flex items-center space-x-3 text-primary hover:text-primary/80 transition-colors"
                      >
                        <PhoneIcon className="h-5 w-5" />
                        <span className="font-medium">Call Now</span>
                      </a>
                      <a
                        href="mailto:info@friendshipcorner.ca"
                        className="flex items-center space-x-3 text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <EnvelopeIcon className="h-5 w-5" />
                        <span className="font-medium">Send Email</span>
                      </a>
                      <Link
                        href="/programs"
                        className="flex items-center space-x-3 text-accent hover:text-accent/80 transition-colors"
                      >
                        <span className="w-5 h-5 flex items-center justify-center">📚</span>
                        <span className="font-medium">View Programs</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-muted/30 rounded-xl p-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-accent/20 border border-accent/30 rounded-lg">
                      <p className="text-accent font-medium">Thank you! We'll get back to you soon.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="(604) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="childAge" className="block text-sm font-medium text-foreground mb-2">
                          Child's Age
                        </label>
                        <select
                          id="childAge"
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        >
                          <option value="">Select age range</option>
                          <option value="30months-3years">30 months - 3 years</option>
                          <option value="3-4years">3 - 4 years</option>
                          <option value="4-5years">4 - 5 years</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your child and what you'd like to know about our programs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Visit Our Location
                </h2>
                <p className="text-lg text-muted-foreground">
                  Conveniently located near Coquitlam Station with easy access to public transit
                </p>
              </div>
              
              <GoogleMap />
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
