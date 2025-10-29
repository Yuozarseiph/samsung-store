'use client'
import { motion } from 'framer-motion'
import { Newspaper, Calendar, ExternalLink, Mail, Phone } from 'lucide-react'

const press = [
  { title: 'Samsung Store unveils premium Galaxy experience', date: 'Oct 2025', link: '#' },
  { title: 'Designing luxury at scale with Motion & Next.js', date: 'Sep 2025', link: '#' },
  { title: 'Sustainability initiatives in packaging and shipping', date: 'Aug 2025', link: '#' },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow">
            <Newspaper className="w-4 h-4" />
            Press
          </div>
          <h1 className="mt-4 text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">News & Media</span>
          </h1>
          <p className="text-gray-600 mt-2">Official announcements and media coverage.</p>
        </div>

        <div className="space-y-4">
          {press.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow flex items-center justify-between gap-6"
            >
              <div>
                <h3 className="font-bold text-gray-900">{p.title}</h3>
                <p className="text-sm text-gray-600 inline-flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {p.date}
                </p>
              </div>
              <a href={p.link} className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold">
                Read <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {[
            { icon: Mail, title: 'Press Email', value: 'press@samsungstore.com' },
            { icon: Phone, title: 'Press Line', value: '+1 (555) 555-1000' },
          ].map((c) => {
            const Icon = c.icon
            return (
              <div key={c.title} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{c.title}</p>
                    <p className="font-semibold text-gray-900">{c.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
