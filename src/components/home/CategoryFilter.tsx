'use client';

import { Home, Bitcoin, Landmark, Sparkles, Gamepad2, Trophy } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  icon: typeof Home;
  label: string;
}

const categories: Category[] = [
  { id: 'all', icon: Home, label: 'All Narratives' },
  { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
  { id: 'politics', icon: Landmark, label: 'Politics' },
  { id: 'ai-tech', icon: Sparkles, label: 'AI & Tech' },
  { id: 'pop-culture', icon: Gamepad2, label: 'Pop Culture' },
  { id: 'sports', icon: Trophy, label: 'Sports' },
];

interface CategoryFilterProps {
  onCategoryChange?: (categoryId: string) => void;
  defaultCategory?: string;
}

export default function CategoryFilter({
  onCategoryChange,
  defaultCategory = 'all'
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hover">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
              isActive
                ? 'bg-long text-black shadow-lg'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-card hover:text-text-primary'
            }`}
          >
            <Icon size={18} />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
