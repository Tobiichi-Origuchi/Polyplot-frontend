'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import AvatarDropdown from './AvatarDropdown';

interface UserAvatarProps {
  avatarUrl?: string;
  isOnline?: boolean;
  onLogout?: () => void;
  username?: string;
  walletAddress?: string;
}

export default function UserAvatar({
  avatarUrl,
  isOnline = true,
  onLogout,
  username,
  walletAddress,
}: UserAvatarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="relative">
      <button
        ref={avatarRef}
        onClick={handleAvatarClick}
        className="relative hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border-primary bg-bg-secondary flex items-center justify-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="text-text-secondary" size={20} />
          )}
        </div>

        {/* Online Status Indicator */}
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-bg-primary" />
        )}
      </button>

      {/* Dropdown Menu */}
      <AvatarDropdown
        isOpen={isDropdownOpen}
        onClose={handleCloseDropdown}
        onLogout={handleLogout}
        avatarRef={avatarRef}
        username={username}
        walletAddress={walletAddress}
      />
    </div>
  );
}
