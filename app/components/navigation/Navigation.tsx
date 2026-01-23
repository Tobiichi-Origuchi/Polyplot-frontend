'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import BalanceDisplay from './BalanceDisplay';
import UserAvatar from './UserAvatar';
import ThemeToggle from './ThemeToggle';
import WalletModal from '../auth/WalletModal';
import DepositModal from '../deposit/DepositModal';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Navigation() {
  const { isLoggedIn, setIsLoggedIn, openLoginModal, closeLoginModal, isLoginModalOpen } = useAuth();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [userBalance] = useState(1240.50); // TODO: 从用户数据或 context 中获取真实余额
  const router = useRouter();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // 登录成功后跳转到首页
    router.push('/');
    // 注意：不需要在这里关闭弹窗，WalletModal 会在动画完成后自动处理
  };

  const handleDeposit = () => {
    setIsDepositModalOpen(true);
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-border-primary">
        <div className="flex items-center justify-between h-20 px-6 lg:px-12">
          {/* Left Section: Logo */}
          <Logo />

          {/* Center Section: Search Bar */}
          <div className="flex items-center flex-1 mx-8">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                {/* Logged In State */}
                <NavLinks />
                <BalanceDisplay balance={userBalance} onDeposit={handleDeposit} />
                <UserAvatar onLogout={handleLogout} />
              </>
            ) : (
              <>
                {/* Logged Out State */}
                {/* Log In Button */}
                <button
                  onClick={openLoginModal}
                  className="text-text-primary hover:text-long transition-colors font-semibold px-6 py-2.5"
                >
                  Log In
                </button>

                {/* Sign Up Button */}
                <button
                  onClick={openLoginModal}
                  className="bg-long hover:bg-long-hover text-black font-bold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Theme Toggle - Always Visible */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Wallet Modal - Outside header for proper centering */}
      <WalletModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={handleCloseDepositModal}
        balance={userBalance}
      />
    </>
  );
}
