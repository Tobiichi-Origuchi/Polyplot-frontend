'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SiweMessage } from 'siwe';
import { getAddress } from 'viem';
// import userApi from '@/utils/api/user'; // 已注释，用于测试 UI 交互流程
import { handleApiError } from '@/utils/api/examples';
import LoadingSpinner from './LoadingSpinner';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function WalletModal({ isOpen, onClose, onLoginSuccess }: WalletModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 管理渲染状态和背景滚动
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setIsLoading(false); // 重置加载状态
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

  const handleWalletConnect = async (wallet: string) => {
    const walletNames: { [key: string]: string } = {
      metamask: 'MetaMask',
      coinbase: 'Coinbase',
      phantom: 'Phantom',
      walletconnect: 'WalletConnect',
    };

    console.log('=== 开始钱包登录流程 ===');
    console.log('选择的钱包:', wallet);

    try {
      setIsLoading(true);
      setLoadingMessage(`Connecting to ${walletNames[wallet]}...`);

      // 检查是否安装了钱包扩展
      console.log('检查 window.ethereum:', typeof window.ethereum);
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask or another Web3 wallet to continue.');
      }

      // Step 1: 请求连接钱包并获取账户
      console.log('请求连接钱包...');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[];
      console.log('获取到的账户:', accounts);

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }

      // 将地址转换为 EIP-55 格式（校验和格式）
      console.log('原始地址:', accounts[0]);
      const walletAddress = getAddress(accounts[0] as `0x${string}`);
      console.log('EIP-55 格式地址:', walletAddress);

      // Step 2: 生成 SIWE 消息
      setLoadingMessage('Preparing signature...');
      console.log('生成 SIWE 消息...');

      const message = new SiweMessage({
        domain: window.location.host,
        address: walletAddress,
        statement: 'Sign in with Ethereum to Polyplot',
        uri: window.location.origin,
        version: '1',
        chainId: 137, // Polygon Mainnet
        nonce: Math.floor(Math.random() * 100000000).toString(),
      });

      const messageString = message.prepareMessage();
      console.log('SIWE 消息:', messageString);

      // Step 3: 请求用户签名
      setLoadingMessage('Waiting for signature...');
      console.log('请求用户签名...');

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [messageString, walletAddress],
      });

      console.log('签名成功:', signature);

      // Step 4: 调用登录 API
      setLoadingMessage('Authenticating...');
      console.log('调用登录 API...');
      console.log('API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

      // ========== API 调用已注释，用于测试 UI 交互流程 ==========
      // const loginData = await userApi.loginWithSiwe(messageString, signature);
      // console.log('登录成功!');
      // console.log('用户数据:', loginData);

      // 模拟延迟，测试 UI 交互
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('模拟登录成功（API 调用已禁用）');
      // ========================================================

      // Step 5: 登录成功，关闭弹窗
      setIsLoading(false);
      handleClose(true);
    } catch (error: unknown) {
      setIsLoading(false);
      console.error('=== 钱包登录失败 ===');
      console.error('错误详情:', error);

      // 处理用户拒绝签名
      if (error && typeof error === 'object' && 'code' in error && error.code === 4001) {
        alert('Signature rejected. Please try again.');
        return;
      }

      // 处理其他错误
      const errorMessage = handleApiError(error);
      console.error('错误消息:', errorMessage);
      alert(errorMessage);
    }
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
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-bg-card/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
              <LoadingSpinner
                size="lg"
                message={loadingMessage}
                variant="long"
              />
            </div>
          )}

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
