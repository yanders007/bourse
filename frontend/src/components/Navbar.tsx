'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  FileText, 
  Heart, 
  Menu, 
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  const navLinks = [
    { href: '/', label: 'Explorer', icon: Compass },
    { href: '/scholarships', label: 'Bourses', icon: Search },
    { href: '/cv-builder', label: 'Créateur de CV', icon: FileText, badge: 'Pro' },
    { href: '/ai-assistant', label: 'Orientation IA', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-[#FAF9F6]/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090E1A]/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Académique Noble */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-950 text-amber-300 shadow-sm group-hover:bg-blue-900 transition-colors dark:bg-blue-900 dark:text-amber-300">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-serif">Next</span>
              <span className="rounded-md bg-blue-950 text-amber-300 dark:bg-blue-600 dark:text-white px-1.5 py-0.5 text-[11px] sm:text-xs font-bold tracking-wide">Bourse</span>
            </div>
            <p className="hidden xs:block text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400 font-semibold tracking-wide uppercase">
              Excellence Académique
            </p>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                  isActive
                    ? 'text-blue-950 bg-stone-200/70 dark:bg-slate-800 dark:text-blue-300 shadow-2xs'
                    : 'text-stone-600 hover:text-slate-900 hover:bg-stone-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-950 dark:text-blue-400' : 'text-stone-400 dark:text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-full bg-amber-600 px-1.5 py-0.2 text-[9px] font-bold text-white shadow-2xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions utilisateur & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Bouton Favoris avec Compteur */}
          <Link
            href="/scholarships?favorites=true"
            title="Mes bourses enregistrées"
            className="relative flex h-9 items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-2.5 sm:px-3 text-xs font-semibold text-slate-700 hover:bg-stone-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all shadow-xs"
          >
            <Heart className={`h-4 w-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-400 dark:text-slate-400'}`} />
            <span className="hidden sm:inline">Favoris</span>
            {favoritesCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white animate-in zoom-in-50">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Bouton Toggle Thème (Clair / Sombre) */}
          <ThemeToggle />

          {/* Bouton CTA CV Desktop */}
          <Link
            href="/cv-builder"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-950 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-900 transition-all active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <FileText className="h-3.5 w-3.5 text-amber-300 dark:text-white" />
            <span>Créer mon CV</span>
          </Link>

          {/* Menu Mobile Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu de navigation"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant élégant avec animation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 dark:border-slate-800 dark:bg-slate-950/95 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-950 dark:bg-slate-800 dark:text-blue-300'
                    : 'text-stone-700 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-stone-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/cv-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-950 py-3 text-xs font-bold text-white shadow-sm dark:bg-blue-600"
            >
              <FileText className="h-4 w-4 text-amber-300 dark:text-white" />
              <span>Créer mon CV Académique (A4)</span>
            </Link>

            <Link
              href="/scholarships?funding_type=full"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/80 py-2.5 text-xs font-bold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Voir uniquement les bourses 100% financées</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
