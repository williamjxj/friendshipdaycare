'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getImageUrl } from '@/lib/image-utils';

// Sample journal data - in a real app, this would come from a CMS or database
interface JournalEntry {
  id: number;
  month: string;
  year: number;
  title: string;
  content: string;
  highlights: string[];
  activities: string[];
  learningGoals?: string[];
  photos?: string[];
}

const journalData: Record<string, JournalEntry> = {
  '1': {
    id: 1,
    month: 'December',
    year: 2024,
    title: 'Winter Wonderland Adventures',
    content: `
      <p>This December has been absolutely magical at Friendship Corner Daycare! Our little explorers have embraced the winter season with enthusiasm and wonder, discovering the beauty of the season through hands-on Montessori activities.</p>
      
      <h3>🌨️ Winter Sensory Explorations</h3>
      <p>We created beautiful winter sensory bins filled with artificial snow, ice cubes, and winter-themed objects. The children loved exploring different textures and temperatures while developing their sensory awareness and vocabulary.</p>
      
      <h3>🎄 Holiday Traditions Around the World</h3>
      <p>Our cultural studies expanded to include holiday traditions from different countries. We learned about Christmas, Hanukkah, Kwanzaa, and winter solstice celebrations, fostering respect and appreciation for diversity.</p>
      
      <h3>☕ Practical Life: Hot Chocolate Making</h3>
      <p>One of our most popular activities was learning to make hot chocolate! The children practiced measuring, pouring, and following sequential steps while developing independence and fine motor skills.</p>
      
      <h3>🍃 Nature Observations</h3>
      <p>Despite the cold weather, we continued our nature walks to observe how the environment changes in winter. We collected interesting items and discussed animal adaptations for the season.</p>
    `,
    highlights: [
      'Winter sensory bins with snow and ice',
      'Holiday traditions from around the world',
      'Practical life: Making hot chocolate',
      'Nature walks to observe winter changes',
      'Snowflake cutting and symmetry exploration',
      'Winter animal habitat studies'
    ],
    activities: [
      'Snowflake cutting and symmetry exploration',
      'Winter animal habitat studies',
      'Seasonal cooking activities',
      'Holiday card making for families',
      'Ice painting experiments',
      'Winter poetry and songs'
    ],
    learningGoals: [
      'Developed seasonal vocabulary',
      'Enhanced fine motor skills through cutting activities',
      'Practiced measurement and following instructions',
      'Increased cultural awareness and respect',
      'Strengthened observation and classification skills'
    ],
    photos: [
      getImageUrl('/images/journal-dec-sensory.jpg'),
      getImageUrl('/images/journal-dec-cooking.jpg'),
      getImageUrl('/images/journal-dec-nature.jpg')
    ]
  },
  '2': {
    id: 2,
    month: 'November',
    year: 2024,
    title: 'Gratitude and Harvest Celebrations',
    content: `
      <p>November brought us wonderful opportunities to explore the concept of gratitude and celebrate the harvest season. Our Montessori approach helped children understand thankfulness through concrete experiences and meaningful activities.</p>
      
      <h3>🦃 Thanksgiving Preparations</h3>
      <p>We prepared for our Thanksgiving feast by learning about traditional foods and their origins. Children participated in food preparation activities, developing practical life skills while learning about nutrition and cultural traditions.</p>
      
      <h3>🌳 Our Gratitude Tree</h3>
      <p>Our classroom gratitude tree became a beautiful focal point where children could express what they're thankful for. Each leaf represented something special to them, creating a visual reminder of all the good things in our lives.</p>
      
      <h3>🍂 Autumn Leaf Studies</h3>
      <p>We collected, sorted, and classified autumn leaves, learning about different tree species and the science behind changing colors. This activity combined botany, art, and sensory exploration.</p>
      
      <h3>👨‍🚒 Community Helper Appreciation</h3>
      <p>We dedicated a week to learning about and appreciating community helpers. Children wrote thank you cards and learned about different jobs that help our community function.</p>
    `,
    highlights: [
      'Thanksgiving feast preparation',
      'Gratitude tree classroom project',
      'Autumn leaf collection and classification',
      'Community helper appreciation week',
      'Traditional bread making',
      'Fall nature art projects'
    ],
    activities: [
      'Pumpkin lifecycle studies',
      'Traditional bread making',
      'Fall nature art projects',
      'Thank you card writing practice',
      'Harvest vegetable tasting',
      'Autumn songs and fingerplays'
    ],
    learningGoals: [
      'Developed gratitude and appreciation',
      'Enhanced writing and communication skills',
      'Learned about plant lifecycles',
      'Increased community awareness',
      'Practiced classification and sorting skills'
    ]
  },
  '3': {
    id: 3,
    month: 'October',
    year: 2024,
    title: 'Autumn Discoveries and Halloween Fun',
    content: `
      <p>October was filled with exciting discoveries about autumn and fun Halloween celebrations! Our children explored the changing season through scientific observation and creative expression.</p>
      
      <h3>🎃 Pumpkin Patch Adventure</h3>
      <p>Our field trip to the pumpkin patch was a highlight of the month. Children learned about how pumpkins grow, selected their own pumpkins, and enjoyed hayrides while connecting with nature and agriculture.</p>
      
      <h3>👻 Halloween Costume Parade</h3>
      <p>Our Halloween costume parade was a delightful celebration of creativity and imagination. Children proudly showed off their costumes while practicing public speaking and building confidence.</p>
      
      <h3>🍎 Apple Harvesting and Tasting</h3>
      <p>We explored different varieties of apples through tasting activities and learned about apple harvesting. This connected to our studies of seasons, agriculture, and healthy eating.</p>
      
      <h3>🍃 Leaf Art Creations</h3>
      <p>Children created beautiful art projects using pressed leaves, learning about different leaf shapes and practicing fine motor skills through cutting, gluing, and arranging.</p>
    `,
    highlights: [
      'Pumpkin patch field trip',
      'Halloween costume parade',
      'Apple harvesting and tasting',
      'Leaf pressing and art creation',
      'Spooky story time sessions',
      'Autumn sensory exploration'
    ],
    activities: [
      'Pumpkin carving (teacher demonstration)',
      'Spooky story time sessions',
      'Autumn sensory exploration',
      'Harvest festival preparations',
      'Apple printing art',
      'Halloween safety discussions'
    ],
    learningGoals: [
      'Enhanced observation skills',
      'Developed artistic expression',
      'Learned about seasonal changes',
      'Practiced social skills during celebrations',
      'Increased vocabulary related to autumn'
    ]
  }
};

