interface TradeInfoProps {
  estimatedShares: number
  avgPrice: number
  maxProfit: number
}

export default function TradeInfo({
  estimatedShares,
  avgPrice,
  maxProfit,
}: TradeInfoProps) {
  return (
    <div className="bg-bg-secondary rounded-xl p-3.5 mb-4 space-y-2.5 border border-border-primary">
      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-xs">Est. Shares</span>
        <span className="text-text-primary text-sm font-semibold">
          {estimatedShares.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-xs">Avg. Price</span>
        <span className="text-text-primary text-sm font-semibold">
          {avgPrice.toFixed(2)} USDC
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-xs">Max Profit</span>
        <span className="text-text-primary text-sm font-semibold">
          ${maxProfit.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
