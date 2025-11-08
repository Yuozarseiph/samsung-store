'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import products from '@/data/products.json'
import { formatPrice } from '@/utils/formatPrice'
import {
  ArrowLeft, ShoppingCart, Heart, Share2, Check,
  Truck, Shield, RotateCcw, Star,
  Sparkles
} from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const product = products.find(p => p.id === id)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (product?.colors?.[0]) setSelectedColor(product.colors[0])
    if (product?.storage?.[0]) setSelectedStorage(product.storage[0])
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 pt-20 px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = {
      ...product,
      selectedColor,
      selectedStorage,
      quantity: 1
    }
    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  const features = [
    { icon: Truck, text: 'Free shipping on orders over $50' },
    { icon: Shield, text: '2-year warranty included' },
    { icon: RotateCcw, text: '30-day return policy' },
  ]

  const specs = product.specs || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="aspect-square bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-12">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all ${
                    isFavorite
                      ? 'bg-red-50 border-red-500 text-red-600'
                      : 'border-gray-300 hover:border-red-500 text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline text-sm sm:text-base font-medium">
                    {isFavorite ? 'Favorited' : 'Favorite'}
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:border-blue-500 text-gray-700 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm sm:text-base font-medium">Share</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Color: <span className="text-blue-600">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selection */}
            {product.storage && product.storage.length > 0 && (
              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Storage: <span className="text-purple-600">{selectedStorage}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.storage.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all ${
                        selectedStorage === storage
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-500'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all shadow-lg ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-[1.02]'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">
                      {feature.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Specifications */}
            {Object.keys(specs).length > 0 && (
              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Specifications
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {Object.entries(specs).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all gap-2 sm:gap-4"
                    >
                      <span className="text-sm sm:text-base font-semibold text-gray-900">
                        {key}
                      </span>
                      <span className="text-sm sm:text-base text-gray-600 sm:text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
