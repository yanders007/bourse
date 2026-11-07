'use client';

import React from 'react';
import { Search, MapPin, GraduationCap, BookOpen, CheckCircle, RotateCcw } from 'lucide-react';
import { FilterParams } from '@/types';

interface SearchFiltersProps {
  filters: FilterParams;
  onChange: (newFilters: FilterParams) => void;
  onReset: () => void;
  countriesList?: { country: string; total: number }[];
}

export const DOMAINS_LIST = [
  'Toutes les filières',
  'Informatique & IA',
  'Ingénierie & Sciences',
  'Médecine & Santé',
  'Économie & Gestion',
  'Agronomie & Environnement',
  'Droit & Sciences Politiques',
  'Éducation & Sciences Humaines'
];

export const LEVELS_LIST = [
  'Tous les niveaux',
  'Licence / Bachelor',
  'Master',
  'Doctorat / PhD',
  'Stage & Recherche'
];

export const POPULAR_COUNTRIES = [
  'Tous les pays',
  'France',
  'Canada',
  'Allemagne',
  'Royaume-Uni',
  'Union Européenne',
  'Turquie',
  'Chine',
  'Belgique',
  'Suisse',
  'États-Unis'
];

export default function SearchFilters({ filters, onChange, onReset }: SearchFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4">
        {/* Barre de recherche texte */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une bourse, une université, un pays ou une spécialité..."
            value={filters.q || ''}
            onChange={(e) => onChange({ ...filters, q: e.target.value, page: 1 })}
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-10 text-base sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 shadow-xs"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, q: '', page: 1 })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Ligne des sélecteurs (Filière, Niveau, Pays, Financement) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Sélecteur de Filière / Domaine */}
          <div className="relative">
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Filière d'études
            </label>
            <div className="relative">
              <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={filters.domain || ''}
                onChange={(e) => onChange({ ...filters, domain: e.target.value, page: 1 })}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {DOMAINS_LIST.map((domain) => (
                  <option key={domain} value={domain.includes('Toutes') ? '' : domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sélecteur de Niveau d'études */}
          <div className="relative">
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Niveau d'études
            </label>
            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={filters.level || ''}
                onChange={(e) => onChange({ ...filters, level: e.target.value, page: 1 })}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {LEVELS_LIST.map((lvl) => (
                  <option key={lvl} value={lvl.includes('Tous') ? '' : lvl.split('/')[0].trim()}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sélecteur de Pays */}
          <div className="relative">
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Destination souhaitée
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={filters.country || ''}
                onChange={(e) => onChange({ ...filters, country: e.target.value, page: 1 })}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c} value={c.includes('Tous') ? '' : c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type de financement & Reset */}
          <div className="flex flex-col justify-end">
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Type de financement
            </label>
            <div className="flex items-center gap-2">
              <select
                value={filters.funding_type || ''}
                onChange={(e) => onChange({ ...filters, funding_type: e.target.value, page: 1 })}
                className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">Tous les types (Total & Partiel)</option>
                <option value="full">100% Financée (Totale)</option>
                <option value="partial">Partiellement Financée</option>
              </select>

              <button
                type="button"
                onClick={onReset}
                title="Réinitialiser les filtres"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
