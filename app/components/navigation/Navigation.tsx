'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Info } from 'lucide-react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import BalanceDisplay from './BalanceDisplay';
import UserAvatar from './UserAvatar';
import ThemeToggle from './ThemeToggle';
import AuthModal from '../auth/AuthModal';

export default function Navigation() {
  // TODO: 后续替换为真实的用户登录状态
  const [isLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  const handleOpenAuthModal = (mode: 'signup' | 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
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
                <BalanceDisplay />
                <UserAvatar />
              </>
            ) : (
              <>
                {/* Logged Out State */}
                {/* How it works Link */}
                <Link
                  href="/how-it-works"
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-semibold"
                >
                  <Info size={20} />
                  <span>How it works</span>
                </Link>

                {/* Log In Button */}
                <button
                  onClick={() => handleOpenAuthModal('login')}
                  className="text-text-primary hover:text-long transition-colors font-semibold px-6 py-2.5"
                >
                  Log In
                </button>

                {/* Sign Up Button */}
                <button
                  onClick={() => handleOpenAuthModal('signup')}
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

      {/* Auth Modal - Outside header for proper centering */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        mode={authMode}
      />
    </>
  );
}
