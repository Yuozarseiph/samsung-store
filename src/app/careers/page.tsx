'use client'
import { motion } from 'framer-motion'
import {  MapPin, Clock, Send, ChevronRight, Sparkles } from 'lucide-react'

const jobs = [
  { title: 'Senior Frontend Engineer', location: 'Remote / EU', type: 'Full-time', summary: 'Build premium experiences with Next.js and Motion.' },
  { title: 'Product Designer', location: 'Berlin, DE', type: 'Full-time', summary: 'Design minimal, luxurious interfaces for global users.' },
  { title: 'QA Automation Engineer', location: 'Remote / GMT+1', type: 'Contract', summary: 'Own E2E testing and CI quality gates.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow">
            <Sparkles className="w-4 h-4" />
            Careers
          </div>
          <h1 className="mt-4 text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Join the Galaxy Team</span>
          </h1>
          <p className="text-gray-600 mt-2">Build delightful products for millions of users.</p>
        </div>
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <p className="mt-1 text-gray-700">{job.summary}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-600" /> {job.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4 text-blue-600" /> {job.type}</span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow"
                >
                  Apply
                  <Send className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow p-6 text-center"
        >
          <p className="text-gray-700">Don’t see your role?</p>
          <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold mt-2">
            Send an open application <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
