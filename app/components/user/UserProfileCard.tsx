'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import UserStatItem from './UserStatItem'

interface UserProfileCardProps {
  username: string
  avatar?: string
  joinDate: string
  views: number
  positionsValue: string
  isConnected?: boolean
  onConnectToggle?: () => void
  onDeposit?: () => void
  onWithdraw?: () => void
}

export default function UserProfileCard({
  username,
  avatar,
  joinDate,
  views,
  positionsValue,
  isConnected = false,
  onConnectToggle,
  onDeposit,
  onWithdraw
}: UserProfileCardProps) {
  const [connected, setConnected] = useState(isConnected)

  const handleConnectClick = () => {
    setConnected(!connected)
    onConnectToggle?.()
  }

  // 解析 positionsValue 判断是否有余额
  const hasBalance = () => {
    const numericValue = parseFloat(positionsValue.replace(/[$,]/g, ''))
    return !isNaN(numericValue) && numericValue > 0
  }

  return (
    <div className="bg-bg-card rounded-2xl border border-border-primary p-6 relative">
      {/* Connect 按钮 - 固定在右上角 */}
      <button
        onClick={handleConnectClick}
        className={`absolute top-6 right-6 ${
          connected
            ? 'bg-new hover:bg-emerald-600'
            : 'bg-short hover:bg-short-hover'
        } text-white text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors`}
      >
        {connected ? 'Connected' : 'Connect'}
        <X className="w-3.5 h-3.5" />
      </button>

      {/* 用户信息区域 */}
      <div className="flex items-start gap-4 mb-6 pr-28">
        {/* 头像 */}
        {avatar ? (
          <Image
            src={avatar}
            alt={username}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full flex-shrink-0 object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-orange-400 to-yellow-400 flex-shrink-0" />
        )}

        {/* 用户名和元信息 */}
        <div className="flex-1 min-w-0">
          <h1 className="text-text-primary font-bold text-2xl truncate mb-2">
            {username}
          </h1>
          <p className="text-text-secondary text-sm">
            Joined {joinDate} <span className="mx-2">•</span> {views} views
          </p>
        </div>
      </div>

      {/* 底部区域：统计数据和操作按钮 */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border-primary">
        {/* Positions Value 统计 */}
        <UserStatItem label="Positions Value" value={positionsValue} />

        {/* Deposit 按钮 */}
        <div className="flex flex-col justify-end">
          <button
            onClick={onDeposit}
            className="bg-long hover:bg-long-hover text-black font-semibold px-4 py-2.5 rounded-lg transition-colors w-full"
          >
            Deposit
          </button>
        </div>

        {/* Withdraw 按钮 */}
        <div className="flex flex-col justify-end">
          <button
            onClick={onWithdraw}
            className={`${
              hasBalance()
                ? 'bg-short hover:bg-short-hover text-white'
                : 'bg-bg-secondary hover:bg-bg-secondary/80 border border-border-primary text-text-primary'
            } font-semibold px-4 py-2.5 rounded-lg transition-colors w-full`}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
