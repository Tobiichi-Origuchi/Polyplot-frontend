import { ReactNode } from 'react'
import MarketInfo from './MarketInfo'
import PositionBadge from './PositionBadge'
import PnLDisplay from './PnLDisplay'

export interface ActivePosition {
  id: string
  market: {
    title: string
    description: string
    icon: ReactNode
  }
  position: {
    type: 'long' | 'short'
    shares: number
  }
  pricing: {
    avgPrice: number
    currentPrice: number
  }
  pnl: {
    amount: number
    percentage: number
  }
}

interface ActivePositionRowProps {
  position: ActivePosition
  onSell?: (id: string) => void
}

export default function ActivePositionRow({ position, onSell }: ActivePositionRowProps) {
  const isLong = position.position.type === 'long'

  return (
    <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 bg-bg-card border-b border-border-primary items-center">
      {/* Market 列 */}
      <MarketInfo
        icon={position.market.icon}
        title={position.market.title}
        description={position.market.description}
      />

      {/* Position 列 */}
      <PositionBadge type={position.position.type} shares={position.position.shares} />

      {/* Avg. Price 列 */}
      <div className="flex flex-col">
        <span className="text-text-primary font-semibold">${position.pricing.avgPrice.toFixed(2)}</span>
        <span className="text-text-tertiary text-sm">Cur: ${position.pricing.currentPrice.toFixed(2)}</span>
      </div>

      {/* Unrealized P&L 列 */}
      <PnLDisplay amount={position.pnl.amount} percentage={position.pnl.percentage} />

      {/* Action 列 */}
      <button
        onClick={() => onSell?.(position.id)}
        className={`${isLong ? 'bg-long hover:bg-long-hover text-black' : 'bg-short hover:bg-short-hover text-white'} font-semibold px-6 py-2 rounded-lg transition-colors`}
      >
        Sell
      </button>
    </div>
  )
}
