interface CategoryTagProps {
  label: string
}

export default function CategoryTag({ label }: CategoryTagProps) {
  return (
    <span className="bg-bg-secondary/80 backdrop-blur-sm text-text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase border border-border-primary">
      {label}
    </span>
  )
}
