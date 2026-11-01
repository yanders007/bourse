'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Heart, Globe, Shield, Sparkles, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Marque & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Next Bourse</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Plateforme dédiée à la réussite académique internationale des étudiants d'Afrique et du monde. Trouver des financements d'études 100% vérifiés et accessibles.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Shield className="h-4 w-4" />
              <span>Bourses vérifiées et gratuites d'accès</span>
            </div>
          </div>

          {/* Programmes Phares */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Grandes Bourses
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scholarships?q=Mastercard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Mastercard Foundation Scholars
                </Link>
              </li>
              <li>
                <Link href="/scholarships?q=Eiffel" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Bourses France Excellence Eiffel
                </Link>
              </li>
              <li>
                <Link href="/scholarships?q=Chevening" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Chevening Scholarships (UK)
                </Link>
              </li>
              <li>
                <Link href="/scholarships?q=DAAD" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Bourses DAAD (Allemagne)
                </Link>
              </li>
              <li>
                <Link href="/scholarships?q=Erasmus" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Erasmus Mundus (Europe)
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations Populaires */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scholarships?country=France" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Étudier en France
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=Canada" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Étudier au Canada
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=Allemagne" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Étudier en Allemagne
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=Turquie" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Étudier en Turquie
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=Chine" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Étudier en Chine
                </Link>
              </li>
            </ul>
          </div>

          {/* Outils & Aide */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Outils Étudiant
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ai-assistant" className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span>Assistant IA d'Orientation</span>
                </Link>
              </li>
              <li>
                <Link href="/cv-builder" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Générateur de CV Académique
                </Link>
              </li>
              <li>
                <Link href="/scholarships?funding_type=full" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Filtre Bourses 100% Prises en Charge
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/80 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Next Bourse. Conçu pour faciliter les opportunités mondiales d'études.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Fait avec <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> pour la communauté étudiante.
          </p>
        </div>
      </div>
    </footer>
  );
}

