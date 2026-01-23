'use client'

interface PercentageButtonsProps {
  percentages?: number[]
  onSelect: (percentage: number) => void
}

export default function PercentageButtons({
  percentages = [0, 25, 50, 75, 100],
  onSelect,
}: PercentageButtonsProps) {
  return (
    <div className="flex justify-between gap-1.5 mb-4">
      {percentages.map((percentage) => (
        <button
          key={percentage}
          onClick={() => onSelect(percentage)}
          className="flex-1 bg-bg-secondary hover:bg-bg-card text-text-secondary hover:text-text-primary py-1.5 rounded-lg text-xs font-semibold transition-colors border border-border-primary hover:border-border-secondary"
        >
          {percentage}%
        </button>
      ))}
    </div>
  )
}
