'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, User, Calendar, ArrowRight, Sparkles } from 'lucide-react'

interface Blog {
  slug: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/blog/${blog.slug}`}>
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500">
          
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            <motion.img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {blog.category}
            </motion.div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {blog.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {blog.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {blog.author.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-900">{blog.author}</span>
              </div>
              
              <motion.div
                className="flex items-center gap-2 text-blue-600 font-semibold"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm">Read More</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
