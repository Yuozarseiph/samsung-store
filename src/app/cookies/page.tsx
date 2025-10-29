'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, ShieldCheck, BarChart3, Megaphone, X, Info, CheckCircle2, Save } from 'lucide-react'

type CookiePrefs = {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const DEFAULT_PREFS: CookiePrefs = {
  essential: true,
  analytics: false,
  marketing: false,
}

export default function CookiesPage() {
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cookie_prefs')
      if (stored) {
        const parsed = JSON.parse(stored)
        setPrefs({ essential: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing })
      } else {
        setBannerOpen(true)
      }
    } catch {
      setBannerOpen(true)
    }
  }, [])

  const savePrefs = (next: CookiePrefs) => {
    const toSave = { analytics: next.analytics, marketing: next.marketing }
    localStorage.setItem('cookie_prefs', JSON.stringify(toSave))
    setPrefs({ ...next, essential: true })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const onToggle = (key: keyof CookiePrefs) => {
    if (key === 'essential') return
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const acceptAll = () => {
    savePrefs({ essential: true, analytics: true, marketing: true })
    setBannerOpen(false)
  }

  const rejectAll = () => {
    savePrefs({ essential: true, analytics: false, marketing: false })
    setBannerOpen(false)
  }

  const saveCurrent = () => {
    savePrefs(prefs)
    setBannerOpen(false)
  }

  const sections = [
    {
      id: 'about',
      icon: Cookie,
      title: 'What are cookies?',
      points: [
        'Small text files placed on your device to remember settings and improve your experience.',
        'They can be session-based (deleted after you close your browser) or persistent (remain for a period).',
      ],
    },
    {
      id: 'essential',
      icon: ShieldCheck,
      title: 'Essential cookies',
      points: [
        'Required for core functionality such as authentication, cart, and security.',
        'Cannot be disabled as the site may not function properly without them.',
      ],
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Analytics cookies',
      points: [
        'Help us understand usage and improve performance and UX.',
        'Data is aggregated and used for product decisions.',
      ],
    },
    {
      id: 'marketing',
      icon: Megaphone,
      title: 'Marketing cookies',
      points: [
        'Used to deliver personalized offers and measure campaign effectiveness.',
        'Disabled by default. You can opt-in anytime.',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow">
            <Cookie className="w-4 h-4" />
            Cookies Policy
          </div>
          <h1 className="mt-4 text-4xl font-black">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Cookie Preferences
            </span>
          </h1>
          <p className="text-gray-600 mt-2">Control how we use cookies to improve your experience.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/40 shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Manage preferences</h2>
          <p className="text-sm text-gray-600 mb-4">
            Adjust cookie categories below. Essential cookies are always on.
          </p>

          <div className="divide-y divide-gray-200">
            <PrefRow
              title="Essential"
              description="Needed for authentication, cart, and core site security."
              checked={true}
              locked
              onChange={() => {}}
              icon={<ShieldCheck className="w-5 h-5 text-green-600" />}
            />
            <PrefRow
              title="Analytics"
              description="Helps us improve performance and experience."
              checked={prefs.analytics}
              onChange={() => onToggle('analytics')}
              icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
            />
            <PrefRow
              title="Marketing"
              description="Personalized offers and campaign insights."
              checked={prefs.marketing}
              onChange={() => onToggle('marketing')}
              icon={<Megaphone className="w-5 h-5 text-purple-600" />}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={acceptAll}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow"
            >
              Accept all
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={rejectAll}
              className="px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-blue-500"
            >
              Reject non-essential
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveCurrent}
              className="px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-blue-500 inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save preferences
            </motion.button>

            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Saved
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.section
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                </div>
                <ul className="space-y-2">
                  {s.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {bannerOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed inset-x-0 bottom-4 z-50 px-4"
          >
            <div className="mx-auto max-w-4xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Cookie className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    We use cookies to enhance your experience, analyze usage, and deliver personalized content. You can manage preferences anytime.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={acceptAll}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow"
                    >
                      Accept all
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-sm font-semibold hover:border-blue-500"
                    >
                      Reject non-essential
                    </button>
                    <button
                      onClick={() => setBannerOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-sm font-semibold hover:border-blue-500"
                    >
                      Manage settings
                    </button>
                  </div>
                </div>
                <button
                  aria-label="Dismiss"
                  onClick={() => setBannerOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PrefRow({
  title,
  description,
  checked,
  onChange,
  icon,
  locked = false,
}: {
  title: string
  description: string
  checked: boolean
  onChange: () => void
  icon: React.ReactNode
  locked?: boolean
}) {
  return (
    <div className="py-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{title}{locked ? ' (required)' : ''}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="pt-1">
        <label className={`relative inline-flex items-center cursor-${locked ? 'not-allowed' : 'pointer'}`}>
          <input
            type="checkbox"
            disabled={locked}
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
          />
          <div className={`w-11 h-6 rounded-full transition-colors
            ${locked ? 'bg-gray-300' : checked ? 'bg-blue-600' : 'bg-gray-300'}
            peer-focus:outline-none
          `} />
          <div className={`
            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform
            ${checked ? 'translate-x-5' : 'translate-x-0'}
            border border-gray-200
          `} />
        </label>
      </div>
    </div>
  )
}
