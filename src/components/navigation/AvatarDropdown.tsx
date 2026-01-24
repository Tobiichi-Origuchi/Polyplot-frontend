'use client';

import { useEffect, useRef, RefObject, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, User, Copy, CircleDollarSign, Check, Settings } from 'lucide-react';

interface AvatarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  avatarRef: RefObject<HTMLButtonElement | null>;
  username?: string;
  walletAddress?: string;
}

export default function AvatarDropdown({
  isOpen,
  onClose,
  onLogout,
  avatarRef,
  username = 'craeyjiiii',
  walletAddress = '0xCD94...65c2'
}: AvatarDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [toastPosition, setToastPosition] = useState({ top: 0, left: 0 });
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
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

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发父元素的点击事件
    if (walletAddress && copyButtonRef.current) {
      navigator.clipboard.writeText(walletAddress);

      // 计算 toast 位置
      const rect = copyButtonRef.current.getBoundingClientRect();
      setToastPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8, // 按钮右侧 8px
      });

      // 显示复制成功提示
      setShowCopyToast(true);

      // 清除之前的定时器
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      // 3秒后自动隐藏
      toastTimeoutRef.current = setTimeout(() => {
        setShowCopyToast(false);
        toastTimeoutRef.current = null;
      }, 3000);
    }
  };

  const handleProfileClick = () => {
    if (username) {
      router.push(`/@${username}`);
      handleClose();
    }
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发父元素的点击事件
    router.push('/setting');
    handleClose();
  };

  const handleLeaderboardClick = () => {
    // TODO: Navigate to leaderboard page
    console.log('Navigate to leaderboard');
    handleClose();
  };

  const handleRewardsClick = () => {
    // TODO: Navigate to rewards page
    console.log('Navigate to rewards');
    handleClose();
  };

  const handleDocsClick = () => {
    // TODO: Open official docs
    window.open('https://docs.example.com', '_blank');
    handleClose();
  };

  const handleSupportClick = () => {
    // TODO: Open support page
    console.log('Navigate to support');
    handleClose();
  };

  const handleTermsClick = () => {
    // TODO: Open terms of use page
    console.log('Navigate to terms');
    handleClose();
  };

  const handleLogoutClick = () => {
    console.log('User logged out');
    onLogout();
    handleClose();
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className={`absolute top-full right-0 mt-2 w-64 bg-bg-card rounded-xl border border-border-primary shadow-2xl overflow-hidden z-50 ${
          isClosing
            ? 'animate-[dropdown-fade-out_0.2s_ease-in]'
            : 'animate-[dropdown-fade-in_0.2s_ease-out]'
        }`}
      >
      {/* User Info Section */}
      <div className="border-b border-border-primary">
        <div
          onClick={handleProfileClick}
          className="w-full p-4 flex items-center gap-3 hover:bg-bg-secondary transition-colors group cursor-pointer relative"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleProfileClick();
            }
          }}
        >
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-long flex items-center justify-center flex-shrink-0">
            <User size={28} className="text-white" strokeWidth={2} />
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-text-primary text-base font-bold mb-0.5 group-hover:text-long transition-colors">
              {username}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="text-text-secondary text-xs font-medium truncate">
                {walletAddress}
              </span>
              <button
                ref={copyButtonRef}
                onClick={handleCopyAddress}
                className="text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0"
                aria-label="Copy address"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          {/* Settings Icon */}
          <button
            onClick={handleSettingsClick}
            className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        {/* Leaderboard */}
        <button
          onClick={handleLeaderboardClick}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-bg-secondary text-text-primary hover:bg-long hover:text-black transition-colors group"
        >
          <Trophy size={18} className="text-text-primary group-hover:text-black transition-colors" />
          <span className="font-medium text-sm">Leaderboard</span>
        </button>

        {/* Rewards */}
        <button
          onClick={handleRewardsClick}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-bg-secondary text-text-primary hover:bg-long hover:text-black transition-colors group"
        >
          <CircleDollarSign size={18} className="text-text-primary group-hover:text-black transition-colors" />
          <span className="font-medium text-sm">Rewards</span>
        </button>

        {/* Divider */}
        <div className="border-t border-border-primary my-1.5"></div>

        {/* Official Docs */}
        <button
          onClick={handleDocsClick}
          className="w-full flex items-start px-4 py-2.5 bg-bg-secondary text-text-primary hover:bg-long hover:text-black transition-colors"
        >
          <span className="font-medium text-sm">Official Docs</span>
        </button>

        {/* Support */}
        <button
          onClick={handleSupportClick}
          className="w-full flex items-start px-4 py-2.5 bg-bg-secondary text-text-primary hover:bg-long hover:text-black transition-colors"
        >
          <span className="font-medium text-sm">Support</span>
        </button>

        {/* Terms of Use */}
        <button
          onClick={handleTermsClick}
          className="w-full flex items-start px-4 py-2.5 bg-bg-secondary text-text-primary hover:bg-long hover:text-black transition-colors"
        >
          <span className="font-medium text-sm">Terms of Use</span>
        </button>

        {/* Divider */}
        <div className="border-t border-border-primary my-1.5"></div>

        {/* Log Out */}
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-start px-4 py-2.5 text-left bg-bg-secondary text-red-500 hover:bg-long hover:text-black transition-colors"
        >
          <span className="font-medium text-sm">Log Out</span>
        </button>
      </div>
      </div>

      {/* Copy Success Toast - Outside dropdown to avoid overflow clipping */}
      {showCopyToast && (
        <div
          className="fixed z-[100] whitespace-nowrap"
          style={{
            top: `${toastPosition.top}px`,
            left: `${toastPosition.left}px`,
            transform: 'translateY(-50%)',
            animation: 'toast-slide-in 0.2s ease-out',
          }}
        >
          <div className="bg-bg-card border border-border-primary rounded-lg px-3 py-2 shadow-2xl flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-new flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-text-primary font-medium text-xs">Copied!</span>
          </div>
        </div>
      )}
    </>
  );
}
