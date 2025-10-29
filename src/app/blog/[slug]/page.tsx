'use client'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import blogs from '@/data/blogs.json'
import BlogCard from '@/components/BlogCard'
import { 
  ArrowLeft, Clock, Calendar, Share2, Facebook, 
  Twitter, Linkedin, Link as LinkIcon, Bookmark, Hash, 
  CheckCircle2, Sparkles, Eye
} from 'lucide-react'
import { useState } from 'react'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const blog = blogs.find(b => b.slug === slug)
  const [copied, setCopied] = useState(false)

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Eye className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const relatedBlogs = blogs
    .filter(b => b.slug !== slug && (b.category === blog.category || b.tags?.some(tag => blog.tags?.includes(tag))))
    .slice(0, 3)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold mb-4 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            {blog.category}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black mb-6 leading-tight"
          >
            {blog.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8 pb-8 border-b-2 border-gray-200"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
              >
                {blog.author.charAt(0)}
              </motion.div>
              <div>
                <p className="font-bold text-gray-900">{blog.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-blue-500 transition-colors shadow-lg"
              >
                <Bookmark className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-blue-500 transition-colors shadow-lg"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </section>
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl mb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {blog.content.split('\n\n').map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-xl text-gray-700 leading-relaxed mb-8"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.article>
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t-2 border-gray-200"
          >
            <h3 className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer font-medium shadow-lg"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-600" />
            Share this article
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
              { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
              { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
              { icon: LinkIcon, label: copied ? 'Copied!' : 'Copy Link', color: 'hover:bg-purple-600' },
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={social.label.includes('Copy') ? copyLink : undefined}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl bg-white border border-gray-200 font-semibold transition-all shadow-lg ${social.color} hover:text-white hover:border-transparent`}
                >
                  {copied && social.label.includes('Copy') ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{social.label}</span>
                    </>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-100 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg"
            >
              {blog.author.charAt(0)}
            </motion.div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">About {blog.author}</h4>
              <p className="text-gray-600 mb-4">
                Tech enthusiast and Samsung Galaxy expert with years of experience reviewing the latest devices and accessories.
              </p>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-blue-600 hover:text-purple-600 font-semibold flex items-center gap-2"
              >
                View all articles by {blog.author}
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black mb-10"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Related Articles
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog, i) => (
              <motion.div
                key={relatedBlog.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <BlogCard blog={relatedBlog} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
