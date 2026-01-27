import Image from 'next/image';
import CategoryBadge from '../CategoryBadge';
import StatusBadge from '../StatusBadge';

interface CardHeaderProps {
  imageUrl: string;
  title: string;
  category: string;
  statusBadge?: {
    type: 'new' | 'hot' | 'left';
    text: string;
  };
  onClick: () => void;
}

export default function CardHeader({ imageUrl, title, category, statusBadge, onClick }: CardHeaderProps) {
  return (
    <div
      className="relative h-48 bg-linear-to-br from-bg-secondary to-bg-primary overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
      />

      {/* 标签组 */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <CategoryBadge category={category} />
        {statusBadge && (
          <StatusBadge type={statusBadge.type} text={statusBadge.text} />
        )}
      </div>
    </div>
  );
}
