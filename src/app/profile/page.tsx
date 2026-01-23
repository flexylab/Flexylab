'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, isLoading, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/signin');
    } else if (user) {
      setFormData({
        name: user.name,
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err: any) {
      setSaveMessage(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-400">Welcome back, {user.name}!</p>
        </div>

        {saveMessage && (
          <div className={`p-4 rounded-lg mb-6 ${
            saveMessage.includes('successfully')
              ? 'bg-green-900/30 border border-green-500/50 text-green-400'
              : 'bg-red-900/30 border border-red-500/50 text-red-400'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-cyan-500/10 pt-6">
                {!isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-lg font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-lg font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-lg font-semibold">{user.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Address</p>
                      <p className="text-lg font-semibold">{user.address || 'Not set'}</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-6 px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition resize-none"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:border-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Status</span>
                  <span className="text-cyan-400 font-semibold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-sm font-semibold">Verified</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/cart"
                className="block w-full text-center px-6 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition font-semibold"
              >
                View Cart
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
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
  );
}
