'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AuthService } from '@/utils/auth'
import { formatPrice } from '@/utils/formatPrice'
import orders from '@/data/orders.json'
import { 
  ShieldCheck, Calendar, Package, FileText, Download, 
  CheckCircle2, AlertCircle, Clock, ArrowLeft, Search,
  Phone, Mail, MapPin, Printer, Share2, X
} from 'lucide-react'

export default function WarrantyPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userOrders, setUserOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [searchSerial, setSearchSerial] = useState('')

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    setUser(currentUser)
    const filteredOrders = orders.filter(o => o.userId === currentUser.id && o.status === 'delivered')
    setUserOrders(filteredOrders)
    
    if (filteredOrders.length > 0) {
      setSelectedOrder(filteredOrders[0])
    }
  }, [router])

  const handleSearchSerial = () => {
    const found = userOrders.find(o => o.warranty?.serialNumber === searchSerial)
    if (found) {
      setSelectedOrder(found)
    }
  }

  const getWarrantyStatus = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysLeft > 365) return { status: 'active', color: 'from-green-500 to-emerald-500', text: 'Active' }
    if (daysLeft > 90) return { status: 'active', color: 'from-blue-500 to-cyan-500', text: 'Active' }
    if (daysLeft > 0) return { status: 'expiring', color: 'from-yellow-500 to-orange-500', text: 'Expiring Soon' }
    return { status: 'expired', color: 'from-red-500 to-rose-500', text: 'Expired' }
  }

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
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
          <button
            onClick={() => router.back()}
            className="mb-6 text-blue-600 hover:text-purple-600 font-semibold flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center justify-between">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold mb-4 shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                Protected
              </motion.div>
              
              <h1 className="text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Warranty Center
                </span>
              </h1>
              <p className="text-gray-600">Manage and view your product warranties</p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-lg flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchSerial}
                onChange={(e) => setSearchSerial(e.target.value)}
                placeholder="Search by serial number..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearchSerial}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg"
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {userOrders.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Warranty List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-lg">
                <h2 className="text-xl font-black mb-6">My Products ({userOrders.length})</h2>
                
                <div className="space-y-3">
                  {userOrders.map((order, i) => {
                    const warranty = getWarrantyStatus(order.warranty?.expiresAt)
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedOrder(order)}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          selectedOrder?.id === order.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm truncate ${
                              selectedOrder?.id === order.id ? 'text-white' : 'text-gray-900'
                            }`}>
                              {order.items[0].name}
                            </p>
                            <p className={`text-xs ${
                              selectedOrder?.id === order.id ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {order.warranty?.type}
                            </p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            warranty.status === 'active' ? 'bg-green-500' : 
                            warranty.status === 'expiring' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Warranty Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              {selectedOrder && (
                <div className="space-y-6">
                  
                  {/* Warranty Card */}
                  <div className="bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/40 shadow-2xl">
                    {/* Header with Gradient */}
                    <div className={`bg-gradient-to-r ${getWarrantyStatus(selectedOrder.warranty.expiresAt).color} p-8 text-white relative overflow-hidden`}>
                      <motion.div
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                          backgroundSize: '50px 50px'
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <ShieldCheck className="w-8 h-8" />
                              <h2 className="text-3xl font-black">Warranty Certificate</h2>
                            </div>
                            <p className="text-white/90">Samsung Official Warranty</p>
                          </div>
                          <div className="text-right">
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-sm">
                              {getWarrantyStatus(selectedOrder.warranty.expiresAt).text}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/70 text-xs mb-1">Serial Number</p>
                            <p className="font-mono font-bold text-lg">{selectedOrder.warranty.serialNumber}</p>
                          </div>
                          <div>
                            <p className="text-white/70 text-xs mb-1">Order Number</p>
                            <p className="font-mono font-bold text-lg">{selectedOrder.orderNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                      {/* Product Info */}
                      <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
                        <img
                          src={selectedOrder.items[0].image}
                          alt={selectedOrder.items[0].name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-gray-900 mb-1">
                            {selectedOrder.items[0].name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {selectedOrder.items[0].color && (
                              <span>Color: {selectedOrder.items[0].color}</span>
                            )}
                            {selectedOrder.items[0].storage && (
                              <span>Storage: {selectedOrder.items[0].storage}</span>
                            )}
                          </div>
                          <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                            {formatPrice(selectedOrder.items[0].price)}
                          </p>
                        </div>
                      </div>

                      {/* Warranty Details Grid */}
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {[
                          { 
                            icon: Calendar, 
                            label: 'Purchase Date', 
                            value: new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            }),
                            color: 'from-blue-500 to-cyan-500'
                          },
                          { 
                            icon: Calendar, 
                            label: 'Warranty Expires', 
                            value: new Date(selectedOrder.warranty.expiresAt).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            }),
                            color: 'from-purple-500 to-pink-500'
                          },
                          { 
                            icon: Clock, 
                            label: 'Days Remaining', 
                            value: `${getDaysRemaining(selectedOrder.warranty.expiresAt)} days`,
                            color: 'from-green-500 to-emerald-500'
                          },
                          { 
                            icon: ShieldCheck, 
                            label: 'Warranty Type', 
                            value: selectedOrder.warranty.type,
                            color: 'from-orange-500 to-red-500'
                          },
                        ].map((detail, i) => {
                          const Icon = detail.icon
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="p-4 bg-gray-50 rounded-xl"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${detail.color} flex items-center justify-center shadow-lg`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs font-semibold text-gray-600">{detail.label}</p>
                              </div>
                              <p className="text-lg font-bold text-gray-900 ml-13">{detail.value}</p>
                            </motion.div>
                          )
                        })}
                      </div>

                      {/* Coverage */}
                      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 mb-8">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          Warranty Coverage
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {[
                            'Manufacturing defects',
                            'Hardware malfunctions',
                            'Battery replacement (if capacity drops below 80%)',
                            'Free repairs at authorized service centers',
                            'Genuine Samsung parts replacement',
                            '24/7 customer support'
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          Download Certificate
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="py-4 px-6 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 font-semibold transition-colors flex items-center gap-2"
                        >
                          <Printer className="w-5 h-5" />
                          Print
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="py-4 px-6 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 font-semibold transition-colors flex items-center gap-2"
                        >
                          <Share2 className="w-5 h-5" />
                          Share
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Customer Support */}
                  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-lg">
                    <h3 className="text-2xl font-black mb-6">Need Help?</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { icon: Phone, label: 'Call Support', value: '1-800-SAMSUNG', color: 'from-green-500 to-emerald-500' },
                        { icon: Mail, label: 'Email Us', value: 'support@samsung.com', color: 'from-blue-500 to-cyan-500' },
                        { icon: MapPin, label: 'Service Centers', value: 'Find Nearby', color: 'from-purple-500 to-pink-500' },
                      ].map((contact, i) => {
                        const Icon = contact.icon
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-6 bg-gray-50 rounded-2xl text-center cursor-pointer hover:shadow-lg transition-all"
                          >
                            <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg`}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <p className="font-bold text-gray-900 mb-1">{contact.label}</p>
                            <p className="text-sm text-gray-600">{contact.value}</p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <ShieldCheck className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">No Warranties Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You don't have any active warranties yet. Warranties are automatically registered when you purchase eligible products.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/products')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl"
            >
              <Package className="w-5 h-5" />
              Browse Products
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
