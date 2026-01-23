import CategoryTag from './CategoryTag'
import StatusTag from './StatusTag'
import StatItem from './StatItem'

interface NarrativeHeaderProps {
  category: string
  leftCount?: number
  statusType?: 'new' | 'hot' | 'left'
  title: string
  description: string
  totalValueLocked: string
  tradersCount: number
  traderAvatars: string[]
  expiryDate: string
}

export default function NarrativeHeader({
  category,
  leftCount,
  statusType = 'left',
  title,
  description,
  totalValueLocked,
  tradersCount,
  traderAvatars,
  expiryDate,
}: NarrativeHeaderProps) {
  return (
    <div className="mb-8">
      {/* 标签行 */}
      <div className="flex gap-2 mb-4">
        <CategoryTag label={category} />
        {leftCount !== undefined && (
          <StatusTag count={leftCount} type={statusType} />
        )}
      </div>

      {/* 标题 */}
      <h1 className="text-text-primary text-5xl font-bold mb-4">
        {title}
      </h1>

      {/* 描述 */}
      <p className="text-text-secondary text-lg mb-6 max-w-4xl leading-relaxed">
        {description}
      </p>

      {/* 统计信息行 */}
      <div className="flex gap-8">
        <StatItem
          label="Total Value Locked"
          value={totalValueLocked}
          icon="lock"
        />
        <StatItem
          label="Traders"
          value={tradersCount.toLocaleString()}
          avatars={traderAvatars}
        />
        <StatItem
          label="Expiry"
          value={expiryDate}
        />
      </div>
    </div>
  )
}
