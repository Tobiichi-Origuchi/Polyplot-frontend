import { ReactNode } from 'react'

interface MarketInfoProps {
  icon: ReactNode
  title: string
  description: string
}

export default function MarketInfo({ icon, title, description }: MarketInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border-primary flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="text-text-primary font-semibold text-base truncate">{title}</h3>
        <p className="text-text-tertiary text-sm truncate">{description}</p>
      </div>
    </div>
  )
}
