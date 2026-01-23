/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from 'next/link'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold">
            Flexylab<span className="text-cyan-400">.</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
            <Link href="/shop" className="hover:text-cyan-400 transition">Shop</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-cyan-400">About Us</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <p>
                Flexylab was founded with a vision to revolutionize interactive physics technology. Born from a passion for innovation and cutting-edge design, we create immersive experiences that push the boundaries of what's possible on the web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p>
                To empower developers and designers with advanced physics engines and interactive tools that make creating dynamic, engaging web experiences effortless and fun.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Innovation:</strong> We constantly push technological boundaries</li>
                <li><strong>Quality:</strong> We deliver excellence in every product</li>
                <li><strong>User-Centric:</strong> We design with our users in mind</li>
                <li><strong>Transparency:</strong> We believe in honest communication</li>
                <li><strong>Sustainability:</strong> We care about the digital and physical world</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
              <p>
                Our team consists of talented developers, designers, and engineers passionate about creating extraordinary interactive experiences. We work collaboratively to bring your vision to life.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Technology & Innovation</h2>
              <p>
                We leverage the latest technologies including Next.js, React, WebGL, and advanced physics engines to create experiences that are both beautiful and performant. Our commitment to innovation ensures we're always at the forefront of web technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Community & Support</h2>
              <p>
                We believe in building a strong community around our products. Our support team is dedicated to helping you succeed, whether you're a beginner or an experienced developer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
              <p>
                We'd love to hear from you! Whether you have questions, feedback, or business inquiries, don't hesitate to reach out.<br />
                Email: hello@flexylab.com<br />
                Address: 123 Innovation Street, Tech City, TC 12345
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last Updated: January 20, 2026</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>&copy; 2025 Flexylab. All rights reserved.</p>
          <p className="mt-2">Built with passion for interactive experiences</p>
        </div>
      </footer>
    </div>
  )
}
