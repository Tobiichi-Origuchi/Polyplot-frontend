'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Wallet, ChevronDown, ChevronRight } from 'lucide-react'

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  balance: number
  walletAddress?: string
}

export default function WithdrawModal({
  isOpen,
  onClose,
  balance,
  walletAddress = '0x2a1Ade326b8BdB9c925e3259a8c9125EC19339aD',
}: WithdrawModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 输入状态
  const [recipientAddress, setRecipientAddress] = useState(walletAddress)
  const [amount, setAmount] = useState('1.043961')
  const [selectedToken] = useState('USDC')
  const [selectedChain] = useState('Polygon')
  const [isTransactionExpanded, setIsTransactionExpanded] = useState(false)

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
    }, 200) // 与动画时长一致
  }

  if (!shouldRender) return null

  // 计算金额
  const numAmount = parseFloat(amount) || 0
  const usdValue = numAmount // 假设 1 USDC = 1 USD
  const transactionFee = numAmount * 0.0008 // 0.08% 手续费
  const finalReceive = numAmount - transactionFee

  const handleUseConnected = () => {
    setRecipientAddress(walletAddress)
  }

  const handleMaxAmount = () => {
    setAmount(balance.toFixed(6))
  }

  const handleWithdraw = () => {
    // TODO: Implement withdraw logic
    console.log('Withdraw clicked', {
      recipientAddress,
      amount,
      selectedToken,
      selectedChain,
    })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${
          isClosing
            ? 'animate-[backdrop-fade-out_0.2s_ease-in-out]'
            : 'animate-[backdrop-fade-in_0.25s_ease-out]'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-md mx-4 ${
          isClosing
            ? 'animate-[modal-slide-out_0.2s_ease-in-out]'
            : 'animate-[modal-slide-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
      >
        <div className="bg-bg-card rounded-2xl border border-border-primary shadow-2xl transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="relative border-b border-border-primary px-5 py-4">
            <h2 className="text-text-primary text-2xl font-bold">Withdraw</h2>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Recipient address */}
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1.5">
                Recipient address
              </label>
              <div className="relative bg-bg-secondary border border-border-primary rounded-lg px-3 py-2">
                <textarea
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full bg-transparent text-text-primary text-sm font-mono outline-none pr-32 resize-none overflow-hidden break-all"
                  placeholder="Enter wallet address"
                  rows={2}
                  style={{ minHeight: '2.5rem' }}
                />
                <button
                  onClick={handleUseConnected}
                  className="absolute right-1.5 top-2 bg-long hover:bg-long-hover text-black font-semibold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 text-xs"
                >
                  <Wallet size={13} />
                  Use connected
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1.5">
                Amount
              </label>
              <div className="bg-bg-secondary border border-border-primary rounded-lg px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent text-text-primary text-lg font-bold outline-none"
                    placeholder="0.00"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary text-sm font-medium">USDC</span>
                    <button
                      onClick={handleMaxAmount}
                      className="bg-long hover:bg-long-hover text-black font-semibold px-2 py-0.5 rounded-md transition-colors text-xs"
                    >
                      Max
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-tertiary">${usdValue.toFixed(2)}</span>
                  <span className="text-text-secondary">Balance: {balance.toFixed(2)} USDC</span>
                </div>
              </div>
            </div>

            {/* Receive token & Receive chain */}
            <div className="grid grid-cols-2 gap-3">
              {/* Receive token */}
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1.5">
                  Receive token
                </label>
                <div className="bg-bg-secondary border border-border-primary rounded-lg px-2.5 py-2 flex items-center justify-between cursor-pointer hover:bg-bg-primary transition-colors">
                  <div className="flex items-center gap-2">
                    {/* USDC Icon */}
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                    <span className="text-text-primary text-sm font-semibold">{selectedToken}</span>
                  </div>
                  <ChevronDown size={16} className="text-text-tertiary" />
                </div>
              </div>

              {/* Receive chain */}
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1.5">
                  Receive chain
                </label>
                <div className="bg-bg-secondary border border-border-primary rounded-lg px-2.5 py-2 cursor-pointer hover:bg-bg-primary transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Polygon Icon */}
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">◆</span>
                      </div>
                      <span className="text-text-primary text-sm font-semibold">{selectedChain}</span>
                    </div>
                    <ChevronDown size={16} className="text-text-tertiary" />
                  </div>
                </div>
              </div>
            </div>

            {/* You will receive */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg px-3 py-2.5">
              <div className="text-text-secondary text-xs mb-1">You will receive</div>
              <div className="text-text-primary text-xl font-bold mb-0.5">
                {finalReceive.toFixed(5)} USDC
              </div>
              <div className="text-text-tertiary text-xs">${finalReceive.toFixed(2)}</div>
            </div>

            {/* Transaction breakdown */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsTransactionExpanded(!isTransactionExpanded)}
            >
              <span className="text-text-secondary text-sm font-medium">Transaction breakdown</span>
              <div className="flex items-center gap-2">
                <span className="text-text-primary text-sm font-semibold">0.08%</span>
                <ChevronRight
                  size={16}
                  className={`text-text-tertiary transition-transform ${
                    isTransactionExpanded ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>

            {/* Transaction breakdown details (expandable) */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isTransactionExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Amount</span>
                  <span className="text-text-primary font-semibold">{numAmount.toFixed(6)} USDC</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Network fee (0.08%)</span>
                  <span className="text-text-primary font-semibold">-{transactionFee.toFixed(6)} USDC</span>
                </div>
                <div className="h-px bg-border-primary my-0.5"></div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Total</span>
                  <span className="text-text-primary font-bold">{finalReceive.toFixed(6)} USDC</span>
                </div>
              </div>
            </div>

            {/* Withdraw Button */}
            <button
              onClick={handleWithdraw}
              className="w-full bg-long hover:bg-long-hover text-black font-bold py-2.5 rounded-lg transition-colors text-base"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
