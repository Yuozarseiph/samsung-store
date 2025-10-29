'use client'
import { motion } from 'framer-motion'
import { RotateCcw, ShieldCheck, AlertCircle, Calendar } from 'lucide-react'

export default function ReturnsPage() {
  const items = [
    { icon: Calendar, title: 'Window', text: '30-day return window from delivery date.' },
    { icon: ShieldCheck, title: 'Condition', text: 'Items must be unused with original packaging.' },
    { icon: AlertCircle, title: 'Exceptions', text: 'Opened software and hygienic items are non-returnable.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Returns & Refunds</span>
          </h1>
          <p className="text-gray-600 mt-2">Easy returns with clear guidelines.</p>
        </div>

        <div className="space-y-4">
          {items.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{c.title}</h3>
                    <p className="text-gray-700">{c.text}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
