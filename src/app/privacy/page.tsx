'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, Lock, Eye, UserCheck, Cookie, Database, Mail, Globe,
  Calendar, Download, ArrowLeft, CheckCircle2, Info, FileText, ChevronLeft, ChevronRight
} from 'lucide-react'

type SectionId =
  | 'intro'
  | 'data-we-collect'
  | 'how-we-use'
  | 'cookies'
  | 'sharing'
  | 'your-rights'
  | 'security'
  | 'contact'
  | 'last-updated'

export default function PrivacyPage() {
  const sections: { id: SectionId; icon: any; title: string }[] = [
    { id: 'intro', icon: Shield, title: 'Introduction' },
    { id: 'data-we-collect', icon: Database, title: 'Data We Collect' },
    { id: 'how-we-use', icon: FileText, title: 'How We Use Data' },
    { id: 'cookies', icon: Cookie, title: 'Cookies & Tracking' },
    { id: 'sharing', icon: UserCheck, title: 'Sharing & Transfers' },
    { id: 'your-rights', icon: CheckCircle2, title: 'Your Rights' },
    { id: 'security', icon: Lock, title: 'Security' },
    { id: 'contact', icon: Mail, title: 'Contact Us' },
    { id: 'last-updated', icon: Calendar, title: 'Last Updated' },
  ]

  const content: Record<SectionId, string[]> = {
    intro: [
      'We value your privacy and are committed to protecting your personal data.',
      'This policy explains what data we collect, how we use it, and your rights.',
    ],
    'data-we-collect': [
      'Account data: name, email, phone, shipping address.',
      'Order data: products purchased, payment method (tokenized), invoices.',
      'Device and usage data: IP address, browser, pages visited, session duration.',
      'Support interactions: messages, emails, call notes.',
    ],
    'how-we-use': [
      'Provide and improve our services and fulfill orders.',
      'Personalize content and recommendations.',
      'Fraud prevention, security monitoring, and diagnostics.',
      'Legal compliance, accounting, and tax obligations.',
    ],
    cookies: [
      'Essential cookies for authentication and cart functionality.',
      'Analytics cookies to improve performance and UX.',
      'Advertising cookies for relevant offers (optional, opt-out available).',
    ],
    sharing: [
      'Payment processors for secure checkout.',
      'Logistics partners for shipping and returns.',
      'Analytics and security vendors under strict agreements.',
      'We do not sell your personal data.',
    ],
    'your-rights': [
      'Access, correction, deletion, and portability of your data.',
      'Withdraw consent and object to certain processing.',
      'Manage email preferences and cookies at any time.',
    ],
    security: [
      'Encryption in transit (HTTPS) and at rest where applicable.',
      'Access controls, monitoring, and routine audits.',
      'Vendor due diligence and data minimization principles.',
    ],
    contact: [
      'Email: privacy@samsungstore.com',
      'Address: 123 Galaxy Street, Tech City, TC 12345',
      'Phone: +1 (555) 123-4567',
    ],
    'last-updated': [
      'This policy was last updated on Oct 25, 2025.',
    ],
  }

  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    intro: null,
    'data-we-collect': null,
    'how-we-use': null,
    cookies: null,
    sharing: null,
    'your-rights': null,
    security: null,
    contact: null,
    'last-updated': null,
  })

  const setSectionRef = useCallback((id: SectionId) => {
    return (el: HTMLElement | null): void => {
      sectionRefs.current[id] = el
    }
  }, [])

  const [active, setActive] = useState<SectionId>('intro')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id as SectionId)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleScrollTo = (id: SectionId) => {
    const el = sectionRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  const chipsWrapperRef = useRef<HTMLDivElement | null>(null)
  const scrollChips = (dir: 'left' | 'right') => {
    const el = chipsWrapperRef.current
    if (!el) return
    const amount = Math.min(360, el.clientWidth * 0.8)
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-16">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="mt-6 flex items-start justify-between gap-6">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 240 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg"
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </motion.div>
              <h1 className="mt-3 text-4xl md:text-5xl font-black">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Privacy Matters
                </span>
              </h1>
              <p className="mt-2 text-gray-600">
                Clear information about how we collect, use, and protect your data.
              </p>
            </div>
            <motion.a
              href="#download"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 transition-colors font-semibold"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.a>
          </div>
        </motion.div>

        {/* Sticky Topics Bar */}
        <div className="sticky top-20 z-30 mb-6">
          <div className="rounded-2xl">
            <div className="relative">
              <button
                aria-label="Scroll topics left"
                onClick={() => scrollChips('left')}
                className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-gray-200 shadow hover:shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div
                ref={chipsWrapperRef}
                className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12 py-3 rounded-full"
                style={{ scrollbarWidth: 'none' }}
              >
                {sections.map((s) => {
                  const Icon = s.icon
                  const isActive = active === s.id
                  return (
                    <motion.button
                      key={s.id}
                      onClick={() => handleScrollTo(s.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`snap-start flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                          : 'bg-white/80 backdrop-blur-xl text-gray-700 border-gray-200 hover:border-blue-500'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                      <span className="text-sm font-semibold">{s.title}</span>
                    </motion.button>
                  )
                })}
              </div>
              <button
                aria-label="Scroll topics right"
                onClick={() => scrollChips('right')}
                className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-gray-200 shadow hover:shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <p className="text-sm text-blue-900">
            The topics bar stays visible as you scroll. Click any chip to jump smoothly to its section.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <motion.section
                id={s.id}
                key={s.id}
                ref={setSectionRef(s.id)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ duration: 0.4 }}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/40 shadow-lg scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{s.title}</h2>
                </div>

                <ul className="space-y-2">
                  {content[s.id].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )
          })}
        </motion.div>

        <motion.div
          id="download"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-gray-600 mt-0.5" />
            <p className="text-sm text-gray-700">
              This policy applies to our website and related services worldwide. Region-specific notices may apply.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 transition-colors font-semibold"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
