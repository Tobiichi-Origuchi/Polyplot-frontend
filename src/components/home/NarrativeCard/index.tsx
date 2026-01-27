'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthorizationModal from '@/components/auth/AuthorizationModal';
import CardHeader from './CardHeader';
import DefaultView from './DefaultView';
import InputView from './InputView';
import { NarrativeCardProps, TradeType } from './types';

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
  const [tradeType, setTradeType] = useState<TradeType>('long');
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
    setAmount(100);
  };

  const handleConfirm = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setIsAuthModalOpen(true);
  };

  const handleAuthComplete = () => {
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
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setAmount(0);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setAmount(Math.min(Math.max(numValue, 1), 1000));
    }
  };

  const handleAmountBlur = () => {
    if (amount < 1) {
      setAmount(1);
    }
  };

  const handleSliderChange = (value: number) => {
    setAmount(value);
  };

  const currentPrice = (tradeType === 'long' ? basePriceLong : basePriceShort).toFixed(2);
  const potentialProfit = (amount * 0.15).toFixed(2);

  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-border-primary shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-long/50 transition-all duration-300 ease-out">
      {/* 卡片头部背景图 */}
      <CardHeader
        imageUrl={imageUrl}
        title={title}
        category={category}
        statusBadge={statusBadge}
        onClick={handleImageClick}
      />

      {/* 卡片内容 */}
      <div
        className="p-6 h-70 flex flex-col relative bg-bg-card rounded-t-2xl transition-all duration-300"
        style={{
          transform: isInputMode ? 'translateY(-4rem)' : 'translateY(0)',
        }}
      >
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
          <DefaultView
            title={title}
            description={description}
            longPercentage={longPercentage}
            shortPercentage={shortPercentage}
            volume={volume}
            participants={participants}
            participantImages={participantImages}
            onBuyLong={handleBuyLongClick}
            onBuyShort={handleBuyShortClick}
          />
        ) : (
          <InputView
            title={title}
            description={description}
            tradeType={tradeType}
            amount={amount}
            currentPrice={currentPrice}
            potentialProfit={potentialProfit}
            longPercentage={longPercentage}
            shortPercentage={shortPercentage}
            onAmountChange={handleAmountChange}
            onAmountBlur={handleAmountBlur}
            onQuickAdd={handleQuickAdd}
            onSliderChange={handleSliderChange}
            onConfirm={handleConfirm}
          />
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

export type { NarrativeCardProps } from './types';
