import { TrendingUp } from 'lucide-react'

interface TotalValueCardProps {
  value: number
  percentageChange: number
}

export default function TotalValueCard({ value, percentageChange }: TotalValueCardProps) {
  const isPositive = percentageChange >= 0

  return (
    <div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
      {/* 装饰性背景图标 */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
        <div className="text-9xl font-bold text-text-primary">B</div>
      </div>

      {/* 内容 */}
      <div className="relative z-10">
        <p className="text-text-secondary text-sm mb-2">Total Value</p>
        <h2 className="text-text-primary text-4xl font-bold mb-2">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-new' : 'text-left'} text-sm font-semibold`}>
          <TrendingUp className="w-4 h-4" />
          <span>{isPositive ? '+' : ''}{percentageChange.toFixed(1)}% this week</span>
        </div>
      </div>
    </div>
  )
}
