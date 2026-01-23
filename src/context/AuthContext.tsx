'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signup: (name: string, email: string, password: string, phone: string) => Promise<string>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    // Check if email already exists
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    if (allUsers.some((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    if (!name || !email || !password) {
      throw new Error('Please fill in all fields');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const verificationCode = generateVerificationCode();
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      phone,
      address: '',
      createdAt: new Date().toISOString(),
      isVerified: false,
    };

    // Store unverified user
    localStorage.setItem('pendingUser', JSON.stringify(newUser));

    // Store verification code
    const verificationCodes = JSON.parse(localStorage.getItem('verificationCodes') || '{}');
    verificationCodes[email] = {
      code: verificationCode,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('verificationCodes', JSON.stringify(verificationCodes));

    // Store password (in real app, never do this - use backend)
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
    userCredentials[email] = password;
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

    // Send verification email via API
    try {
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          verificationCode,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }

    // Return verification code
    return verificationCode;
  };

  const verifyEmail = async (verificationCode: string) => {
    const pendingUser = localStorage.getItem('pendingUser');
    if (!pendingUser) {
      throw new Error('No pending user found');
    }

    const user: User = JSON.parse(pendingUser);
    const verificationCodes = JSON.parse(localStorage.getItem('verificationCodes') || '{}');
    const storedCode = verificationCodes[user.email];

    if (!storedCode || storedCode.code !== verificationCode) {
      throw new Error('Invalid verification code');
    }

    // Mark user as verified and save
    const verifiedUser: User = { ...user, isVerified: true };
    
    // Add to all users list
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    allUsers.push(verifiedUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));

    // Clean up
    localStorage.removeItem('pendingUser');
    delete verificationCodes[user.email];
    localStorage.setItem('verificationCodes', JSON.stringify(verificationCodes));

    // Auto login
    localStorage.setItem('user', JSON.stringify(verifiedUser));
    setUser(verifiedUser);
  };

  const signin = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Please fill in all fields');
    }

    // Get stored credentials
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
    const correctPassword = userCredentials[email];

    if (!correctPassword || correctPassword !== password) {
      throw new Error('Invalid email or password');
    }

    // Get user data
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const foundUser = allUsers.find((u: any) => u.email === email);

    if (!foundUser) {
      throw new Error('User not found');
    }

    localStorage.setItem('user', JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('Not logged in');

    const updatedUser = { ...user, ...updates };
    
    // Update in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update in allUsers list
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const index = allUsers.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      allUsers[index] = updatedUser;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }

    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, signin, logout, updateProfile, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
