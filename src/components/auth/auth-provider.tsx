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
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate checking for an existing session
    setTimeout(() => {
      // Ensure user is logged out on initial load
      setUser(null); 
      setIsUserLoading(false);
      setLoginDialogOpen(true);
    }, 1000);
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    setLoginDialogOpen(false);
  };

  const logout = () => {
    setUser(null);
    setLoginDialogOpen(true);
  };

  const value = { user, isUserLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {!user && !isUserLoading && (
         <LoginDialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen} />
      )}
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
