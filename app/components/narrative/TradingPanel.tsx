'use client'

import { useState } from 'react'
import PriceDisplay from './PriceDisplay'
import AmountInput from './AmountInput'
import PercentageButtons from './PercentageButtons'
import TradeInfo from './TradeInfo'

interface TradingPanelProps {
  currentPrice: number
  priceChange: number
  userBalance: number
  onTrade?: (type: 'long' | 'short', mode: 'buy' | 'sell', amount: number) => void
}

export default function TradingPanel({
  currentPrice,
  priceChange,
  userBalance,
  onTrade,
}: TradingPanelProps) {
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy')
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long')
  const [amount, setAmount] = useState<number>(0)

  // 计算交易信息
  const estimatedShares = amount > 0 ? amount / currentPrice : 0
  const avgPrice = currentPrice
  const maxProfit = amount > 0 ? amount * 0.28 : 0 // 简化计算，实际应该更复杂

  const handlePercentageSelect = (percentage: number) => {
    const newAmount = (userBalance * percentage) / 100
    setAmount(Number(newAmount.toFixed(2)))
  }

  const handleConfirm = () => {
    if (amount > 0 && onTrade) {
      onTrade(tradeType, tradeMode, amount)
    }
  }

  const isDisabled = amount <= 0 || amount > userBalance

  return (
    <div className="bg-bg-card rounded-2xl p-5 border border-border-primary sticky top-24">
      {/* Buy/Sell 标签切换 */}
      <div className="flex border-b border-border-primary mb-4">
        <button
          onClick={() => setTradeMode('buy')}
          className={`flex-1 pb-2.5 font-semibold transition-colors relative ${
            tradeMode === 'buy'
              ? 'text-text-primary'
              : 'text-text-tertiary'
          }`}
        >
          Buy
          {tradeMode === 'buy' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-long" />
          )}
        </button>
        <button
          onClick={() => setTradeMode('sell')}
          className={`flex-1 pb-2.5 font-semibold transition-colors relative ${
            tradeMode === 'sell'
              ? 'text-text-primary'
              : 'text-text-tertiary'
          }`}
        >
          Sell
          {tradeMode === 'sell' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-short" />
          )}
        </button>
      </div>

      {/* Long/Short 切换按钮 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTradeType('long')}
          className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
            tradeType === 'long'
              ? 'bg-long text-black'
              : 'bg-bg-secondary text-text-secondary border border-border-primary'
          }`}
        >
          Long
        </button>
        <button
          onClick={() => setTradeType('short')}
          className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
            tradeType === 'short'
              ? 'bg-short text-white'
              : 'bg-bg-secondary text-text-secondary border border-border-primary'
          }`}
        >
          Short
        </button>
      </div>

      {/* 当前价格 */}
      <PriceDisplay
        label="Current Price"
        price={`${currentPrice.toFixed(2)}¢`}
        change={priceChange > 0 ? `+${priceChange.toFixed(1)}%` : `${priceChange.toFixed(1)}%`}
        changeDirection={priceChange > 0 ? 'up' : 'down'}
      />

      {/* 金额输入 */}
      <AmountInput
        balance={userBalance}
        value={amount}
        onChange={setAmount}
      />

      {/* 百分比快捷按钮 */}
      <PercentageButtons onSelect={handlePercentageSelect} />

      {/* 交易信息 */}
      <TradeInfo
        estimatedShares={estimatedShares}
        avgPrice={avgPrice}
        maxProfit={maxProfit}
      />

      {/* 确认按钮 */}
      <button
        onClick={handleConfirm}
        disabled={isDisabled}
        className={`w-full py-3 rounded-lg font-bold transition-colors mb-3 ${
          isDisabled
            ? 'bg-bg-secondary text-text-tertiary cursor-not-allowed'
            : tradeType === 'long'
            ? 'bg-long hover:bg-long-hover text-black'
            : 'bg-short hover:bg-short-hover text-white'
        }`}
      >
        {tradeMode === 'buy' ? 'Buy' : 'Sell'} {tradeType === 'long' ? 'Long' : 'Short'}
      </button>

      {/* 服务条款 */}
      <p className="text-text-tertiary text-[10px] text-center leading-relaxed">
        By trading, you agree to the{' '}
        <a href="#" className="underline hover:text-text-secondary transition-colors">
          Terms of Service
        </a>
      </p>
    </div>
  )
}
