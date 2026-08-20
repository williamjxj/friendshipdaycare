/**
 * Real program content for /programs/[slug].
 *
 * Source of truth: Friendship Corner Daycare's actual offering
 * (licensed group daycare, 30 months to 5 years, Montessori).
 */

export type ProgramSlug = "toddler" | "preschool" | "prekindergarten";

export interface ProgramFaq {
  question: string;
  answer: string;
}

export interface ProgramContent {
  slug: ProgramSlug;
  title: string;
  /** Short title used in page <title> (template appends brand + city). */
  metaTitle: string;
  metaDescription: string;
  ageRange: string;
  summary: string;
  highlights: string[];
  curriculum: Array<{ heading: string; body: string }>;
  schedule: Array<{ time: string; activity: string }>;
  faqs: ProgramFaq[];
}

const DAILY_SCHEDULE = [
  { time: "7:00 – 8:30 AM", activity: "Arrival, free play and morning work" },
  { time: "8:30 – 9:00 AM", activity: "Morning snack" },
  { time: "9:00 – 11:00 AM", activity: "Montessori work cycle and circle time" },
  { time: "11:00 AM – 12:00 PM", activity: "Outdoor play (playground or gym)" },
  { time: "12:00 – 1:00 PM", activity: "Lunch (brought from home)" },
  { time: "1:00 – 2:30 PM", activity: "Rest or quiet activities" },
  { time: "2:30 – 3:00 PM", activity: "Afternoon snack" },
  { time: "3:00 – 6:00 PM", activity: "Art, storytime, music and play until pick-up" },
] as const;

