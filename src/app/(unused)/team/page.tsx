'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  HeartIcon, 
  SparklesIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

export default function TeamPage() {
  const director = {
    name: 'Sarah Chen',
    role: 'Director & Lead Educator',
    credentials: [
      'Montessori Diploma (AMI)',
      'Early Childhood Education Degree',
      'First Aid & CPR Certified',
      '15+ years in early childhood education'
    ],
    bio: 'Sarah founded Friendship Corner Daycare in 2008 with a vision to provide authentic Montessori education in a nurturing, family-like environment. Her passion for child development and commitment to excellence has shaped our program into what it is today. Sarah believes that every child deserves respect, patience, and the freedom to learn at their own pace.',
    image: '/images/team/director.jpg',
    philosophy: 'Every child is capable of amazing things when given the right environment and support.'
  };

  const teachers = [
    {
      name: 'Emily Rodriguez',
      role: 'Lead Montessori Teacher',
      credentials: [
        'Montessori Certificate (MACTE)',
        'Bachelor of Education',
        'Child Development Specialist',
        '10 years teaching experience'
      ],
      bio: 'Emily brings warmth, creativity, and deep Montessori knowledge to our classroom. She specializes in early literacy and loves watching children discover the joy of reading and writing through hands-on materials.',
      image: '/images/team/teacher-1.jpg',
      specialties: ['Literacy Development', 'Sensorial Activities', 'Parent Communication']
    },
    {
      name: 'Michael Park',
      role: 'Montessori Teacher',
      credentials: [
        'Montessori Certificate',
        'Child Psychology Studies',
        'First Aid & CPR Certified',
        '8 years in early childhood'
      ],
      bio: 'Michael\'s calm presence and patience make him a favorite among our youngest learners. He has a special talent for helping children develop independence and confidence in practical life activities.',
      image: '/images/team/teacher-2.jpg',
      specialties: ['Practical Life', 'Mathematics', 'Outdoor Education']
    },
    {
      name: 'Lisa Thompson',
      role: 'Assistant Teacher',
      credentials: [
        'Early Childhood Education Certificate',
        'Behavior Support Training',
        'First Aid & CPR Certified',
        '6 years classroom experience'
      ],
      bio: 'Lisa\'s nurturing approach helps children feel safe and loved. She excels at supporting social-emotional development and helping children navigate friendships and conflicts with empathy.',
      image: '/images/team/teacher-3.jpg',
      specialties: ['Social-Emotional Learning', 'Art & Creativity', 'Conflict Resolution']
    }
  ];

  const support = [
    {
      name: 'Jennifer Kim',
      role: 'Administrative Assistant',
      bio: 'Jennifer keeps our operations running smoothly, manages enrollment, and is often the first friendly voice families hear when they call.',
      yearsWithUs: 5
    },
    {
      name: 'David Martinez',
      role: 'Facilities Manager',
      bio: 'David ensures our environment is clean, safe, and well-maintained. His attention to detail keeps our facility in excellent condition.',
      yearsWithUs: 7
    }
  ];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading our team..." />}>
      <main id="main-content" className="flex-1">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                    Meet Our Team
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Our dedicated educators bring passion, expertise, and genuine care to every 
                    child's learning journey. Get to know the people who will nurture your child's growth.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Commitment */}
            <section className="py-16 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <AcademicCapIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Qualified Educators</h3>
                    <p className="text-muted-foreground">
                      All staff hold Montessori certifications and Early Childhood Education credentials
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <HeartIcon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Caring & Nurturing</h3>
                    <p className="text-muted-foreground">
                      We treat every child with respect, patience, and genuine care
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <SparklesIcon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Continuous Growth</h3>
                    <p className="text-muted-foreground">
                      Regular professional development keeps our team at the forefront of early education
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Director Profile */}
            <section className="py-20 bg-muted/30">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-96 md:h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-primary-foreground font-bold text-4xl">SC</span>
                            </div>
                            <p className="text-muted-foreground">Photo placeholder</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-foreground mb-1">
                            {director.name}
                          </h2>
                          <p className="text-lg text-primary font-semibold">{director.role}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {director.bio}
                        </p>

                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Credentials & Experience:</h3>
                          <ul className="space-y-2">
                            {director.credentials.map((credential, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckBadgeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{credential}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-primary/5 border-l-4 border-primary rounded p-4">
                          <p className="text-muted-foreground italic">
                            "{director.philosophy}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Teaching Staff */}
            <section className="py-20 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Our Teaching Team
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Meet the dedicated educators who create magical learning experiences every day
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {teachers.map((teacher, index) => (
                    <div
                      key={index}
                      className="bg-muted/30 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Photo Placeholder */}
                      <div className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-primary-foreground font-bold text-2xl">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Photo placeholder</p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {teacher.name}
                          </h3>
                          <p className="text-primary font-semibold">{teacher.role}</p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {teacher.bio}
                        </p>

                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Credentials:</h4>
                          <ul className="space-y-1">
                            {teacher.credentials.map((credential, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                                <span className="text-primary">•</span>
                                {credential}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {teacher.specialties && (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Specialties:</h4>
                            <div className="flex flex-wrap gap-2">
                              {teacher.specialties.map((specialty, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Support Staff */}
            <section className="py-20 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Support Team
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Behind every great program is a team that keeps everything running smoothly
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {support.map((member, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-6 space-y-3"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-xl text-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                          <p className="text-sm text-primary font-semibold">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{member.bio}</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>With us:</strong> {member.yearsWithUs} years
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Staff Qualifications Summary */}
            <section className="py-20 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Our Commitment to Excellence
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <p className="text-muted-foreground">Montessori Certified Teachers</p>
                  </div>
                  <div className="bg-secondary/5 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-secondary mb-2">100%</div>
                    <p className="text-muted-foreground">First Aid & CPR Certified</p>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">10+</div>
                    <p className="text-muted-foreground">Average Years Experience</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">Low</div>
                    <p className="text-muted-foreground">Teacher-to-Child Ratio</p>
                  </div>
                </div>

                <div className="mt-12 bg-muted/30 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                    All Staff Members Undergo:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Criminal record checks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Reference verification</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Ongoing professional development</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Annual training updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Meet Our Team in Person
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Schedule a tour to meet our caring staff and see firsthand why families trust us 
                  with their children's early education.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  Schedule a Tour
                </Link>
              </div>
            </section>
      </main>
    </Suspense>
  );
}
