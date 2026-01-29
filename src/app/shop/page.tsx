'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

// Don't prerender - uses router and auth context
export const dynamic = 'force-dynamic';

interface Product {
  id: number
  name: string
  price: number
  description: string
  size: 'sm' | 'md' | 'lg'
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    description: 'High-quality sound with active noise cancellation',
    size: 'lg'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    description: 'Track fitness and stay connected',
    size: 'md'
  },
  {
    id: 3,
    name: 'Portable Speaker',
    price: 79.99,
    description: 'Powerful 360-degree sound',
    size: 'sm'
  },
  {
    id: 4,
    name: '4K Webcam',
    price: 149.99,
    description: 'Crystal clear video for streaming and calls',
    size: 'sm'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'Premium typing experience with RGB lighting',
    size: 'md'
  },
  {
    id: 6,
    name: 'Ergonomic Mouse',
    price: 59.99,
    description: 'Comfortable design for all-day use',
    size: 'lg'
  }
]

const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * (8 + 3) + 3,
    duration: Math.random() * 20 + 15
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: 0.3
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

interface OrganicCardProps {
  product: Product
  onAddToCart: (id: number) => void
}

const OrganicCard: React.FC<OrganicCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      animate={{ y: [0, -15, 0] }}
      whileHover={{ y: -20 }}
    >
      {/* Organic blob background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-600/15 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%]"
        style={{
          animation: 'blob 7s infinite'
        }}
      />

      {/* Glassmorphism wrapper */}
      <div className="relative h-full backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] overflow-hidden group p-6 md:p-8 flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300">
        
        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] opacity-0 group-hover:opacity-100"
          animate={{
            background: [
              'conic-gradient(from 0deg, transparent, rgba(34, 211, 238, 0.3), transparent)',
              'conic-gradient(from 360deg, transparent, rgba(34, 211, 238, 0.3), transparent)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm md:text-base text-gray-300 mb-4">
            {product.description}
          </p>
        </div>

        {/* Price and button */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-2xl md:text-3xl font-bold text-cyan-400">
            ${product.price}
          </span>
          <motion.button
            onClick={() => onAddToCart(product.id)}
            className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 58% 42% 42% 58% / 58% 58% 42% 42%;
          }
          50% {
            border-radius: 70% 30% 46% 54% / 30% 30% 54% 46%;
          }
          75% {
            border-radius: 56% 44% 54% 46% / 42% 58% 42% 58%;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default function ShopPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [cart, setCart] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/signin')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${user?.id}`)
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [user?.id])

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (product && user) {
      const existingItem = cart.find(item => item.id === productId)
      let updatedCart
      if (existingItem) {
        updatedCart = cart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        updatedCart = [...cart, { id: productId, name: product.name, price: product.price, quantity: 1 }]
      }
      setCart(updatedCart)
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart))
    }
  }

  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getColSpan = (size: string) => {
    switch (size) {
      case 'lg':
        return 'md:col-span-2 lg:col-span-2'
      case 'md':
        return 'md:col-span-2 lg:col-span-1'
      default:
        return 'md:col-span-1'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black border-b border-cyan-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Flexylab
          </Link>
          <nav className="flex gap-8">
            <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
            <Link href="/shop" className="hover:text-cyan-400 transition">Shop</Link>
            <Link href="/cart" className="hover:text-cyan-400 transition">Cart</Link>
            <Link href="/profile" className="hover:text-cyan-400 transition">Profile</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Background particles */}
      <FloatingParticles />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Shop
        </h1>

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className={`${getColSpan(product.size)} min-h-96`}>
              <OrganicCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-cyan-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-white font-bold mb-4">About</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about-us" className="hover:text-cyan-400 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">Blog</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-cyan-400 transition">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/help-center" className="hover:text-cyan-400 transition">Help Center</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition">Contact Support</Link></li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h3 className="text-white font-bold mb-4">Follow</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Discord</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Flexylab. Built with passion </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
