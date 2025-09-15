'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Calendar, Clock, ArrowRight, BookOpen, Tag, User } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Building Modern Web Applications with Next.js 14',
    excerpt: 'Explore the latest features in Next.js 14 and how they can improve your web development workflow and application performance.',
    content: 'Full article content here...',
    author: 'Faraz Ahmed Khan',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript'],
  image: '/assets/blog-1.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of 3D Web Design',
    excerpt: 'Learn how to integrate stunning 3D elements into your web projects using Three.js and React Three Fiber.',
    content: 'Full article content here...',
    author: 'Faraz Ahmed Khan',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Design',
    tags: ['Three.js', '3D', 'WebGL'],
  image: '/assets/blog-2.jpg',
    featured: false,
  },
  {
    id: 3,
    title: 'Small Business Digital Transformation',
    excerpt: 'A comprehensive guide to helping small businesses establish their online presence and grow through digital solutions.',
    content: 'Full article content here...',
    author: 'Faraz Ahmed Khan',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Business',
    tags: ['Business', 'Digital Marketing', 'Strategy'],
  image: '/assets/blog-3.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'Advanced Animation Techniques with Framer Motion',
    excerpt: 'Master complex animations and micro-interactions that enhance user experience and engagement.',
    content: 'Full article content here...',
    author: 'Faraz Ahmed Khan',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Development',
    tags: ['Framer Motion', 'Animation', 'UX'],
  image: '/assets/blog-4.jpg',
    featured: true,
  },
  {
    id: 5,
    title: 'TypeScript Best Practices in 2024',
    excerpt: 'Essential TypeScript patterns and practices that will make your code more maintainable and type-safe.',
    content: 'Full article content here...',
    author: 'Faraz Ahmed Khan',
    date: '2023-12-20',
    readTime: '9 min read',
    category: 'Development',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
  image: '/assets/blog-5.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'Building Responsive Layouts with CSS Grid',
    excerpt: 'Master CSS Grid to create complex, responsive layouts that work beautifully across all devices.',
    content: 'Full article content here...',
    author: 'Faraz Ahmed Khan',
    date: '2023-12-15',
    readTime: '5 min read',
    category: 'CSS',
    tags: ['CSS Grid', 'Responsive Design', 'CSS'],
  image: '/assets/blog-6.jpg',
    featured: false,
  },
]

const categories = ['All', 'Web Development', 'Design', 'Business', 'Development', 'CSS']

function BlogCard({ post, index }: { post: any; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl glass-effect border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 ${
        post.featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {post.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
          Featured
        </div>
      )}

      {/* Image */}
      <div className={`relative overflow-hidden ${post.featured ? 'h-64' : 'h-48'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

        {/* Post image (downloaded jpg) */}
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            Read More
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            {post.readTime}
          </div>
          <div className="flex items-center gap-2">
            <User size={14} />
            {post.author}
          </div>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-400 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors ${
          post.featured ? 'text-2xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-300 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded flex items-center gap-1"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <motion.button
          whileHover={{ x: 5 }}
          className="text-blue-400 font-medium flex items-center gap-2 hover:text-blue-300 transition-colors"
        >
          Read Full Article
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Latest <span className="gradient-text">Blog Posts</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Insights, tutorials, and thoughts on web development, design, and technology. 
              Stay updated with the latest trends and best practices.
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Tag size={16} />
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Load More / Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              View All Posts
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16"
          >
            <div className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-slate-300 mb-8 text-lg">
                Subscribe to my newsletter and get the latest articles, tutorials, and insights 
                delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-slate-500 text-sm mt-4">
                No spam, unsubscribe anytime. I respect your privacy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}