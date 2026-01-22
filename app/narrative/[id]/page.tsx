'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import Breadcrumb from '@/app/components/narrative/Breadcrumb'
import NarrativeHeader from '@/app/components/narrative/NarrativeHeader'
import PriceHistoryCard from '@/app/components/narrative/PriceHistoryCard'
import BundleComposition from '@/app/components/narrative/BundleComposition'
import TradingPanel from '@/app/components/narrative/TradingPanel'
import { getNarrativeById } from '@/app/data/mockNarratives'

export default function NarrativeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const narrative = useMemo(() => getNarrativeById(id), [id])

  useEffect(() => {
    if (!narrative) {
      router.push('/')
    }
  }, [narrative, router])

  if (!narrative) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Marketplace', href: '/' },
    { label: narrative.title },
  ]

  const handleTrade = (type: 'long' | 'short', mode: 'buy' | 'sell', amount: number) => {
    console.log('Trade executed:', {
      narrative: narrative.title,
      type,
      mode,
      amount,
    })
    // 这里可以添加实际的交易逻辑
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-6 py-8">
        {/* 面包屑导航 */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 页面头部 */}
        <NarrativeHeader
          category={narrative.category}
          leftCount={narrative.leftCount}
          statusType={narrative.statusType}
          title={narrative.title}
          description={narrative.description}
          totalValueLocked={narrative.totalValueLocked}
          tradersCount={narrative.tradersCount}
          traderAvatars={narrative.traderAvatars}
          expiryDate={narrative.expiryDate}
        />

        {/* 主内容区域 - 两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* 左侧内容区 */}
          <div className="lg:col-span-8">
            {/* 价格历史可视化 */}
            <PriceHistoryCard
              imageUrl={narrative.imageUrl}
              altText={narrative.title}
              isLive={narrative.isLive}
            />

            {/* Bundle 组成 */}
            <BundleComposition
              components={narrative.bundleComponents}
            />
          </div>

          {/* 右侧交易面板 */}
          <div className="lg:col-span-4">
            <TradingPanel
              currentPrice={narrative.currentPrice}
              priceChange={narrative.priceChange}
              userBalance={1240.50}
              onTrade={handleTrade}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
