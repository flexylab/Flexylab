'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Don't prerender this page - depends on user auth state
export const dynamic = 'force-dynamic';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/signin');
        return;
      }

      const cartKey = `cart_${user.id}`;
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setIsLoading(false);
    }
  }, [user, authLoading, router]);

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updated));
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updated);
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updated));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
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
            <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400 mb-6">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-6 border-b border-cyan-500/10 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.name || 'Product'}</h3>
                      <p className="text-cyan-400">${(item.price || 0).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-4 mx-6">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded text-sm font-bold transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded text-sm font-bold transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="w-24 text-right">
                      <p className="text-lg font-bold text-cyan-400">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="inline-block mt-6 px-6 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-cyan-500/20 pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-cyan-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition mb-4">
                  Proceed to Checkout
                </button>

                <button className="w-full px-6 py-3 border border-gray-500 text-gray-300 rounded-lg hover:border-gray-400 transition">
                  Continue Shopping
                </button>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-sm text-gray-300">
                <p className="mb-2"><span className="text-cyan-400 font-bold">Free Shipping</span> on orders over $500</p>
                <p><span className="text-cyan-400 font-bold">30-Day Returns</span> on all products</p>
              </div>
            </div>
          </div>
        )}
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
  );
}
