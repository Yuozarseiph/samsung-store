'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

const centers = [
  { name: 'Galaxy Center - Downtown', address: '12 Innovation Ave, Tech City', phone: '+1 (555) 222-3344', hours: 'Mon–Sat, 9am–6pm' },
  { name: 'Galaxy Care - North', address: '88 Skyline Rd, Tech City', phone: '+1 (555) 987-1122', hours: 'Mon–Fri, 10am–6pm' },
  { name: 'Galaxy Lab - West', address: '45 Pioneer St, Tech City', phone: '+1 (555) 765-4433', hours: 'Mon–Sat, 9am–7pm' },
]

export default function ServiceCentersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service Centers</span>
          </h1>
          <p className="text-gray-600 mt-2">Find an authorized Samsung service center near you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {centers.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
            >
              <h3 className="font-bold text-gray-900">{c.name}</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> {c.address}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-600" /> {c.phone}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> {c.hours}</p>
              </div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
