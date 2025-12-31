import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog & Parenting Tips | Friendship Corner Daycare',
  description: 'Expert advice on early childhood education, Montessori activities, parenting tips, and child development from Friendship Corner Daycare.',
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  // Sample blog posts - in production, this would come from a CMS
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Montessori Activities You Can Do at Home',
      excerpt: 'Discover simple, hands-on Montessori activities that support your child\'s development and can be done with everyday household items.',
      category: 'Montessori',
      author: 'Sarah Chen, Director',
      date: 'December 1, 2025',
      readTime: '5 min read',
      image: '/images/placeholder-blog.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'Managing Separation Anxiety: A Guide for Parents',
      excerpt: 'Learn practical strategies to help your child adjust to daycare and overcome separation anxiety with confidence.',
      category: 'Parenting Tips',
      author: 'Emily Rodriguez, Lead Teacher',
      date: 'November 28, 2025',
      readTime: '7 min read',
      image: '/images/placeholder-blog.jpg'
    },
    {
      id: '3',
      title: 'The Importance of Outdoor Play in Early Childhood',
      excerpt: 'Why unstructured outdoor play is essential for physical, cognitive, and social-emotional development.',
      category: 'Child Development',
      author: 'Michael Thompson, Educator',
      date: 'November 25, 2025',
      readTime: '6 min read',
      image: '/images/placeholder-blog.jpg'
    },
    {
      id: '4',
      title: 'Healthy Lunchbox Ideas for Picky Eaters',
      excerpt: 'Creative and nutritious lunch ideas that even the pickiest eaters will enjoy, plus tips for introducing new foods.',
      category: 'Nutrition',
      author: 'Lisa Park, Nutrition Consultant',
      date: 'November 20, 2025',
      readTime: '4 min read',
      image: '/images/placeholder-blog.jpg'
    },
    {
      id: '5',
      title: 'Building Independence Through Practical Life Skills',
      excerpt: 'How to teach your child self-care skills and foster independence using the Montessori approach.',
      category: 'Montessori',
      author: 'Sarah Chen, Director',
      date: 'November 15, 2025',
      readTime: '5 min read',
      image: '/images/placeholder-blog.jpg'
    },
    {
      id: '6',
      title: 'Understanding Your Child\'s Emotional Development',
      excerpt: 'A guide to emotional milestones in early childhood and how to support your child\'s social-emotional growth.',
      category: 'Child Development',
      author: 'Emily Rodriguez, Lead Teacher',
      date: 'November 10, 2025',
      readTime: '8 min read',
      image: '/images/placeholder-blog.jpg'
    }
  ];

  const categories = ['All', 'Montessori', 'Parenting Tips', 'Child Development', 'Nutrition', 'Activities'];
  
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog & Parenting Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Expert advice on early childhood education, Montessori learning, and parenting tips
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 px-4 bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    category === 'All'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Article
              </h2>
              <Link href={`/blog/${featuredPost.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl">📚</div>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                          {featuredPost.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                          Read Article
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group">
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">
                          {post.category === 'Montessori' && '🎨'}
                          {post.category === 'Parenting Tips' && '👨‍👩‍👧'}
                          {post.category === 'Child Development' && '🌱'}
                          {post.category === 'Nutrition' && '🥗'}
                          {post.category === 'Activities' && '🎯'}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Parenting Tips in Your Inbox
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter for weekly articles, activity ideas, and expert advice
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-white outline-none"
              />
              <button 
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-blue-100 text-sm mt-4">
              Join 500+ parents receiving our tips. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Popular Topics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { topic: 'Montessori at Home', icon: '🏠', count: 12 },
                { topic: 'School Readiness', icon: '🎓', count: 8 },
                { topic: 'Positive Discipline', icon: '💙', count: 10 },
                { topic: 'Healthy Eating', icon: '🥗', count: 6 }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={`/blog?topic=${encodeURIComponent(item.topic)}`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.topic}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.count} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
