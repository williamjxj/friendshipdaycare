'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageLoader, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import Link from 'next/link';

export default function TodaysStoryPage() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader message="Loading today's magical story..." />}>
        <div className="min-h-screen flex flex-col">
          <SkipNavigation />
          <Header />
        
        <main className="flex-1">
          {/* Magical Story Hero */}
          <section className="relative py-20 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100">
              {/* Floating Story Elements */}
              <div className="absolute top-20 left-10 text-4xl floating-animation">📚</div>
              <div className="absolute top-40 right-20 text-3xl bounce-animation">✨</div>
              <div className="absolute bottom-40 left-20 text-4xl wiggle-animation">🌟</div>
              <div className="absolute bottom-20 right-10 text-3xl floating-animation">📖</div>
              <div className="absolute top-32 left-1/3 text-2xl bounce-animation">💫</div>
              <div className="absolute bottom-32 right-1/3 text-3xl floating-animation">🎭</div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-display font-bold rainbow-text leading-tight">
                    📚 Today&apos;s Magical Story! 📚
                  </h1>
                  <div className="text-2xl md:text-3xl font-medium text-orange-600 wiggle-animation">
                    ✨ Bible Adventures for Little Hearts ✨
                  </div>
                </div>

                <div className="child-friendly-card max-w-4xl mx-auto">
                  <div className="child-friendly-card-inner">
                    <p className="text-lg md:text-xl text-purple-700 leading-relaxed">
                      🌈 Join us for this week&apos;s gentle Bible story! 🌈<br/>
                      Specially chosen to inspire, teach amazing lessons, and fill young hearts with joy and wonder!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Magical Video Section */}
          <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="text-center space-y-6 mb-12">
                  <h2 className="text-4xl md:text-5xl font-display font-bold rainbow-text">
                    🎬 This Week&apos;s Magical Story! 🎬
                  </h2>
                  <div className="child-friendly-card">
                    <div className="child-friendly-card-inner">
                      <p className="text-lg text-purple-700">
                        📅 Updated every Monday with new adventures! Perfect for little hearts ages 3-6! 💕
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bible Story Video Player */}
                <Suspense fallback={
                  <div className="child-friendly-card">
                    <div className="child-friendly-card-inner text-center py-20">
                      <LoadingSpinner size="lg" message="Loading today's magical story..." />
                    </div>
                  </div>
                }>
                  <div className="child-friendly-card">
                    <div className="child-friendly-card-inner">
                      <VideoPlayer videos={[
                        {
                          url: 'https://www.youtube.com/watch?v=Yz2NiUJHmhE', // The Good Samaritan for kids
                          title: '💝 The Good Samaritan 💝',
                          description: 'A beautiful story about kindness, helping others, and being a good neighbor. Learn how we can show love to everyone around us!',
                          thumbnail: '/images/video-thumb-1.jpg'
                        },
                        {
                          url: 'https://www.youtube.com/watch?v=hlQEmjWRa4A', // David and Goliath for kids
                          title: '⚔️ David and Goliath ⚔️',
                          description: 'Discover how young David showed great courage and faith when facing the giant Goliath. A story about bravery and trusting in God!',
                          thumbnail: '/images/video-thumb-2.jpg'
                        },
                        {
                          url: 'https://www.youtube.com/watch?v=tLxKjqG6iAg', // Noah\'s Ark for kids
                          title: '🌈 Noah\'s Ark 🌈',
                          description: 'Join Noah and all the animals on their amazing adventure! Learn about obedience, caring for creation, and God\'s beautiful promises.',
                          thumbnail: '/images/video-thumb-3.jpg'
                        }
                      ]} />

                      <div className="mt-8 text-center space-y-4">
                        <div className="child-friendly-card">
                          <div className="child-friendly-card-inner">
                            <h3 className="text-xl font-bold text-orange-600 mb-2">
                              🌟 This Week&apos;s Special Lesson 🌟
                            </h3>
                            <p className="text-purple-700 font-medium">
                              Learning about <span className="rainbow-text font-bold">KINDNESS</span> and helping others in need!
                              Just like the Good Samaritan, we can be helpers and show love to everyone! 💕
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <div className="child-rounded bg-pink-100 p-4 text-center">
                            <div className="text-2xl mb-2">💝</div>
                            <div className="font-bold text-pink-600">Be Kind</div>
                            <div className="text-sm text-pink-500">Help others with a smile</div>
                          </div>
                          <div className="child-rounded bg-blue-100 p-4 text-center">
                            <div className="text-2xl mb-2">🤝</div>
                            <div className="font-bold text-blue-600">Be Helpful</div>
                            <div className="text-sm text-blue-500">Lend a helping hand</div>
                          </div>
                          <div className="child-rounded bg-green-100 p-4 text-center">
                            <div className="text-2xl mb-2">💕</div>
                            <div className="font-bold text-green-600">Show Love</div>
                            <div className="text-sm text-green-500">Care for everyone</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Suspense>
              </div>
            </div>
          </section>

          {/* Magical Story Calendar */}
          <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold rainbow-text">
                  📅 Our Magical Story Calendar! 📅
                </h2>
                <div className="child-friendly-card max-w-3xl mx-auto">
                  <div className="child-friendly-card-inner">
                    <p className="text-lg text-purple-700">
                      🌟 Every week brings a new amazing Bible adventure with super important life lessons! 🌟
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="child-friendly-card fun-hover">
                  <div className="child-friendly-card-inner text-center">
                    <div className="text-4xl mb-4 floating-animation">💝</div>
                    <div className="w-16 h-16 gradient-bg-1 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="font-display font-bold text-pink-600 mb-2">Week 1</h3>
                    <p className="text-pink-500 font-medium">The Good Samaritan</p>
                    <p className="text-xs text-pink-400 mt-2">💕 Being Kind & Helpful</p>
                  </div>
                </div>

                <div className="child-friendly-card fun-hover">
                  <div className="child-friendly-card-inner text-center">
                    <div className="text-4xl mb-4 bounce-animation">⚔️</div>
                    <div className="w-16 h-16 gradient-bg-2 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="font-display font-bold text-blue-600 mb-2">Week 2</h3>
                    <p className="text-blue-500 font-medium">David and Goliath</p>
                    <p className="text-xs text-blue-400 mt-2">💪 Courage & Faith</p>
                  </div>
                </div>

                <div className="child-friendly-card fun-hover">
                  <div className="child-friendly-card-inner text-center">
                    <div className="text-4xl mb-4 wiggle-animation">🌈</div>
                    <div className="w-16 h-16 gradient-bg-3 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="font-display font-bold text-green-600 mb-2">Week 3</h3>
                    <p className="text-green-500 font-medium">Noah&apos;s Ark</p>
                    <p className="text-xs text-green-400 mt-2">🐾 Caring for Creation</p>
                  </div>
                </div>

                <div className="child-friendly-card fun-hover">
                  <div className="child-friendly-card-inner text-center">
                    <div className="text-4xl mb-4 floating-animation">🐑</div>
                    <div className="w-16 h-16 gradient-bg-4 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h3 className="font-display font-bold text-purple-600 mb-2">Week 4</h3>
                    <p className="text-purple-500 font-medium">The Lost Sheep</p>
                    <p className="text-xs text-purple-400 mt-2">💕 God&apos;s Love for Us</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Join Our Magical Adventure */}
          <section className="py-20 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 relative overflow-hidden">
            {/* Floating decorations */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-4xl text-white/30 floating-animation">🌟</div>
              <div className="absolute top-20 right-20 text-3xl text-white/30 bounce-animation">💫</div>
              <div className="absolute bottom-20 left-20 text-4xl text-white/30 wiggle-animation">✨</div>
              <div className="absolute bottom-10 right-10 text-3xl text-white/30 floating-animation">🎈</div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                    🏰 Join Our Magical Learning Adventure! 🏰
                  </h2>
                  <div className="text-2xl font-medium text-white/90 wiggle-animation">
                    ✨ Where Bible Stories Meet Montessori Magic! ✨
                  </div>
                </div>

                <div className="child-friendly-card max-w-4xl mx-auto">
                  <div className="child-friendly-card-inner">
                    <p className="text-xl text-purple-700 leading-relaxed">
                      🌈 Come see how we blend gentle Bible stories with amazing Montessori learning! 🌈<br/>
                      Your little one will grow in wisdom, kindness, and wonder every single day! 💕
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/contact"
                    className="playful-button text-xl px-10 py-5 fun-hover"
                  >
                    🚀 Schedule Our Magical Visit!
                  </Link>
                  <Link
                    href="/programs"
                    className="px-10 py-5 rounded-full border-4 border-white text-white bg-white/10 font-bold text-xl hover:bg-white/20 transition-all hover:scale-105 fun-hover"
                  >
                    🎨 Explore Our Programs
                  </Link>
                </div>
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
