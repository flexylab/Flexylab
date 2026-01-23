'use client'

import Link from 'next/link'

export default function CookiePolicyPage() {
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
          <h1 className="text-5xl font-bold mb-8 text-cyan-400">Cookie Policy</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your browser or device when you visit a website. They allow websites to remember information about your visit, such as your preferences and login status.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>
              <p className="font-bold mb-4">Essential Cookies:</p>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality like security, network management, and accessibility.
              </p>
              <p className="font-bold mb-4 mt-4">Performance Cookies:</p>
              <p>
                These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve site performance.
              </p>
              <p className="font-bold mb-4 mt-4">Marketing Cookies:</p>
              <p>
                These cookies are used to deliver advertisements relevant to you and your interests. They also help us measure the effectiveness of advertising campaigns.
              </p>
              <p className="font-bold mb-4 mt-4">Functional Cookies:</p>
              <p>
                These cookies allow us to remember choices you make to provide a more personalized experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Cookies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To remember your login information and preferences</li>
                <li>To track website usage and analyze user behavior</li>
                <li>To deliver targeted advertisements</li>
                <li>To improve website functionality and user experience</li>
                <li>To prevent fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Managing Cookies</h2>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, blocking cookies may affect your ability to use certain features on our website.
              </p>
              <p className="mt-4">
                To manage cookies, you can:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Visit www.allaboutcookies.org for information on browser cookie controls</li>
                <li>Access your browser's settings to delete or disable cookies</li>
                <li>Use browser extensions to control cookies</li>
                <li>Opt-out of third-party cookies through third-party opt-out tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Cookies</h2>
              <p>
                Some cookies may be set by third-party services such as analytics providers, advertising networks, and social media platforms. We are not responsible for the practices of these third parties. We recommend reviewing their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Tracking Technologies</h2>
              <p>
                In addition to cookies, we may use other technologies such as web beacons, pixels, and similar tracking mechanisms to collect information about your browsing activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:<br />
                Email: cookies@flexylab.com<br />
                Address: 123 Innovation Street, Tech City, TC 12345
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last Modified: January 20, 2026</p>
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
