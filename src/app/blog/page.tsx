'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import blogs from '@/data/blogs.json'
import { Search, Filter, X, Mail, Send, Sparkles, BookOpen } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Helper normalize
  const normalized = (s?: string) => (s || '').toLowerCase().trim()

  // Categories list with trim to avoid hidden spaces
  const categories = ['All', ...Array.from(new Set(blogs.map(b => (b.category || '').trim())))]

  // Filtered blogs with normalized comparisons
  const filteredBlogs = useMemo(() => {
    let result = blogs

    if (selectedCategory !== 'All') {
      const cat = normalized(selectedCategory)
      result = result.filter(b => normalized(b.category) === cat)
    }

    if (searchQuery.trim()) {
      const q = normalized(searchQuery)
      result = result.filter(b => 
        normalized(b.title).includes(q) ||
        normalized(b.excerpt).includes(q) ||
        (b.tags?.some(tag => normalized(tag).includes(q)))
      )
    }

    return result
  }, [selectedCategory, searchQuery])

  // Featured: ثابت بماند و با فیلتر تغییر نکند (طبق خواسته که فقط گرید رفرش شود)
  const featuredBlog = blogs[0]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      
      {/* Hero Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-6 shadow-lg"
          >
            <BookOpen className="w-4 h-4" />
            Latest Articles
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Galaxy Insights
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Stay updated with the latest news, reviews, and tips from the Samsung Galaxy universe.
          </motion.p>
        </motion.div>

        {/* Featured Blog (fixed, does not change on filter) */}
        {featuredBlog && (
          <motion.div
            key={featuredBlog.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="relative bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden mb-16 group"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full overflow-hidden">
                <motion.img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                />
              </div>
              
              <div className="p-8 lg:p-12">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold mb-4 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  Featured
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl lg:text-4xl font-black mb-4 text-gray-900"
                >
                  {featuredBlog.title}
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-600 mb-6 leading-relaxed"
                >
                  {featuredBlog.excerpt}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {featuredBlog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{featuredBlog.author}</p>
                    <p className="text-xs text-gray-500">{featuredBlog.readTime}</p>
                  </div>
                </motion.div>
                
                <motion.a
                  href={`/blog/${featuredBlog.slug}`}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl shadow-blue-500/30"
                >
                  Read Full Article
                  <Send className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Search & Filter */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400 shadow-lg"
            />
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(cat)
                  // اختیاری: پاک‌کردن جستجو هنگام تغییر دسته
                  // setSearchQuery('')
                }}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all shadow-lg ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                    : 'bg-white/80 backdrop-blur-xl text-gray-700 border border-gray-200 hover:border-blue-500'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Grid (only this part re-renders via key) */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16">
        {filteredBlogs.length > 0 ? (
          <>
            <motion.div 
              key={`count-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-gray-600"
            >
              Showing <span className="font-bold text-gray-900">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </motion.div>

            <motion.div 
              key={`grid-${selectedCategory}-${searchQuery}`} // force re-render of grid per filter
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBlogs.map((blog) => (
                <motion.div key={blog.slug} variants={itemVariants}>
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
            >
              <Search className="w-16 h-16 text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              <X className="w-5 h-5" />
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-[3rem] p-12 text-center text-white shadow-2xl overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <motion.div
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center"
            >
              <Mail className="w-10 h-10" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black mb-4"
            >
              Never Miss an Update
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg mb-8 opacity-90 max-w-xl mx-auto"
            >
              Subscribe to our newsletter for the latest Galaxy news, exclusive content, and special offers.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Subscribe
              </motion.button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs mt-4 opacity-75"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
