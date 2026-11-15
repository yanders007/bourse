'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  GraduationCap, 
  Globe2, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  TrendingUp,
  Compass,
  BookOpen,
  Heart,
  SlidersHorizontal
} from 'lucide-react';
import { Scholarship, Statistics, FilterParams } from '@/types';
import { scholarshipApi } from '@/lib/api';
import { FEATURED_SCHOLARSHIPS } from '@/lib/mockData';
import ScholarshipCard from '@/components/ScholarshipCard';
import SearchFilters from '@/components/SearchFilters';
import QuickSimulatorModal from '@/components/QuickSimulatorModal';
import { useFavorites } from '@/context/FavoritesContext';

export default function HomePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(FEATURED_SCHOLARSHIPS);
  const [stats, setStats] = useState<Statistics>({
    scholarships: 560,
    countries: 42,
    universities: 180,
    fully_funded: 320,
  });
  const [filters, setFilters] = useState<FilterParams>({
    q: '',
    country: '',
    domain: '',
    level: '',
    funding_type: '',
  });
  const [loading, setLoading] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { favoriteIds, favoritesCount } = useFavorites();

  // Charger les stats et les bourses depuis l'API Laravel
  useEffect(() => {
    async function initData() {
      try {
        const statsData = await scholarshipApi.getStats();
        if (statsData) setStats(statsData);

        const res = await scholarshipApi.getAll({ per_page: 8 });
        if (res && res.data && res.data.length > 0) {
          setScholarships([...FEATURED_SCHOLARSHIPS, ...res.data.slice(0, 4)]);
        }
      } catch {
        // Fallback transparent
      }
    }
    initData();
  }, []);

  // Déclencher le filtrage dynamique
  const handleFilterChange = async (newFilters: FilterParams) => {
    setFilters(newFilters);
    setLoading(true);

    try {
      const res = await scholarshipApi.search(newFilters);
      if (res && res.data && res.data.length > 0) {
        setScholarships(res.data);
      } else {
        // Filtrage local sur les bourses de secours si API inactive
        const filtered = FEATURED_SCHOLARSHIPS.filter((s) => {
          if (newFilters.q && !s.title.toLowerCase().includes(newFilters.q.toLowerCase())) return false;
          if (newFilters.country && s.country && !s.country.toLowerCase().includes(newFilters.country.toLowerCase())) return false;
          if (newFilters.domain && s.domain && !s.domain.toLowerCase().includes(newFilters.domain.toLowerCase())) return false;
          if (newFilters.level && s.level && !s.level.toLowerCase().includes(newFilters.level.toLowerCase())) return false;
          if (newFilters.funding_type === 'full' && !s.funding_type?.toLowerCase().includes('full')) return false;
          if (newFilters.funding_type === 'partial' && !s.funding_type?.toLowerCase().includes('part')) return false;
          return true;
        });
        setScholarships(filtered);
      }
    } catch {
      // Pas d'interruption
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({ q: '', country: '', domain: '', level: '', funding_type: '' });
    setShowOnlyFavorites(false);
    setScholarships(FEATURED_SCHOLARSHIPS);
  };

  // Liste filtrée incluant l'éventuel filtre favoris
  const displayedScholarships = showOnlyFavorites
    ? scholarships.filter((s) => favoriteIds.includes(s.id))
    : scholarships;

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-20">
      
      {/* =========================================================================
          HERO SECTION - PRESTIGE ACADÉMIQUE ADAPTATIF
         ========================================================================= */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-16 bg-[#FAF9F6] border-b border-stone-200/80 dark:bg-[#090E1A] dark:border-slate-800/80 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
            
            {/* Badge institutionnel d'authenticité */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/70 px-3.5 py-1 text-xs font-bold text-amber-900 shadow-2xs dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
              <ShieldCheck className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span>Programmes Universitaires & Gouvernementaux Vérifiés</span>
            </div>

            {/* Titre Principal */}
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-serif leading-[1.18] dark:text-white">
              L'Excellence Académique Mondiale{' '}
              <span className="text-blue-900 underline decoration-amber-400 decoration-4 underline-offset-8 dark:text-blue-400 dark:decoration-amber-500">
                à votre portée
              </span>.
            </h1>

            {/* Description humaine & inspirante */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans">
              Découvrez des opportunités d'études complètes ou partielles (Mastercard, Eiffel, Chevening, DAAD, Erasmus, Suisse, Canada). Un accompagnement d'excellence pour bâtir un dossier d'admission irréprochable.
            </p>

            {/* Boutons d'action adaptatifs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#catalogue"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-950 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-950/15 transition-all hover:bg-blue-900 hover:shadow-lg active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <Compass className="h-4 w-4 text-amber-300 dark:text-white" />
                <span>Explorer les opportunités</span>
              </a>

              <button
                type="button"
                onClick={() => setSimulatorOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-900 shadow-2xs transition-all hover:bg-amber-100 hover:border-amber-400 active:scale-95 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200"
              >
                <Sparkles className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                <span>Simulateur express (30s)</span>
              </button>

              <Link
                href="/cv-builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs transition-all hover:bg-stone-50 hover:border-stone-400 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <FileText className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                <span>Créateur de CV</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              STATISTIQUES DE CONFIANCE (Grille adaptative 2x2 mobile / 4-col desktop)
             ========================================================================= */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-6 max-w-4xl mx-auto">
            
            <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900/90">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif dark:text-blue-300">
                {stats.scholarships}+
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 mt-1">Bourses Actives</p>
            </div>

            <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900/90">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-serif dark:text-emerald-400">
                {stats.fully_funded}+
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 mt-1">Financement Total</p>
            </div>

            <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900/90">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-serif dark:text-blue-400">
                {stats.countries}+
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 mt-1">Destinations</p>
            </div>

            <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900/90">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-serif dark:text-amber-400">
                100%
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 mt-1">Accès Gratuit</p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION FILTRES & CATALOGUE
         ========================================================================= */}
      <section id="catalogue" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Titre de section adaptatif */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="h-5 w-5 sm:h-6 sm:w-6 text-blue-900 dark:text-blue-400 shrink-0" />
              <span>Catalogue des bourses & opportunités</span>
            </h2>
            <p className="text-xs text-stone-600 dark:text-slate-400 mt-1">
              Filtrez selon votre filière, cycle d'études ou pays de destination
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Bouton pour n'afficher que les favoris */}
            {favoritesCount > 0 && (
              <button
                type="button"
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                  showOnlyFavorites
                    ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300 shadow-xs'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${showOnlyFavorites ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                <span>Mes favoris ({favoritesCount})</span>
              </button>
            )}

            <div className="text-xs font-bold text-stone-600 dark:text-slate-400 rounded-lg bg-stone-100 dark:bg-slate-800 px-2.5 py-1">
              {displayedScholarships.length} opportunité(s)
            </div>
          </div>
        </div>

        {/* Composant de Filtres */}
        <SearchFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Grille des Cartes de Bourses */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-900 border-r-transparent dark:border-blue-400"></div>
            <p className="mt-3 text-xs font-medium text-stone-500 dark:text-slate-400">Recherche des opportunités compatibles...</p>
          </div>
        ) : displayedScholarships.length === 0 ? (
          <div className="my-10 rounded-2xl border border-dashed border-stone-300 p-8 sm:p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <GraduationCap className="mx-auto h-12 w-12 text-stone-400 dark:text-slate-500" />
            <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">Aucune bourse ne correspond à ces critères</h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-slate-400">Essayez de retirer certains filtres ou réinitialiser la recherche.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 rounded-xl bg-blue-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}

      </section>

      {/* =========================================================================
          SECTION LES 3 PILIERS D'ACCOMPAGNEMENT
         ========================================================================= */}
      <section className="bg-stone-100/70 py-12 sm:py-16 border-y border-stone-200/80 dark:bg-slate-900/40 dark:border-slate-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
              Conçu pour maximiser vos chances d'admission
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-slate-400">
              Des outils interconnectés pour propulser votre candidature universitaire au plus haut niveau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Pilier 1 */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Bourses Officielles & Vérifiées
              </h3>
              <p className="text-xs leading-relaxed text-stone-600 dark:text-slate-400">
                Opportunités sourcées auprès des ministères, ambassades et fondations internationales (Campus France, DAAD, Erasmus+, Mastercard). Aucun intermédiaire payant.
              </p>
            </div>

            {/* Pilier 2 */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-400 mb-4">
                <Sparkles className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Conseiller Virtuel d'Orientation
              </h3>
              <p className="text-xs leading-relaxed text-stone-600 dark:text-slate-400">
                Un assistant intelligent pour évaluer votre profil, relire vos lettres de motivation et répondre à vos questions spécifiques 24h/24.
              </p>
            </div>

            {/* Pilier 3 */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-400 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Créateur de CV International A4
              </h3>
              <p className="text-xs leading-relaxed text-stone-600 dark:text-slate-400">
                5 modèles académiques conçus pour franchir avec succès les filtres des comités de sélection et commissions d'admission étrangères.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BANNER ASSISTANT IA
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 p-6 sm:p-10 text-white shadow-xl shadow-blue-950/20 dark:bg-gradient-to-r dark:from-blue-900 dark:to-indigo-950">
          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Conseiller Virtuel 24h/24
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight font-serif">
              Un doute sur votre éligibilité ou les prérequis d'une bourse ?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Consultez notre assistant d'orientation pour simuler votre éligibilité, affiner votre lettre de motivation ou identifier les meilleures opportunités pour votre profil.
            </p>
            <div className="pt-2">
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-blue-950 shadow-md hover:bg-stone-50 transition-all active:scale-95"
              >
                <span>Démarrer un échange d'orientation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Simulateur Express */}
      <QuickSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        onApplyFilters={handleFilterChange}
      />

    </div>
  );
}
