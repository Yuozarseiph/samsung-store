'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatPrice } from '@/utils/formatPrice'
import { ShoppingCart, Heart, Star } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  tag?: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 shadow-lg hover:shadow-2xl transition-shadow duration-500">
          
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            />
            
            {product.tag && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg"
              >
                <Star className="w-3 h-3 fill-white" />
                {product.tag}
              </motion.div>
            )}
            
            <motion.button
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.preventDefault() }}
              className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <Heart className="w-5 h-5 text-pink-500" />
            </motion.button>
          </div>
          
          <div className="p-5">
            <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">
              {product.category}
            </p>
            
            <h3 className="font-bold text-base mb-2 text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => { e.preventDefault() }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
