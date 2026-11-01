'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Compass, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Scholarship, FilterParams } from '@/types';
import { scholarshipApi } from '@/lib/api';
import { FEATURED_SCHOLARSHIPS } from '@/lib/mockData';
import ScholarshipCard from '@/components/ScholarshipCard';
import SearchFilters from '@/components/SearchFilters';

function ScholarshipsContent() {
  const searchParams = useSearchParams();
  
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
    loadScholarships(emptyFilters);
  };

  const handlePageChange = (newPage: number) => {
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    loadScholarships(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span>Annuaire Mondial des Bourses d'Études</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Explorez plus de 500 bourses vérifiées et ouvertes aux candidatures internationales.
        </p>
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
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
          <p className="mt-3 text-xs font-medium text-slate-500">Mise à jour des opportunités...</p>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="my-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <Compass className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">Aucune bourse ne correspond à ces critères</h3>
          <p className="mt-1 text-xs text-slate-500">Essayez d'élargir votre recherche ou de réinitialiser les filtres.</p>
          <button
            onClick={handleReset}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scholarships.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>

          {/* Pagination si applicable */}
          {pagination.last_page > 1 && (
            <div className="flex items-center justify-center gap-3 pt-8">
              <button
                disabled={pagination.current_page <= 1}
                onClick={() => handlePageChange(pagination.current_page - 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Précédent</span>
              </button>

              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Page {pagination.current_page} sur {pagination.last_page}
              </span>

              <button
                disabled={pagination.current_page >= pagination.last_page}
                onClick={() => handlePageChange(pagination.current_page + 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
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
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
        <p className="mt-3 text-xs text-slate-500">Chargement de l'annuaire des bourses...</p>
      </div>
    }>
      <ScholarshipsContent />
    </Suspense>
  );
}
