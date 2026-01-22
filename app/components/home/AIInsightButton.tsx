'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Send, Bot, User } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIInsightButton() {
  const { isLoggedIn, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  // 当 AI 回复完成时，自动滚动对话区域到底部(只影响对话框内部，不影响浏览器窗口)
  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      // 使用 scrollTop 而不是 scrollIntoView，避免影响浏览器窗口
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 模拟 AI 响应
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('crypto') || lowerMessage.includes('bitcoin')) {
      return 'Based on current trends, crypto markets are showing strong momentum. Bitcoin narratives have a 72% bullish sentiment with increased trading volume.';
    } else if (lowerMessage.includes('politic')) {
      return 'Political markets remain relatively stable. The 2024 election narratives are experiencing moderate engagement with balanced Long/Short positions.';
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('market')) {
      return 'Current market analysis shows: Crypto (+72%), AI & Tech (+45%), Sports (+15%). Political markets are steady with moderate volatility.';
    } else if (lowerMessage.includes('hot') || lowerMessage.includes('popular')) {
      return 'The hottest narratives right now are: Bitcoin Halving Effect, AI Market Prediction Bundle, and Paris Olympics 2024. These are seeing the highest trading volumes.';
    } else {
      return 'I can help you analyze market trends, predict outcomes, and understand narrative performance. What would you like to know?';
    }
  };


  // 处理发送消息
  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message.trim(),
        timestamp: new Date(),
      };

      // 添加用户消息
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      // 模拟 AI 思考时间
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: getAIResponse(userMessage.content),
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
    }
  };

  // 处理回车键发送
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理按钮点击
  const handleButtonClick = () => {
    if (!isLoggedIn) {
      // 未登录时，打开登录弹窗
      openLoginModal();
    } else {
      // 已登录时，切换聊天框显示状态
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full relative">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="w-full flex items-center justify-between bg-gradient-to-r from-short/20 to-long/20 hover:from-short/30 hover:to-long/30 rounded-xl px-5 py-3.5 border border-border-primary hover:border-long hover:shadow-lg hover:shadow-long/20 transition-all duration-300 group relative overflow-hidden"
      >
        {/* 悬停时的光晕效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-short/0 via-long/10 to-short/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center gap-3 relative z-10">
          <Sparkles className="w-5 h-5 text-long group-hover:text-long-hover group-hover:scale-110 transition-all duration-300" />
          <span className="text-text-primary group-hover:text-white font-semibold text-lg transition-colors duration-300">AI Insight</span>
        </div>
        {isLoggedIn && isOpen ? (
          <ChevronUp className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-all duration-300 relative z-10" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-all duration-300 relative z-10" />
        )}
      </button>

      {/* 悬浮内容 - 仅在已登录且打开时显示 */}
      {isLoggedIn && isOpen && (
        <div
          ref={contentRef}
          className="absolute top-full right-0 mt-3 w-full lg:w-[420px] bg-bg-card rounded-xl border border-border-primary shadow-2xl animate-[dropdown-fade-in_0.2s_ease-out] z-40 max-h-[600px] flex flex-col"
        >
          {/* AI 分析内容 */}
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

          {/* 分隔线 */}
          <div className="border-t border-border-primary flex-shrink-0"></div>

          {/* 消息历史记录 - 可滚动 */}
          {messages.length > 0 && (
            <>
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-hide">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-short/30 to-long/30 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-long" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                        msg.role === 'user'
                          ? 'bg-long text-black'
                          : 'bg-bg-secondary text-text-primary border border-border-primary'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-long flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-black" />
                      </div>
                    )}
                  </div>
                ))}

                {/* AI 正在输入指示器 */}
                {isTyping && (
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
                )}

                {/* 滚动目标元素 */}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-border-primary flex-shrink-0"></div>
            </>
          )}

          {/* 消息输入框 */}
          <div ref={inputContainerRef} className="p-5 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask AI anything..."
                className="flex-1 bg-bg-secondary text-text-primary placeholder:text-text-tertiary border border-border-primary rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-long transition-all text-sm"
              />
              <button
                onClick={handleSendMessage}
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
        </div>
      )}
    </div>
  );
}
