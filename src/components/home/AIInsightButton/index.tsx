'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AIButton from './AIButton';
import DropdownContent from './DropdownContent';
import { Message } from './types';
import { getAIResponse } from './aiResponses';

export default function AIInsightButton() {
  const { isLoggedIn, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 管理渲染状态
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      setIsClosing(false);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }
  }, [isOpen]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // 处理关闭动画
  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      setIsOpen(false);
      closeTimeoutRef.current = null;
    }, 200);
  }, [isClosing]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOnButton = buttonRef.current?.contains(target);
      const isClickOnContent = contentRef.current?.contains(target);

      if (!isClickOnButton && !isClickOnContent && isOpen && !isClosing) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isClosing, handleClose]);

  // 当 AI 回复完成时，自动滚动对话区域到底部
  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 处理发送消息
  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message.trim(),
        timestamp: new Date(),
      };

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
      }, 1000 + Math.random() * 1000);
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
      openLoginModal();
    } else {
      if (isOpen) {
        handleClose();
      } else {
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="w-full relative">
      <AIButton ref={buttonRef} isOpen={isOpen} isLoggedIn={isLoggedIn} onClick={handleButtonClick} />

      {/* 悬浮内容 - 仅在已登录且打开时显示 */}
      {isLoggedIn && shouldRender && (
        <DropdownContent
          ref={contentRef}
          messages={messages}
          message={message}
          isTyping={isTyping}
          isClosing={isClosing}
          messagesContainerRef={messagesContainerRef}
          inputContainerRef={inputContainerRef}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}
