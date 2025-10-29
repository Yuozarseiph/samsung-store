'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard 3-5 business days, Express 1-2 days.' },
  { q: 'What is your return policy?', a: '30-day returns in original condition with all accessories.' },
  { q: 'How can I track my order?', a: 'Use the tracking link in your profile under My Orders.' },
  { q: 'Do you offer warranty?', a: 'Yes, minimum 2-year warranty on all products.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h1 className="mt-4 text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</span>
          </h1>
          <p className="text-gray-600 mt-2">Quick answers to common questions.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-5 py-4"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <span className="text-gray-500">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4 text-gray-700"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
