'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function WalletModal({ isOpen, onClose, onLoginSuccess }: WalletModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 管理渲染状态和背景滚动
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';

      // 清除任何待执行的关闭定时器
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // 处理关闭动画（带登录回调）
  const handleClose = (shouldLogin: boolean = false) => {
    if (isClosing) return; // 防止重复触发

    setIsClosing(true);

    // 清除之前的定时器（如果有）
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // 等待动画完成后再真正关闭
    closeTimeoutRef.current = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);

      // 如果是登录操作，先调用登录成功回调
      if (shouldLogin) {
        onLoginSuccess();
      }

      // 无论如何都要调用 onClose 来更新父组件的状态
      onClose();

      closeTimeoutRef.current = null;
    }, 200); // 与动画时长一致
  };

  if (!shouldRender) return null;

  const handleWalletConnect = (wallet: string) => {
    console.log('Wallet connected:', wallet);
    // 先播放退出动画，动画完成后自动登录
    handleClose(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
          isClosing
            ? 'animate-[backdrop-fade-out_0.2s_ease-in-out]'
            : 'animate-[backdrop-fade-in_0.25s_ease-out]'
        }`}
        onClick={() => handleClose(false)}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-md mx-4 ${
          isClosing
            ? 'animate-[modal-slide-out_0.2s_ease-in-out]'
            : 'animate-[modal-slide-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
      >
        <div className="bg-bg-card rounded-3xl border border-border-primary shadow-2xl p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-text-primary text-center mb-8">
            Connect Wallet
          </h2>

          {/* Wallet Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* MetaMask */}
            <button
              onClick={() => handleWalletConnect('metamask')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">
                🦊
              </div>
              <span className="text-text-primary font-semibold">MetaMask</span>
            </button>

            {/* Coinbase */}
            <button
              onClick={() => handleWalletConnect('coinbase')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-3xl font-bold">C</span>
              </div>
              <span className="text-text-primary font-semibold">Coinbase</span>
            </button>

            {/* Phantom */}
            <button
              onClick={() => handleWalletConnect('phantom')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-3xl">👻</span>
              </div>
              <span className="text-text-primary font-semibold">Phantom</span>
            </button>

            {/* WalletConnect */}
            <button
              onClick={() => handleWalletConnect('walletconnect')}
              className="aspect-square bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-3xl font-bold">W</span>
              </div>
              <span className="text-text-primary font-semibold">WalletConnect</span>
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="flex items-center justify-center gap-2 text-text-tertiary text-sm">
            <Link
              href="/terms"
              className="hover:text-text-primary transition-colors"
            >
              Terms
            </Link>
            <span>•</span>
            <Link
              href="/privacy"
              className="hover:text-text-primary transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
