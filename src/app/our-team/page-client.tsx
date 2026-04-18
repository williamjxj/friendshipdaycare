'use client';

import Image from 'next/image';
import { Award, HeartHandshake, Sparkles, Users2 } from 'lucide-react';
import { BrandCanvaClassroomPhoto } from '@/components/ui/brand-visual-assets';
import { staffByLocale } from '@/data/staff';
import { useLanguage } from '@/contexts/LanguageContext';

const TEAM_PILLARS = [
  {
    icon: HeartHandshake,
    title: 'Warm relationships',
    description: 'Children are known personally and families get steady, direct communication.',
  },
  {
    icon: Award,
    title: 'Certified educators',
    description: 'ECE credentials and Montessori experience shape calm, capable classrooms.',
  },
  {
    icon: Sparkles,
    title: 'Prepared environment',
    description: 'Each space is intentionally arranged for independence, focus, and joy.',
  },
];

export function OurTeamPageClient() {
  const { language } = useLanguage();
  const staff = staffByLocale[language] ?? staffByLocale.en ?? [];

  return (
    <main id="main-content" className="fdc-section-shell min-h-screen overflow-x-hidden pb-20 pt-20">
      <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="fdc-hero-grid">
            <div className="relative z-10 space-y-6">
              <span className="fdc-kicker">Meet The Educators</span>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                  The people who shape the feeling of the whole daycare.
                </h1>
                <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                  Friendship Corner runs on consistency, warmth, and experience. Our team blends Montessori structure with everyday care routines that help children feel confident and safe.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="fdc-stat-chip">
                  <Users2 className="h-4.5 w-4.5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{staff.length || 6} educators highlighted</span>
                </span>
                <span className="fdc-stat-chip">
                  <Award className="h-4.5 w-4.5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">ECE + Montessori-focused care</span>
                </span>
              </div>
            </div>
            <div className="relative z-10 flex justify-center lg:justify-end">
              <BrandCanvaClassroomPhoto
                className="max-w-xs border-white/70 bg-white/90 sm:max-w-sm"
                badgeLabel="Coquitlam • Tri-Cities • Since 2008"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {TEAM_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="fdc-panel p-6">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-display font-bold text-foreground">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {staff.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {staff.map((member) => (
                <article key={member.id} className="fdc-panel group p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.35rem] ring-1 ring-border/60 sm:h-24 sm:w-24">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-display font-bold text-foreground">{member.name}</h2>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                        {member.credentials}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                    {member.bio}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="fdc-panel px-6 py-12 text-center">
              <p className="text-muted-foreground">
                Staff profiles will be added here. Add team members to <code className="rounded bg-muted px-1 py-0.5">src/data/staff.ts</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
