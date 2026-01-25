import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-short/30 to-long/30 flex items-center justify-center flex-shrink-0">
          <Bot size={14} className="text-long" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
          isUser
            ? 'bg-long text-black'
            : 'bg-bg-secondary text-text-primary border border-border-primary'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-long flex items-center justify-center flex-shrink-0">
          <User size={14} className="text-black" />
        </div>
      )}
    </div>
  );
}
