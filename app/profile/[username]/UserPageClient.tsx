'use client'

import { useEffect } from 'react'
import { UserProfileCard, ProfitLossChart, PositionsActivitySection } from '@/app/components/user'

interface UserPageClientProps {
  userData: {
    username: string
    bio?: string
    joinDate: string
    views: number
    positionsValue: string
    biggestWin: string
    profitLoss: string
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

  return (
    <div className="min-h-screen bg-bg-primary">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 双栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 左侧：用户资料卡片 */}
          <UserProfileCard
            username={userData.username}
            bio={userData.bio}
            joinDate={userData.joinDate}
            views={userData.views}
            positionsValue={userData.positionsValue}
            biggestWin={userData.biggestWin}
          />

          {/* 右侧：盈亏图表卡片 */}
          <ProfitLossChart
            profitLoss={userData.profitLoss}
            period="Past Month"
            isPositive={parseFloat(userData.profitLoss.replace(/[$,]/g, '')) >= 0}
          />
        </div>

        {/* Positions/Activity 区域 */}
        <PositionsActivitySection />
      </main>
    </div>
  )
}
