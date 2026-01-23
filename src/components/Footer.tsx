export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-400 text-sm">
        <p>© {currentYear} Flexylab. All rights reserved. | Powered by Next.js & Tailwind CSS</p>
        <p className="mt-2 text-xs">
          Built with cutting-edge physics simulation technology for interactive web experiences.
        </p>
      </div>
    </footer>
  )
}
