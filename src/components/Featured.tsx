'use client'

import { motion } from 'framer-motion'

const products = [
  {
    id: 1,
    name: 'Premium Wireless',
    price: '$299',
    category: 'Electronics',
    image: '🎧',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '$199',
    category: 'Wearables',
    image: '⌚',
  },
  {
    id: 3,
    name: 'Camera Pro',
    price: '$499',
    category: 'Photography',
    image: '📷',
  },
  {
    id: 4,
    name: 'Laptop Elite',
    price: '$899',
    category: 'Computers',
    image: '💻',
  },
]

export default function Featured() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="h-40 flex items-center justify-center text-6xl bg-gradient-to-br from-gray-100 to-gray-200">
                {product.image}
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2 font-semibold">
                  {product.category}
                </p>
                <h3 className="text-xl font-bold text-black mb-4">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-black">
                    {product.price}
                  </span>
                  <motion.button
                    className="px-4 py-2 bg-black text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
