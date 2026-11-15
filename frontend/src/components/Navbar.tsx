'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  FileText, 
  Bookmark, 
  User, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Explorer', icon: Compass },
    { href: '/scholarships', label: 'Toutes les Bourses', icon: Search },
    { href: '/cv-builder', label: 'Générateur de CV', icon: FileText, badge: 'Pro' },
    { href: '/ai-assistant', label: 'Orientation & Conseils', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-[#FAF9F6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Académique Noble */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-amber-300 shadow-sm group-hover:bg-blue-900 transition-colors">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 font-serif">Next</span>
              <span className="rounded-md bg-blue-950 text-amber-300 px-1.5 py-0.5 text-xs font-bold tracking-wide">Bourse</span>
            </div>
            <p className="text-[10px] text-stone-500 font-semibold tracking-wide uppercase">Excellence & Mobilité Internationale</p>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-950 bg-stone-200/70'
                    : 'text-stone-600 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-950' : 'text-stone-400'}`} />
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-amber-600 px-1.5 py-0.2 text-[10px] font-bold text-white shadow-2xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions utilisateur */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/scholarships?funding_type=full"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
            Bourses 100% Prises en charge
          </Link>

          <Link
            href="/cv-builder"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-900 transition-all active:scale-95"
          >
            <FileText className="h-4 w-4 text-amber-300" />
            <span>Mon CV Académique</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-stone-700 bg-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 dark:border-slate-800 dark:bg-slate-950">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
