import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
    >
      {/* Logo Icon */}
      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-long to-short flex items-center justify-center">
        <Sparkles className="text-white" size={20} />
      </div>

      {/* Brand Name */}
      <span className="text-2xl font-bold text-text-primary">
        Polyplot
      </span>
    </Link>
  );
}
