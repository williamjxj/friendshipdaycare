'use client';

import Image from 'next/image';
import { staffByLocale } from '@/data/staff';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Our Team page: staff grid with photos, credentials, bios.
 */
export function OurTeamPageClient() {
  const { language } = useLanguage();
  const staff = staffByLocale[language] ?? staffByLocale.en ?? [];

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">Our Team</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Meet our dedicated educators at Friendship Corner Daycare. Our ECE-certified team provides quality Montessori care for children in Coquitlam and the Tri-Cities.
        </p>

        {staff.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((member) => (
              <div
                key={member.id}
                className="rounded-xl border-0 bg-white/50 dark:bg-card/80 backdrop-blur-sm p-6 shadow hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <h2 className="text-xl font-semibold text-center">{member.name}</h2>
                <p className="text-sm text-primary font-medium text-center mb-2">{member.credentials}</p>
                <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Staff profiles will be added here. Add team members to <code className="bg-muted px-1 rounded">src/data/staff.ts</code>.
          </p>
        )}
      </div>
    </main>
  );
}
