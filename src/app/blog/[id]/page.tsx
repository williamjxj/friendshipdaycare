import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In production, fetch post data from CMS
  return {
    title: 'Blog Post | Friendship Corner Daycare',
    description: 'Read our latest article on early childhood education and parenting.',
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Sample blog post - in production, this would come from a CMS based on params.id
  const post = {
    id: params.id,
    title: 'Montessori Activities You Can Do at Home',
    excerpt: 'Discover simple, hands-on Montessori activities that support your child\'s development.',
    category: 'Montessori',
    author: 'Sarah Chen, Director',
    date: 'December 1, 2025',
    readTime: '5 min read',
    image: '/images/placeholder-blog.jpg',
    content: `
      <p>The Montessori method isn't just for the classroom—many of its principles can be applied at home to support your child's natural development and independence. Here are some simple, practical activities you can do with everyday household items.</p>

      <h2>1. Practical Life Activities</h2>
      <p>These activities help children develop fine motor skills, concentration, and independence.</p>
      
      <h3>Pouring Practice</h3>
      <ul>
        <li><strong>Materials:</strong> Two small pitchers, dried beans or rice</li>
        <li><strong>Activity:</strong> Show your child how to pour from one pitcher to another</li>
        <li><strong>Skills:</strong> Hand-eye coordination, concentration, control of movement</li>
        <li><strong>Tip:</strong> Start with dry materials, then progress to water</li>
      </ul>

      <h3>Transferring with Tools</h3>
      <ul>
        <li><strong>Materials:</strong> Small objects (pom-poms, beans), tongs or tweezers, two bowls</li>
        <li><strong>Activity:</strong> Transfer items from one bowl to another using the tool</li>
        <li><strong>Skills:</strong> Fine motor skills, hand strength, concentration</li>
        <li><strong>Progression:</strong> Start with large tongs, move to smaller tweezers</li>
      </ul>

      <h2>2. Sensorial Activities</h2>
      <p>These activities refine the senses and develop observation skills.</p>

      <h3>Color Sorting</h3>
      <ul>
        <li><strong>Materials:</strong> Colored objects (toys, buttons, blocks), sorting containers</li>
        <li><strong>Activity:</strong> Sort objects by color into matching containers</li>
        <li><strong>Skills:</strong> Visual discrimination, classification, order</li>
      </ul>

      <h3>Texture Matching</h3>
      <ul>
        <li><strong>Materials:</strong> Fabric squares with different textures (smooth, rough, soft, bumpy)</li>
        <li><strong>Activity:</strong> Match pairs by touch, with eyes open or closed</li>
        <li><strong>Skills:</strong> Tactile discrimination, memory, sensory awareness</li>
      </ul>

      <h2>3. Language Development</h2>
      
      <h3>Picture-Object Matching</h3>
      <ul>
        <li><strong>Materials:</strong> Real objects and corresponding pictures</li>
        <li><strong>Activity:</strong> Match the object to its picture</li>
        <li><strong>Skills:</strong> Vocabulary building, visual discrimination, symbolic thinking</li>
        <li><strong>Example:</strong> Apple (real) with apple picture card</li>
      </ul>

      <h3>Sound Games</h3>
      <ul>
        <li><strong>Activity:</strong> "I spy something that starts with /mmm/" (sound, not letter name)</li>
        <li><strong>Skills:</strong> Phonemic awareness, listening skills, vocabulary</li>
        <li><strong>Tip:</strong> Focus on the sound, not the letter name</li>
      </ul>

      <h2>4. Math Foundations</h2>

      <h3>One-to-One Correspondence</h3>
      <ul>
        <li><strong>Materials:</strong> Small objects and containers</li>
        <li><strong>Activity:</strong> Place one object in each container</li>
        <li><strong>Skills:</strong> Counting foundations, number sense</li>
        <li><strong>Real-life:</strong> Set the table (one plate per person)</li>
      </ul>

      <h3>Number Recognition</h3>
      <ul>
        <li><strong>Materials:</strong> Number cards (1-10), small counting objects</li>
        <li><strong>Activity:</strong> Match the correct number of objects to each number card</li>
        <li><strong>Skills:</strong> Number recognition, quantity understanding, counting</li>
      </ul>

      <h2>5. Creating a Prepared Environment</h2>
      
      <p>The Montessori approach emphasizes the importance of the environment. Here's how to prepare your home:</p>

      <h3>Child-Sized Everything</h3>
      <ul>
        <li>Low shelves children can access independently</li>
        <li>Step stool for reaching sinks and counters</li>
        <li>Child-sized furniture when possible</li>
        <li>Accessible hooks for coats and bags</li>
      </ul>

      <h3>Order and Organization</h3>
      <ul>
        <li>Everything has a designated place</li>
        <li>Activities stored on trays for easy transport</li>
        <li>Limited choices (rotate toys/activities)</li>
        <li>Clear containers so children can see contents</li>
      </ul>

      <h3>Independence-Promoting Setup</h3>
      <ul>
        <li>Low hooks for coats</li>
        <li>Accessible snack station</li>
        <li>Child-height mirror</li>
        <li>Easy-to-use cleaning supplies (small broom, dustpan)</li>
      </ul>

      <h2>Key Principles to Remember</h2>

      <ol>
        <li><strong>Follow the Child:</strong> Observe what interests your child and provide related activities</li>
        <li><strong>Demonstrate First:</strong> Show the activity slowly and precisely before letting child try</li>
        <li><strong>Allow Independence:</strong> Resist the urge to help unless asked</li>
        <li><strong>Embrace Mistakes:</strong> Errors are learning opportunities</li>
        <li><strong>Respect the Work:</strong> Don't interrupt when a child is concentrating</li>
        <li><strong>Rotate Activities:</strong> Keep 5-7 activities available, store others away</li>
        <li><strong>Start Simple:</strong> Begin with basic activities and increase complexity gradually</li>
      </ol>

      <h2>Setting Up Activities</h2>

      <p><strong>Use Trays:</strong> Present each activity on a tray with all materials included. This makes it easy for children to carry activities independently and shows them exactly what belongs together.</p>

      <p><strong>Left-to-Right:</strong> Arrange materials from left to right (supports reading readiness).</p>

      <p><strong>Complete Sets:</strong> Ensure all pieces are present and in good condition.</p>

      <p><strong>Real Materials:</strong> Use real items when possible (real dishes, real tools) rather than toys.</p>

      <h2>Final Thoughts</h2>

      <p>Remember, Montessori at home isn't about having expensive materials or a perfect setup. It's about fostering independence, respecting your child's natural development, and providing opportunities for meaningful work.</p>

      <p>Start with one or two activities and build from there. Observe your child's interests and abilities, and adjust accordingly. The goal is not perfection, but progress and joy in learning.</p>

      <p><strong>Ready to get started?</strong> Choose one activity from this list and try it this week. Share your experience with us—we'd love to hear how it goes!</p>
    `
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-grow">
        {/* Breadcrumb */}
        <section className="py-6 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-200">{post.category}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <span className="font-semibold">{post.author}</span>
              </div>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 aspect-video flex items-center justify-center">
              <div className="text-9xl">📚</div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:bg-gradient-to-r prose-headings:from-blue-600 prose-headings:to-purple-600 prose-headings:bg-clip-text prose-headings:text-transparent
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                prose-li:my-2
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Share on Facebook
                </button>
                <button className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  Share on Twitter
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Share via Email
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  SC
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">About {post.author}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Sarah Chen is the Director of Friendship Corner Daycare with over 15 years of experience in early childhood education. She holds a Montessori certification and is passionate about helping families support their children's natural development.
                  </p>
                  <Link href="/team" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Learn more about our team →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Building Independence Through Practical Life Skills', category: 'Montessori' },
                { title: 'Creating a Prepared Environment at Home', category: 'Montessori' },
                { title: 'The Power of Observation in Parenting', category: 'Parenting Tips' }
              ].map((article, index) => (
                <Link key={index} href={`/blog/${index + 2}`}>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Learn More About Montessori Education?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a tour to see our Montessori classroom in action
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enrollment" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Schedule a Tour
              </Link>
              <Link 
                href="/programs" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Programs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
