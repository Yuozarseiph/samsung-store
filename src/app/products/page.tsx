'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import products from '@/data/products.json'
import { Search, Filter, X, Layers } from 'lucide-react'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = useMemo(() => {
    let result = [...products] // کپی آرایه
    
    // فیلتر بر اساس دسته‌بندی
    if (category !== 'All') {
      result = result.filter(p => p.category === category)
    }
    
    // فیلتر بر اساس جستجو
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter(p => {
        const nameMatch = p.name?.toLowerCase().includes(term)
        const categoryMatch = p.category?.toLowerCase().includes(term)
        const descMatch = p.description?.toLowerCase().includes(term)
        return nameMatch || categoryMatch || descMatch
      })
    }
    
    return result
  }, [search, category])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-4 shadow-lg"
          >
            <Layers className="w-4 h-4" />
            Complete Collection
          </motion.div>
          
          <h1 className="text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Products
            </span>
          </h1>
          <p className="text-xl text-gray-600">Discover our complete collection of Galaxy devices</p>
        </motion.div>
        
        {/* Search & Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          <div className="flex-1 relative">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400 shadow-lg"
              />
              {search && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              )}
            </motion.div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all shadow-lg ${
                  category === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                    : 'bg-white/80 backdrop-blur-xl text-gray-700 border border-gray-200 hover:border-blue-500'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          key={`results-${filtered.length}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
            {category !== 'All' && (
              <span className="ml-2 text-blue-600 font-semibold">
                in {category}
              </span>
            )}
            {search && (
              <span className="ml-2 text-purple-600 font-semibold">
                matching "{search}"
              </span>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <motion.div 
            key={`grid-${category}-${search}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
            >
              <Search className="w-16 h-16 text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 mb-6">
              {search && category !== 'All' 
                ? `No products found in "${category}" matching "${search}"`
                : search
                ? `No products found matching "${search}"`
                : `No products found in "${category}"`
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSearch(''); setCategory('All') }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              <X className="w-5 h-5" />
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
