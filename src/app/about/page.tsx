'use client'
import { motion } from 'framer-motion'
import { Sparkles, Target, HeartHandshake, Rocket, ShieldCheck, Users, Award, Leaf } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Mission', text: 'Deliver premium Samsung experiences with design-first thinking.' },
    { icon: HeartHandshake, title: 'Customer Obsession', text: 'Every decision starts with user delight and trust.' },
    { icon: Rocket, title: 'Innovation', text: 'Push boundaries with purposeful technology and simplicity.' },
    { icon: ShieldCheck, title: 'Trust & Privacy', text: 'Protect user data with industry-leading safeguards.' },
  ]

  const stats = [
    { label: 'Happy Customers', value: '250K+' },
    { label: 'Countries Shipped', value: '40+' },
    { label: 'Avg. Rating', value: '4.9/5' },
    { label: 'Warranty Coverage', value: '2 Years' },
  ]

  const highlights = [
    { icon: Users, title: 'Our Team', text: 'Designers, engineers, and operators united by craftsmanship.' },
    { icon: Award, title: 'Quality First', text: 'Meticulous QA and curated product selection.' },
    { icon: Leaf, title: 'Sustainability', text: 'Eco-friendly packaging and carbon-conscious logistics.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow">
            <Sparkles className="w-4 h-4" />
            About Us
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Crafting Your Galaxy Experience
            </span>
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We blend modern design with cutting-edge Samsung technology to deliver a luxurious, seamless shopping journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Samsung Store began with a simple idea: premium technology deserves a premium experience. From product discovery to last-mile delivery and warranty support, we obsess over every detail, removing friction and adding delight.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow text-center">
              <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-xs font-semibold text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((h, i) => {
            const Icon = h.icon
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{h.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{h.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