export const programs: ProgramContent[] = [
  {
    slug: "toddler",
    title: "Toddler Program",
    metaTitle: "Toddler Montessori Program",
    metaDescription:
      "Montessori toddler daycare in Coquitlam for children 30 months to 3 years. Practical life, sensory learning and independence with BC ECE educators at Friendship Corner Daycare.",
    ageRange: "30 months – 3 years",
    summary:
      "Our toddler program gives children aged 30 months to 3 years a gentle introduction to structured learning. In a safe, prepared Montessori environment, toddlers build independence, language and social skills through hands-on practical life activities, sensory exploration and guided play.",
    highlights: [
      "Practical life activities that build independence and fine motor skills",
      "Sensory exploration and language-rich activities every day",
      "Social skills, emotional regulation and first friendships",
      "Potty training support — toddlers don't need to be fully trained",
      "1:8 staff-to-child ratio with BC ECE licensed, Montessori-certified educators",
    ],
    curriculum: [
      {
        heading: "A prepared environment built for toddlers",
        body: "The toddler classroom uses authentic Montessori materials on low, accessible shelves. Children choose activities from practical life, sensorial, language and early math areas, working at their own pace while teachers observe and guide. The calm, orderly space helps toddlers feel secure and capable.",
      },
      {
        heading: "Independence and social skills first",
        body: "Toddlers learn to pour, spoon, dress themselves, care for plants and tidy their workspace. These everyday tasks build concentration, coordination and confidence. Mixed-age interactions let younger children learn from older peers while older toddlers practice kindness and leadership.",
      },
      {
        heading: "Language, movement and routine",
        body: "Rich vocabulary, songs, stories and sandpaper letters support early language development. Outdoor play on our playground or in the gym provides daily gross-motor movement. A predictable rhythm of free play, snack, work time, outdoor time, lunch and rest helps toddlers feel safe and ready to learn.",
      },
    ],
    schedule: [...DAILY_SCHEDULE],
    faqs: [
      {
        question: "Does my toddler need to be potty trained?",
        answer:
          "No. Children in our toddler program (30 months to 3 years) do not need to be fully potty trained. Our educators support families through the process with patience and consistency.",
      },
      {
        question: "What is the staff-to-child ratio in the toddler program?",
        answer:
          "We maintain a 1:8 staff-to-child ratio, meeting or exceeding BC licensing requirements for group daycare.",
      },
      {
        question: "How do you help toddlers adjust to daycare?",
        answer:
          "We recommend a short tour before starting and a gradual transition plan. Our educators build warm, consistent relationships, and parents are welcome to call or check in during the day.",
      },
    ],
  },
  {
    slug: "preschool",
    title: "Preschool Program",
    metaTitle: "Preschool Montessori Program",
    metaDescription:
      "Montessori preschool in Coquitlam for children 3 to 4 years. Hands-on learning, pre-reading and pre-math skills with certified ECE educators at Friendship Corner Daycare.",
    ageRange: "3 – 4 years",
    summary:
      "Our preschool program for children aged 3 to 4 uses a Montessori-based curriculum that emphasizes hands-on learning, creative expression and social development. Children build pre-reading, pre-math and practical life skills through self-directed work in a prepared environment.",
    highlights: [
      "Montessori work cycle with self-directed, hands-on activities",
      "Pre-reading, pre-math, science and cultural exploration",
      "Creative expression through art, music, cooking and movement",
      "Exposure to Mandarin and Japanese as part of the curriculum",
      "Mixed-age classroom with certified ECE and Montessori educators",
    ],
    curriculum: [
      {
        heading: "The Montessori work cycle",
        body: "Each morning includes an extended work period where children choose from carefully prepared activities in practical life, sensorial, language, math, science and cultural studies. Choosing and completing work builds concentration, planning skills and a genuine love of learning.",
      },
      {
        heading: "Pre-reading and pre-math through materials",
        body: "Children work with sandpaper letters, the moveable alphabet, number rods and golden beads. These concrete materials make abstract ideas tangible, preparing children for reading, writing and mathematics without pressure or worksheets.",
      },
      {
        heading: "Beyond the classroom: cooking, music and languages",
        body: "Preschoolers enjoy cooking, dancing, music, art and storytime. They are also introduced to Mandarin and Japanese, broadening cultural awareness and supporting language development in a playful, age-appropriate way.",
      },
    ],
    schedule: [...DAILY_SCHEDULE],
    faqs: [
      {
        question: "Is preschool at Friendship Corner Montessori-based?",
        answer:
          "Yes. We follow the Montessori method with authentic materials, a prepared environment and BC ECE licensed, Montessori-certified educators. Children learn through hands-on, self-directed activity at their own pace.",
      },
      {
        question: "Do you teach academics at this age?",
        answer:
          "Yes, in a developmentally appropriate way. Children learn pre-reading, pre-math, science and cultural concepts through hands-on Montessori materials rather than worksheets.",
      },
      {
        question: "What languages are children exposed to?",
        answer:
          "English is the primary language of instruction. Children are also exposed to Mandarin and Japanese through songs, stories and activities as part of our enriched curriculum.",
      },
    ],
  },
  {
    slug: "prekindergarten",
    title: "Pre-Kindergarten Program",
    metaTitle: "Pre-Kindergarten Program",
    metaDescription:
      "Montessori pre-kindergarten in Coquitlam for children 4 to 5 years. School readiness, reading, writing and math with certified ECE educators at Friendship Corner Daycare.",
    ageRange: "4 – 5 years",
    summary:
      "Our pre-kindergarten program for children aged 4 to 5 focuses on school readiness with advanced Montessori materials in reading, writing and mathematics. Children graduate confident, curious and independent, ready for kindergarten and beyond.",
    highlights: [
      "Advanced Montessori materials for reading, writing and mathematics",
      "Critical thinking, problem-solving and leadership skills",
      "Kindergarten transition support with routines and independence",
      "Mixed-age classroom with certified ECE and Montessori educators",
      "1:8 staff-to-child ratio in a licensed BC group daycare",
    ],
    curriculum: [
      {
        heading: "School readiness with purpose",
        body: "Pre-kindergarteners work with advanced Montessori materials such as the moveable alphabet, phonetic reading sets, the golden bead material and math operations. They develop the academic skills and study habits they will need for kindergarten.",
      },
      {
        heading: "Reading, writing and mathematics",
        body: "Children build phonemic awareness, sight vocabulary and early writing through hands-on materials. Mathematics moves from concrete materials to abstract understanding, including place value, addition and subtraction. Many of our graduates exceed kindergarten expectations.",
      },
      {
        heading: "Independence, leadership and kindergarten transition",
        body: "Older children take on classroom responsibilities and mentor younger peers, building confidence and leadership. We help families prepare for the transition to kindergarten with routines, communication and a focus on social-emotional readiness.",
      },
    ],
    schedule: [...DAILY_SCHEDULE],
    faqs: [
      {
        question: "Will my child be ready for kindergarten?",
        answer:
          "Yes. Our pre-kindergarten program focuses explicitly on school readiness. Children develop reading, writing, math, social-emotional and independence skills, and many of our graduates exceed kindergarten expectations.",
      },
      {
        question: "What is different about Montessori pre-kindergarten?",
        answer:
          "Children learn through self-directed work with advanced Montessori materials rather than worksheets. This builds concentration, problem-solving and a love of learning alongside academic skills.",
      },
      {
        question: "Do pre-kindergarten children still get rest time?",
        answer:
          "Yes. After lunch, children have quiet rest or quiet activity time before the afternoon snack and project time, balancing academics with age-appropriate rest.",
      },
    ],
  },
];

export function getProgram(slug: string): ProgramContent | null {
  return programs.find((p) => p.slug === slug) ?? null;
}

export function getAllProgramSlugs(): ProgramSlug[] {
  return programs.map((p) => p.slug);
}
