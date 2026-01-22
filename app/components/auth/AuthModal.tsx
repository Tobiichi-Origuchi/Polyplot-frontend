'use client';

import { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [email, setEmail] = useState('');

  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const title = mode === 'signup' ? 'Join Narrative' : 'Welcome Back';

  const handleGoogleLogin = () => {
    // TODO: 实现 Google 登录逻辑
    console.log('Google login clicked');
  };

  const handleEmailContinue = () => {
    // TODO: 实现邮箱登录逻辑
    console.log('Email continue clicked:', email);
  };

  const handleWalletConnect = (wallet: string) => {
    // TODO: 实现钱包连接逻辑
    console.log('Wallet connect clicked:', wallet);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-bg-card rounded-3xl border border-border-primary shadow-2xl p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-text-primary text-center mb-8">
            {title}
          </h2>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-3 mb-6"
          >
            {/* Google Icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border-primary"></div>
            <span className="text-text-tertiary text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-border-primary"></div>
          </div>

          {/* Email Input with Continue Button */}
          <div className="flex gap-3 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-bg-secondary text-text-primary placeholder:text-text-tertiary border border-border-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-long transition-all"
            />
            <button
              onClick={handleEmailContinue}
              className="bg-long hover:bg-long-hover text-black font-bold px-8 py-3.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Continue
            </button>
          </div>

          {/* Wallet Options */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* MetaMask */}
            <button
              onClick={() => handleWalletConnect('metamask')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex items-center justify-center transition-colors group"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform">
                🦊
              </div>
            </button>

            {/* Coinbase */}
            <button
              onClick={() => handleWalletConnect('coinbase')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex items-center justify-center transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">C</span>
              </div>
            </button>

            {/* Phantom */}
            <button
              onClick={() => handleWalletConnect('phantom')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex items-center justify-center transition-colors group"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl">👻</span>
              </div>
            </button>

            {/* WalletConnect */}
            <button
              onClick={() => handleWalletConnect('walletconnect')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex items-center justify-center transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">W</span>
              </div>
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="flex items-center justify-center gap-2 text-text-tertiary text-sm">
            <a
              href="/terms"
              className="hover:text-text-primary transition-colors"
            >
              Terms
            </a>
            <span>•</span>
            <a
              href="/privacy"
              className="hover:text-text-primary transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
