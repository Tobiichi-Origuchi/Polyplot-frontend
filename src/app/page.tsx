import MarketList from '@/components/home/MarketList';
import { NarrativeCardProps } from '@/components/home/NarrativeCard';

// 模拟市场数据
const mockMarkets: NarrativeCardProps[] = [
  {
    id: 'bitcoin-halving-effect',
    category: 'CRYPTO',
    statusBadge: { type: 'left', text: '20 LEFT' },
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80',
    title: 'Bitcoin Halving Effect',
    description: 'Will Bitcoin exceed $75k before the halving event occurs in April 2024?',
    longPercentage: 72,
    shortPercentage: 28,
    volume: '$1.2M',
    participants: 1420,
    participantImages: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
    ],
  },
  {
    id: 'presidential-election-2024',
    category: 'POLITICS',
    statusBadge: { type: 'left', text: '15 LEFT' },
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    title: '2024 Presidential Election Outcome',
    description: 'Will the Democratic Party win the 2024 presidential election?',
    longPercentage: 48,
    shortPercentage: 52,
    volume: '$2.1M',
    participants: 2340,
    participantImages: [
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
  },
  {
    id: 'ai-market-prediction',
    category: 'AI & TECH',
    statusBadge: { type: 'hot', text: 'HOT' },
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    title: 'AI Market Prediction Bundle',
    description: 'Trade on the future of AI development and major company valuations.',
    longPercentage: 65,
    shortPercentage: 35,
    volume: '$890K',
    participants: 892,
    participantImages: [
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
      'https://i.pravatar.cc/150?img=6',
    ],
  },
  {
    id: '4',
    category: 'SPORTS',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    title: 'NBA Championship 2024',
    description: 'Will the Boston Celtics win the 2024 NBA Championship?',
    longPercentage: 38,
    shortPercentage: 62,
    volume: '$2.1M',
    participants: 892,
    participantImages: [
      'https://i.pravatar.cc/150?img=9',
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
    ],
  },
  {
    id: '5',
    category: 'POP CULTURE',
    statusBadge: { type: 'new', text: 'NEW' },
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    title: 'Taylor Swift Album Release',
    description: 'Will Taylor Swift release a new album in the first half of 2024?',
    longPercentage: 81,
    shortPercentage: 19,
    volume: '$456K',
    participants: 234,
    participantImages: [
      'https://i.pravatar.cc/150?img=12',
      'https://i.pravatar.cc/150?img=13',
    ],
  },
  {
    id: '6',
    category: 'CRYPTO',
    statusBadge: { type: 'hot', text: 'HOT' },
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80',
    title: 'Ethereum ETF Approval',
    description: 'Will the SEC approve spot Ethereum ETFs in 2024?',
    longPercentage: 56,
    shortPercentage: 44,
    volume: '$1.7M',
    participants: 678,
    participantImages: [
      'https://i.pravatar.cc/150?img=14',
      'https://i.pravatar.cc/150?img=15',
      'https://i.pravatar.cc/150?img=16',
    ],
  },
  {
    id: '7',
    category: 'AI & TECH',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    title: 'Apple Vision Pro Sales',
    description: 'Will Apple sell over 1 million Vision Pro units in the first year?',
    longPercentage: 42,
    shortPercentage: 58,
    volume: '$723K',
    participants: 445,
    participantImages: [
      'https://i.pravatar.cc/150?img=17',
      'https://i.pravatar.cc/150?img=18',
    ],
  },
  {
    id: '8',
    category: 'POLITICS',
    statusBadge: { type: 'left', text: '15 LEFT' },
    imageUrl: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&q=80',
    title: 'Global Climate Agreement',
    description: 'Will a new major climate agreement be signed at COP29?',
    longPercentage: 33,
    shortPercentage: 67,
    volume: '$512K',
    participants: 289,
    participantImages: [
      'https://i.pravatar.cc/150?img=19',
    ],
  },
  {
    id: '9',
    category: 'SPORTS',
    statusBadge: { type: 'hot', text: 'HOT' },
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    title: 'Paris Olympics 2024',
    description: 'Will the USA win the most gold medals at the 2024 Paris Olympics?',
    longPercentage: 69,
    shortPercentage: 31,
    volume: '$1.5M',
    participants: 934,
    participantImages: [
      'https://i.pravatar.cc/150?img=20',
      'https://i.pravatar.cc/150?img=21',
      'https://i.pravatar.cc/150?img=22',
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div
        className="border-b border-border-primary"
        style={{
          backgroundColor: '#0f0f0f',
          backgroundImage: `url('/topography.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
              Trade Your <span className="text-long">Worldview</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Explore Narratives
        </h2>

        {/* Market List with Category Filter */}
        <MarketList initialMarkets={mockMarkets} />
      </div>
    </div>
  );
}
