import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Policies & Procedures | Friendship Corner Daycare',
  description: 'Important policies and procedures for families at Friendship Corner Daycare including health, safety, tuition, and operational guidelines.',
};

export default function PoliciesPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Policies & Procedures
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Important guidelines and policies for families at Friendship Corner Daycare
            </p>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Last Updated:</strong> December 2025 | These policies ensure the health, safety, and well-being of all children in our care.
              </p>
            </div>
          </div>
        </section>

        {/* Policies Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Health & Safety */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">🏥</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Health & Safety Policies
                </span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Illness Policy</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    To protect all children and staff, please keep your child home if they exhibit any of the following symptoms:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Fever of 100°F (37.8°C) or higher within the last 24 hours</li>
                    <li>Vomiting or diarrhea within the last 24 hours</li>
                    <li>Unexplained rash</li>
                    <li>Contagious illness (pink eye, hand-foot-mouth, etc.)</li>
                    <li>Severe cold symptoms that prevent participation in activities</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">
                    <strong>Return Policy:</strong> Children must be symptom-free for 24 hours without medication before returning to care.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Immunization Requirements</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    All children must provide up-to-date immunization records as required by BC health regulations.
                    We will request updated records annually or when new immunizations are due.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Medication Administration</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    We can administer prescription medications with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Completed medication authorization form signed by parent</li>
                    <li>Medication in original pharmacy-labeled container</li>
                    <li>Clear written instructions from physician</li>
                    <li>Current expiration date</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">
                    Over-the-counter medications require a physician's note and parent authorization.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Emergency Procedures</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    In case of medical emergency, we will call 911 immediately and then contact parents.
                    All staff are trained in pediatric first aid and CPR. We conduct monthly fire drills and quarterly earthquake drills.
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance & Operations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">⏰</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Attendance & Operations
                </span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Hours of Operation</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Regular Hours:</strong> Monday - Friday, 7:30 AM - 5:30 PM<br />
                    <strong>Closed:</strong> Statutory holidays and two weeks in December/January
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Drop-off & Pick-up</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Parents must sign children in and out daily</li>
                    <li>Children will only be released to authorized individuals listed on enrollment form</li>
                    <li>Photo ID required for any unfamiliar pick-up person</li>
                    <li>Notify staff in advance of any pick-up changes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Late Pick-up Policy</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Closing time is 5:30 PM sharp.</strong> Late pick-ups incur a fee of $1.00 per minute after 5:30 PM.
                    Please call immediately if you're running late. Repeated late pick-ups may result in termination of care.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Absence Notification</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Please notify us by 9:00 AM if your child will be absent. This helps us plan activities and meals appropriately.
                  </p>
                </div>
              </div>
            </div>

            {/* Tuition & Payment */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">💰</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tuition & Payment Policies
                </span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Payment Schedule</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Tuition is due on the 1st of each month</li>
                    <li>Late fee of $25 applies after the 5th of the month</li>
                    <li>Payment reserves your child's spot regardless of attendance</li>
                    <li>No refunds for absences, holidays, or closures</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Accepted Payment Methods</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Post-dated checks (preferred)</li>
                    <li>E-transfer to friendship.care@live.ca</li>
                    <li>Direct bank transfer</li>
                    <li>Cash (not encouraged)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Withdrawal Policy</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    One full month's written notice is required for withdrawal. If less notice is given,
                    you are responsible for the full month's tuition. Registration fees are non-refundable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Additional Fees</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Annual registration fee: $200 (non-refundable)</li>
                    <li>Annual supply fee: $100</li>
                    <li>Special field trips may incur additional costs (optional)</li>
                    <li>Late pick-up: $1.00 per minute after 5:30 PM</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Behavior Guidance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">💙</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Behavior Guidance Policy
                </span>
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We use positive guidance techniques to help children develop self-control and respect for others.
                  Our approach is based on Montessori principles and age-appropriate expectations.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Our Approach:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Redirect inappropriate behavior to positive alternatives</li>
                  <li>Use natural and logical consequences</li>
                  <li>Teach problem-solving and conflict resolution skills</li>
                  <li>Model and reinforce positive social behaviors</li>
                  <li>Maintain consistent, fair expectations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Prohibited Practices:</h3>
                <p>We never use physical punishment, shaming, or humiliation. If challenging behaviors persist, we will work with families to develop an individualized support plan.</p>
              </div>
            </div>

            {/* Parent Communication */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">📞</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Parent Communication
                </span>
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Open communication between families and staff is essential. We use multiple channels:</p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Daily:</strong> Brief verbal updates at pick-up</li>
                  <li><strong>Weekly:</strong> Classroom newsletters</li>
                  <li><strong>Monthly:</strong> Center newsletter and journal (on website)</li>
                  <li><strong>Bi-annually:</strong> Formal parent-teacher conferences</li>
                  <li><strong>As needed:</strong> Phone calls or emails for urgent matters</li>
                </ul>

                <p className="mt-4">
                  <strong>Concerns or Questions:</strong> Please speak with your child's teacher first.
                  If concerns remain, contact the director. We're committed to addressing all issues promptly and professionally.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions About Our Policies?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We're happy to discuss any of our policies in detail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </section>

        {/* Download Handbook */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold mb-4">Complete Parent Handbook</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Download our comprehensive parent handbook for detailed information on all policies and procedures
            </p>
            <Link
              href="/resources"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Resources
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
