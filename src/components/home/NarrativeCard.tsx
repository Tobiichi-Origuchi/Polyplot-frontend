'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, ThumbsDown, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import StatusBadge from './StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import AuthorizationModal from '@/components/auth/AuthorizationModal';

export interface NarrativeCardProps {
  id: string;
  category: string;
  statusBadge?: {
    type: 'new' | 'hot' | 'left';
    text: string;
  };
  imageUrl: string;
  title: string;
  description: string;
  longPercentage: number;
  shortPercentage: number;
  volume: string;
  participants: number;
  participantImages?: string[];
  onBuyLong?: () => void;
  onBuyShort?: () => void;
}

export default function NarrativeCard({
  id,
  category,
  statusBadge,
  imageUrl,
  title,
  description,
  longPercentage,
  shortPercentage,
  volume,
  participants,
  participantImages = [],
  onBuyLong,
  onBuyShort,
}: NarrativeCardProps) {
  const router = useRouter();
  const { isLoggedIn, openLoginModal } = useAuth();
  const [isInputMode, setIsInputMode] = useState(false);
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long');
  const [amount, setAmount] = useState(100);
  const [basePriceLong] = useState(() => 0.72 + Math.random() * 0.05);
  const [basePriceShort] = useState(() => 0.28 + Math.random() * 0.05);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleImageClick = () => {
    router.push(`/narrative/${id}`);
  };

  const handleBuyLongClick = () => {
    setTradeType('long');
    setIsInputMode(true);
  };

  const handleBuyShortClick = () => {
    setTradeType('short');
    setIsInputMode(true);
  };

  const handleCloseInput = () => {
    setIsInputMode(false);
    setAmount(100); // 重置金额
  };

  const handleConfirm = () => {
    // 检查用户是否登录
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    // 用户已登录，打开授权弹窗
    setIsAuthModalOpen(true);
  };

  const handleAuthComplete = () => {
    // 授权完成后执行交易逻辑
    if (tradeType === 'long' && onBuyLong) {
      onBuyLong();
    } else if (tradeType === 'short' && onBuyShort) {
      onBuyShort();
    }
    handleCloseInput();
  };

  const handleQuickAdd = (value: number) => {
    setAmount(prev => Math.min(prev + value, 1000));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 只允许数字
    if (value === '') {
      setAmount(0);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setAmount(Math.min(Math.max(numValue, 1), 1000)); // 限制在 1-1000 范围内
    }
  };

  const handleAmountBlur = () => {
    // 失焦时确保至少为 1
    if (amount < 1) {
      setAmount(1);
    }
  };

  // 模拟数据
  const currentPrice = (tradeType === 'long' ? basePriceLong : basePriceShort).toFixed(2);
  const potentialProfit = (amount * 0.15).toFixed(2);

  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-border-primary shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-long/50 transition-all duration-300 ease-out">
      {/* 卡片头部背景图 */}
      <div
        className="relative h-48 bg-linear-to-br from-bg-secondary to-bg-primary overflow-hidden cursor-pointer group"
        onClick={handleImageClick}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
        />

        {/* 标签组 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <CategoryBadge category={category} />
          {statusBadge && (
            <StatusBadge type={statusBadge.type} text={statusBadge.text} />
          )}
        </div>
      </div>

      {/* 卡片内容 */}
      <div
        className="p-6 h-70 flex flex-col relative bg-bg-card rounded-t-2xl transition-all duration-300"
        style={{
          transform: isInputMode ? 'translateY(-4rem)' : 'translateY(0)',
        }}
      >
        <h3 className="text-text-primary font-bold text-xl mb-2 truncate">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 h-10">
          {description}
        </p>

        {/* 关闭按钮 - 只在输入模式时显示 */}
        {isInputMode && (
          <button
            onClick={handleCloseInput}
            className="absolute top-3.5 right-2 text-text-tertiary hover:text-text-primary transition-colors"
          >
            <X size={24} />
          </button>
        )}

        {!isInputMode ? (
          <>
            {/* 进度条 */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-long font-semibold">{longPercentage}% LONG</span>
                <span className="text-short font-semibold">{shortPercentage}% SHORT</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden flex">
                <div
                  className="bg-long transition-all duration-300"
                  style={{ width: `${longPercentage}%` }}
                ></div>
                <div
                  className="bg-short transition-all duration-300"
                  style={{ width: `${shortPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* 统计信息 */}
            <div className="flex items-center justify-between mb-4 text-text-secondary text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp size={16} />
                <span>{volume} Vol</span>
              </div>

              <div className="flex items-center gap-2">
                {/* 用户头像群组 */}
                {participantImages.length > 0 && (
                  <div className="flex -space-x-2">
                    {participantImages.slice(0, 3).map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`User ${idx + 1}`}
                        width={24}
                        height={24}
                        className="rounded-full border-2 border-bg-card"
                      />
                    ))}
                  </div>
                )}
                {participants > participantImages.length && (
                  <span className="text-text-secondary font-semibold">
                    +{participants - participantImages.length}
                  </span>
                )}
              </div>
            </div>

            {/* 按钮组 */}
            <div className="flex gap-3">
              <button
                onClick={handleBuyLongClick}
                className="flex-1 bg-long hover:bg-long-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ThumbsUp size={18} />
                Buy Long
              </button>
              <button
                onClick={handleBuyShortClick}
                className="flex-1 bg-short hover:bg-short-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ThumbsDown size={18} />
                Buy Short
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 金额输入界面 */}
            <div className="relative flex-1 flex flex-col">
              {/* Position Amount 和 Buying Long/Short 标签 */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-text-secondary text-sm font-medium">
                  Position Amount
                </span>
                <span className={`${tradeType === 'long' ? 'bg-long text-black' : 'bg-short text-white'} px-3 py-1 rounded-md text-sm font-semibold`}>
                  Buying {tradeType === 'long' ? 'Long' : 'Short'}
                </span>
              </div>

              {/* 金额输入行：金额输入框、快捷按钮、滑块 */}
              <div className="flex gap-3 mb-4">
                {/* 金额输入框和快捷按钮合并 - 60% 宽度 */}
                <div className="w-[60%] bg-bg-secondary border border-border-primary rounded-xl px-4 py-3 flex items-center justify-between gap-3 focus-within:border-long/50 transition-colors">
                  <div
                    className="flex items-center gap-2 flex-1 min-w-0 cursor-text"
                    onClick={(e) => {
                      // 点击容器时聚焦输入框
                      const input = e.currentTarget.querySelector('input');
                      input?.focus();
                    }}
                  >
                    <span className="text-text-primary text-xl font-bold">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={amount}
                      onChange={handleAmountChange}
                      onBlur={handleAmountBlur}
                      className="bg-transparent text-text-primary text-xl font-bold outline-none w-full min-w-0"
                      placeholder="100"
                    />
                  </div>
                  {/* 快捷按钮 */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleQuickAdd(1)}
                      className="bg-bg-primary hover:bg-bg-card text-text-primary font-semibold px-2.5 py-1 rounded-md transition-colors text-sm whitespace-nowrap"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => handleQuickAdd(10)}
                      className="bg-bg-primary hover:bg-bg-card text-text-primary font-semibold px-2.5 py-1 rounded-md transition-colors text-sm whitespace-nowrap"
                    >
                      +10
                    </button>
                  </div>
                </div>

                {/* 滑块 - 40% 宽度 */}
                <div className="w-[40%] flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className={`w-full h-2 rounded-full appearance-none cursor-pointer ${tradeType === 'long' ? 'text-long' : 'text-short'}`}
                    style={{
                      background: `linear-gradient(to right, ${tradeType === 'long' ? '#fb923c' : '#a855f7'} 0%, ${tradeType === 'long' ? '#fb923c' : '#a855f7'} ${(amount / 1000) * 100}%, #1a1a1a ${(amount / 1000) * 100}%, #1a1a1a 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* 收益和单价信息 */}
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex flex-col">
                  <span className="text-text-tertiary text-xs">Current Price</span>
                  <span className="text-text-primary text-sm font-semibold">${currentPrice}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-text-tertiary text-xs">Potential Profit</span>
                  <span className={`text-sm font-semibold ${tradeType === 'long' ? 'text-long' : 'text-short'}`}>
                    +${potentialProfit}
                  </span>
                </div>
              </div>

              {/* 确认按钮 */}
              <button
                onClick={handleConfirm}
                className={`w-full ${tradeType === 'long' ? 'bg-long hover:bg-long-hover text-black' : 'bg-short hover:bg-short-hover text-white'} font-bold py-3 rounded-lg transition-colors mb-4`}
              >
                Confirm {tradeType === 'long' ? 'Long' : 'Short'}
              </button>

              {/* 进度条 */}
              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-long font-semibold">{longPercentage}% LONG</span>
                  <span className="text-short font-semibold">{shortPercentage}% SHORT</span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden flex">
                  <div
                    className="bg-long transition-all duration-300"
                    style={{ width: `${longPercentage}%` }}
                  ></div>
                  <div
                    className="bg-short transition-all duration-300"
                    style={{ width: `${shortPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Authorization Modal */}
      <AuthorizationModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onComplete={handleAuthComplete}
      />
    </div>
  );
}
