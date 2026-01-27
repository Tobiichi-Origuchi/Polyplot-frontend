export interface NarrativeCardProps {
  id: string;
  category: string;
  statusBadge?: {
    type: 'new' | 'hot' | 'left';
    text: string;
  };
  imageUrl: string;
  title: string;
  description: string;
  longPercentage: number;
  shortPercentage: number;
  volume: string;
  participants: number;
  participantImages?: string[];
  onBuyLong?: () => void;
  onBuyShort?: () => void;
}

export type TradeType = 'long' | 'short';
