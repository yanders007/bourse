'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Compass, GraduationCap, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Scholarship, FilterParams } from '@/types';
import { scholarshipApi } from '@/lib/api';
import { FEATURED_SCHOLARSHIPS } from '@/lib/mockData';
import ScholarshipCard from '@/components/ScholarshipCard';
import SearchFilters from '@/components/SearchFilters';
import { useFavorites } from '@/context/FavoritesContext';

function ScholarshipsContent() {
  const searchParams = useSearchParams();
  const { favoriteIds, favoritesCount } = useFavorites();
  const showFavoritesParam = searchParams?.get('favorites') === 'true';
  
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(showFavoritesParam);
  const [scholarships, setScholarships] = useState<Scholarship[]>(FEATURED_SCHOLARSHIPS);
  const [filters, setFilters] = useState<FilterParams>({
    q: searchParams?.get('q') || '',
    country: searchParams?.get('country') || '',
    domain: searchParams?.get('domain') || '',
    level: searchParams?.get('level') || '',
    funding_type: searchParams?.get('funding_type') || '',
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: FEATURED_SCHOLARSHIPS.length,
    current_page: 1,
    last_page: 1,
  });

  const loadScholarships = async (params: FilterParams) => {
    setLoading(true);
    try {
      const res = await scholarshipApi.search(params);
      if (res && res.data && res.data.length > 0) {
        setScholarships(res.data);
        if (res.pagination) {
          setPagination({
            total: res.pagination.total,
            current_page: res.pagination.current_page,
            last_page: res.pagination.last_page,
          });
        }
      } else {
        // Filtrage local
        const filtered = FEATURED_SCHOLARSHIPS.filter((s) => {
          if (params.q && !s.title.toLowerCase().includes(params.q.toLowerCase())) return false;
          if (params.country && s.country && !s.country.toLowerCase().includes(params.country.toLowerCase())) return false;
          if (params.domain && s.domain && !s.domain.toLowerCase().includes(params.domain.toLowerCase())) return false;
          if (params.level && s.level && !s.level.toLowerCase().includes(params.level.toLowerCase())) return false;
          if (params.funding_type === 'full' && !s.funding_type?.toLowerCase().includes('full')) return false;
          if (params.funding_type === 'partial' && !s.funding_type?.toLowerCase().includes('part')) return false;
          return true;
        });
        setScholarships(filtered);
        setPagination({
          total: filtered.length,
          current_page: 1,
          last_page: 1,
        });
      }
    } catch {
      // Données locales
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScholarships(filters);
  }, []);

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
    loadScholarships(newFilters);
  };

  const handleReset = () => {
    const emptyFilters = { q: '', country: '', domain: '', level: '', funding_type: '', page: 1 };
    setFilters(emptyFilters);
    setShowOnlyFavorites(false);
    loadScholarships(emptyFilters);
  };

  const handlePageChange = (newPage: number) => {
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    loadScholarships(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedList = showOnlyFavorites
    ? scholarships.filter((s) => favoriteIds.includes(s.id))
    : scholarships;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 min-h-screen transition-colors">
      
      {/* En-tête Prestigieux Adaptatif */}
      <div className="border-b border-stone-200/90 pb-5 sm:pb-6 dark:border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2.5 sm:gap-3 font-serif">
            <GraduationCap className="h-8 w-8 sm:h-9 sm:w-9 text-blue-950 dark:text-blue-400 shrink-0" />
            <span>Annuaire Mondial des Bourses</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-slate-400 font-sans">
            Programmes d'excellence, financements intégraux et bourses de mobilité internationale vérifiées.
          </p>
        </div>

        {favoritesCount > 0 && (
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
              showOnlyFavorites
                ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Heart className={`h-4 w-4 ${showOnlyFavorites ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
            <span>{showOnlyFavorites ? 'Afficher toutes les bourses' : `Mes bourses enregistrées (${favoritesCount})`}</span>
          </button>
        )}
      </div>

      {/* Barre de filtres */}
      <SearchFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Grille des résultats */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-950 border-r-transparent dark:border-blue-400"></div>
          <p className="mt-3 text-xs font-semibold text-stone-500 dark:text-slate-400">Mise à jour des opportunités académiques...</p>
        </div>
      ) : displayedList.length === 0 ? (
        <div className="my-10 rounded-2xl border border-dashed border-stone-300 p-8 sm:p-12 text-center bg-white dark:bg-slate-900/60 dark:border-slate-800 shadow-2xs">
          <Compass className="mx-auto h-12 w-12 text-stone-400 dark:text-slate-500" />
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white font-serif">
            {showOnlyFavorites ? 'Aucune bourse enregistrée dans vos favoris' : 'Aucune opportunité ne correspond à ces critères'}
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-slate-400">
            {showOnlyFavorites ? 'Cliquez sur l\'icône de cœur sur n\'importe quelle bourse pour l\'ajouter.' : 'Essayez d\'élargir votre recherche ou de réinitialiser les filtres.'}
          </p>
          <button
            onClick={handleReset}
            className="mt-5 rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-900 transition-colors dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedList.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>

          {/* Pagination si applicable */}
          {pagination.last_page > 1 && !showOnlyFavorites && (
            <div className="flex items-center justify-center gap-3 pt-8">
              <button
                disabled={pagination.current_page <= 1}
                onClick={() => handlePageChange(pagination.current_page - 1)}
                className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Précédent</span>
              </button>

              <span className="text-xs font-semibold text-stone-600 dark:text-slate-400">
                Page {pagination.current_page} sur {pagination.last_page}
              </span>

              <button
                disabled={pagination.current_page >= pagination.last_page}
                onClick={() => handlePageChange(pagination.current_page + 1)}
                className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <span>Suivant</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-900 border-r-transparent"></div>
        <p className="mt-3 text-xs text-stone-500">Chargement de l'annuaire des bourses...</p>
      </div>
    }>
      <ScholarshipsContent />
    </Suspense>
  );
}
