'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // Start with a default value to ensure SSR/client consistency
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage after component mounts
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme ? savedTheme === 'dark' : true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    // TODO: Apply theme to document
    console.log('Theme toggled to:', newTheme ? 'dark' : 'light');
  };

  // Prevent hydration mismatch by not rendering icon until mounted
  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-full bg-bg-secondary hover:bg-bg-card text-text-secondary hover:text-text-primary flex items-center justify-center transition-all"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-bg-secondary hover:bg-bg-card text-text-secondary hover:text-text-primary flex items-center justify-center transition-all"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
