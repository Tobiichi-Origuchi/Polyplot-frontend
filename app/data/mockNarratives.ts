import { BundleComponent } from '@/app/components/narrative/BundleComposition'

export interface NarrativeDetail {
  id: string
  slug: string
  title: string
  description: string
  category: string
  leftCount?: number
  statusType?: 'new' | 'hot' | 'left'

  // 统计数据
  totalValueLocked: string
  tradersCount: number
  traderAvatars: string[]
  expiryDate: string

  // 价格信息
  currentPrice: number
  priceChange: number

  // Bundle 组成
  bundleComponents: BundleComponent[]

  // 市场信息
  isLive: boolean
  polymarketUrl?: string

  // 图片
  imageUrl: string
}

export const mockNarratives: Record<string, NarrativeDetail> = {
  'bitcoin-halving-effect': {
    id: 'bitcoin-halving-effect',
    slug: 'bitcoin-halving-effect',
    title: 'Bitcoin Halving Effect',
    description: 'A composite bundle tracking the key outcomes surrounding the upcoming Bitcoin halving event. Trade on price action, network difficulty, and ETF inflows in a single instrument.',
    category: 'CRYPTO',
    leftCount: 20,
    statusType: 'left',
    totalValueLocked: '$1.2M',
    tradersCount: 1420,
    traderAvatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
    ],
    expiryDate: 'Apr 24, 2024',
    currentPrice: 0.72,
    priceChange: 4.2,
    bundleComponents: [
      {
        id: '1',
        title: 'Bitcoin > $75k Pre-Halving',
        resolutionSource: 'Binance Spot Price',
        weight: 50,
        progressColor: 'long',
        polymarketUrl: 'https://polymarket.com/event/bitcoin-75k-pre-halving',
      },
      {
        id: '2',
        title: 'Difficulty Adjustment > 3%',
        resolutionSource: 'Blockchain.com',
        weight: 30,
        progressColor: 'short',
        polymarketUrl: 'https://polymarket.com/event/bitcoin-difficulty-adjustment',
      },
      {
        id: '3',
        title: 'SEC Approval of Options ETF',
        resolutionSource: 'SEC.gov Press Release',
        weight: 20,
        progressColor: 'neutral',
        polymarketUrl: 'https://polymarket.com/event/sec-options-etf-approval',
      },
    ],
    isLive: true,
    imageUrl: '/narrative-bg.jpg',
  },
  'ai-market-prediction': {
    id: 'ai-market-prediction',
    slug: 'ai-market-prediction',
    title: 'AI Market Prediction Bundle',
    description: 'Trade on the future of AI development. This bundle tracks major AI company valuations, breakthrough announcements, and regulatory decisions affecting the AI industry.',
    category: 'TECH',
    statusType: 'hot',
    totalValueLocked: '$890K',
    tradersCount: 892,
    traderAvatars: [
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
      'https://i.pravatar.cc/150?img=6',
    ],
    expiryDate: 'Jun 30, 2024',
    currentPrice: 0.65,
    priceChange: -2.1,
    bundleComponents: [
      {
        id: '1',
        title: 'OpenAI Valuation > $100B',
        resolutionSource: 'Official Press Release',
        weight: 40,
        progressColor: 'long',
        polymarketUrl: 'https://polymarket.com/event/openai-valuation-100b',
      },
      {
        id: '2',
        title: 'EU AI Act Implementation',
        resolutionSource: 'EU Official Journal',
        weight: 35,
        progressColor: 'neutral',
        polymarketUrl: 'https://polymarket.com/event/eu-ai-act-implementation',
      },
      {
        id: '3',
        title: 'GPT-5 Release Announcement',
        resolutionSource: 'OpenAI Blog',
        weight: 25,
        progressColor: 'short',
        polymarketUrl: 'https://polymarket.com/event/gpt5-release',
      },
    ],
    isLive: true,
    imageUrl: '/narrative-bg.jpg',
  },
  'presidential-election-2024': {
    id: 'presidential-election-2024',
    slug: 'presidential-election-2024',
    title: '2024 Presidential Election Outcome',
    description: 'A comprehensive bundle tracking the 2024 U.S. Presidential Election. Trade on swing state outcomes, voter turnout, and final electoral college results.',
    category: 'POLITICS',
    leftCount: 15,
    statusType: 'left',
    totalValueLocked: '$2.1M',
    tradersCount: 2340,
    traderAvatars: [
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
    expiryDate: 'Nov 5, 2024',
    currentPrice: 0.58,
    priceChange: 1.8,
    bundleComponents: [
      {
        id: '1',
        title: 'Democratic Win in Pennsylvania',
        resolutionSource: 'Official State Results',
        weight: 45,
        progressColor: 'long',
        polymarketUrl: 'https://polymarket.com/event/pennsylvania-democratic-win',
      },
      {
        id: '2',
        title: 'Voter Turnout > 65%',
        resolutionSource: 'U.S. Census Bureau',
        weight: 30,
        progressColor: 'neutral',
        polymarketUrl: 'https://polymarket.com/event/voter-turnout-65',
      },
      {
        id: '3',
        title: 'Electoral College Margin > 50',
        resolutionSource: 'Official Electoral Results',
        weight: 25,
        progressColor: 'short',
        polymarketUrl: 'https://polymarket.com/event/electoral-margin-50',
      },
    ],
    isLive: true,
    imageUrl: '/narrative-bg.jpg',
  },
}

export function getNarrativeById(id: string): NarrativeDetail | null {
  return mockNarratives[id] || null
}

export function getAllNarratives(): NarrativeDetail[] {
  return Object.values(mockNarratives)
}
