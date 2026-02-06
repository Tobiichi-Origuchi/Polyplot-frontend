'use client'

import { Bitcoin, Cpu, Music, Trophy, Film } from 'lucide-react'
import PortfolioHeader from '@/components/portfolio/PortfolioHeader'
import StatsCardsContainer from '@/components/portfolio/StatsCardsContainer'
import ActivePositionsSection from '@/components/portfolio/ActivePositionsSection'
import SettledPositionsSection from '@/components/portfolio/SettledPositionsSection'
import { ActivePosition } from '@/components/portfolio/ActivePositionRow'
import { SettledPosition } from '@/components/portfolio/SettledPositionRow'

export default function PortfolioPage() {
  // 示例数据 - Active Positions
  const activePositions: ActivePosition[] = [
    {
      id: '1',
      market: {
        title: 'Bitcoin Halving Effect',
        description: 'Will Bitcoin exceed $75k before halving?',
        icon: <Bitcoin className="w-6 h-6 text-long" />
      },
      position: {
        type: 'long',
        shares: 150
      },
      pricing: {
        avgPrice: 0.42,
        currentPrice: 0.65
      },
      pnl: {
        amount: 34.50,
        percentage: 54.7
      }
    },
    {
      id: '2',
      market: {
        title: 'GPT-5 Release Date',
        description: 'Will OpenAI release GPT-5 in Q2 2024?',
        icon: <Cpu className="w-6 h-6 text-short" />
      },
      position: {
        type: 'short',
        shares: 500
      },
      pricing: {
        avgPrice: 0.30,
        currentPrice: 0.28
      },
      pnl: {
        amount: 10.00,
        percentage: 6.6
      }
    },
    {
      id: '3',
      market: {
        title: 'Taylor Swift Album',
        description: 'New re-recording before end of Q3?',
        icon: <Music className="w-6 h-6 text-long" />
      },
      position: {
        type: 'long',
        shares: 50
      },
      pricing: {
        avgPrice: 0.82,
        currentPrice: 0.75
      },
      pnl: {
        amount: -3.50,
        percentage: -8.5
      }
    }
  ]

  // 示例数据 - Settled Positions
  const settledPositions: SettledPosition[] = [
    {
      id: '4',
      market: {
        title: 'Super Bowl LVIII Winner',
        description: 'Did the Chiefs win back-to-back?',
        icon: <Trophy className="w-6 h-6 text-new" />
      },
      userPick: 'long',
      outcome: 'yes',
      isWinner: true,
      finalPayout: 210.00,
      status: 'redeemable'
    },
    {
      id: '5',
      market: {
        title: 'Oscars Best Picture 2024',
        description: 'Will Barbie win Best Picture?',
        icon: <Film className="w-6 h-6 text-text-tertiary" />
      },
      userPick: 'long',
      outcome: 'no',
      isWinner: false,
      finalPayout: 0.00,
      status: 'settled'
    }
  ]

  // 处理 Sell 操作
  const handleSell = (id: string) => {
    console.log('Selling position:', id)
    // TODO: 实现卖出逻辑
  }

  // 处理 Redeem 操作
  const handleRedeem = (id: string) => {
    console.log('Redeeming position:', id)
    // TODO: 实现提现逻辑
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <PortfolioHeader />

        {/* 统计卡片 */}
        <StatsCardsContainer
          totalValue={5682.34}
          valueChangePercentage={12.5}
          availableBalance={1240.50}
          totalPnL={441.84}
        />

        {/* 活跃仓位 */}
        <ActivePositionsSection
          positions={activePositions}
          onSell={handleSell}
        />

        {/* 已结算仓位 */}
        <SettledPositionsSection
          positions={settledPositions}
          onRedeem={handleRedeem}
        />
      </div>
    </div>
  )
}
