'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ArrowLeft, 
  Building, 
  Share2,
  Clock,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { Scholarship } from '@/types';
import { scholarshipApi } from '@/lib/api';
import { FEATURED_SCHOLARSHIPS } from '@/lib/mockData';
import ScholarshipCard from '@/components/ScholarshipCard';

function ScholarshipDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [related, setRelated] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await scholarshipApi.getById(id);
        if (res && res.success && res.data) {
          setScholarship(res.data);
          if (res.related) setRelated(res.related);
        } else {
          const found = FEATURED_SCHOLARSHIPS.find((s) => String(s.id) === id);
          if (found) {
            setScholarship(found);
            setRelated(FEATURED_SCHOLARSHIPS.filter((s) => s.id !== found.id).slice(0, 3));
          }
        }
      } catch {
        const found = FEATURED_SCHOLARSHIPS.find((s) => String(s.id) === id);
        if (found) {
          setScholarship(found);
          setRelated(FEATURED_SCHOLARSHIPS.filter((s) => s.id !== found.id).slice(0, 3));
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
        <p className="mt-3 text-xs text-slate-500">Chargement de la fiche détaillée...</p>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
        <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Bourse introuvable</h2>
        <p className="mt-1 text-xs text-slate-500">Cette opportunité est peut-être expirée ou l'identifiant est invalide.</p>
        <Link
          href="/scholarships"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour aux bourses</span>
        </Link>
      </div>
    );
  }

  const isFullyFunded = scholarship.funding_type?.toLowerCase().includes('full') ||
                        scholarship.funding_type?.toLowerCase().includes('entièrement');

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      
      {/* Bouton retour */}
      <div>
        <Link
          href="/scholarships"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour au catalogue des bourses</span>
        </Link>
      </div>

      {/* En-tête Bourse */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <MapPin className="h-4 w-4 text-blue-600" />
              {scholarship.country || 'International'}
            </span>

            {isFullyFunded && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                100% Prise en charge
              </span>
            )}

            {scholarship.level && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                <GraduationCap className="h-4 w-4" />
                {scholarship.level}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copied ? 'Lien copié !' : 'Partager'}</span>
            </button>
          </div>
        </div>

        {/* Titre & Établissement */}
        <div className="mt-6 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {scholarship.title}
          </h1>

          {scholarship.university && (
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <Building className="h-4 w-4 text-blue-500" />
              <span>{scholarship.university}</span>
            </p>
          )}

          {scholarship.deadline && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 border border-amber-200/70 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Date limite de candidature : {scholarship.deadline}</span>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {(scholarship.apply_link || scholarship.link) && (
            <a
              href={scholarship.apply_link || scholarship.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
            >
              <span>Accéder au formulaire officiel de candidature</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <Link
            href={`/ai-assistant?scholarship_id=${scholarship.id}&scholarship_title=${encodeURIComponent(scholarship.title)}`}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-5 py-3 text-xs sm:text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-all dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Poser une question à l'IA sur cette bourse</span>
          </Link>
        </div>

      </div>

      {/* Corps des Détails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-8">
          
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Présentation de l'opportunité</span>
            </h2>
            <div className="prose prose-sm text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
              {scholarship.details || scholarship.description || "Aucune description détaillée n'est disponible pour le moment."}
            </div>
          </div>

          {scholarship.benefits && (
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-6 shadow-xs dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Ce que couvre cette bourse (Avantages)</span>
              </h2>
              <div className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200 whitespace-pre-line">
                {scholarship.benefits}
              </div>
            </div>
          )}

          {scholarship.requirements && (
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                <span>Conditions d'éligibilité requises</span>
              </h2>
              <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {scholarship.requirements}
              </div>
            </div>
          )}

          {scholarship.required_documents && (
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-amber-600" />
                <span>Pièces et dossiers à fournir</span>
              </h2>
              <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {scholarship.required_documents}
              </div>
            </div>
          )}

        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Fiche Récapitulative
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-[11px] text-slate-400">Pays d'accueil</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{scholarship.country || 'Non spécifié'}</span>
              </div>

              <div>
                <span className="block text-[11px] text-slate-400">Filière / Domaine</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{scholarship.domain || 'Toutes disciplines'}</span>
              </div>

              <div>
                <span className="block text-[11px] text-slate-400">Niveau d'études</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{scholarship.level || 'Tous niveaux'}</span>
              </div>

              <div>
                <span className="block text-[11px] text-slate-400">Type de prise en charge</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{scholarship.funding_type || 'Partiel'}</span>
              </div>

              {scholarship.source && (
                <div>
                  <span className="block text-[11px] text-slate-400">Organisme / Source</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{scholarship.source}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/cv-builder"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
              >
                <FileText className="h-4 w-4" />
                <span>Créer mon CV pour cette bourse</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {related.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Autres opportunités similaires
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <ScholarshipCard key={rel.id} scholarship={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function ScholarshipDetailPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
        <p className="mt-3 text-xs text-slate-500">Chargement de la bourse...</p>
      </div>
    }>
      <ScholarshipDetailContent />
    </Suspense>
  );
}
