'use client'

import { useEffect } from 'react'
import { UserProfileCard, ProfitLossChart } from '@/app/components/user'

interface UserPageClientProps {
  userData: {
    username: string
    joinDate: string
    views: number
    positionsValue: string
    profitLoss: string
    isConnected: boolean
  }
}

export default function UserPageClient({ userData }: UserPageClientProps) {
  // 确保页面加载时滚动到顶部
  useEffect(() => {
    // 立即滚动到顶部
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // 在渲染完成后再次确保滚动位置
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 0)

    return () => clearTimeout(timer)
  }, [userData.username]) // 当用户名改变时也重置滚动

  const handleDeposit = () => {
    console.log('Deposit clicked')
    // TODO: 打开存款模态框
  }

  const handleWithdraw = () => {
    console.log('Withdraw clicked')
    // TODO: 打开提款模态框
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 双栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 左侧：用户资料卡片 */}
          <UserProfileCard
            username={userData.username}
            joinDate={userData.joinDate}
            views={userData.views}
            positionsValue={userData.positionsValue}
            isConnected={userData.isConnected}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
          />

          {/* 右侧：盈亏图表卡片 */}
          <ProfitLossChart
            profitLoss={userData.profitLoss}
            period="Past Month"
            isPositive={parseFloat(userData.profitLoss.replace(/[$,]/g, '')) >= 0}
          />
        </div>

        {/* Positions/Activity 区域 (待实现) */}
        <div className="bg-bg-card rounded-2xl border border-border-primary p-6 flex items-center justify-center">
          <p className="text-text-secondary">Positions/Activity Section - Coming Soon</p>
        </div>
      </main>
    </div>
  )
}
