interface PriceDisplayProps {
  label: string
  price: string
  change?: string
  changeDirection?: 'up' | 'down'
}

export default function PriceDisplay({
  label,
  price,
  change,
  changeDirection = 'up',
}: PriceDisplayProps) {
  return (
    <div className="mb-4">
      <span className="text-text-tertiary text-xs block mb-1.5">{label}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-text-primary text-3xl font-bold">{price}</span>
        {change && (
          <span
            className={`text-xs font-semibold ${
              changeDirection === 'up' ? 'text-new' : 'text-left'
            }`}
          >
            {change} Today
          </span>
        )}
      </div>
    </div>
  )
}
