/**
 * Program subpage content for /programs/[slug].
 * Per data-model.md: slug, title, description, content, ageRange, locale
 */

export interface ProgramContent {
  slug: string;
  title: string;
  description: string;
  content: string;
  ageRange: string;
  locale: string;
}

const PROGRAM_SLUGS = ['infant', 'toddler', 'preschool'] as const;
export type ProgramSlug = (typeof PROGRAM_SLUGS)[number];

/** Full program content - 400+ words per program */
const DEFAULT_PROGRAMS: Record<string, ProgramContent> = {
  infant: {
    slug: 'infant',
    title: 'Infant Program',
    description: 'Montessori infant care at Friendship Corner Daycare in Coquitlam. Nurturing environment for babies with experienced educators.',
    ageRange: '6 months - 18 months',
    locale: 'en',
    content: `
<p>Our Infant Program at Friendship Corner Daycare provides a warm, safe, and nurturing environment for the youngest members of our community. Located in Coquitlam and serving families across the Tri-Cities (Coquitlam, Port Coquitlam, Port Moody), we understand that leaving your baby in someone else's care is one of the most important decisions you will make.</p>

<h2>A Prepared Environment for Infants</h2>
<p>Our infant space is carefully designed to support your baby's developmental milestones. We follow Montessori principles adapted for the youngest learners: freedom of movement, responsive caregiving, and a calm, orderly environment. Soft mats, low shelves with developmentally appropriate materials, and plenty of natural light create a welcoming atmosphere where infants can explore safely.</p>

<h2>Attachment and Relationships</h2>
<p>We believe that secure attachments form the foundation for all future learning. Our experienced educators build strong, trusting relationships with each infant through consistent care, responsive interactions, and individualized attention. We maintain low caregiver-to-child ratios to ensure every baby receives the attention and nurturing they need throughout the day.</p>

<h2>Daily Routine</h2>
<p>While we follow each infant's natural rhythms for feeding and sleep, our day includes purposeful activities: tummy time and movement to support physical development, sensory exploration with safe, age-appropriate materials, songs and stories for language exposure, and plenty of one-on-one interaction. We work closely with families to align our care with your baby's needs and your parenting approach.</p>

<h2>Communication with Families</h2>
<p>We know how much you want to stay connected during the day. Our team provides regular updates, photos when appropriate, and detailed notes about your baby's day—feeding, sleep, diapers, and special moments. You can reach us by phone or through our parent communication tools whenever you need peace of mind.</p>

<h2>Licensed Care in Coquitlam</h2>
<p>Friendship Corner Daycare is a Licensed Group Daycare under BC's child care licensing regulations. Our infant program meets or exceeds all provincial health, safety, and staffing standards. We are located at 2950 Dewdney Trunk Road in Coquitlam, near Lougheed Highway, with easy access for Tri-Cities families. Hours are Monday through Friday, 7:00 AM to 6:00 PM.</p>

<p><strong>Contact us</strong> at 604.945.8504 or friendship.care@live.ca to learn about availability in our Infant Program and to schedule a tour of our Coquitlam facility. We look forward to welcoming your family.</p>
    `.trim(),
  },
  toddler: {
    slug: 'toddler',
    title: 'Toddler Program',
    description: 'Montessori toddler program in Coquitlam. Ages 30 months to 3 years. Hands-on learning, independence building, and social skills.',
    ageRange: '30 months - 3 years',
    locale: 'en',
    content: `
<p>Our Toddler Program at Friendship Corner Daycare offers a gentle introduction to structured learning in a Montessori environment designed specifically for children aged 30 months to 3 years. Serving Coquitlam and the Tri-Cities since 2008, we support toddlers as they build independence, develop social skills, and discover the joy of learning through hands-on exploration.</p>

<h2>Focus on Independence and Social Skills</h2>
<p>The toddler years are a critical period for developing independence, language, and social-emotional skills. Our program emphasizes practical life activities—pouring, spooning, dressing, and caring for the environment—that build fine motor skills, concentration, and self-confidence. Toddlers learn to work alongside peers, share materials, and navigate social situations with guidance from our trained educators.</p>

<h2>Montessori Materials and Activities</h2>
<p>Children engage with age-appropriate Montessori materials in practical life, sensorial, language, and early math areas. Sensory exploration helps toddlers refine their senses and understand the world around them. Language development is supported through rich vocabulary, stories, songs, and the introduction of sandpaper letters. Our mixed-age classroom allows younger toddlers to learn from older peers while older children reinforce their skills by helping others.</p>

<h2>A Typical Day</h2>
<p>Our regular day includes: arrival and free play; morning snack; Montessori circle and hands-on learning time; outdoor play on our safe, stimulating playground or in the gym; lunch (brought from home); rest time; afternoon snack; and activities and play until departure. The rhythm is predictable yet flexible, allowing children to work at their own pace while building routines that support security and growth.</p>

<h2>Experienced, Caring Educators</h2>
<p>All our teachers hold BC Early Childhood Education (ECE) licenses and Montessori credentials. We maintain a 1:8 staff-to-child ratio to ensure each child receives the attention and guidance they need. Our team is trained in child development, positive discipline, and creating an inclusive, welcoming environment for every family.</p>

<h2>Convenient Location and Hours</h2>
<p>We are located at 2950 Dewdney Trunk Road in Coquitlam, inside Friendship Baptist Church near Lougheed Highway. Our facility is licensed for 20 children and operates Monday through Friday, 7:00 AM to 6:00 PM. We serve families from Coquitlam, Port Coquitlam, Port Moody, and throughout the Tri-Cities. Our outdoor playground and gym provide ample space for active play in all weather.</p>

<p><strong>Schedule a tour</strong> at 604.945.8504 or visit our contact page to see our toddler classroom in action and learn how your child can thrive at Friendship Corner Daycare in Coquitlam.</p>
    `.trim(),
  },
  preschool: {
    slug: 'preschool',
    title: 'Preschool & Pre-Kindergarten Program',
    description: 'Montessori preschool in Coquitlam for ages 3-5. Pre-kindergarten readiness, hands-on learning, and holistic development.',
    ageRange: '3 - 5 years',
    locale: 'en',
    content: `
<p>Our Preschool and Pre-Kindergarten Program at Friendship Corner Daycare prepares children ages 3 to 5 for the transition to elementary school through a Montessori-based curriculum that emphasizes hands-on learning, creative expression, and holistic development. Located in Coquitlam and serving Tri-Cities families since 2008, we create a bridge between home and formal education.</p>

<h2>Montessori Work Cycle and Choice</h2>
<p>Children participate in an extended work period where they choose from carefully prepared activities in practical life, sensorial, language, math, science, and cultural studies. The Montessori approach fosters independence, concentration, and a love of learning. Mixed-age groupings allow younger children to learn from older peers and older children to reinforce skills by mentoring others. Our prepared environment includes hands-on materials that make abstract concepts concrete—from the moveable alphabet to the golden beads for math.</p>

<h2>Beyond the Basics: Cooking, Music, Language</h2>
<p>In addition to core Montessori areas, children are exposed to cooking, dancing, music, Mandarin, and Japanese. These experiences broaden cultural awareness, support language development, and add joy to the learning day. Art time, story time, and outdoor exploration round out a rich, balanced curriculum.</p>

<h2>A Day in the Preschool Classroom</h2>
<p>Our typical day includes: arrival and morning work; morning meeting or circle; extended Montessori work cycle; outdoor exploration and play; lunch and social time; rest or quiet activities; afternoon snack; art and project time; and departure. The schedule is structured yet flexible, supporting both routine and individual pace.</p>

<h2>School Readiness</h2>
<p>Our pre-kindergarten program (ages 4–5) focuses explicitly on school readiness. Children work with advanced Montessori materials in reading, writing, and mathematics. They develop critical thinking, problem-solving, and leadership skills. By the time they leave for kindergarten, they are confident, curious learners ready for the next chapter.</p>

<h2>Licensed, Experienced Team</h2>
<p>Friendship Corner is a Licensed Group Daycare under BC's child care licensing regulations. Our educators hold ECE and Montessori credentials. We align our practices with BC's Early Learning Framework while staying true to Montessori principles. Families receive regular communication about their child's progress and daily experiences.</p>

<p><strong>Contact us</strong> to schedule a tour and see how our preschool program can support your child's growth. We welcome families from Coquitlam, Port Coquitlam, Port Moody, and the broader Tri-Cities area.</p>
    `.trim(),
  }
};

export const programsBySlugAndLocale: Record<string, Partial<Record<string, ProgramContent>>> = {
  infant: { en: DEFAULT_PROGRAMS.infant },
  toddler: { en: DEFAULT_PROGRAMS.toddler },
  preschool: { en: DEFAULT_PROGRAMS.preschool }
};

export function getProgram(slug: string, locale: string): ProgramContent | null {
  const content = programsBySlugAndLocale[slug]?.[locale] ?? programsBySlugAndLocale[slug]?.['en'];
  return content ?? null;
}

export function getAllProgramSlugs(): ProgramSlug[] {
  return [...PROGRAM_SLUGS];
}
