import { TrendingUp } from 'lucide-react'

interface TotalPnLCardProps {
  amount: number
}

export default function TotalPnLCard({ amount }: TotalPnLCardProps) {
  const isProfit = amount >= 0

  return (
    <div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
      {/* 装饰性背景图标 - 趋势线 */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
        <TrendingUp className="w-32 h-32 text-text-primary" />
      </div>

      {/* 内容 */}
      <div className="relative z-10">
        <p className="text-text-secondary text-sm mb-2">Total P&L</p>
        <h2 className={`${isProfit ? 'text-new' : 'text-left'} text-4xl font-bold mb-2`}>
          {isProfit ? '+' : ''}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <p className={`${isProfit ? 'text-new' : 'text-left'} text-sm`}>
          {isProfit ? 'All Time Profit' : 'All Time Loss'}
        </p>
      </div>
    </div>
  )
}
