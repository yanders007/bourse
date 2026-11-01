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
  BookOpen
} from 'lucide-react';
import { Scholarship, Statistics, FilterParams } from '@/types';
import { scholarshipApi } from '@/lib/api';
import { FEATURED_SCHOLARSHIPS } from '@/lib/mockData';
import ScholarshipCard from '@/components/ScholarshipCard';
import SearchFilters from '@/components/SearchFilters';

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

  // Charger les stats et les bourses depuis l'API Laravel
  useEffect(() => {
    async function initData() {
      try {
        const statsData = await scholarshipApi.getStats();
        if (statsData) setStats(statsData);

        const res = await scholarshipApi.getAll({ per_page: 8 });
        if (res && res.data && res.data.length > 0) {
          // Fusionner avec nos bourses phares
          setScholarships([...FEATURED_SCHOLARSHIPS, ...res.data.slice(0, 4)]);
        }
      } catch (err) {
        console.log('Utilisation du catalogue de secours enrichi');
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
    setScholarships(FEATURED_SCHOLARSHIPS);
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 bg-radial-[at_top_right] from-blue-100/40 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            
            {/* Badge d'introduction */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-xs dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Votre tremplin vers les études supérieures internationales</span>
            </div>

            {/* Titre Principal */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white leading-[1.15]">
              Décrochez une bourse d'études{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                100% financée
              </span>{' '}
              partout dans le monde.
            </h1>

            {/* Description orientée étudiant africain */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Pensé pour accompagner chaque étudiant selon sa filière, son niveau actuel et ses aspirations. Accédez aux programmes phares (Mastercard, Eiffel, Chevening, DAAD, Erasmus) avec l'appui de notre IA.
            </p>

            {/* Boutons d'action rapides */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                <Search className="h-4 w-4" />
                <span>Explorer les bourses</span>
              </a>

              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Orientation IA personnalisée</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              STATISTIQUES
             ========================================================================= */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 max-w-4xl mx-auto">
            
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {stats.scholarships}+
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Bourses répertoriées</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {stats.fully_funded}+
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">100% Prises en charge</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {stats.countries}+
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Pays de destination</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 dark:text-amber-400">
                100%
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Accès gratuit</p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION FILTRES & CATALOGUE
         ========================================================================= */}
      <section id="catalogue" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Titre de section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="h-6 w-6 text-blue-600" />
              <span>Opportunités ouvertes et bourses d'excellence</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Filtrez selon votre filière, votre diplôme actuel ou votre pays de prédilection
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {scholarships.length} bourse(s) trouvée(s)
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
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
            <p className="mt-3 text-xs font-medium text-slate-500">Recherche des opportunités compatibles...</p>
          </div>
        ) : scholarships.length === 0 ? (
          <div className="my-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
            <GraduationCap className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">Aucune bourse ne correspond à ces critères</h3>
            <p className="mt-1 text-xs text-slate-500">Essayez de retirer certains filtres pour élargir vos résultats.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}

      </section>


      {/* =========================================================================
          SECTION LES 3 PILIERS DE LA RÉUSSITE
         ========================================================================= */}
      <section className="bg-slate-50/80 py-16 border-y border-slate-200/80 dark:bg-slate-900/40 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Conçu pour maximiser vos chances d'admission
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Une suite d'outils interconnectés pour transformer votre projet d'études en succès concret.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pilier 1 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Bourses Vérifiées & Exclusives
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Informations certifiées issues des portails officiels (Campus France, DAAD, ambassades, fondations internationales). Aucun intermédiaire payant ni arnaque.
              </p>
            </div>

            {/* Pilier 2 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-4">
                <Sparkles className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Conseiller IA Google Gemini
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Un assistant intelligent dédié pour relire vos lettres de motivation, simuler les questions d'entretien et vous indiquer les bourses adaptées à votre moyenne et filière.
              </p>
            </div>

            {/* Pilier 3 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Générateur de CV Académique
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Créez en quelques clics un CV conforme aux normes internationales requises par les jurys de bourses (format Europass, modèles canadien et anglophone).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BANNER ASSISTANT IA
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 p-8 sm:p-12 text-white shadow-xl shadow-blue-500/20">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Assistant Virtuel 24h/24
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Vous avez un doute sur votre éligibilité ou votre dossier ?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Posez directement vos questions à notre IA : « Quelles bourses couvrent le logement pour un étudiant en génie logiciel au Sénégal ? », « Comment postuler à Eiffel avec une licence en économie ? »
            </p>
            <div className="pt-2">
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-blue-700 shadow-md hover:bg-blue-50 transition-all active:scale-95"
              >
                <span>Démarrer une conversation d'orientation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
