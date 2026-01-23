'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden relative">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="container mx-auto px-6 py-20 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title with letter animation */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          variants={titleVariants}
        >
          {'Flexylab'.split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated line under title */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8 max-w-md"
          variants={itemVariants}
        />

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Experience the future of shopping with stunning animations and clean design
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 bg-white text-black font-bold rounded-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition"
              whileHover={{ opacity: 1 }}
            />
            <span className="relative z-10">Shop Now</span>
          </motion.button>
          <motion.button
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition"
            />
            <span className="relative z-10">Learn More</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Multiple floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-md"
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 300,
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 280,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-16 h-16 bg-cyan-500 rounded-full opacity-15 blur-md"
        animate={{
          x: mousePosition.x * 0.025,
          y: mousePosition.y * 0.025,
        }}
        transition={{
          type: 'spring',
          damping: 11,
          stiffness: 290,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-32 w-24 h-24 bg-pink-500 rounded-full opacity-20 blur-2xl"
        animate={{
          x: mousePosition.x * 0.028,
          y: mousePosition.y * 0.028,
        }}
        transition={{
          type: 'spring',
          damping: 13,
          stiffness: 270,
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-12 h-12 bg-yellow-500 rounded-full opacity-15 blur-md"
        animate={{
          x: mousePosition.x * 0.035,
          y: mousePosition.y * 0.035,
        }}
        transition={{
          type: 'spring',
          damping: 9,
          stiffness: 310,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.022,
          y: mousePosition.y * 0.022,
        }}
        transition={{
          type: 'spring',
          damping: 14,
          stiffness: 260,
        }}
      />
    </section>
  )
}
