import { Send } from 'lucide-react';
import { forwardRef } from 'react';

interface MessageInputProps {
  message: string;
  isTyping: boolean;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MessageInput = forwardRef<HTMLDivElement, MessageInputProps>(
  ({ message, isTyping, onMessageChange, onSendMessage, onKeyPress }, ref) => {
    return (
      <div ref={ref} className="p-5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask AI anything..."
            className="flex-1 bg-bg-secondary text-text-primary placeholder:text-text-tertiary border border-border-primary rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-long transition-all text-sm"
          />
          <button
            onClick={onSendMessage}
            disabled={!message.trim() || isTyping}
            className={`p-2.5 rounded-lg transition-colors ${
              message.trim() && !isTyping
                ? 'bg-long hover:bg-long-hover text-black cursor-pointer'
                : 'bg-bg-secondary text-text-tertiary cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
