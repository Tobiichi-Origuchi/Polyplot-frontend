'use client'

import Breadcrumb from '@/components/narrative/Breadcrumb'
import NarrativeHeader from '@/components/narrative/NarrativeHeader'
import PriceHistoryCard from '@/components/narrative/PriceHistoryCard'
import BundleComposition from '@/components/narrative/BundleComposition'
import TradingPanel from '@/components/narrative/TradingPanel'
import type { BundleComponent } from '@/components/narrative/BundleComposition'

export default function NarrativeTestPage() {
  // 模拟数据
  const breadcrumbItems = [
    { label: 'Marketplace', href: '/' },
    { label: 'Bitcoin Halving Bundle' },
  ]

  const traderAvatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
  ]

  const bundleComponents: BundleComponent[] = [
    {
      id: '1',
      title: 'Bitcoin > $75k Pre-Halving',
      resolutionSource: 'Binance Spot Price',
      weight: 50,
      progressColor: 'long',
      polymarketUrl: 'https://polymarket.com/event/bitcoin-75k-pre-halving',
    },
    {
      id: '2',
      title: 'Difficulty Adjustment > 3%',
      resolutionSource: 'Blockchain.com',
      weight: 30,
      progressColor: 'short',
      polymarketUrl: 'https://polymarket.com/event/bitcoin-difficulty-adjustment',
    },
    {
      id: '3',
      title: 'SEC Approval of Options ETF',
      resolutionSource: 'SEC.gov Press Release',
      weight: 20,
      progressColor: 'neutral',
      polymarketUrl: 'https://polymarket.com/event/sec-options-etf-approval',
    },
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-6 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <NarrativeHeader
          category="CRYPTO"
          leftCount={20}
          statusType="left"
          title="Bitcoin Halving Effect"
          description="A composite bundle tracking the key outcomes surrounding the upcoming Bitcoin halving event. Trade on price action, network difficulty, and ETF inflows in a single instrument."
          totalValueLocked="$1.2M"
          tradersCount={1420}
          traderAvatars={traderAvatars}
          expiryDate="Apr 24, 2024"
        />

        {/* 主内容区域 - 两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* 左侧内容区 */}
          <div className="lg:col-span-8">
            <PriceHistoryCard
              imageUrl="/narrative-bg.jpg"
              altText="Bitcoin Halving Effect"
              isLive={true}
            />

            <BundleComposition
              components={bundleComponents}
            />
          </div>

          {/* 右侧交易面板 */}
          <div className="lg:col-span-4">
            <TradingPanel
              currentPrice={0.72}
              priceChange={4.2}
              userBalance={1240.50}
              onTrade={(type, mode, amount) => {
                console.log('Trade:', { type, mode, amount })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
