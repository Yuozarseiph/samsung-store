'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import products from '@/data/products.json'
import { formatPrice } from '@/utils/formatPrice'
import { 
  ArrowLeft, ShoppingCart, Heart, Share2, Check, Truck, Shield, 
  RotateCcw, ChevronRight, Star, Info, Sparkles, Zap
} from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const product = products.find(p => p.id === id)

  const [selectedColor, setSelectedColor] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (product?.colors?.[0]) setSelectedColor(product.colors[0])
    if (product?.storage?.[0]) setSelectedStorage(product.storage[0])
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Info className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/products')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      storage: selectedStorage,
      quantity: 1
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <motion.button whileHover={{ x: -3 }} onClick={() => router.push('/')} className="hover:text-blue-600">
            Home
          </motion.button>
          <ChevronRight className="w-4 h-4" />
          <motion.button whileHover={{ x: -3 }} onClick={() => router.push('/products')} className="hover:text-blue-600">
            Products
          </motion.button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24 h-fit"
          >
            <div className="relative bg-white/60 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl p-8">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-3xl"
              />
              
              {/* Quick Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgb(255, 245, 245)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Heart className="w-5 h-5 text-pink-500" />
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgb(239, 246, 255)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-blue-500" />
                  Share
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold"
              >
                {product.category}
              </motion.div>
              {product.tag && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold shadow-lg"
                >
                  <Star className="w-3 h-3 fill-white" />
                  {product.tag}
                </motion.div>
              )}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black mb-6 leading-tight"
            >
              {product.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {product.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-baseline gap-4 mb-10"
            >
              <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.price * 1.2)}
              </span>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold rounded-xl shadow-lg"
              >
                Save 20%
              </motion.span>
            </motion.div>

            {product.colors && product.colors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <label className="block text-sm font-bold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 via-blue-500 to-green-500" />
                  Color: <span className="text-blue-600">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, i) => (
                    <motion.button
                      key={color}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                        selectedColor === color
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200'
                      }`}
                    >
                      {selectedColor === color && <Check className="w-4 h-4 inline mr-2" />}
                      {color}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {product.storage && product.storage.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-10"
              >
                <label className="block text-sm font-bold mb-4">
                  Storage: <span className="text-blue-600">{selectedStorage}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.storage.map((storage, i) => (
                    <motion.button
                      key={storage}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                        selectedStorage === storage
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200'
                      }`}
                    >
                      {selectedStorage === storage && <Check className="w-4 h-4 inline mr-2" />}
                      {storage}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart}
                className={`flex-1 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${
                  addedToCart
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/30'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                }`}
              >
                {addedToCart ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Check className="w-6 h-6" />
                    </motion.div>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-pink-500 transition-colors shadow-lg"
              >
                <Heart className="w-6 h-6 text-pink-500" />
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {[
                { icon: Truck, text: 'Free Shipping', color: 'from-blue-500 to-cyan-500' },
                { icon: Shield, text: '2 Year Warranty', color: 'from-green-500 to-emerald-500' },
                { icon: RotateCcw, text: '30 Day Returns', color: 'from-pink-500 to-rose-500' },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="text-center p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg"
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{feature.text}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {product.specs && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-lg"
              >
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Specifications
                </h3>
                <div className="space-y-4">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + i * 0.1 }}
                      className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0"
                    >
                      <span className="font-semibold text-gray-600">{key}</span>
                      <span className="text-right text-gray-900 font-semibold max-w-xs">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
