'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Scale, FileText, ShieldCheck, CreditCard, Truck, HelpCircle } from 'lucide-react'

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
    ],
  },
  accounts: {
    icon: ShieldCheck,
    bullets: [
      'Keep your account credentials secure and up to date.',
      'You are responsible for activities under your account.',
    ],
  },
  orders: {
    icon: CreditCard,
    bullets: [
      'Prices and availability are subject to change.',
      'Payment methods include cards and PayPal; all transactions are secure.',
    ],
  },
  shipping: {
    icon: Truck,
    bullets: [
      'We ship worldwide with tracking for all orders.',
      'Delivery estimates are not guaranteed due to carrier conditions.',
    ],
  },
  returns: {
    icon: Scale,
    bullets: [
      '30-day return window; items must be in original condition.',
      'Warranty claims handled via authorized service centers.',
    ],
  },
  liability: {
    icon: Scale,
    bullets: [
      'We are not liable for indirect or consequential damages.',
      'Our total liability shall not exceed the amount paid for the order.',
    ],
  },
  support: {
    icon: HelpCircle,
    bullets: [
      'For assistance, contact support@samsungstore.com.',
      'We aim to respond within 1-2 business days.',
    ],
  },
}

export default function TermsPage() {
  const [active, setActive] = useState<TocId>('agreement')

  const handleScrollTo = (id: TocId) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Terms of Service</span>
          </h1>
          <p className="text-gray-600 mt-2">Please read these terms carefully before using our services.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* TOC */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow p-4">
              <nav className="space-y-1">
                {toc.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleScrollTo(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      active === t.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'hover:bg-blue-50 text-gray-700'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {toc.map((t, i) => {
              const Icon = content[t.id].icon
              return (
                <motion.section
                  id={t.id}
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {content[t.id].bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="mt-2 inline-block w-1 h-1 rounded-full bg-gray-300" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
