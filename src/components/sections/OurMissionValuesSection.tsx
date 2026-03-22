import React from 'react';
import { FlipCard } from '../ui/flip-card';
import { useTranslations } from 'next-intl';
import { BookOpen, Heart, Star } from 'lucide-react';

/**
 * OurMissionValuesSection - Section with flip cards for mission & values.
 * Inspired by CEFA Curriculum (https://cefa.ca/)
 */
export function OurMissionValuesSection() {
  const t = useTranslations();
  const cards = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: t('about.mission.title'),
      front: t('about.mission.front'),
      back: t('about.mission.back'),
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: t('about.values.title'),
      front: t('about.values.front'),
      back: t('about.values.back'),
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: t('about.philosophy.title'),
      front: t('about.philosophy.front'),
      back: t('about.philosophy.back'),
    },
  ];

  return (
    <section id="mission-values" className="py-20 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-header text-3xl md:text-5xl font-bold mb-10 text-center">
          {t('about.missionValues.heading')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <FlipCard
              key={i}
              className="h-64 w-full"
              front={
                <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl shadow-xl p-6 border border-primary/10">
                  {card.icon}
                  <h3 className="mt-4 text-xl font-semibold text-primary text-center">{card.title}</h3>
                  <p className="mt-2 text-base text-gray-700 text-center">{card.front}</p>
                </div>
              }
              back={
                <div className="flex flex-col items-center justify-center h-full bg-primary text-white rounded-2xl shadow-xl p-6 border border-primary/10">
                  <h3 className="text-xl font-semibold mb-2 text-white text-center">{card.title}</h3>
                  <p className="text-base text-white text-center">{card.back}</p>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurMissionValuesSection;
