'use client';

import React from 'react';
import { Search, MapPin, GraduationCap, BookOpen, RotateCcw, X, Check, Sparkles } from 'lucide-react';
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
  'Belgique',
  'Suisse',
  'Chine',
  'Turquie',
  'États-Unis'
];

export default function SearchFilters({ filters, onChange, onReset }: SearchFiltersProps) {
  const quickChips = [
    { label: '💰 100% Financées', active: filters.funding_type === 'full', action: () => onChange({ ...filters, funding_type: filters.funding_type === 'full' ? '' : 'full', page: 1 }) },
    { label: '🎓 Master', active: filters.level === 'Master', action: () => onChange({ ...filters, level: filters.level === 'Master' ? '' : 'Master', page: 1 }) },
    { label: '🏛️ Licence', active: filters.level === 'Licence', action: () => onChange({ ...filters, level: filters.level === 'Licence' ? '' : 'Licence', page: 1 }) },
    { label: '🇫🇷 France', active: filters.country === 'France', action: () => onChange({ ...filters, country: filters.country === 'France' ? '' : 'France', page: 1 }) },
    { label: '🇨🇦 Canada', active: filters.country === 'Canada', action: () => onChange({ ...filters, country: filters.country === 'Canada' ? '' : 'Canada', page: 1 }) },
    { label: '🇩🇪 Allemagne', active: filters.country === 'Allemagne', action: () => onChange({ ...filters, country: filters.country === 'Allemagne' ? '' : 'Allemagne', page: 1 }) },
  ];

  const hasActiveFilters = Boolean(
    filters.q || filters.country || filters.domain || filters.level || filters.funding_type
  );

  return (
    <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:gap-5">
        
        {/* Barre de recherche texte principale */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher une bourse, université, pays, filière (ex: Eiffel, Canada, IA)..."
            value={filters.q || ''}
            onChange={(e) => onChange({ ...filters, q: e.target.value, page: 1 })}
            className="w-full rounded-xl border border-stone-300 bg-white py-3 sm:py-3.5 pl-11 sm:pl-12 pr-10 text-sm sm:text-base font-medium outline-none transition-all placeholder:text-stone-400 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 shadow-xs"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, q: '', page: 1 })}
              title="Effacer la recherche"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick Chips Filtres Rapides */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-[11px] font-bold text-stone-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" /> Filtres express :
          </span>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={chip.action}
              className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                chip.active
                  ? 'bg-blue-950 text-white dark:bg-blue-600 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span>{chip.label}</span>
              {chip.active && <Check className="h-3 w-3" />}
            </button>
          ))}
        </div>

        {/* Ligne des sélecteurs (Filière, Niveau, Pays, Financement) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Sélecteur de Filière / Domaine */}
          <div className="relative">
            <label className="mb-1 block text-xs font-bold text-stone-700 uppercase tracking-wider dark:text-slate-300">
              Discipline / Filière
            </label>
            <div className="relative">
              <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
              <select
                value={filters.domain || ''}
                onChange={(e) => onChange({ ...filters, domain: e.target.value, page: 1 })}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-7 text-xs font-semibold outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-blue-500"
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
            <label className="mb-1 block text-xs font-bold text-stone-700 uppercase tracking-wider dark:text-slate-300">
              Cycle d'études
            </label>
            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
              <select
                value={filters.level || ''}
                onChange={(e) => onChange({ ...filters, level: e.target.value, page: 1 })}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-7 text-xs font-semibold outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-blue-500"
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
            <label className="mb-1 block text-xs font-bold text-stone-700 uppercase tracking-wider dark:text-slate-300">
              Pays d'accueil
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
              <select
                value={filters.country || ''}
                onChange={(e) => onChange({ ...filters, country: e.target.value, page: 1 })}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-7 text-xs font-semibold outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-blue-500"
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
            <label className="mb-1 block text-xs font-bold text-stone-700 uppercase tracking-wider dark:text-slate-300">
              Prise en charge
            </label>
            <div className="flex items-center gap-2">
              <select
                value={filters.funding_type || ''}
                onChange={(e) => onChange({ ...filters, funding_type: e.target.value, page: 1 })}
                className="flex-1 rounded-xl border border-stone-300 bg-white py-2.5 px-3 text-xs font-semibold outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-blue-500"
              >
                <option value="">Tous financements</option>
                <option value="full">100% Tout inclus</option>
                <option value="partial">Partiel / Exonération</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onReset}
                  title="Réinitialiser les filtres"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-stone-50 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
