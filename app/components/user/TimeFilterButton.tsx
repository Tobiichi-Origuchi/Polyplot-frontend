interface TimeFilterButtonProps {
  active: boolean
  onClick?: () => void
  children: React.ReactNode
}

export default function TimeFilterButton({
  active,
  onClick,
  children
}: TimeFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
        active
          ? 'bg-long text-black'
          : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
      }`}
    >
      {children}
    </button>
  )
}
