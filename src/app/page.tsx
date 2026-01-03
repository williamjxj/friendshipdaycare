'use client';

import { Suspense, useMemo, useRef } from 'react';
import { RealEnvironmentShowcase } from '@/components/sections/RealEnvironmentShowcase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { HeroVideoBackground } from '@/components/ui/hero-video-background';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dynamically import VideoPlayer
const VideoPlayer = dynamic(() => import('@/components/ui/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })), { ssr: false });

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Animations
  useGSAP(() => {
    // Animate Hero Content (badge and title)
    gsap.from('.hero-content > div:first-child > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // Animate subtitle with word-by-word effect
    if (subtitleRef.current) {
      // Wait a bit to ensure DOM is ready and text is visible
      setTimeout(() => {
        if (subtitleRef.current) {
          const subtitleText = subtitleRef.current.textContent || subtitleRef.current.innerText || '';
          if (subtitleText.trim()) {
            const words = subtitleText.split(' ').filter(w => w.trim());

            // Split into words for animation - keep visible initially
            subtitleRef.current.innerHTML = words
              .map((word, i) => `<span class="hero-subtitle-word inline-block" style="opacity: 1; transform: translateY(0);">${word}${i < words.length - 1 ? ' ' : ''}</span>`)
              .join('');

            const wordElements = subtitleRef.current.querySelectorAll('.hero-subtitle-word');
            if (wordElements.length > 0) {
              // Reset to initial state for animation
              gsap.set(wordElements, {
                y: 30,
                opacity: 0,
                immediateRender: false,
              });

              // Animate to visible
              gsap.to(wordElements, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.06,
                ease: 'power2.out',
                delay: 1.0,
              });
            }
          }
        }
      }, 100);
    }

    // Animate buttons
    gsap.from('.hero-content > div:last-child', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 1.4,
    });

    // Animate Section Headers
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8
      });
    });

  }, { scope: mainRef });

  const videos = useMemo(() => [
    {
      url: '/videos/friendship-daycare.mp4',
      title: 'Daily Adventures',
      description: 'A peek into our classroom - see the joy, learning, and growth happening every day at Friendship Corner Daycare.'
    }
  ], []);

  return (
    <main id="main-content" ref={mainRef} className="flex-1 overflow-x-hidden">
      {/* Magical Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

        <HeroVideoBackground
          videoId="jNQXAC9IVRw" // Montessori sample video
          fallbackImage={getImageUrl("/images/slidetop-bg.jpg")}
          overlayColor="bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40"
        />

        {/* Animated Decorative Elements - Subtle for Video BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-content">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm tracking-wide uppercase">
                Est. 2008 &bull; Coquitlam, BC
              </span>
              <h1 className="sr-only">
                Where Young <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-blue-200">
                  Minds Flourish
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="sr-only"
                style={{
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.02em',
                }}
              >
                A safe, nurturing Montessori environment where every child discovers their unique superpowers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <a href="/contact" className="bg-primary text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-2xl ring-4 ring-primary/20">
                Schedule a Tour
              </a>
              <a href="/programs" className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 shadow-xl">
                View Programs
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 section-header">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Discover Our Difference
            </h2>
            <p className="text-xl text-muted-foreground">Why families have trusted us for over 16 years</p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            {/* Item 1: Montessori Method */}
            <BentoGridItem
              title="Authentic Montessori"
              description="Child-centered learning that fosters independence and natural curiosity."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-100 to-emerald-50" />}
              icon={<span className="text-4xl">🌱</span>}
              className="md:col-span-1"
            />

            {/* Item 2: Community (Large) */}
            <BentoGridItem
              title="A Loving Community"
              description="More than just a daycare, we are a family where everyone belongs."
              header={
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group">
                  <Image
                    src={getImageUrl("/images/circle-time-board-2.jpg")}
                    alt="Circle Time"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
              }
              icon={<span className="text-4xl">❤️</span>}
              className="md:col-span-2"
            />

            {/* Item 3: Safety (Large) */}
            <BentoGridItem
              title="Safety First"
              description="Licensed facility complying with all health and safety regulations."
              header={
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group">
                  {/* Using a placeholder gradient or another image if specific safety image missing */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20" />
                  <Image
                    src={getImageUrl("/images/playground.jpg")}
                    alt="Playground"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              }
              icon={<span className="text-4xl">🛡️</span>}
              className="md:col-span-2"
            />

            {/* Item 4: Teachers */}
            <BentoGridItem
              title="Dedicated Educators"
              description="Experienced, certified teachers who truly care."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-100 to-amber-50" />}
              icon={<span className="text-4xl">👩‍🏫</span>}
              className="md:col-span-1"
            />
          </BentoGrid>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20 section-header">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Our Programs
            </h2>
            <p className="text-xl text-muted-foreground w-full max-w-4xl mx-auto">
              Age-appropriate curriculums designed to spark a lifelong love for learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program Cards with Hover Effects */}
            {[
              { id: 'toddler', title: 'Toddler', range: '30mo - 3yrs', color: 'primary', icon: '🧸', desc: 'Gentle introduction to structure & social skills.' },
              { id: 'preschool', title: 'Preschool', range: '3 - 4yrs', color: 'secondary', icon: '🎨', desc: 'Hands-on Montessori materials & creative play.' },
              { id: 'prek', title: 'Pre-Kindergarten', range: '4 - 5yrs', color: 'accent', icon: '🚀', desc: 'Advanced concepts & school readiness.' },
            ].map((prog, idx) => (
              <div key={prog.id} className="group relative bg-muted/20 rounded-3xl p-8 hover:bg-muted/40 transition-colors duration-300 border border-transparent hover:border-black/5 section-header">
                <div className={`w-16 h-16 rounded-2xl bg-${prog.color}/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                  {prog.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{prog.title} Program</h3>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">{prog.range}</div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {prog.desc}
                </p>
                <a href="/programs" className={`inline-flex items-center font-bold text-${prog.color} hover:translate-x-1 transition-transform`}>
                  Learn details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Environment Showcase */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
        <RealEnvironmentShowcase />
      </Suspense>

      {/* Daily Videos Section */}
      <section id="videos" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 section-header">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Daily Adventures
            </h2>
            <p className="text-xl text-muted-foreground">
              A peek into our classroom
            </p>
          </div>

          <VideoPlayer videos={videos} />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8 section-header">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            Ready to Visit?
          </h2>
          <p className="text-xl md:text-2xl text-white/90">
            We would love to show you around our beautiful facility and meet your little one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="/contact" className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-xl">
              Book a Tour
            </a>
            <a href="tel:6049458504" className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition-colors">
              604.945.8504
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
