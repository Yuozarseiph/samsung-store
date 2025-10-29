'use client'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/navigation'
import products from '@/data/products.json'
import { Sparkles, ShoppingBag, Truck, Shield, Gift, ArrowRight, Zap } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const featured = products.filter(p => p.tag === 'Featured' || p.tag === 'New').slice(0, 4)

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/60 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl"
        >
          
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 bg-[length:200%_200%]"
          />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16 relative z-10">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-6 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                New Arrivals 2025
              </motion.div>

              <motion.h1 
                className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Elevate Your
                </span>
                <br />
                Galaxy Experience
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Discover premium Samsung devices with cutting-edge technology and stunning design.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/products')}
                  className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-blue-500/30 flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 font-bold text-lg border-2 border-gray-200 hover:border-blue-500 transition-colors flex items-center gap-2"
                >
                  Learn More
                  <Zap className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80"
                  alt="Galaxy Devices"
                  className="w-full rounded-3xl shadow-2xl"
                />
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">Handpicked devices just for you</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/products')}
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map(product => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-20 mb-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'from-blue-500 to-cyan-500' },
            { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions', color: 'from-green-500 to-emerald-500' },
            { icon: Gift, title: '2 Year Warranty', desc: 'On all products', color: 'from-pink-500 to-rose-500' }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 text-center">
                  
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-20 blur-2xl -z-10`}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </div>
  )
}
