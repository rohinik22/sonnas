"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('sonnas-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('sonnas-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app, this would be an actual API request
      const storedUsers = JSON.parse(localStorage.getItem('sonnas-users') || '[]');
      const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone
        };
        setUser(userWithoutPassword);
        localStorage.setItem('sonnas-user', JSON.stringify(userWithoutPassword));
        setIsLoginModalOpen(false);
        
        // Handle post-login actions
        const postLoginAction = localStorage.getItem('postLoginAction');
        if (postLoginAction === 'navigateToMenu') {
          localStorage.removeItem('postLoginAction');
          // Use setTimeout to ensure modal closes first
          setTimeout(() => {
            document.getElementById('menu')?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app, this would be an actual API request
      const storedUsers = JSON.parse(localStorage.getItem('sonnas-users') || '[]');
      
      // Check if user already exists
      if (storedUsers.find((u: any) => u.email === email)) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        phone
      };

      storedUsers.push(newUser);
      localStorage.setItem('sonnas-users', JSON.stringify(storedUsers));

      // Auto login after registration
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      };
      setUser(userWithoutPassword);
      localStorage.setItem('sonnas-user', JSON.stringify(userWithoutPassword));
      setIsLoginModalOpen(false);
      
      // Handle post-login actions for registration too
      const postLoginAction = localStorage.getItem('postLoginAction');
      if (postLoginAction === 'navigateToMenu') {
        localStorage.removeItem('postLoginAction');
        // Use setTimeout to ensure modal closes first
        setTimeout(() => {
          document.getElementById('menu')?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sonnas-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
