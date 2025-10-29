'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Home, Package, BookOpen, ShoppingCart, Menu, X, Search,
  User, LogOut, Heart,
  Info as InfoIcon,
  Mail as MailIcon,
  Truck as TruckIcon,
  HelpCircle,
  MapPin as MapIcon,
  Shield as ShieldIcon,
  Scale as ScaleIcon
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { AuthService } from '@/utils/auth'

type NavItem = { href: string; label: string; icon: any }

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/about', label: 'About', icon: InfoIcon },
  { href: '/contact', label: 'Contact', icon: MailIcon },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/service-centers', label: 'Service', icon: MapIcon },
  { href: '/privacy', label: 'Privacy', icon: ShieldIcon },
  { href: '/terms', label: 'Terms', icon: ScaleIcon },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { scrollY } = useScroll()

  const headerBg = useTransform(scrollY, [0, 100], [0, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.length)
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    const handleStorage = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(updatedCart.length)
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [pathname])

  const handleLogout = () => {
    AuthService.logout()
    setUser(null)
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-lg' : ''}`}
      style={{
        backgroundColor: useTransform(headerBg, (v) => `rgba(255, 255, 255, ${v})`),
        backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
            >
              <Package className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Samsung Store
              </span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Premium Galaxy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className="relative group">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-xs flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-blue-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.firstName?.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{user.firstName}</span>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <p className="font-bold">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-white/80">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/profile" onClick={() => setShowUserMenu(false)}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <User className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-gray-700">My Profile</span>
                        </motion.div>
                      </Link>
                      <Link href="/warranty" onClick={() => setShowUserMenu(false)}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors cursor-pointer"
                        >
                          <Heart className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-gray-700">Warranty</span>
                        </motion.div>
                      </Link>
                      <div className="border-t border-gray-200 my-2" />
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden py-4 border-t border-gray-200 max-h-[70vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 mb-4">
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                          : 'hover:bg-blue-50 text-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 origin-left"
        style={{ scaleX: useTransform(scrollY, [0, 1000], [0, 1]) }}
      />
    </motion.header>
  )
}
