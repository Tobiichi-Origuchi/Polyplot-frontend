'use client';

import { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function AIInsightButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gradient-to-r from-short/20 to-long/20 rounded-xl px-5 py-3.5 border border-border-primary hover:border-long/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-long group-hover:text-long-hover transition-colors" />
          <span className="text-text-primary font-semibold text-lg">AI Insight</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 p-5 bg-bg-card rounded-xl border border-border-primary animate-[dropdown-fade-in_0.2s_ease-out]">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-short/30 to-long/30 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-long" />
              </div>
              <div>
                <h3 className="text-text-primary font-semibold mb-2">Market Trends Analysis</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Based on current market sentiment and historical data, crypto narratives are showing
                  strong momentum with a 72% increase in trading volume over the past 24 hours.
                  Political markets remain stable with moderate engagement.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border-primary">
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary text-xs">Powered by AI</span>
                <span className="text-text-tertiary text-xs">Last updated: Just now</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
