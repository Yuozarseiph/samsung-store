'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, ShieldCheck, Truck, CreditCard } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600' },
  ]

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Phones', href: '/products?category=Phones' },
        { label: 'Tablets', href: '/products?category=Tablets' },
        { label: 'Wearables', href: '/products?category=Wearables' },
        { label: 'Laptops', href: '/products?category=Laptops' },
        { label: 'Accessories', href: '/products?category=Accessories' },
      ]
    },
    {
      title: 'Account',
      links: [
        { label: 'My Profile', href: '/profile' },
        { label: 'My Orders', href: '/profile' },
        { label: 'Warranty Center', href: '/warranty' },
        { label: 'Wishlist', href: '/profile' },
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Track Order', href: '/profile' },
        { label: 'Service Centers', href: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ]
    }
  ]

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <Package className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Samsung Store
                </h3>
                <p className="text-xs text-gray-500">Premium Galaxy Experience</p>
              </div>
            </Link>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Your trusted destination for premium Samsung Galaxy devices and accessories. Experience innovation at its finest.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 ${social.color} transition-all shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (i + 1) }}
            >
              <h4 className="font-bold text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.05 }}
                  >
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-200"
        >
          {[
            { icon: Truck, text: 'Free Shipping', subtext: 'On orders over $50' },
            { icon: ShieldCheck, text: 'Secure Payment', subtext: '100% protected' },
            { icon: Package, text: '2 Year Warranty', subtext: 'On all products' },
            { icon: CreditCard, text: 'Easy Returns', subtext: '30-day policy' },
          ].map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{badge.text}</p>
                  <p className="text-xs text-gray-500">{badge.subtext}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for exclusive deals and updates</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-600 flex items-center gap-2">
            © {new Date().getFullYear()} Samsung Store. Made with 
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            using Next.js & Framer Motion
          </p>
          
          <div className="flex gap-6 text-sm text-gray-600">
            {['Privacy Policy', 'Terms of Service', 'Cookies Policy'].map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -2 }}
                className="hover:text-blue-600 transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Visit Us', text: '123 Galaxy Street, Tech City, TC 12345' },
              { icon: Phone, title: 'Call Us', text: '+1 (555) 123-4567' },
              { icon: Mail, title: 'Email Us', text: 'support@samsungstore.com' },
            ].map((contact, i) => {
              const Icon = contact.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{contact.title}</p>
                    <p className="text-sm text-gray-600">{contact.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
