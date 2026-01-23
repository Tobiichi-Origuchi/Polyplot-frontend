import { Zap } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ActivePositionsTable from './ActivePositionsTable'
import { ActivePosition } from './ActivePositionRow'

interface ActivePositionsSectionProps {
  positions: ActivePosition[]
  onSell?: (id: string) => void
}

export default function ActivePositionsSection({ positions, onSell }: ActivePositionsSectionProps) {
  return (
    <div className="mb-12">
      <SectionHeader icon={Zap} title="Active Positions" count={positions.length} iconColor="text-long" />
      <ActivePositionsTable positions={positions} onSell={onSell} />
    </div>
  )
}
