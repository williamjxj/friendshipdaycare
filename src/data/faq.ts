/**
 * Shared FAQ data for contact page.
 * Single source for all FAQ content - no separate /resources/faq route.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

/** Contact-focused FAQs (show first), then full FAQ by category */
export const faqItems: FAQItem[] = [
  // Contact & tour (first - most relevant on contact page)
  { question: 'How can I reach you?', answer: 'You can reach us by phone during business hours (Mon–Fri 7:00 AM–6:00 PM), by email anytime, or by filling out the contact form above. We aim to respond within 24 hours.' },
  { question: 'How do I book a tour?', answer: 'Use the contact form above, call us at 604.945.8504, or email friendship.care@live.ca. We\'ll confirm your tour time by phone or email.' },
  { question: 'What is included in the monthly tuition?', answer: 'Monthly tuition includes all Montessori materials and learning resources, nutritious morning and afternoon snacks, outdoor play time, art supplies, and regular communication with families through our daily reports.' },
  { question: 'Do I need to pay for months my child is absent?', answer: 'Yes, tuition is required for all enrolled months to hold your child\'s spot, regardless of absences due to vacation, illness, or holidays. This ensures we maintain appropriate staffing ratios and can keep your child\'s place secured.' },
  { question: 'Is there a waitlist deposit?', answer: 'No, there is no fee to join our waitlist. However, once a spot becomes available and you accept, the $200 registration fee is due within 48 hours to secure your child\'s enrollment.' },
  { question: 'What is your refund policy?', answer: 'We require 30 days written notice for withdrawal. Registration fees are non-refundable. Tuition paid for the notice period is non-refundable, but your child may continue to attend during this time.' },
  { question: 'Can I switch from part-time to full-time?', answer: 'Yes! Schedule changes are subject to availability. Please provide at least 2 weeks notice for any schedule changes. We\'ll do our best to accommodate your family\'s needs.' },
  // Enrollment & Admissions
  { question: 'When does enrollment open?', answer: 'We accept applications year-round. However, our primary enrollment period is in September for the new school year. We recommend applying 3-6 months in advance to secure a spot.' },
  { question: 'Is there a waitlist?', answer: "Yes, due to our small class sizes and high demand, we maintain a waitlist for each age group. You can submit a waitlist application at any time, and we'll contact you when a spot becomes available." },
  { question: 'What documents do I need to enroll?', answer: "Required documents include: completed application form, child's birth certificate, immunization records, recent photo, emergency contact information, and physician's contact details. We'll provide a complete checklist during the application process." },
  { question: 'What is the minimum age for enrollment?', answer: 'We accept children starting at 30 months (2.5 years) old. Children must be able to walk independently and show readiness for group care.' },
  { question: 'Do you offer part-time options?', answer: 'Yes! We offer both full-time (5 days/week) and part-time (2-3 days/week) programs. Part-time schedules are subject to availability and are typically available for preschool and pre-kindergarten groups.' },
  { question: 'Can I tour the facility before enrolling?', answer: 'Absolutely! We highly encourage parents to schedule a tour. You can book a tour online through our enrollment page or call us at 604.945.8504. Tours are available Monday-Friday by appointment.' },
  // Programs & Curriculum
  { question: 'What is the Montessori method?', answer: 'The Montessori method is a child-centered educational approach developed by Dr. Maria Montessori. It emphasizes hands-on learning, self-directed activity, and collaborative play. Children work with specially designed materials at their own pace, fostering independence, concentration, and a love of learning.' },
  { question: 'Do you teach academics?', answer: 'Yes, but in a developmentally appropriate way. Montessori materials introduce academic concepts naturally through hands-on exploration. Children learn pre-math skills, pre-reading, writing, science, and practical life skills through engaging materials and activities.' },
  { question: 'How do you incorporate biblical values?', answer: 'Each week, we share gentle Bible stories that teach character values like kindness, honesty, sharing, and respect. These stories are age-appropriate and focus on universal values. We respect all families\' beliefs and welcome children from all backgrounds.' },
  { question: 'What is your approach to potty training?', answer: 'We support families through the potty training process with patience and consistency. For our toddler program, children don\'t need to be fully potty trained. For preschool and pre-K, we prefer children to be potty trained but will work with families who are in the process.' },
  { question: 'How do you handle different learning paces?', answer: "This is a strength of Montessori education! Children work at their own pace with individualized learning plans. Teachers observe each child and present materials when they're ready. Fast learners can progress quickly, while those needing more time receive additional support." },
  { question: 'Do you prepare children for kindergarten?', answer: 'Yes! Our pre-kindergarten program specifically focuses on school readiness. Children develop academic skills, social-emotional competencies, independence, and the ability to follow routines. Many of our graduates exceed kindergarten expectations.' },
  // Daily Operations
  { question: 'What are your hours of operation?', answer: "We're open Monday through Friday, 7:00 AM to 6:00 PM. We're closed on statutory holidays and for two weeks during the winter holiday season (typically the last week of December and first week of January)." },
  { question: 'What should my child bring daily?', answer: 'Please send: a change of clothes (including underwear and socks), indoor shoes, a water bottle (labeled), any comfort items, and sunscreen/hat in summer. We provide morning and afternoon snacks. If your child has specific dietary needs, please discuss with us.' },
  { question: 'Do you provide meals?', answer: 'We provide morning and afternoon snacks. Parents are responsible for packing a nutritious lunch. We encourage healthy, balanced meals and can provide suggestions. We are a nut-free facility to protect children with allergies.' },
  { question: 'What is your late pick-up policy?', answer: 'Our closing time is 6:00 PM sharp. If you\'re running late, please call us immediately. Late pick-ups incur a fee of $1 per minute after 6:00 PM. Repeated late pick-ups may result in additional consequences as outlined in our parent handbook.' },
  { question: 'How do you communicate with parents?', answer: 'We use multiple channels: daily verbal updates at pick-up, written notes for important information, monthly newsletters, parent-teacher meetings twice a year, and our monthly journal on the website. For urgent matters, we call or email directly.' },
  { question: 'Can I visit during the day?', answer: "Parents are always welcome! However, we recommend calling ahead for drop-in visits so we can ensure it's a good time. Scheduled parent observation sessions allow you to watch your child in action without disruption. We maintain an open-door policy within reason." },
  // Health & Safety
  { question: 'When should I keep my child home?', answer: "Please keep your child home if they have: fever over 100°F (within last 24 hours), vomiting or diarrhea (within last 24 hours), unexplained rash, contagious illness, or severe cold symptoms. Children must be symptom-free for 24 hours before returning." },
  { question: 'What if my child gets sick at daycare?', answer: "We'll call you immediately if your child develops a fever, vomits, or shows signs of illness. You'll need to pick up your child within one hour. We have a comfortable quiet area where ill children can rest until pick-up." },
  { question: 'How do you handle food allergies?', answer: "We take allergies very seriously. We're a nut-free facility. For children with specific allergies, we create individualized care plans, post allergy alerts, and ensure all staff are trained. Parents must provide complete allergy information and emergency medications (like EpiPens)." },
  { question: 'Are staff trained in first aid?', answer: 'Yes! All staff members are certified in Pediatric First Aid and CPR. We maintain current certifications and conduct regular safety drills. We have first aid kits in each classroom and outdoors.' },
  { question: 'What are your emergency procedures?', answer: 'We have comprehensive emergency plans for fire, earthquake, lockdown, and medical emergencies. We conduct monthly fire drills and quarterly earthquake drills. In case of evacuation, our meeting point is clearly marked. Parents will be notified immediately in any emergency.' },
  { question: 'Is your facility licensed?', answer: "Yes, we are a licensed Group Daycare facility regulated by BC's Community Care and Assisted Living Act. We undergo regular inspections and maintain all required standards for health, safety, and programming." },
  { question: 'What is your staff-to-child ratio?', answer: 'We maintain a 1:8 staff-to-child ratio, meeting or exceeding BC licensing requirements. This allows our educators to provide individual attention and support each child\'s development.' },
  // Tuition & Payment (additional)
  { question: 'How much does tuition cost?', answer: 'Our tuition varies by program and schedule. Contact us for detailed rates. Full-time rates range from $1,150-$1,200/month depending on the age group. Part-time options are also available.' },
  { question: 'When is tuition due?', answer: 'Tuition is due on the first of each month. We offer several payment methods including post-dated checks, automatic bank transfers, and e-transfers. Late payments may incur a $25 fee after the 5th of the month.' },
  { question: 'Do you accept government subsidies?', answer: 'Yes! We accept the BC Child Care Fee Reduction Initiative and the Affordable Child Care Benefit. These subsidies can significantly reduce your out-of-pocket costs. We can help you understand and apply for available subsidies.' },
  { question: 'Are there sibling discounts?', answer: 'Yes, we offer a 10% discount on tuition for the second child when two or more siblings are enrolled simultaneously. The discount applies to the lower tuition rate.' },
  { question: 'What payment methods do you accept?', answer: 'We accept post-dated checks, e-transfers (to friendship.care@live.ca), and direct bank transfers. Cash payments are accepted but not encouraged. We do not currently accept credit cards.' },
  { question: 'What if I need to withdraw my child?', answer: "We require one full month's written notice for withdrawal. If less notice is given, you'll be responsible for the full month's tuition. Registration fees are non-refundable. Please refer to your enrollment agreement for complete details." },
  { question: 'Are there additional fees?', answer: 'Tuition includes daily snacks, materials, and regular field trips. Additional costs may include: registration fee ($200 annually), supply fee ($100 annually), special events or field trips with extra costs, and late pick-up fees.' },
  // Parent Involvement
  { question: 'How can I get involved?', answer: 'We welcome parent involvement! Opportunities include: volunteering for special events, sharing your profession or hobby with the class, joining our parent committee, participating in fundraisers, and attending parent education evenings.' },
  { question: 'Do you have parent-teacher conferences?', answer: 'Yes, we hold formal parent-teacher conferences twice a year (fall and spring). However, teachers are always available for informal check-ins at drop-off or pick-up. You can also schedule a meeting anytime if you have concerns or questions.' },
  { question: "Can I celebrate my child's birthday?", answer: "Absolutely! We love celebrating birthdays. You can bring a simple treat (nut-free, please) or we can do a special activity. We also do a special birthday ritual in the Montessori tradition. Please coordinate with your child's teacher in advance." },
];

/** Number of FAQs to show initially - rest expand via "More" */
export const FAQ_INITIAL_COUNT = 7;
