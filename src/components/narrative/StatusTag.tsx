interface StatusTagProps {
  count: number
  type?: 'new' | 'hot' | 'left'
}

export default function StatusTag({ count, type = 'left' }: StatusTagProps) {
  const getBackgroundClass = () => {
    switch (type) {
      case 'new':
        return 'bg-new'
      case 'hot':
        return 'bg-hot'
      case 'left':
        return 'bg-left'
      default:
        return 'bg-left'
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'new':
        return 'NEW'
      case 'hot':
        return 'HOT'
      case 'left':
        return `${count} LEFT`
      default:
        return `${count} LEFT`
    }
  }

  return (
    <span
      className={`${getBackgroundClass()} text-white text-xs font-bold px-2.5 py-1.5 rounded-md uppercase flex items-center gap-1.5`}
    >
      <span className="w-2 h-2 bg-white rounded-full" />
      {getLabel()}
    </span>
  )
}
