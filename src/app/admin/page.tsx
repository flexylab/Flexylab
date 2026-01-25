'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Don't prerender - admin protected page
export const dynamic = 'force-dynamic';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
  isVerified: boolean;
}

const ADMIN_EMAILS = ['flexylab@flexylab.shop', 'admin@flexylab.shop', 'owner@flexylab.shop'];

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) {
      return;
    }

    // Check if user exists
    if (!user) {
      router.push('/auth/signin');
      setPageLoading(false);
      return;
    }

    // Check if user is admin
    if (!ADMIN_EMAILS.includes(user.email)) {
      setError('Access Denied: Only authorized administrators can view this page');
      setPageLoading(false);
      return;
    }

    // Load all users from localStorage
    try {
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      setUsers(allUsers);
    } catch (err) {
      console.error('Error loading users:', err);
    }

    setPageLoading(false);
  }, [authLoading, user, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const deleteUser = (userId: string, userEmail: string) => {
    // Prevent deletion of admin emails
    if (ADMIN_EMAILS.includes(userEmail)) {
      alert('⛔ Cannot delete admin accounts!');
      return;
    }

    if (confirm(`Are you sure you want to delete ${userEmail}?`)) {
      try {
        // Remove from allUsers
        const updatedUsers = users.filter(u => u.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem('allUsers', JSON.stringify(updatedUsers));

        // Remove credentials
        const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
        delete userCredentials[userEmail];
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

        alert(`User ${userEmail} has been deleted successfully`);
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Error deleting user');
      }
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-2xl font-bold text-red-400 mb-4">⛔ Access Denied</div>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 rounded transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-cyan-100 text-sm">Logged in as: {user?.email}</p>
          </div>
          <Link
            href="/"
            className="bg-black/50 hover:bg-black/70 px-4 py-2 rounded transition"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="text-gray-400 text-sm uppercase">Total Users</div>
            <div className="text-3xl font-bold text-cyan-400">{users.length}</div>
          </div>
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="text-gray-400 text-sm uppercase">Verified Users</div>
            <div className="text-3xl font-bold text-green-400">
              {users.filter(u => u.isVerified).length}
            </div>
          </div>
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="text-gray-400 text-sm uppercase">Unverified Users</div>
            <div className="text-3xl font-bold text-yellow-400">
              {users.filter(u => !u.isVerified).length}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 border border-cyan-500/30 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-cyan-500/30">
            <h2 className="text-xl font-bold">Registered Users</h2>
          </div>

          {users.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No users registered yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 border-b border-cyan-500/30">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-cyan-400">Email</th>
                    <th className="px-6 py-4 font-semibold text-cyan-400">Name</th>
                    <th className="px-6 py-4 font-semibold text-cyan-400">Phone</th>
                    <th className="px-6 py-4 font-semibold text-cyan-400">Verified</th>
                    <th className="px-6 py-4 font-semibold text-cyan-400">Registered</th>
                    <th className="px-6 py-4 font-semibold text-cyan-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr
                      key={u.id}
                      className={`border-b border-gray-800 hover:bg-gray-800/50 transition ${
                        idx % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/50'
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-cyan-300">{u.email}</td>
                      <td className="px-6 py-4">{u.name}</td>
                      <td className="px-6 py-4 text-gray-400">{u.phone || '-'}</td>
                      <td className="px-6 py-4">
                        {u.isVerified ? (
                          <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded text-xs font-semibold">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-xs font-semibold">
                            ⚠ Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteUser(u.id, u.email)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded text-sm text-gray-300">
          <p>⚠️ This admin page is restricted. Only authorized administrators can access this page.</p>
          <p className="mt-2">Authorized emails: {ADMIN_EMAILS.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
