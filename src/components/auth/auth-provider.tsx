'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginDialog } from './login-dialog';

interface User {
  displayName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isUserLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    const sessionCheck = setTimeout(() => {
      setUser(null); 
      setIsUserLoading(false);
    }, 1000);
    return () => clearTimeout(sessionCheck);
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, isUserLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
