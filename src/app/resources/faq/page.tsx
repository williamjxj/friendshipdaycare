import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ & Frequently Asked Questions | Friendship Corner Daycare',
  description: 'Find answers to common questions about enrollment, programs, daily operations, health & safety, tuition, and more at Friendship Corner Daycare.',
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: string;
  questions: FAQItem[];
}

export default function FAQPage() {
  const faqData: FAQCategory[] = [
    {
      category: 'Enrollment & Admissions',
      icon: '📝',
      questions: [
        { question: 'When does enrollment open?', answer: 'We accept applications year-round. However, our primary enrollment period is in September for the new school year. We recommend applying 3-6 months in advance to secure a spot.' },
        { question: 'Is there a waitlist?', answer: "Yes, due to our small class sizes and high demand, we maintain a waitlist for each age group. You can submit a waitlist application at any time, and we'll contact you when a spot becomes available." },
        { question: 'What documents do I need to enroll?', answer: "Required documents include: completed application form, child's birth certificate, immunization records, recent photo, emergency contact information, and physician's contact details. We'll provide a complete checklist during the application process." },
        { question: 'What is the minimum age for enrollment?', answer: 'We accept children starting at 30 months (2.5 years) old. Children must be able to walk independently and show readiness for group care.' },
        { question: 'Do you offer part-time options?', answer: 'Yes! We offer both full-time (5 days/week) and part-time (2-3 days/week) programs. Part-time schedules are subject to availability and are typically available for preschool and pre-kindergarten groups.' },
        { question: 'Can I tour the facility before enrolling?', answer: 'Absolutely! We highly encourage parents to schedule a tour. You can book a tour online through our enrollment page or call us at 604.945.8504. Tours are available Monday-Friday by appointment.' },
      ],
    },
    {
      category: 'Programs & Curriculum',
      icon: '📚',
      questions: [
        { question: 'What is the Montessori method?', answer: 'The Montessori method is a child-centered educational approach developed by Dr. Maria Montessori. It emphasizes hands-on learning, self-directed activity, and collaborative play. Children work with specially designed materials at their own pace, fostering independence, concentration, and a love of learning.' },
        { question: 'Do you teach academics?', answer: 'Yes, but in a developmentally appropriate way. Montessori materials introduce academic concepts naturally through hands-on exploration. Children learn pre-math skills, pre-reading, writing, science, and practical life skills through engaging materials and activities.' },
        { question: 'How do you incorporate biblical values?', answer: 'Each week, we share gentle Bible stories that teach character values like kindness, honesty, sharing, and respect. These stories are age-appropriate and focus on universal values. We respect all families\' beliefs and welcome children from all backgrounds.' },
        { question: 'What is your approach to potty training?', answer: 'We support families through the potty training process with patience and consistency. For our toddler program, children don\'t need to be fully potty trained. For preschool and pre-K, we prefer children to be potty trained but will work with families who are in the process.' },
        { question: 'How do you handle different learning paces?', answer: "This is a strength of Montessori education! Children work at their own pace with individualized learning plans. Teachers observe each child and present materials when they're ready. Fast learners can progress quickly, while those needing more time receive additional support." },
        { question: 'Do you prepare children for kindergarten?', answer: 'Yes! Our pre-kindergarten program specifically focuses on school readiness. Children develop academic skills, social-emotional competencies, independence, and the ability to follow routines. Many of our graduates exceed kindergarten expectations.' },
      ],
    },
    {
      category: 'Daily Operations',
      icon: '⏰',
      questions: [
        { question: 'What are your hours of operation?', answer: "We're open Monday through Friday, 7:30 AM to 5:30 PM. We're closed on statutory holidays and for two weeks during the winter holiday season (typically the last week of December and first week of January)." },
        { question: 'What should my child bring daily?', answer: 'Please send: a change of clothes (including underwear and socks), indoor shoes, a water bottle (labeled), any comfort items, and sunscreen/hat in summer. We provide morning and afternoon snacks. If your child has specific dietary needs, please discuss with us.' },
        { question: 'Do you provide meals?', answer: 'We provide morning and afternoon snacks. Parents are responsible for packing a nutritious lunch. We encourage healthy, balanced meals and can provide suggestions. We are a nut-free facility to protect children with allergies.' },
        { question: 'What is your late pick-up policy?', answer: 'Our closing time is 5:30 PM sharp. If you\'re running late, please call us immediately. Late pick-ups incur a fee of $1 per minute after 5:30 PM. Repeated late pick-ups may result in additional consequences as outlined in our parent handbook.' },
        { question: 'How do you communicate with parents?', answer: 'We use multiple channels: daily verbal updates at pick-up, written notes for important information, monthly newsletters, parent-teacher meetings twice a year, and our monthly journal on the website. For urgent matters, we call or email directly.' },
        { question: 'Can I visit during the day?', answer: "Parents are always welcome! However, we recommend calling ahead for drop-in visits so we can ensure it's a good time. Scheduled parent observation sessions allow you to watch your child in action without disruption. We maintain an open-door policy within reason." },
      ],
    },
    {
      category: 'Health & Safety',
      icon: '🏥',
      questions: [
        { question: 'When should I keep my child home?', answer: "Please keep your child home if they have: fever over 100°F (within last 24 hours), vomiting or diarrhea (within last 24 hours), unexplained rash, contagious illness, or severe cold symptoms. Children must be symptom-free for 24 hours before returning." },
        { question: 'What if my child gets sick at daycare?', answer: "We'll call you immediately if your child develops a fever, vomits, or shows signs of illness. You'll need to pick up your child within one hour. We have a comfortable quiet area where ill children can rest until pick-up." },
        { question: 'How do you handle food allergies?', answer: "We take allergies very seriously. We're a nut-free facility. For children with specific allergies, we create individualized care plans, post allergy alerts, and ensure all staff are trained. Parents must provide complete allergy information and emergency medications (like EpiPens)." },
        { question: 'Are staff trained in first aid?', answer: 'Yes! All staff members are certified in Pediatric First Aid and CPR. We maintain current certifications and conduct regular safety drills. We have first aid kits in each classroom and outdoors.' },
        { question: 'What are your emergency procedures?', answer: 'We have comprehensive emergency plans for fire, earthquake, lockdown, and medical emergencies. We conduct monthly fire drills and quarterly earthquake drills. In case of evacuation, our meeting point is clearly marked. Parents will be notified immediately in any emergency.' },
        { question: 'Is your facility licensed?', answer: "Yes, we are a licensed Group Daycare facility regulated by BC's Community Care and Assisted Living Act. We undergo regular inspections and maintain all required standards for health, safety, and programming." },
      ],
    },
    {
      category: 'Tuition & Payment',
      icon: '💰',
      questions: [
        { question: 'How much does tuition cost?', answer: 'Our tuition varies by program and schedule. Contact us for detailed rates. Full-time rates range from $1,150-$1,200/month depending on the age group. Part-time options are also available.' },
        { question: 'When is tuition due?', answer: 'Tuition is due on the first of each month. We offer several payment methods including post-dated checks, automatic bank transfers, and e-transfers. Late payments may incur a $25 fee after the 5th of the month.' },
        { question: 'Do you accept government subsidies?', answer: 'Yes! We accept the BC Child Care Fee Reduction Initiative and the Affordable Child Care Benefit. These subsidies can significantly reduce your out-of-pocket costs. We can help you understand and apply for available subsidies.' },
        { question: 'Are there sibling discounts?', answer: 'Yes, we offer a 10% discount on tuition for the second child when two or more siblings are enrolled simultaneously. The discount applies to the lower tuition rate.' },
        { question: 'What payment methods do you accept?', answer: 'We accept post-dated checks, e-transfers (to friendship.care@live.ca), and direct bank transfers. Cash payments are accepted but not encouraged. We do not currently accept credit cards.' },
        { question: 'What if I need to withdraw my child?', answer: "We require one full month's written notice for withdrawal. If less notice is given, you'll be responsible for the full month's tuition. Registration fees are non-refundable. Please refer to your enrollment agreement for complete details." },
        { question: 'Are there additional fees?', answer: 'Tuition includes daily snacks, materials, and regular field trips. Additional costs may include: registration fee ($200 annually), supply fee ($100 annually), special events or field trips with extra costs, and late pick-up fees.' },
      ],
    },
    {
      category: 'Parent Involvement',
      icon: '👨‍👩‍👧',
      questions: [
        { question: 'How can I get involved?', answer: 'We welcome parent involvement! Opportunities include: volunteering for special events, sharing your profession or hobby with the class, joining our parent committee, participating in fundraisers, and attending parent education evenings.' },
        { question: 'Do you have parent-teacher conferences?', answer: 'Yes, we hold formal parent-teacher conferences twice a year (fall and spring). However, teachers are always available for informal check-ins at drop-off or pick-up. You can also schedule a meeting anytime if you have concerns or questions.' },
        { question: "Can I celebrate my child's birthday?", answer: "Absolutely! We love celebrating birthdays. You can bring a simple treat (nut-free, please) or we can do a special activity. We also do a special birthday ritual in the Montessori tradition. Please coordinate with your child's teacher in advance." },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-grow">
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Find answers to common questions about enrollment, programs, and daily operations
            </p>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Can&apos;t find what you&apos;re looking for?</strong> Contact us at{' '}
                <a href="tel:604-945-8504" className="text-blue-600 hover:underline">604.945.8504</a> or{' '}
                <a href="mailto:friendship.care@live.ca" className="text-blue-600 hover:underline">friendship.care@live.ca</a>
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="text-4xl">{category.icon}</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {category.category}
                  </span>
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <details
                      key={faqIndex}
                      className="group border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                    >
                      <summary className="cursor-pointer list-none flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 group-open:bg-blue-600 group-open:text-white transition-colors">
                          <svg className="w-4 h-4 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span className="flex-grow font-semibold text-lg text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {faq.question}
                        </span>
                      </summary>
                      <div className="mt-4 ml-9 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Join Our Family?</h2>
            <p className="text-xl text-blue-100 mb-10">Learn more about our programs and enrollment process</p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/enrollment" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                Enrollment Process
              </Link>
              <Link href="/contact#contact-form" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                Contact & Tuition
              </Link>
              <Link href="/contact#contact-form" className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                Schedule a Tour
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We&apos;re here to help! Reach out to us and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:604-945-8504" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
              <a href="mailto:friendship.care@live.ca" className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
