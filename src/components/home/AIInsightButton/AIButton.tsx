import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef } from 'react';

interface AIButtonProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClick: () => void;
}

const AIButton = forwardRef<HTMLButtonElement, AIButtonProps>(
  ({ isOpen, isLoggedIn, onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="w-full flex items-center justify-between bg-gradient-to-r from-short/20 to-long/20 hover:from-short/30 hover:to-long/30 rounded-xl px-5 py-3.5 border border-border-primary hover:border-long hover:shadow-lg hover:shadow-long/20 transition-all duration-300 group relative overflow-hidden cursor-pointer"
      >
        {/* 悬停时的光晕效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-short/0 via-long/10 to-short/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center gap-3 relative z-10">
          <Sparkles className="w-5 h-5 text-long group-hover:text-long-hover group-hover:scale-110 transition-all duration-300" />
          <span className="text-text-primary group-hover:text-white font-semibold text-lg transition-colors duration-300">
            AI Insight
          </span>
        </div>
        {isLoggedIn && isOpen ? (
          <ChevronUp className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-all duration-300 relative z-10" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-all duration-300 relative z-10" />
        )}
      </button>
    );
  }
);

AIButton.displayName = 'AIButton';

export default AIButton;
