'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@/utils/formatPrice'
import { AuthService } from '@/utils/auth'
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight,
  Tag, Truck, ShieldCheck, CreditCard, Sparkles, Package,
  Heart, X, AlertCircle, CheckCircle2
} from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [showCouponError, setShowCouponError] = useState(false)

  const validCoupons = [
    { code: 'SAVE10', discount: 0.1, minAmount: 0 },
    { code: 'SAVE20', discount: 0.2, minAmount: 100 },
    { code: 'WELCOME', discount: 0.15, minAmount: 50 },
  ]

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
    setIsAuthenticated(AuthService.isAuthenticated())
  }, [])

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    
    window.dispatchEvent(new Event('storage'))
  }

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return
    const updated = [...cart]
    updated[index].quantity = newQty
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const moveToWishlist = (index: number) => {
    removeItem(index)
  }

  const applyCoupon = () => {
    const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase())
    if (coupon && subtotal >= coupon.minAmount) {
      setAppliedCoupon(coupon)
      setShowCouponError(false)
    } else {
      setShowCouponError(true)
      setTimeout(() => setShowCouponError(false), 3000)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const couponDiscount = appliedCoupon ? subtotal * appliedCoupon.discount : 0
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = (subtotal - couponDiscount) * 0.1
  const total = subtotal - couponDiscount + shipping + tax

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout')
    } else {
      router.push('/checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
          >
            <ShoppingCart className="w-20 h-20 text-gray-400" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your cart is empty
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-10"
          >
            Start shopping to add items to your cart
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/products')}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-blue-500/30"
          >
            <Package className="w-6 h-6" />
            Browse Products
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => router.back()}
            className="mb-6 text-blue-600 hover:text-purple-600 font-semibold flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>

          <div className="flex items-center justify-between">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-4 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Your Selection
              </motion.div>
              
              <h1 className="text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Shopping Cart
                </span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-bold text-gray-900">{cart.length}</span> {cart.length === 1 ? 'item' : 'items'} in your cart
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="relative flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-2xl"
                      />
                      {item.tag && (
                        <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg">
                          {item.tag}
                        </div>
                      )}
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 text-gray-900">{item.name}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            {item.color && (
                              <p className="flex items-center gap-2">
                                <div 
                                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                                  style={{ backgroundColor: item.color === 'Titanium Black' ? '#1a1a1a' : '#6366f1' }}
                                />
                                {item.color}
                              </p>
                            )}
                            {item.storage && <p>Storage: <span className="font-semibold">{item.storage}</span></p>}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => moveToWishlist(index)}
                            className="p-2 rounded-xl text-pink-500 hover:bg-pink-50 transition-colors"
                            title="Move to Wishlist"
                          >
                            <Heart className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(index)}
                            className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="flex items-center gap-3 bg-white rounded-2xl p-2 border-2 border-gray-200 shadow-lg">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="w-10 h-10 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-5 h-5" />
                          </motion.button>
                          
                          <motion.span 
                            key={item.quantity}
                            initial={{ scale: 1.5, color: '#3b82f6' }}
                            animate={{ scale: 1, color: '#111827' }}
                            className="w-12 text-center font-bold text-lg"
                          >
                            {item.quantity}
                          </motion.span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-10 h-10 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-5 h-5" />
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500 line-through mb-1">
                            {formatPrice(item.price * 1.2 * item.quantity)}
                          </p>
                          <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-lg"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                Have a coupon code?
              </h3>
              
              {appliedCoupon ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-bold text-green-900">Coupon Applied!</p>
                      <p className="text-sm text-green-700">
                        {appliedCoupon.code} - {appliedCoupon.discount * 100}% off
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeCoupon}
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-green-600" />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors uppercase"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={applyCoupon}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg"
                    >
                      Apply
                    </motion.button>
                  </div>
                  
                  {showCouponError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Invalid coupon code or minimum amount not met
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <p className="text-xs text-gray-600 w-full">Try these:</p>
                    {validCoupons.map(coupon => (
                      <motion.button
                        key={coupon.code}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCouponCode(coupon.code)
                          setAppliedCoupon(coupon)
                        }}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors"
                      >
                        {coupon.code}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              layout
              className="sticky top-24 bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl space-y-6"
            >
              <h3 className="font-black text-2xl flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                Order Summary
              </h3>
              
              <div className="space-y-4 text-base">
                <motion.div layout className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </motion.div>
                
                {appliedCoupon && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    layout 
                    className="flex justify-between text-green-600"
                  >
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Discount ({appliedCoupon.discount * 100}%)
                    </span>
                    <span className="font-bold">-{formatPrice(couponDiscount)}</span>
                  </motion.div>
                )}
                
                <motion.div layout className="flex justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" />
                        Free
                      </span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </motion.div>
                
                <motion.div layout className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-bold text-gray-900">{formatPrice(tax)}</span>
                </motion.div>
                
                <motion.div layout className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xl">Total</span>
                    <motion.span 
                      key={total}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="font-black text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      {formatPrice(total)}
                    </motion.span>
                  </div>
                </motion.div>
              </div>

              {shipping > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 rounded-2xl border border-blue-200"
                >
                  <p className="text-sm text-blue-700 flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5" />
                    Add <strong className="text-blue-900">{formatPrice(50 - subtotal)}</strong> more for free shipping!
                  </p>
                  <motion.div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(subtotal / 50) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </motion.div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3"
              >
                {isAuthenticated ? (
                  <>
                    <CreditCard className="w-6 h-6" />
                    Proceed to Checkout
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6" />
                    Login to Checkout
                  </>
                )}
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/products')}
                className="w-full py-5 rounded-2xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </motion.button>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs font-bold text-gray-600 mb-4">We Accept:</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: CreditCard, text: 'Cards', color: 'from-gray-400 to-gray-600' },
                    { icon: ShieldCheck, text: 'Secure', color: 'from-green-400 to-emerald-600' },
                    { icon: Truck, text: 'Fast', color: 'from-blue-400 to-blue-600' },
                  ].map((badge, i) => {
                    const Icon = badge.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-lg"
                      >
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-semibold text-gray-600">{badge.text}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
