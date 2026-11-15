'use client';

import React from 'react';
import { Search, MapPin, GraduationCap, BookOpen, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
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
  return (
    <div className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all">
      <div className="flex flex-col gap-5">
        
        {/* Barre de recherche texte principale */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Rechercher par université, pays, spécialité ou mot-clé (ex: Eiffel, Canada, IA)..."
            value={filters.q || ''}
            onChange={(e) => onChange({ ...filters, q: e.target.value, page: 1 })}
            style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
            className="w-full rounded-xl border border-stone-300 bg-white py-3.5 pl-12 pr-11 text-base sm:text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-stone-400 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 shadow-xs"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, q: '', page: 1 })}
              title="Effacer la recherche"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Ligne des sélecteurs (Filière, Niveau, Pays, Financement) */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Sélecteur de Filière / Domaine */}
          <div className="relative">
            <label className="mb-1.5 block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Discipline / Filière
            </label>
            <div className="relative">
              <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <select
                value={filters.domain || ''}
                onChange={(e) => onChange({ ...filters, domain: e.target.value, page: 1 })}
                style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-8 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
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
            <label className="mb-1.5 block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Cycle d'études
            </label>
            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <select
                value={filters.level || ''}
                onChange={(e) => onChange({ ...filters, level: e.target.value, page: 1 })}
                style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-8 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
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
            <label className="mb-1.5 block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Pays d'accueil
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <select
                value={filters.country || ''}
                onChange={(e) => onChange({ ...filters, country: e.target.value, page: 1 })}
                style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-8 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
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
            <label className="mb-1.5 block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Financement & Prise en charge
            </label>
            <div className="flex items-center gap-2">
              <select
                value={filters.funding_type || ''}
                onChange={(e) => onChange({ ...filters, funding_type: e.target.value, page: 1 })}
                style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                className="flex-1 rounded-xl border border-stone-300 bg-white py-2.5 px-3 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
              >
                <option value="">Tous financements (100% & Partiel)</option>
                <option value="full">100% Intégral (Scolarité + Vie)</option>
                <option value="partial">Partiel (Exonération / Bourse de mobilité)</option>
              </select>

              <button
                type="button"
                onClick={onReset}
                title="Réinitialiser tous les filtres"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-stone-50 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
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
