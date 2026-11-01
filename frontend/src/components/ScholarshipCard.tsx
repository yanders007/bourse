'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Sparkles, 
  Heart, 
  ExternalLink, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Scholarship } from '@/types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  showMatchScore?: boolean;
}

export default function ScholarshipCard({ scholarship, showMatchScore = true }: ScholarshipCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [deadlineInfo, setDeadlineInfo] = useState<{ text: string; isUrgent: boolean; className: string }>({
    text: scholarship.deadline || 'Ouverte',
    isUrgent: false,
    className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
  });

  useEffect(() => {
    if (!scholarship.deadline) {
      setDeadlineInfo({
        text: 'Candidature continue / Ouverte',
        isUrgent: false,
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
      });
      return;
    }

    try {
      const deadlineDate = new Date(scholarship.deadline);
      const today = new Date();
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        setDeadlineInfo({
          text: 'Clôturée',
          isUrgent: true,
          className: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
        });
      } else if (diffDays <= 15) {
        setDeadlineInfo({
          text: `Plus que ${diffDays} j !`,
          isUrgent: true,
          className: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold animate-pulse dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
        });
      } else if (diffDays <= 45) {
        setDeadlineInfo({
          text: `${diffDays} jours restants`,
          isUrgent: false,
          className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
        });
      } else {
        setDeadlineInfo({
          text: `Fin : ${deadlineDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`,
          isUrgent: false,
          className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
        });
      }
    } catch {
      setDeadlineInfo({
        text: scholarship.deadline,
        isUrgent: false,
        className: 'bg-slate-50 text-slate-700 border-slate-200'
      });
    }
  }, [scholarship.deadline]);
  const isFullyFunded = scholarship.funding_type?.toLowerCase().includes('full') ||
                        scholarship.funding_type?.toLowerCase().includes('entièrement');

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-blue-700">
      
      {/* En-tête de la carte avec Badges et Bouton Favori */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Badge Pays */}
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              {scholarship.country || 'International'}
            </span>

            {/* Badge Financement */}
            {isFullyFunded ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                100% Financée
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-lg bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-700 border border-sky-500/20 dark:text-sky-400">
                Financement partiel
              </span>
            )}
          </div>

          {/* Bouton Favori */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Ajouter aux favoris"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:border-rose-200 hover:text-rose-500 active:scale-90 dark:border-slate-800 dark:bg-slate-900"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Titre */}
        <Link href={`/scholarships/${scholarship.id}`}>
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
            {scholarship.title}
          </h3>
        </Link>

        {/* Établissement / Université */}
        {scholarship.university && (
          <p className="mt-1 line-clamp-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            {scholarship.university}
          </p>
        )}

        {/* Description courte */}
        <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {scholarship.description || scholarship.benefits || 'Découvrez tous les critères et opportunités offertes par cette bourse pour vos études.'}
        </p>

        {/* Niveau et Domaine */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
          {scholarship.level && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              🎓 {scholarship.level}
            </span>
          )}
          {scholarship.domain && (
            <span className="rounded-md bg-blue-50 px-2 py-0.5 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
              🔬 {scholarship.domain}
            </span>
          )}
        </div>
      </div>

      {/* Pied de la carte avec Deadline & Bouton d'action */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 dark:border-slate-800/80">
        <div className="flex items-center justify-between">
          {/* Deadline */}
          <div className="flex items-center gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] ${deadlineInfo.className}`}>
              {deadlineInfo.text}
            </span>
          </div>

          {/* Bouton Détail */}
          <Link
            href={`/scholarships/${scholarship.id}`}
            className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-blue-600 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-400 dark:hover:text-white"
          >
            <span>Détails</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Jauge de matching si score présent */}
        {showMatchScore && (scholarship.match_score || 0) > 0 && (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-2.5 py-1.5 text-[11px] text-blue-800 dark:from-blue-950/40 dark:to-indigo-950/40 dark:text-blue-300">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Correspondance profil
            </span>
            <span className="font-bold">{scholarship.match_score}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
