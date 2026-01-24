type BadgeType = 'new' | 'hot' | 'left';

interface StatusBadgeProps {
  type: BadgeType;
  text: string;
}

const badgeStyles: Record<BadgeType, string> = {
  new: 'bg-new',
  hot: 'bg-hot',
  left: 'bg-left',
};

export default function StatusBadge({ type, text }: StatusBadgeProps) {
  return (
    <span className={`${badgeStyles[type]} text-white text-xs font-bold px-2 py-1 rounded-md uppercase`}>
      {text}
    </span>
  );
}
