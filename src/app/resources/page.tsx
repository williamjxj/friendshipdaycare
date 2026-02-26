import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Parent Resources & Handbook | Friendship Corner Daycare',
  description: 'Access our parent handbook, policies, downloadable resources, and helpful guides for families at Friendship Corner Daycare.',
};

interface Resource {
  title: string;
  description: string;
  type: 'PDF' | 'Guide' | 'Checklist' | 'Article';
  icon: string;
  downloadUrl?: string;
}

interface ResourceCategory {
  category: string;
  icon: string;
  resources: Resource[];
}

export default function ResourcesPage() {
  const resourceData: ResourceCategory[] = [
    {
      category: 'Essential Documents',
      icon: '📋',
      resources: [
        { title: 'Parent Handbook 2024-2025', description: 'Complete guide to policies, procedures, and what to expect at Friendship Corner', type: 'PDF', icon: '📖', downloadUrl: '#' },
        { title: 'Enrollment Application', description: 'Fillable PDF application form for new families', type: 'PDF', icon: '✍️', downloadUrl: '#' },
        { title: 'Medical Information Form', description: 'Required health and emergency contact information', type: 'PDF', icon: '🏥', downloadUrl: '#' },
        { title: 'Field Trip Permission Form', description: 'Annual consent form for off-site activities', type: 'PDF', icon: '🚌', downloadUrl: '#' },
      ],
    },
    {
      category: 'Getting Started',
      icon: '🌟',
      resources: [
        { title: 'First Day Checklist', description: 'Everything your child needs for a successful first day', type: 'Checklist', icon: '✅' },
        { title: 'Separation Anxiety Guide', description: 'Tips for helping your child adjust to daycare', type: 'Guide', icon: '🤗' },
        { title: 'What to Pack Daily', description: 'Daily essentials your child should bring', type: 'Checklist', icon: '🎒' },
        { title: 'Potty Training Partnership', description: 'How we support families through potty training', type: 'Guide', icon: '🚽' },
      ],
    },
    {
      category: 'Montessori at Home',
      icon: '🏠',
      resources: [
        { title: 'Montessori Activities for Toddlers', description: 'Simple activities you can do at home (Ages 2-3)', type: 'Guide', icon: '👶' },
        { title: 'Practical Life Skills Activities', description: 'Help your child develop independence at home', type: 'Guide', icon: '🧹' },
        { title: "Creating a Prepared Environment", description: "Set up your home to support your child's development", type: 'Article', icon: '🛋️' },
        { title: 'Montessori-Inspired Toys & Materials', description: 'Recommended toys that support learning', type: 'Guide', icon: '🧸' },
      ],
    },
    {
      category: 'Health & Wellness',
      icon: '💚',
      resources: [
        { title: 'Healthy Lunchbox Ideas', description: 'Nutritious, kid-friendly lunch suggestions', type: 'Guide', icon: '🥗' },
        { title: 'Illness Policy Quick Reference', description: 'When to keep your child home and when they can return', type: 'Checklist', icon: '🤒' },
        { title: 'Allergy Management Plan', description: 'How we handle food allergies and keep children safe', type: 'Guide', icon: '⚠️' },
        { title: 'Sleep Tips for Young Children', description: 'Establishing healthy sleep routines', type: 'Article', icon: '😴' },
      ],
    },
    {
      category: 'School Readiness',
      icon: '🎓',
      resources: [
        { title: 'Kindergarten Readiness Skills', description: 'What children should know before starting kindergarten', type: 'Checklist', icon: '📝' },
        { title: 'Pre-Reading Activities', description: 'Fun ways to build literacy skills at home', type: 'Guide', icon: '📚' },
        { title: 'Math Readiness Through Play', description: 'Everyday activities that teach math concepts', type: 'Guide', icon: '🔢' },
        { title: 'Social-Emotional Development', description: "Supporting your child's emotional intelligence", type: 'Article', icon: '❤️' },
      ],
    },
    {
      category: 'Seasonal & Special',
      icon: '🎉',
      resources: [
        { title: 'Summer Activity Ideas', description: 'Keep learning going during summer break', type: 'Guide', icon: '☀️' },
        { title: 'Holiday Traditions Around the World', description: 'Celebrate diversity with your family', type: 'Article', icon: '🌍' },
        { title: 'Birthday Celebration Guidelines', description: 'How to celebrate birthdays at our center', type: 'Guide', icon: '🎂' },
        { title: 'Outdoor Play in All Weather', description: 'Why outdoor play matters and how to dress for it', type: 'Article', icon: '🌦️' },
      ],
    },
  ];

  const handbookSections = [
    { title: 'Welcome & Philosophy', items: ["Director's Welcome", 'Our Mission & Vision', 'Montessori Approach', 'Biblical Values Integration'] },
    { title: 'Daily Operations', items: ['Hours of Operation', 'Daily Schedule', 'Drop-off & Pick-up', 'Attendance Policy'] },
    { title: 'Health & Safety', items: ['Illness Policy', 'Medication Administration', 'Allergy Management', 'Emergency Procedures'] },
    { title: 'Curriculum & Learning', items: ['Program Overview', 'Learning Areas', 'Assessment & Progress', 'Transitions'] },
    { title: 'Policies & Procedures', items: ['Tuition & Payment', 'Withdrawal Policy', 'Behavior Guidance', 'Parent Involvement'] },
    { title: 'Communication', items: ['Parent-Teacher Communication', 'Conferences', 'Updates & Newsletters', 'Concerns & Feedback'] },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-grow">
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Parent Resources & Handbook
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to support your child&apos;s learning journey
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
                    <div className="text-6xl mb-4">📖</div>
                    <h3 className="text-2xl font-bold mb-2">Parent Handbook</h3>
                    <p className="text-blue-100 mb-4">2024-2025</p>
                    <button type="button" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Download PDF
                    </button>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Complete Parent Handbook
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our comprehensive parent handbook contains all the information you need about our programs,
                    policies, and procedures. It&apos;s your go-to resource for questions about daily operations,
                    curriculum, health and safety, and more.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {handbookSections.map((section, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{section.title}</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {resourceData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="text-4xl">{category.icon}</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {category.category}
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <div
                      key={resourceIndex}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{resource.icon}</div>
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {resource.title}
                            </h3>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                              {resource.type}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{resource.description}</p>
                          {resource.downloadUrl ? (
                            <a href={resource.downloadUrl} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Download
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Need More Information?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="/resources/faq" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                View FAQ
              </Link>
              <Link href="/contact#contact-form" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                Contact Us
              </Link>
              <Link href="/enrollment" className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                Enroll Now
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter for parenting tips, activity ideas, and center updates
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
