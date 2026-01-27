'use client';

import { useState } from 'react';
import CategoryFilter from '@/components/home/CategoryFilter';
import AIInsightButton from '@/components/home/AIInsightButton';
import NarrativeCard, { NarrativeCardProps } from '@/components/home/NarrativeCard';

interface MarketListProps {
  initialMarkets: NarrativeCardProps[];
}

export default function MarketList({ initialMarkets }: MarketListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 根据选中的分类过滤市场
  const filteredMarkets = selectedCategory === 'all'
    ? initialMarkets
    : initialMarkets.filter((market) => {
        const categoryMap: Record<string, string> = {
          'crypto': 'CRYPTO',
          'politics': 'POLITICS',
          'ai-tech': 'AI & TECH',
          'pop-culture': 'POP CULTURE',
          'sports': 'SPORTS',
        };
        return market.category === categoryMap[selectedCategory];
      });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBuyLong = (marketId: string) => {
    console.log(`Buy Long clicked for market: ${marketId}`);
    // TODO: 实现 Buy Long 逻辑
  };

  const handleBuyShort = (marketId: string) => {
    console.log(`Buy Short clicked for market: ${marketId}`);
    // TODO: 实现 Buy Short 逻辑
  };

  return (
    <>
      {/* Category Filter and AI Insight Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Category Filter - Takes 8 columns on desktop */}
        <div className="lg:col-span-8">
          <CategoryFilter
            onCategoryChange={handleCategoryChange}
            defaultCategory="all"
          />
        </div>

        {/* AI Insight Button - Takes 4 columns on desktop */}
        <div className="lg:col-span-4">
          <AIInsightButton />
        </div>
      </div>

      {/* Markets Count */}
      <div className="mb-6">
        <p className="text-text-secondary">
          {filteredMarkets.length} {filteredMarkets.length === 1 ? 'market' : 'markets'} found
        </p>
      </div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map((market) => (
          <NarrativeCard
            key={market.id}
            {...market}
            onBuyLong={() => handleBuyLong(market.id)}
            onBuyShort={() => handleBuyShort(market.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredMarkets.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg">
            No markets found in this category.
          </p>
        </div>
      )}
    </>
  );
}
