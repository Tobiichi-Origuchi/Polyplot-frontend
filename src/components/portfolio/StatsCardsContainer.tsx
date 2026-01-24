import TotalValueCard from './TotalValueCard'
import AvailableBalanceCard from './AvailableBalanceCard'
import TotalPnLCard from './TotalPnLCard'

interface StatsCardsContainerProps {
  totalValue: number
  valueChangePercentage: number
  availableBalance: number
  totalPnL: number
}

export default function StatsCardsContainer({
  totalValue,
  valueChangePercentage,
  availableBalance,
  totalPnL
}: StatsCardsContainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <TotalPnLCard amount={totalPnL} />
      <TotalValueCard value={totalValue} percentageChange={valueChangePercentage} />
      <AvailableBalanceCard balance={availableBalance} />
    </div>
  )
}
