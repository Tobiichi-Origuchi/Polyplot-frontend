import { forwardRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isTyping }, ref) => {
    if (messages.length === 0) return null;

    return (
      <>
        <div ref={ref} className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-hover">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* AI 正在输入指示器 */}
          {isTyping && <TypingIndicator />}

          {/* 滚动目标元素 */}
          <div />
        </div>
        <div className="border-t border-border-primary flex-shrink-0"></div>
      </>
    );
  }
);

MessageList.displayName = 'MessageList';

export default MessageList;
