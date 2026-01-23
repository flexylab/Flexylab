'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(''), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus(''), 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(''), 5000)
    } finally {
      setIsLoading(false)
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

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-cyan-400">Get in Touch</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="font-bold text-white mb-2">Email</h3>
                  <p>hello@flexylab.com</p>
                  <p className="text-sm text-gray-500">We usually respond within 2 hours</p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Monday - Friday, 9AM - 6PM UTC</p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Address</h3>
                  <p>123 Innovation Street</p>
                  <p>Tech City, TC 12345</p>
                  <p className="text-sm text-gray-500">United States</p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Support</h3>
                  <p>support@flexylab.com</p>
                  <p className="text-sm text-gray-500">24/7 Technical Support</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400 text-sm">
                  ✓ Message sent successfully! We will be in touch soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  ✗ Failed to send message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 h-32 resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan-500 text-black font-bold py-2 rounded-lg hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">What's the best way to reach you?</h3>
                <p className="text-gray-300">Email is best for general inquiries, phone for urgent matters, and live chat for quick questions.</p>
              </div>
              <div className="border border-white/10 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">Do you offer consultations?</h3>
                <p className="text-gray-300">Yes! Contact our sales team at sales@flexylab.com to schedule a free consultation.</p>
              </div>
              <div className="border border-white/10 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">What's your response time?</h3>
                <p className="text-gray-300">We typically respond to all inquiries within 2-4 business hours during business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
