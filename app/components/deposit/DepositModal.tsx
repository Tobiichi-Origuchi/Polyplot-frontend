'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  balance?: number
  walletAddress?: string
  walletBalance?: number
}

export default function DepositModal({
  isOpen,
  onClose,
  balance = 0,
  walletAddress = '0x1234...39aD',
  walletBalance = 3.39,
}: DepositModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 管理渲染状态和背景滚动
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true)
      setIsClosing(false)
      document.body.style.overflow = 'hidden'

      // 清除任何待执行的关闭定时器
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [isOpen])

  // 处理关闭动画
  const handleClose = () => {
    if (isClosing) return // 防止重复触发

    setIsClosing(true)

    // 清除之前的定时器（如果有）
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    // 等待动画完成后再真正关闭
    closeTimeoutRef.current = setTimeout(() => {
      setShouldRender(false)
      setIsClosing(false)
      onClose()
      closeTimeoutRef.current = null
    }, 300) // 与动画时长一致
  }

  if (!shouldRender) return null

  const handleMetaMaskDeposit = () => {
    // TODO: Implement MetaMask deposit logic
    console.log('MetaMask deposit clicked')
  }

  const handleTransferCrypto = () => {
    // TODO: Implement transfer crypto logic
    console.log('Transfer crypto clicked')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${
          isClosing
            ? 'animate-[backdrop-fade-out_0.3s_ease-out]'
            : 'animate-[backdrop-fade-in_0.3s_ease-out]'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl mx-4 ${
          isClosing
            ? 'animate-[modal-slide-out_0.3s_ease-in]'
            : 'animate-[modal-slide-in_0.4s_ease-out]'
        }`}
      >
        <div className="bg-bg-card rounded-2xl border border-border-primary shadow-2xl">
        {/* Header */}
        <div className="relative border-b border-border-primary p-8 pb-6">
          <div className="text-center">
            <h2 className="text-text-primary text-3xl font-bold mb-2">Deposit</h2>
            <p className="text-text-secondary text-base">
              Polymarket Balance: <span className="text-text-primary font-semibold">${balance.toFixed(2)}</span>
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-text-tertiary hover:text-text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Deposit Options */}
        <div className="p-8 space-y-4">
          {/* MetaMask Wallet Option */}
          <button
            onClick={handleMetaMaskDeposit}
            className="w-full bg-bg-secondary hover:bg-bg-primary border border-border-primary hover:border-border-secondary rounded-xl p-5 flex items-center gap-4 transition-all group"
          >
            {/* MetaMask Icon */}
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                <path d="M21.5 7.5l-8-5.5-8 5.5 1.5 9 6.5 4.5 6.5-4.5 1.5-9z" />
              </svg>
            </div>

            <div className="flex-1 text-left">
              <h3 className="text-text-primary text-lg font-bold mb-1 group-hover:text-long transition-colors">
                Wallet ({walletAddress})
              </h3>
              <p className="text-text-secondary text-sm">
                <span className="text-long font-semibold">${walletBalance.toFixed(2)}</span> • Instant
              </p>
            </div>
          </button>

          {/* Divider with "more" text */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-border-primary"></div>
            <span className="text-text-tertiary text-sm">more</span>
            <div className="flex-1 h-px bg-border-primary"></div>
          </div>

          {/* Transfer Crypto Option */}
          <button
            onClick={handleTransferCrypto}
            className="w-full bg-bg-secondary hover:bg-bg-primary border border-border-primary hover:border-border-secondary rounded-xl p-5 flex items-center gap-4 transition-all group"
          >
            {/* Lightning Icon */}
            <div className="w-12 h-12 bg-long rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-black"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>

            <div className="flex-1 text-left">
              <h3 className="text-text-primary text-lg font-bold mb-1 group-hover:text-long transition-colors">
                Transfer Crypto
              </h3>
              <p className="text-text-secondary text-sm">
                No limit • Instant
              </p>
            </div>

            {/* Crypto Icons */}
            <div className="flex items-center gap-1">
              {/* Bitcoin */}
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">₿</span>
              </div>
              {/* Ethereum */}
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">Ξ</span>
              </div>
              {/* USDC */}
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">$</span>
              </div>
              {/* Polygon */}
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">◆</span>
              </div>
              {/* More indicator */}
              <div className="w-6 h-6 bg-bg-card border border-border-primary rounded-full flex items-center justify-center">
                <span className="text-text-tertiary text-[10px] font-bold">+5</span>
              </div>
            </div>
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
