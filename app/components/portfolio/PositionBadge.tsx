import { TrendingUp, TrendingDown } from 'lucide-react'

interface PositionBadgeProps {
  type: 'long' | 'short'
  shares: number
}

export default function PositionBadge({ type, shares }: PositionBadgeProps) {
  const isLong = type === 'long'

  return (
    <div className="flex items-center gap-2">
      <span className={`${isLong ? 'bg-long text-black' : 'bg-short text-white'} px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-1`}>
        {isLong ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {isLong ? 'LONG' : 'SHORT'}
      </span>
      <span className="text-text-secondary text-sm">{shares} Shares</span>
    </div>
  )
}
