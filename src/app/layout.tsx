import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Samsung Store — Premium Galaxy Devices',
  description: 'Discover the latest Samsung Galaxy smartphones, tablets, wearables, and more with modern luxury design.',
  keywords: ['Samsung', 'Galaxy', 'Smartphones', 'Tablets', 'Wearables'],
  authors: [{ name: 'Samsung Store' }],
  openGraph: {
    title: 'Samsung Store — Premium Galaxy Devices',
    description: 'Explore premium Samsung Galaxy products',
    type: 'website',
  },
  themeColor: '#FDFCFB',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased bg-[#FDFCFB]">
        <Header />
        <main className="pt-20 pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
