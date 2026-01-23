'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'polyplot_isLoggedIn';

export function AuthProvider({ children }: { children: ReactNode }) {
  // 初始状态始终为 false，避免 hydration 不匹配
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 客户端挂载后从 localStorage 恢复登录状态
  useEffect(() => {
    // 这是一个合理的使用场景：在客户端挂载后同步外部状态（localStorage）
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedInState(true);
    }
  }, []);

  // 包装 setIsLoggedIn，同时更新 localStorage
  const setIsLoggedIn = (value: boolean) => {
    setIsLoggedInState(value);
    localStorage.setItem(AUTH_STORAGE_KEY, String(value));
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        openLoginModal,
        closeLoginModal,
        isLoginModalOpen,
      }}
    >
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
