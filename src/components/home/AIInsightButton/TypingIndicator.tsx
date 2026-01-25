import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-short/30 to-long/30 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-long" />
      </div>
      <div className="bg-bg-secondary text-text-primary border border-border-primary rounded-lg px-4 py-2.5">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-long rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-long rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-long rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}
