import { ReactNode } from 'react'
import MarketInfo from './MarketInfo'
import OutcomeIndicator from './OutcomeIndicator'
import PayoutInfo from './PayoutInfo'
import StatusButton from './StatusButton'

export interface SettledPosition {
  id: string
  market: {
    title: string
    description: string
    icon: ReactNode
  }
  userPick: 'long' | 'short'
  outcome: 'yes' | 'no'
  isWinner: boolean
  finalPayout: number
  status: 'redeemable' | 'settled'
}

interface SettledPositionRowProps {
  position: SettledPosition
  onRedeem?: (id: string) => void
}

export default function SettledPositionRow({ position, onRedeem }: SettledPositionRowProps) {
  return (
    <div
      className={`grid grid-cols-[2fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 bg-bg-card border-b border-border-primary items-center ${
        position.isWinner ? 'border-l-4 border-l-new' : ''
      }`}
    >
      {/* Market 列 */}
      <MarketInfo
        icon={position.market.icon}
        title={position.market.title}
        description={position.market.description}
      />

      {/* Your Pick 列 */}
      <div>
        <span className="text-text-secondary text-sm">
          Yes ({position.userPick === 'long' ? 'Long' : 'Short'})
        </span>
      </div>

      {/* Outcome 列 */}
      <OutcomeIndicator outcome={position.outcome} />

      {/* Final Payout 列 */}
      <PayoutInfo amount={position.finalPayout} isWinner={position.isWinner} />

      {/* Status 列 */}
      <StatusButton
        status={position.status}
        onRedeem={() => onRedeem?.(position.id)}
      />
    </div>
  )
}
