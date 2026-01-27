import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface TradeButtonsProps {
  onBuyLong: () => void;
  onBuyShort: () => void;
}

export default function TradeButtons({ onBuyLong, onBuyShort }: TradeButtonsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onBuyLong}
        className="flex-1 bg-long hover:bg-long-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <ThumbsUp size={18} />
        Buy Long
      </button>
      <button
        onClick={onBuyShort}
        className="flex-1 bg-short hover:bg-short-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <ThumbsDown size={18} />
        Buy Short
      </button>
    </div>
  );
}
