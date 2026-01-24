'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        size={18}
      />

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search markets, users, or topics..."
        className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary text-text-primary placeholder:text-text-secondary border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-long transition-all"
      />
    </div>
  );
}
