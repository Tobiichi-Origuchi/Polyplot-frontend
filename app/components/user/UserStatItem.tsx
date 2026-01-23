interface UserStatItemProps {
  label: string
  value: string | number
}

export default function UserStatItem({ label, value }: UserStatItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-text-secondary text-xs mb-1">{label}</span>
      <span className="text-text-primary text-xl font-bold">{value}</span>
    </div>
  )
}
