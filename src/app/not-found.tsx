'use client';

import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 大标题 */}
        <h1 className="text-9xl font-bold text-text-primary mb-4">404</h1>

        {/* 错误描述 */}
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary text-lg mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* 操作按钮 */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-long hover:bg-long-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            href="/"
            className="bg-bg-card hover:bg-bg-secondary text-text-primary font-semibold px-6 py-3 rounded-lg transition-colors border border-border-primary flex items-center gap-2"
          >
            <Search size={20} />
            Explore Markets
          </Link>
        </div>

        {/* 装饰性元素 */}
        <div className="mt-16 text-text-tertiary text-sm">
          <p>Lost in the prediction market?</p>
          <p className="mt-2">Let&apos;s get you back on track.</p>
        </div>
      </div>
    </div>
  );
}
