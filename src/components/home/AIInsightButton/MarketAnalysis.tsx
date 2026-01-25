import { Sparkles } from 'lucide-react';

export default function MarketAnalysis() {
  return (
    <div className="p-5 space-y-4 flex-shrink-0">
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
  );
}
