'use client';

import { useEffect, useRef } from 'react';
import { Briefcase, User, FileText, LogOut } from 'lucide-react';

interface AvatarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function AvatarDropdown({ isOpen, onClose, onLogout }: AvatarDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePositionsClick = () => {
    // TODO: Navigate to positions page
    console.log('Navigate to positions');
    onClose();
  };

  const handleProfileClick = () => {
    // TODO: Navigate to profile page
    console.log('Navigate to profile');
    onClose();
  };

  const handleDocsClick = () => {
    // TODO: Open official docs
    console.log('Open official docs');
    onClose();
  };

  const handleLogoutClick = () => {
    console.log('User logged out');
    onLogout();
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-52 bg-bg-card rounded-xl border border-border-primary shadow-2xl overflow-hidden animate-[dropdown-fade-in_0.2s_ease-out] z-50"
    >
      {/* Positions */}
      <button
        onClick={handlePositionsClick}
        className="w-full flex items-center gap-3 px-4 py-3 text-text-primary hover:bg-long hover:text-black transition-colors group"
      >
        <Briefcase size={20} className="text-text-secondary group-hover:text-black transition-colors" />
        <span className="font-semibold">Positions</span>
      </button>

      {/* Profile */}
      <button
        onClick={handleProfileClick}
        className="w-full flex items-center gap-3 px-4 py-3 text-text-primary hover:bg-long hover:text-black transition-colors group"
      >
        <User size={20} className="text-text-secondary group-hover:text-black transition-colors" />
        <span className="font-semibold">Profile</span>
      </button>

      {/* Official Docs */}
      <button
        onClick={handleDocsClick}
        className="w-full flex items-center gap-3 px-4 py-3 text-text-primary hover:bg-long hover:text-black transition-colors group"
      >
        <FileText size={20} className="text-text-secondary group-hover:text-black transition-colors" />
        <span className="font-semibold">Official Docs</span>
      </button>

      {/* Log Out */}
      <button
        onClick={handleLogoutClick}
        className="w-full flex items-center gap-3 px-4 py-3 text-text-primary hover:bg-long hover:text-black transition-colors group"
      >
        <LogOut size={20} className="text-red-500 group-hover:text-black transition-colors" />
        <span className="font-semibold">Log Out</span>
      </button>
    </div>
  );
}
