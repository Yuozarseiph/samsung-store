'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AuthService } from '@/utils/auth'
import { formatPrice } from '@/utils/formatPrice'
import orders from '@/data/orders.json'
import { 
  User, Mail, Phone, MapPin, Edit, Save, X, LogOut, 
  Package, Clock, CheckCircle2, Truck, ShieldCheck, 
  Heart, Settings, Bell, CreditCard, Eye
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userOrders, setUserOrders] = useState<any[]>([])
  const [editing, setEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    setUser(currentUser)
    setFormData({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address?.street || ''
    })

    const filteredOrders = orders.filter(o => o.userId === currentUser.id)
    setUserOrders(filteredOrders)
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/login')
  }

  const handleSaveProfile = () => {
    const updatedUser = AuthService.updateProfile(formData)
    if (updatedUser) {
      setUser(updatedUser)
      setEditing(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: any = {
      'delivered': 'from-green-500 to-emerald-500',
      'shipped': 'from-blue-500 to-cyan-500',
      'processing': 'from-yellow-500 to-orange-500',
      'cancelled': 'from-red-500 to-rose-500'
    }
    return colors[status] || 'from-gray-500 to-gray-600'
  }

  const getStatusIcon = (status: string) => {
    const icons: any = {
      'delivered': CheckCircle2,
      'shipped': Truck,
      'processing': Clock,
      'cancelled': X
    }
    return icons[status] || Package
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
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Account
                </span>
              </h1>
              <p className="text-gray-600">Manage your profile and orders</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-lg sticky top-24">
              
              <div className="text-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.firstName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
                  )}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </motion.button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Package, label: 'Total Orders', value: userOrders.length, color: 'from-blue-500 to-cyan-500' },
                    { icon: CheckCircle2, label: 'Completed', value: userOrders.filter(o => o.status === 'delivered').length, color: 'from-green-500 to-emerald-500' },
                    { icon: Truck, label: 'In Transit', value: userOrders.filter(o => o.status === 'shipped').length, color: 'from-purple-500 to-pink-500' },
                  ].map((stat, i) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                      <User className="w-6 h-6 text-blue-600" />
                      Profile Information
                    </h2>
                    {!editing ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </motion.button>
                    ) : (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 font-semibold transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditing(false)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {editing ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[
                        { icon: User, label: 'Name', value: `${user.firstName} ${user.lastName}` },
                        { icon: Mail, label: 'Email', value: user.email },
                        { icon: Phone, label: 'Phone', value: user.phone || 'Not provided' },
                        { icon: MapPin, label: 'Address', value: user.address?.street || 'Not provided' },
                      ].map((field, i) => {
                        const Icon = field.icon
                        return (
                          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 font-semibold">{field.label}</p>
                              <p className="text-sm font-semibold text-gray-900">{field.value}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  My Orders ({userOrders.length})
                </h2>

                <div className="space-y-4">
                  {userOrders.length > 0 ? (
                    userOrders.map((order, i) => {
                      const StatusIcon = getStatusIcon(order.status)
                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -3 }}
                          className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-xs text-gray-500 font-semibold mb-1">Order #{order.orderNumber}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getStatusColor(order.status)} text-white font-bold text-sm flex items-center gap-2 shadow-lg`}>
                              <StatusIcon className="w-4 h-4" />
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            {order.items.map((item: any, j: number) => (
                              <img
                                key={j}
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-xl"
                              />
                            ))}
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">
                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                              </p>
                              <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => router.push(`/warranty`)}
                              className="flex-1 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </motion.button>
                            {order.status === 'delivered' && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push('/warranty')}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
                              >
                                <ShieldCheck className="w-4 h-4" />
                                View Warranty
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/products')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg"
                      >
                        Browse Products
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-lg text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-pink-100 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-600">Save your favorite items here</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-blue-600" />
                  Account Settings
                </h2>

                <div className="space-y-4">
                  {[
                    { icon: Bell, label: 'Notifications', description: 'Manage your notification preferences' },
                    { icon: ShieldCheck, label: 'Privacy & Security', description: 'Update your security settings' },
                    { icon: CreditCard, label: 'Payment Methods', description: 'Manage saved payment methods' },
                  ].map((setting, i) => {
                    const Icon = setting.icon
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{setting.label}</p>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
