/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from 'next/link'

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "What is Flexylab?",
      answer: "Flexylab is an advanced interactive physics engine and design system for creating stunning, dynamic web experiences."
    },
    {
      question: "How do I get started?",
      answer: "Visit our Shop page to explore our products, or contact us for a personalized consultation."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted."
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes! Our support team is available 24/7 to assist you. Email us at support@flexylab.com"
    },
    {
      question: "Can I integrate Flexylab with my existing project?",
      answer: "Absolutely! Flexylab is designed to work seamlessly with Next.js, React, and other modern frameworks."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with our products."
    }
  ]

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
          <h1 className="text-5xl font-bold mb-4 text-cyan-400">Help Center</h1>
          <p className="text-gray-400 mb-12">Find answers to common questions and get the support you need</p>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 border border-cyan-400/30 rounded-lg bg-cyan-400/5">
            <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-gray-300 mb-4">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="space-y-2">
              <p className="text-gray-300"><strong>Email:</strong> support@flexylab.com</p>
              <p className="text-gray-300"><strong>Hours:</strong> 24/7 Support Available</p>
              <p className="text-gray-300"><strong>Response Time:</strong> Usually within 2 hours</p>
            </div>
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
