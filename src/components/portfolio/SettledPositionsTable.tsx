import SettledPositionRow, { SettledPosition } from './SettledPositionRow'

interface SettledPositionsTableProps {
  positions: SettledPosition[]
  onRedeem?: (id: string) => void
}

export default function SettledPositionsTable({ positions, onRedeem }: SettledPositionsTableProps) {
  return (
    <div className="bg-bg-card rounded-2xl border border-border-primary overflow-hidden">
      {/* 表头 */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 bg-bg-secondary/50">
        <div className="text-text-tertiary text-xs font-semibold uppercase">Market</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Your Pick</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Outcome</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Final Payout</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Status</div>
      </div>

      {/* 表格内容 */}
      <div>
        {positions.map((position) => (
          <SettledPositionRow
            key={position.id}
            position={position}
            onRedeem={onRedeem}
          />
        ))}
      </div>
    </div>
  )
}
