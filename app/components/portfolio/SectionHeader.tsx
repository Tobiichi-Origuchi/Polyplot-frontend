import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  count: number
  iconColor?: string
}

export default function SectionHeader({
  icon: Icon,
  title,
  count,
  iconColor = 'text-long'
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon className={`w-6 h-6 ${iconColor}`} />
      <h2 className="text-text-primary text-2xl font-bold">{title}</h2>
      <span className="bg-bg-secondary text-text-secondary text-sm font-semibold px-2.5 py-0.5 rounded-full">
        {count}
      </span>
    </div>
  )
}
