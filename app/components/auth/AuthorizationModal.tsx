'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Check } from 'lucide-react'

interface AuthorizationModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export default function AuthorizationModal({
  isOpen,
  onClose,
  onComplete,
}: AuthorizationModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 管理步骤的状态
  const [tradingStatus, setTradingStatus] = useState<'pending' | 'signing' | 'complete'>('pending')

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

  // 处理 Enable Trading 签名
  const handleEnableTrading = () => {
    setTradingStatus('signing')
    // TODO: 实现实际的签名逻辑
    setTimeout(() => {
      setTradingStatus('complete')
      // 签名完成后，关闭弹窗并执行回调
      if (onComplete) {
        onComplete()
      }
      setTimeout(() => {
        handleClose()
      }, 500)
    }, 1500)
  }

  if (!shouldRender) return null

  const modalContent = (
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
        className={`relative z-10 w-full max-w-lg mx-4 ${
          isClosing
            ? 'animate-[modal-slide-out_0.2s_ease-in-out]'
            : 'animate-[modal-slide-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
      >
        <div className="bg-bg-card rounded-2xl border border-border-primary shadow-2xl">
          {/* Header */}
          <div className="relative border-b border-border-primary px-6 py-5">
            <h2 className="text-text-primary text-2xl font-bold text-center">Finish Setting Up</h2>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-text-primary text-xl font-bold mb-2">
                Enable Trading
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Enable trading to allow you to annove at the Material design.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              {tradingStatus === 'complete' ? (
                <div className="flex items-center gap-2 bg-long px-6 py-3 rounded-lg">
                  <Check size={20} className="text-black" />
                  <span className="text-black font-bold">Complete</span>
                </div>
              ) : (
                <button
                  onClick={handleEnableTrading}
                  disabled={tradingStatus === 'signing'}
                  className={`px-12 py-3 rounded-lg font-bold transition-all ${
                    tradingStatus === 'signing'
                      ? 'bg-long/50 text-black/50 cursor-not-allowed'
                      : 'bg-long hover:bg-long-hover text-black'
                  }`}
                >
                  {tradingStatus === 'signing' ? 'Signing...' : 'Sign'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 使用 Portal 渲染到 document.body，避免受父组件样式影响
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}
