import Image from 'next/image'

interface AvatarGroupProps {
  avatars: string[]
  maxDisplay?: number
}

export default function AvatarGroup({ avatars, maxDisplay = 3 }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, maxDisplay)

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="w-6 h-6 rounded-full border-2 border-bg-card overflow-hidden bg-bg-secondary"
        >
          <Image
            src={avatar}
            alt={`Trader ${index + 1}`}
            width={24}
            height={24}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
