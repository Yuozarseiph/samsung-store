'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import blogs from '@/data/blogs.json'
import { Search, Filter, X, BookOpen, Calendar } from 'lucide-react'

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))]

  const filtered = useMemo(() => {
    let result = [...blogs]
    if (category !== 'All') {
      result = result.filter(b => b.category === category)
    }
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter(b => {
        const titleMatch = b.title?.toLowerCase().includes(term)
        const excerptMatch = b.excerpt?.toLowerCase().includes(term)
        const categoryMatch = b.category?.toLowerCase().includes(term)
        const authorMatch = b.author?.toLowerCase().includes(term)
        const tagsMatch = b.tags?.some(tag => tag.toLowerCase().includes(term))
        return titleMatch || excerptMatch || categoryMatch || authorMatch || tagsMatch
      })
    }
    // Sort by date (newest first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [search, category])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Our Blog
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Insights, tips, and news from the Galaxy universe
          </p>
        </motion.div>

        {/* Search & Filter Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          <div className={`mt-4 sm:mt-6 transition-all ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat)
                    if (window.innerWidth < 640) {
                      setShowFilters(false)
                    }
                  }}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all ${
                    category === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:shadow-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600 px-1">
          <p>
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'article' : 'articles'}
            {category !== 'All' && (
              <span> in <span className="font-semibold text-blue-600">{category}</span></span>
            )}
            {search && (
              <span> matching "<span className="font-semibold text-purple-600">{search}</span>"</span>
            )}
          </p>
        </div>

        {/* Blog Grid - Simple and Working */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filtered.map((blog, index) => (
              <motion.div
                key={`${blog.slug}-${category}-${search}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 lg:py-20"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 px-4">No articles found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
              {search && category !== 'All'
                ? `No articles found in "${category}" matching "${search}"`
                : search
                ? `No articles found matching "${search}"`
                : `No articles found in "${category}"`}
            </p>
            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
                setShowFilters(false)
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Featured Section (Optional) */}
        {category === 'All' && !search && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Latest Updates
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Stay up to date with the latest news, reviews, and tips from the Samsung Galaxy ecosystem. 
              Our team of experts brings you in-depth analysis and practical guides to help you get the 
              most out of your devices.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
