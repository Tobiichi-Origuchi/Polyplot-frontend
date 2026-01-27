'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  variant?: 'long' | 'short' | 'primary';
}

export default function LoadingSpinner({
  size = 'md',
  message = 'Loading...',
  variant = 'long'
}: LoadingSpinnerProps) {
  // 根据尺寸设置图标大小
  const iconSize = {
    sm: 20,
    md: 32,
    lg: 48,
  }[size];

  // 根据尺寸设置文本大小
  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  // 根据变体设置颜色
  const colorClass = {
    long: 'text-long',
    short: 'text-short',
    primary: 'text-text-primary',
  }[variant];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* 旋转的加载图标 */}
      <div className="relative">
        {/* 外圈 - 静态背景圈 */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-bg-secondary`}
          style={{
            width: iconSize * 1.5,
            height: iconSize * 1.5,
          }}
        />

        {/* 旋转的加载圈 */}
        <Loader2
          size={iconSize * 1.5}
          className={`${colorClass} animate-spin`}
          strokeWidth={3}
        />
      </div>

      {/* 加载消息 */}
      {message && (
        <div className="flex flex-col items-center gap-2">
          <p className={`${textSize} font-semibold text-text-primary`}>
            {message}
          </p>

          {/* 动态加载点 */}
          <div className="flex gap-1">
            <span
              className={`w-2 h-2 ${variant === 'long' ? 'bg-long' : variant === 'short' ? 'bg-short' : 'bg-text-primary'} rounded-full animate-bounce`}
              style={{ animationDelay: '0ms' }}
            />
            <span
              className={`w-2 h-2 ${variant === 'long' ? 'bg-long' : variant === 'short' ? 'bg-short' : 'bg-text-primary'} rounded-full animate-bounce`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-2 h-2 ${variant === 'long' ? 'bg-long' : variant === 'short' ? 'bg-short' : 'bg-text-primary'} rounded-full animate-bounce`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
