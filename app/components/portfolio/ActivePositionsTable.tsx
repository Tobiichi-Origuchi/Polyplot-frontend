import ActivePositionRow, { ActivePosition } from './ActivePositionRow'

interface ActivePositionsTableProps {
  positions: ActivePosition[]
  onSell?: (id: string) => void
}

export default function ActivePositionsTable({ positions, onSell }: ActivePositionsTableProps) {
  return (
    <div className="bg-bg-card rounded-2xl border border-border-primary overflow-hidden">
      {/* 表头 */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 bg-bg-secondary/50">
        <div className="text-text-tertiary text-xs font-semibold uppercase">Market</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Position</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Avg. Price</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Unrealized P&L</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Action</div>
      </div>

      {/* 表格内容 */}
      <div>
        {positions.map((position) => (
          <ActivePositionRow
            key={position.id}
            position={position}
            onSell={onSell}
          />
        ))}
      </div>
    </div>
  )
}
