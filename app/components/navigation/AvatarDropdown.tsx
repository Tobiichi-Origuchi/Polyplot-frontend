'use client';

import { useEffect, useRef, RefObject, useState, useCallback } from 'react';
import { Briefcase, User, FileText, LogOut } from 'lucide-react';

interface AvatarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  avatarRef: RefObject<HTMLButtonElement>;
}

export default function AvatarDropdown({ isOpen, onClose, onLogout, avatarRef }: AvatarDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 管理渲染状态
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      setIsClosing(false);

      // 清除任何待执行的关闭定时器
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // 处理关闭动画
  const handleClose = useCallback(() => {
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
      onClose();
      closeTimeoutRef.current = null;
    }, 200); // 与动画时长一致
  }, [isClosing, onClose]);

  // 点击外部关闭下拉菜单（包括点击 Avatar 本身）
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // 检查点击是否在下拉菜单或 Avatar 按钮内
      const isClickInsideDropdown = dropdownRef.current?.contains(target);
      const isClickOnAvatar = avatarRef.current?.contains(target);

      // 如果点击既不在下拉菜单内，也不在 Avatar 按钮内，则关闭
      if (!isClickInsideDropdown && !isClickOnAvatar) {
        handleClose();
      }
    };

    if (isOpen && !isClosing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isClosing, avatarRef, handleClose]);

  // 监听 isOpen 变化，当从 true 变为 false 时触发关闭动画
  useEffect(() => {
    if (!isOpen && shouldRender && !isClosing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleClose();
    }
  }, [isOpen, shouldRender, isClosing, handleClose]);

  if (!shouldRender) return null;

  const handlePositionsClick = () => {
    // TODO: Navigate to positions page
    console.log('Navigate to positions');
    handleClose();
  };

  const handleProfileClick = () => {
    // TODO: Navigate to profile page
    console.log('Navigate to profile');
    handleClose();
  };

  const handleDocsClick = () => {
    // TODO: Open official docs
    console.log('Open official docs');
    handleClose();
  };

  const handleLogoutClick = () => {
    console.log('User logged out');
    onLogout();
    handleClose();
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full right-0 mt-2 w-52 bg-bg-card rounded-xl border border-border-primary shadow-2xl overflow-hidden z-50 ${
        isClosing
          ? 'animate-[dropdown-fade-out_0.2s_ease-in]'
          : 'animate-[dropdown-fade-in_0.2s_ease-out]'
      }`}
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
