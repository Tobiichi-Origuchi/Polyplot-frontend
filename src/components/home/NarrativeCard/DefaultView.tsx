import ProgressBar from './ProgressBar';
import StatsInfo from './StatsInfo';
import TradeButtons from './TradeButtons';

interface DefaultViewProps {
  title: string;
  description: string;
  longPercentage: number;
  shortPercentage: number;
  volume: string;
  participants: number;
  participantImages?: string[];
  onBuyLong: () => void;
  onBuyShort: () => void;
}

export default function DefaultView({
  title,
  description,
  longPercentage,
  shortPercentage,
  volume,
  participants,
  participantImages,
  onBuyLong,
  onBuyShort,
}: DefaultViewProps) {
  return (
    <>
      <h3 className="text-text-primary font-bold text-xl mb-2 truncate">
        {title}
      </h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2 h-10">
        {description}
      </p>

      {/* 进度条 */}
      <ProgressBar longPercentage={longPercentage} shortPercentage={shortPercentage} />

      {/* 统计信息 */}
      <StatsInfo
        volume={volume}
        participants={participants}
        participantImages={participantImages}
      />

      {/* 按钮组 */}
      <TradeButtons onBuyLong={onBuyLong} onBuyShort={onBuyShort} />
    </>
  );
}
