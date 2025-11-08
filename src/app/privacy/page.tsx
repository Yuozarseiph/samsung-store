'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Eye, Lock, Database, Users, Globe,
  Mail, Cookie, ArrowRight
} from 'lucide-react'

type SectionId =
  | 'collection'
  | 'usage'
  | 'sharing'
  | 'security'
  | 'cookies'
  | 'rights'
  | 'contact'
  | 'updates'

const sections: { id: SectionId; title: string }[] = [
  { id: 'collection', title: 'Information We Collect' },
  { id: 'usage', title: 'How We Use Your Data' },
  { id: 'sharing', title: 'Data Sharing' },
  { id: 'security', title: 'Security Measures' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'contact', title: 'Contact Us' },
  { id: 'updates', title: 'Policy Updates' },
]

const content: Record<SectionId, { icon: any; bullets: string[] }> = {
  collection: {
    icon: Database,
    bullets: [
      'Personal information (name, email, phone) provided during registration',
      'Payment information processed securely through encrypted channels',
      'Device and browsing data for analytics and improvement',
      'Location data if you enable location services',
    ],
  },
  usage: {
    icon: Eye,
    bullets: [
      'Process and fulfill your orders efficiently',
      'Send order confirmations and shipping updates',
      'Improve our products and services based on usage patterns',
      'Personalize your shopping experience',
      'Send promotional emails (you can opt-out anytime)',
    ],
  },
  sharing: {
    icon: Users,
    bullets: [
      'We never sell your personal information to third parties',
      'Shipping partners receive necessary delivery information only',
      'Payment processors handle transactions securely',
      'Legal compliance when required by law',
    ],
  },
  security: {
    icon: Lock,
    bullets: [
      'Industry-standard SSL/TLS encryption for all data transmission',
      'Regular security audits and penetration testing',
      'Access controls and authentication measures',
      'Secure data storage with backup systems',
    ],
  },
  cookies: {
    icon: Cookie,
    bullets: [
      'Essential cookies for website functionality',
      'Analytics cookies to understand user behavior (Google Analytics)',
      'Marketing cookies for personalized ads (can be disabled)',
      'You can manage cookie preferences in your browser settings',
    ],
  },
  rights: {
    icon: Shield,
    bullets: [
      'Access your personal data anytime through your account',
      'Request data correction or deletion',
      'Opt-out of marketing communications',
      'Export your data in a portable format',
      'Lodge a complaint with data protection authorities',
    ],
  },
  contact: {
    icon: Mail,
    bullets: [
      'Email us at privacy@samsungstore.com for privacy concerns',
      'Data Protection Officer: dpo@samsungstore.com',
      'Response time: Within 48 hours for urgent matters',
      'Mailing address: 123 Privacy Street, Tech City, TC 12345',
    ],
  },
  updates: {
    icon: Globe,
    bullets: [
      'We may update this policy to reflect changes in our practices',
      'Major changes will be notified via email',
      'Last updated date is always displayed at the top',
      'Continued use after updates means acceptance',
    ],
  },
}

export default function PrivacyPage() {
  const [active, setActive] = useState<SectionId>('collection')

  const handleScrollTo = (id: SectionId) => {
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
      const sectionIds = sections.map(s => s.id)
      const scrollPosition = window.pageYOffset + 200

      for (const sectionId of sectionIds) {
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
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Clear information about how we collect, use, and protect your data.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-3">
            Last updated: January 1, 2025
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* TOC Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 px-3">QUICK NAVIGATION</h3>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleScrollTo(s.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all flex items-center justify-between group ${
                    active === s.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <span className="truncate pr-2">{s.title}</span>
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    active === s.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8 sm:space-y-12">
            {sections.map((s, i) => {
              const Icon = content[s.id].icon
              return (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 scroll-mt-32"
                >
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      {s.title}
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {content[s.id].bullets.map((b, idx) => (
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
            This policy applies to our website and related services worldwide. Region-specific privacy notices may apply.
            We are committed to protecting your privacy and complying with GDPR, CCPA, and other data protection regulations.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
