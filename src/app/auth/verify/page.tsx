'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeFromUrl, setCoeFromUrl] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const emailParam = searchParams.get('email');
    if (code) setCoeFromUrl(code);
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const code = verificationCode || codeFromUrl;
      if (!code) {
        throw new Error('Please enter the verification code');
      }

      await verifyEmail(code);
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold">
            Flexylab<span className="text-cyan-400">.</span>
          </Link>
          <h1 className="text-3xl font-bold mt-8 mb-2">Verify Email</h1>
          <p className="text-gray-400">Enter the verification code</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-8 space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-4 rounded text-sm">
              {error}
            </div>
          )}

          {email && (
            <div className="bg-blue-900/30 border border-blue-500/20 p-3 rounded text-sm">
              <p className="text-gray-300">Verifying: <span className="text-cyan-400 font-semibold">{email}</span></p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Verification Code</label>
            <input
              type="text"
              value={verificationCode || codeFromUrl}
              onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-digit code"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white text-center tracking-widest text-2xl focus:outline-none focus:border-cyan-500 transition font-mono"
              maxLength={6}
            />
            <p className="text-gray-500 text-sm mt-2">Check the email from flexylab@flexylab.shop</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 transition font-semibold">
              Back to Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Loading verification page...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
