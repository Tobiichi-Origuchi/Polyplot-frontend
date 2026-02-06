import { forwardRef } from 'react';
import MarketAnalysis from './MarketAnalysis';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from './types';

interface DropdownContentProps {
  messages: Message[];
  message: string;
  isTyping: boolean;
  isClosing: boolean;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  inputContainerRef: React.RefObject<HTMLDivElement | null>;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      messages,
      message,
      isTyping,
      isClosing,
      messagesContainerRef,
      inputContainerRef,
      onMessageChange,
      onSendMessage,
      onKeyPress,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`absolute top-full right-0 mt-3 w-full lg:w-[420px] bg-bg-card rounded-xl border border-border-primary shadow-2xl z-40 max-h-[600px] flex flex-col ${
          isClosing
            ? 'animate-[dropdown-fade-out_0.2s_ease-in-out]'
            : 'animate-[dropdown-fade-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
      >
        {/* AI 分析内容 */}
        <MarketAnalysis />

        {/* 分隔线 */}
        <div className="border-t border-border-primary flex-shrink-0"></div>

        {/* 消息历史记录 */}
        <MessageList ref={messagesContainerRef} messages={messages} isTyping={isTyping} />

        {/* 消息输入框 */}
        <MessageInput
          ref={inputContainerRef}
          message={message}
          isTyping={isTyping}
          onMessageChange={onMessageChange}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

export default DropdownContent;
