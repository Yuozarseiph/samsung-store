Samsung Store — Next.js App Router
Modern, minimal, and premium storefront for Samsung devices. Built with Next.js (App Router), Tailwind CSS, Framer Motion, and Lucide.

✨ Highlights
Elegant glassmorphism + subtle gradients

Smooth animations with Framer Motion

Responsive, accessible UI

JSON demo data (easily swappable with real API)

Fully wired Header/Footer, deep navigation

🧩 Tech Stack
Next.js (App Router) + TypeScript

Tailwind CSS

Framer Motion

Lucide React

📦 Features
Home, Products, Product Details

Cart with coupons, shipping bar, wishlist move

Checkout (Shipping → Payment → Confirmation)

Blog with category/search filters

Auth (demo LocalStorage), Profile (Overview, Orders, Wishlist, Settings)

Warranty Center (serial search, certificate)

Company/Support pages: About, Contact, Shipping, Returns, FAQ, Service Centers, Careers, Press, Privacy, Terms, Cookies

🚀 Getting Started
bash
# 1) Install dependencies
npm i

# 2) Dev server
npm run dev
# http://localhost:3000

# 3) Production
npm run build
npm start
🗂️ Project Notes
Global CSS: only imports Tailwind; styles live in components

Client components for interactive/animated sections

Replace demo JSON with your API/DB when ready

Keep env secrets in .env.local (gitignored)

🔐 Env (optional)
text
# .env.local
# NEXT_PUBLIC_API_URL=...
🧪 Lint & Format (optional)
bash
npm run lint
# add Prettier/Husky if desired
📦 Scripts
dev: start dev server

build: production build

start: serve production build

🛳️ Deploy
Vercel recommended (auto-deploy from Git)

Ensure proper Node version if needed

📝 License
MIT — see LICENSE

Made with ❤️ by Yousef Shaker Ardakani