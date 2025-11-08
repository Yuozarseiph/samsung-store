'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Scale, FileText, ShieldCheck, CreditCard,
  Truck, HelpCircle, ArrowRight
} from 'lucide-react'

type TocId =
  | 'agreement'
  | 'accounts'
  | 'orders'
  | 'shipping'
  | 'returns'
  | 'liability'
  | 'support'

const toc: { id: TocId; title: string }[] = [
  { id: 'agreement', title: 'Agreement' },
  { id: 'accounts', title: 'Accounts' },
  { id: 'orders', title: 'Orders & Payments' },
  { id: 'shipping', title: 'Shipping & Delivery' },
  { id: 'returns', title: 'Returns & Warranty' },
  { id: 'liability', title: 'Liability' },
  { id: 'support', title: 'Support' },
]

const content: Record<TocId, { icon: any; bullets: string[] }> = {
  agreement: {
    icon: FileText,
    bullets: [
      'Using our services constitutes acceptance of these terms.',
      'We may update the terms; continued use means acceptance.',
      'You must be at least 18 years old to make purchases.',
    ],
  },
  accounts: {
    icon: ShieldCheck,
    bullets: [
      'Keep your account credentials secure and up to date.',
      'You are responsible for activities under your account.',
      'Notify us immediately of any unauthorized access.',
    ],
  },
  orders: {
    icon: CreditCard,
    bullets: [
      'Prices and availability are subject to change.',
      'Payment methods include cards and PayPal; all transactions are secure.',
      'Order confirmation will be sent via email.',
    ],
  },
  shipping: {
    icon: Truck,
    bullets: [
      'We ship worldwide with tracking for all orders.',
      'Delivery estimates are not guaranteed due to carrier conditions.',
      'You will receive tracking information once shipped.',
    ],
  },
  returns: {
    icon: Scale,
    bullets: [
      '30-day return window; items must be in original condition.',
      'Warranty claims handled via authorized service centers.',
      'Return shipping costs may apply based on the reason.',
    ],
  },
  liability: {
    icon: Scale,
    bullets: [
      'We are not liable for indirect or consequential damages.',
      'Our total liability shall not exceed the amount paid for the order.',
      'Force majeure events are excluded from liability.',
    ],
  },
  support: {
    icon: HelpCircle,
    bullets: [
      'For assistance, contact support@samsungstore.com.',
      'We aim to respond within 1-2 business days.',
      'Live chat support available during business hours.',
    ],
  },
}

export default function TermsPage() {
  const [active, setActive] = useState<TocId>('agreement')

  const handleScrollTo = (id: TocId) => {
    setActive(id)
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 120
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = toc.map(t => t.id)
      const scrollPosition = window.pageYOffset + 200

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActive(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
            <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Please read these terms carefully before using our services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* TOC Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 px-3">TABLE OF CONTENTS</h3>
              {toc.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleScrollTo(t.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all flex items-center justify-between group ${
                    active === t.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <span>{t.title}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${
                    active === t.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8 sm:space-y-12">
            {toc.map((t, i) => {
              const Icon = content[t.id].icon
              return (
                <motion.section
                  key={t.id}
                  id={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 scroll-mt-32"
                >
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {t.title}
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {content[t.id].bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-3 sm:gap-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs sm:text-sm font-bold text-blue-600">{idx + 1}</span>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed flex-1">
                          {b}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )
            })}
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl text-center"
        >
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
            These terms apply to our website and related services worldwide. Region-specific notices may apply.
            Last updated: January 2025.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
