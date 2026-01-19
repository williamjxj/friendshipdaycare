'use client';

import { Suspense, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { GoogleMap } from '@/components/ui/GoogleMap';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { businessProfile } from '@/lib/business-profile';

/**
 * Contact page client component with form and business details.
 */
export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage('');

    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage('Please correct the errors below and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', childAge: '', message: '' });
        setFieldErrors({});

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Suspense fallback={<LoadingSpinner message="Loading contact page..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="Contact Friendship Corner Daycare in Coquitlam"
          subtitle="Schedule a tour, ask questions, or start enrollment today"
          backgroundSvg={getImageUrl('/imgs/contact/contact_hero_1.gif')}
          enableScrollTrigger={true}
          hideTitle={true}
          hideSubtitle={true}
        />

        {/* Contact Information */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We&apos;d love to hear from you! Whether you have questions about our programs, want to schedule a visit, or are ready to enroll your child, we&apos;re here to help.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card variant="data" className="flex items-start space-x-4 p-6 transition-colors hover:bg-muted/30">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-[1.2]">
                      <PhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-bold text-foreground mb-1 text-lg">Phone</CardTitle>
                      <p className="text-muted-foreground font-medium">{businessProfile.telephone}</p>
                      <CardDescription className="text-sm text-muted-foreground mt-1">Monday - Friday: 7:00 AM - 6:00 PM</CardDescription>
                    </div>
                  </Card>

                  <Card variant="data" className="flex items-start space-x-4 p-6 transition-colors hover:bg-muted/30">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-[1.2]">
                      <MapPinIcon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="font-bold text-foreground mb-1 text-lg">Location</CardTitle>
                      <p className="text-muted-foreground font-medium">{businessProfile.address.streetAddress}</p>
                      <p className="text-muted-foreground font-medium">{businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode} {businessProfile.address.addressCountry}</p>
                      <CardDescription className="text-sm text-muted-foreground mt-1">Convenient public transit access</CardDescription>
                    </div>
                  </Card>

                  <Card variant="data" className="flex items-start space-x-4 p-6 transition-colors hover:bg-muted/30">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-[1.2]">
                      <ClockIcon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="font-bold text-foreground mb-1 text-lg">Hours</CardTitle>
                      <p className="text-muted-foreground font-medium">Monday - Friday</p>
                      <p className="text-muted-foreground font-medium">7:00 AM - 6:00 PM</p>
                      <CardDescription className="text-sm text-muted-foreground mt-1">Closed weekends and holidays</CardDescription>
                    </div>
                  </Card>

                  <Card variant="data" className="flex items-start space-x-4 p-6 transition-colors hover:bg-muted/30">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-[1.2]">
                      <EnvelopeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-bold text-foreground mb-1 text-lg">Email</CardTitle>
                      <p className="text-muted-foreground font-medium">{businessProfile.email}</p>
                      <CardDescription className="text-sm text-muted-foreground mt-1">We&apos;ll respond within 24 hours</CardDescription>
                    </div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card variant="interactive" className="bg-muted/30 p-6 border-none">
                  <CardTitle className="font-bold text-foreground mb-4 text-xl">Quick Actions</CardTitle>
                  <div className="space-y-4">
                    <a
                      href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                      className="flex items-center space-x-3 text-primary hover:text-primary/80 transition-colors font-bold"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <PhoneIcon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Call Now</span>
                    </a>
                    <a
                      href={`mailto:${businessProfile.email}`}
                      className="flex items-center space-x-3 text-secondary hover:text-secondary/80 transition-colors font-bold"
                    >
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <EnvelopeIcon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Send Email</span>
                    </a>
                    <Link
                      href="/programs"
                      className="flex items-center space-x-3 text-accent hover:text-accent/80 transition-colors font-bold"
                    >
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-xs">📚</span>
                      </div>
                      <span className="font-medium">View Programs</span>
                    </Link>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="bg-muted/30 p-4 sm:p-8 scroll-mt-20 border-none shadow-sm">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-display font-bold text-foreground">
                    Send us a Message
                  </CardTitle>
                </CardHeader>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-bold">Thank you! We&apos;ll get back to you within 24 hours.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-bold">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-foreground">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={fieldErrors.name ? 'true' : 'false'}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-border'
                          }`}
                        placeholder="Your full name"
                      />
                      {fieldErrors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-600 font-bold" role="alert">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={fieldErrors.email ? 'true' : 'false'}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-border'
                          }`}
                        placeholder="your.email@example.com"
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-600 font-bold" role="alert">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-bold text-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium"
                        placeholder="604.945.8504"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="childAge" className="block text-sm font-bold text-foreground">
                        Child&apos;s Age
                      </label>
                      <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium cursor-pointer"
                      >
                        <option value="">Select age range</option>
                        <option value="30months-3years">30 months - 3 years</option>
                        <option value="3-4years">3 - 4 years</option>
                        <option value="4-5years">4 - 5 years</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-foreground">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={fieldErrors.message ? 'true' : 'false'}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none min-h-[132px] text-base font-medium ${fieldErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-border'
                        }`}
                      placeholder="Tell us about your child and what you&apos;d like to know about our programs..."
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-600 font-bold" role="alert">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Map Section */}
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
                Visit Our Location
              </h2>
              <p className="text-lg text-muted-foreground">
                Conveniently located near Coquitlam Station with easy access to public transit
              </p>
            </div>

            <GoogleMap />
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
