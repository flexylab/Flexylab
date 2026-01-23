'use client'

import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
          <h1 className="text-5xl font-bold mb-8 text-cyan-400">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Flexylab (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Company&quot;) operates the Flexylab website (the &quot;Site&quot;). This Privacy Policy explains our data collection, use, and disclosure practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Payment information for purchases</li>
                <li>Browser and device information</li>
                <li>IP address and location data</li>
                <li>Cookies and tracking data</li>
                <li>Usage and interaction data on our Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use collected information for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Processing purchases and transactions</li>
                <li>Providing customer support</li>
                <li>Improving our Site and services</li>
                <li>Sending marketing communications (with consent)</li>
                <li>Detecting and preventing fraud</li>
                <li>Complying with legal obligations</li>
                <li>Analytics and performance monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information. However, no transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites. We are not responsible for the privacy practices of external sites. We encourage you to review their privacy policies before providing personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
              <p>
                We use cookies to enhance your browsing experience. You can control cookie settings through your browser. Disabling cookies may affect Site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request information about data sharing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
              <p>
                For privacy-related inquiries or to exercise your rights, please contact us at:<br />
                Email: privacy@flexylab.com<br />
                Address: 123 Innovation Street, Tech City, TC 12345
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Policy Updates</h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Modified" date. Your continued use of the Site constitutes acceptance of updated policies.
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