export default function JournalDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const journalId = params.id as string;
  
  const journal = journalData[journalId];
  
  if (!journal) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Journal Not Found</h1>
          <p className="text-muted-foreground">The journal you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/community/journal" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors min-h-[44px]">
              {t('journal.backToJournals')}
            </Link>
          </div>
        </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner message="Loading journal..." />}>
      {/* Main Content */}
      <main id="main-content" className="flex-1">
            <article className="py-12 bg-background">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-8">
                  <Link
                    href="/community/journal"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
                  >
                    <span>←</span>
                    <span>{t('journal.backToJournals')}</span>
                  </Link>
                </div>

                {/* Journal Header */}
                <header className="mb-12 text-center space-y-4">
                  <div className="text-6xl mb-4">📖</div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    {journal.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {journal.month} {journal.year}
                  </p>
                </header>

                {/* Journal Content */}
                <div className="prose prose-lg max-w-none mb-12">
                  <div dangerouslySetInnerHTML={{ __html: journal.content }} />
                </div>

                {/* Highlights and Activities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-card rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <span>🌟</span>
                      <span>{t('journal.highlights')}</span>
                    </h3>
                    <ul className="space-y-2">
                      {journal.highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-card rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <span>🎨</span>
                      <span>{t('journal.activities')}</span>
                    </h3>
                    <ul className="space-y-2">
                      {journal.activities.map((activity: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learning Goals */}
                {journal.learningGoals && (
                  <div className="bg-card rounded-xl p-6 shadow-lg mb-12">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <span>🎯</span>
                      <span>{t('journal.learningGoals')}</span>
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {journal.learningGoals.map((goal: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation */}
                <div className="text-center">
                  <Link
                    href="/community/journal"
                    className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors min-h-[44px]"
                  >
                    {t('journal.backToJournals')}
                  </Link>
                </div>
              </div>
            </article>
      </main>
    </Suspense>
  );
}
