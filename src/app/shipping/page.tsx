'use client'
import { motion } from 'framer-motion'
import { Truck, Clock, Globe, ShieldCheck, MapPin } from 'lucide-react'

export default function ShippingPage() {
  const cards = [
    { icon: Truck, title: 'Methods', text: 'Standard (3-5 days), Express (1-2 days).' },
    { icon: Clock, title: 'Cutoff', text: 'Orders before 2 PM ship same day.' },
    { icon: Globe, title: 'Regions', text: 'Worldwide shipping with trusted carriers.' },
    { icon: ShieldCheck, title: 'Insurance', text: 'All parcels insured until delivery.' },
    { icon: MapPin, title: 'Tracking', text: 'Real-time tracking for every order.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shipping Information</span>
          </h1>
          <p className="text-gray-600 mt-2">Fast, secure, and trackable delivery.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c, i) => {
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-gray-700">{c.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
