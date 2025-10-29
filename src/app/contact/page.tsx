'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Contact Us</span>
          </h1>
          <p className="text-gray-600 mt-2">We are here to help. Reach out any time.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email', value: 'support@samsungstore.com' },
              { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567' },
              { icon: MapPin, title: 'Address', value: '123 Galaxy Street, Tech City, TC 12345' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/40 shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{c.title}</p>
                      <p className="font-semibold text-gray-900">{c.value}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/40 shadow space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none min-h-[140px]"
                placeholder="Write your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow"
              type="submit"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>

            {sent && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                Message sent successfully
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}
