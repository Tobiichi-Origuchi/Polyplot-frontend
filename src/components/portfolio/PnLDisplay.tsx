interface PnLDisplayProps {
  amount: number
  percentage: number
}

export default function PnLDisplay({ amount, percentage }: PnLDisplayProps) {
  const isProfit = amount >= 0

  return (
    <div className="flex flex-col">
      <span className={`${isProfit ? 'text-new' : 'text-left'} font-semibold text-base`}>
        {isProfit ? '+' : ''}${Math.abs(amount).toFixed(2)}
      </span>
      <span className={`${isProfit ? 'text-new' : 'text-left'} text-sm`}>
        {isProfit ? '+' : ''}{percentage.toFixed(1)}%
      </span>
    </div>
  )
}
