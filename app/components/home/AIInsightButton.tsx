'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function AIInsightButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOnButton = buttonRef.current?.contains(target);
      const isClickOnContent = contentRef.current?.contains(target);

      if (!isClickOnButton && !isClickOnContent && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gradient-to-r from-short/20 to-long/20 rounded-xl px-5 py-3.5 border border-border-primary hover:border-long/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-long group-hover:text-long-hover transition-colors" />
          <span className="text-text-primary font-semibold text-lg">AI Insight</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-text-secondary transition-all duration-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary transition-all duration-300" />
        )}
      </button>

      {/* 悬浮内容 */}
      {isOpen && (
        <div
          ref={contentRef}
          className="absolute top-full right-0 mt-3 w-full lg:w-[420px] p-5 bg-bg-card rounded-xl border border-border-primary shadow-2xl animate-[dropdown-fade-in_0.2s_ease-out] z-50"
        >
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
