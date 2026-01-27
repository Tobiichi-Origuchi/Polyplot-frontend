import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface StatsInfoProps {
  volume: string;
  participants: number;
  participantImages?: string[];
}

export default function StatsInfo({ volume, participants, participantImages = [] }: StatsInfoProps) {
  return (
    <div className="flex items-center justify-between mb-4 text-text-secondary text-sm">
      <div className="flex items-center gap-1">
        <TrendingUp size={16} />
        <span>{volume} Vol</span>
      </div>

      <div className="flex items-center gap-2">
        {/* 用户头像群组 */}
        {participantImages.length > 0 && (
          <div className="flex -space-x-2">
            {participantImages.slice(0, 3).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`User ${idx + 1}`}
                width={24}
                height={24}
                className="rounded-full border-2 border-bg-card"
              />
            ))}
          </div>
        )}
        {participants > participantImages.length && (
          <span className="text-text-secondary font-semibold">
            +{participants - participantImages.length}
          </span>
        )}
      </div>
    </div>
  );
}
