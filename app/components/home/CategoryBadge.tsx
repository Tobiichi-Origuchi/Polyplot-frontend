interface CategoryBadgeProps {
  category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="bg-bg-secondary/80 backdrop-blur-sm text-text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase">
      {category}
    </span>
  );
}
