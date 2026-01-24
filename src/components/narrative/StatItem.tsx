import { Lock, Calendar, Users } from 'lucide-react'
import AvatarGroup from './AvatarGroup'

type IconType = 'lock' | 'calendar' | 'users'

interface StatItemProps {
  label: string
  value: string | number
  icon?: IconType
  avatars?: string[]
}

export default function StatItem({ label, value, icon, avatars }: StatItemProps) {
  const renderIcon = () => {
    if (!icon) return null

    const iconClass = "w-4 h-4 text-text-tertiary"

    switch (icon) {
      case 'lock':
        return <Lock className={iconClass} />
      case 'calendar':
        return <Calendar className={iconClass} />
      case 'users':
        return <Users className={iconClass} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-text-tertiary text-sm">{label}</span>
      <div className="flex items-center gap-2">
        {renderIcon()}
        {avatars && avatars.length > 0 && <AvatarGroup avatars={avatars} />}
        <span className="text-text-primary text-xl font-semibold">
          {value}
        </span>
      </div>
    </div>
  )
}
