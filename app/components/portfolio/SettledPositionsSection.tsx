import { Flag } from 'lucide-react'
import SectionHeader from './SectionHeader'
import SettledPositionsTable from './SettledPositionsTable'
import { SettledPosition } from './SettledPositionRow'

interface SettledPositionsSectionProps {
  positions: SettledPosition[]
  onRedeem?: (id: string) => void
}

export default function SettledPositionsSection({ positions, onRedeem }: SettledPositionsSectionProps) {
  return (
    <div className="mb-12">
      <SectionHeader icon={Flag} title="Settled Positions" count={positions.length} iconColor="text-text-secondary" />
      <SettledPositionsTable positions={positions} onRedeem={onRedeem} />
    </div>
  )
}
