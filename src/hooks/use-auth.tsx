// src/hooks/use-auth.tsx
"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  verify2FA: (email: string, code: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (email: string, code: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // If on a protected route and not authenticated, redirect to login
        if (window.location.pathname.startsWith('/dashboard')) {
          router.push('/signin');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      return data; // Return data for 2FA step
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const verify2FA = async (email: string, code: string) => {
    try {
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '2FA verification failed');
      }

      const data = await response.json();
      setUser(data.user);
      
      // Save token in localStorage for API requests
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      router.push('/dashboard');
    } catch (error) {
      console.error('2FA verification error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      const data = await response.json();
      return data; // Return data for email verification step
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const verifyEmail = async (email: string, code: string, name: string, password: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          code,
          name,
          password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Email verification failed');
      }

      const data = await response.json();
      setUser(data.user);

      // Save token in localStorage for API requests
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include' // Include cookies in the request
      });
      setUser(null);
      localStorage.removeItem('token');
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    verify2FA,
    signup,
    verifyEmail,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);