'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl border border-stone-200 bg-stone-100 dark:border-slate-800 dark:bg-slate-800 ${className}`} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair (fond ivoire)' : 'Mode sombre (bleu nuit)'}
      className={`relative inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
        isDark
          ? 'border-slate-700 bg-slate-800/90 text-amber-300 hover:bg-slate-700 hover:text-amber-200 shadow-xs'
          : 'border-stone-200 bg-white text-slate-700 hover:bg-stone-100 hover:text-blue-950 shadow-xs'
      } ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {isDark ? (
          <Moon className="h-4 w-4 text-amber-300 transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="h-4 w-4 text-amber-600 transition-transform duration-300 rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Mode Sombre' : 'Mode Clair'}
        </span>
      )}
    </button>
  );
}
