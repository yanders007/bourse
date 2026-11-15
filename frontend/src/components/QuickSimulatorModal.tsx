'use client';

import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Check, Compass, GraduationCap, Globe2, Award } from 'lucide-react';
import { FilterParams } from '@/types';

interface QuickSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterParams) => void;
}

export default function QuickSimulatorModal({ isOpen, onClose, onApplyFilters }: QuickSimulatorModalProps) {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState('');
  const [region, setRegion] = useState('');
  const [funding, setFunding] = useState('');

  if (!isOpen) return null;

  const handleFinish = () => {
    onApplyFilters({
      level: level === 'Tous' ? '' : level,
      country: region === 'Monde entier' ? '' : region,
      funding_type: funding === 'full' ? 'full' : funding === 'partial' ? 'partial' : '',
    });
    onClose();
  };

  const reset = () => {
    setStep(1);
    setLevel('');
    setRegion('');
    setFunding('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </button>

        {/* En-tête */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Simulateur d'orientation express
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
          Trouvez votre bourse idéale en 3 clics
        </h3>

        {/* Barre de progression */}
        <div className="my-5 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step
                  ? 'bg-blue-900 dark:bg-blue-500'
                  : 'bg-stone-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Étape 1 : Niveau */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              1. Quel est votre niveau d'études visé ?
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Licence / Bachelor', val: 'Licence' },
                { label: 'Master / Mastère', val: 'Master' },
                { label: 'Doctorat / PhD', val: 'Doctorat' },
                { label: 'Tous les niveaux', val: 'Tous' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setLevel(item.val)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                    level === item.val
                      ? 'border-blue-900 bg-blue-50 text-blue-950 dark:border-blue-500 dark:bg-blue-950/60 dark:text-white ring-2 ring-blue-500/20'
                      : 'border-stone-200 bg-stone-50/50 text-slate-700 hover:bg-stone-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {level === item.val && <Check className="h-4 w-4 text-blue-900 dark:text-blue-400" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                disabled={!level}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-40 hover:bg-blue-900 transition-all dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <span>Continuer</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Étape 2 : Destination */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              2. Quel pays ou continent vous intéresse ?
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: '🇫🇷 France / Europe', val: 'France' },
                { label: '🇨🇦 Canada / Québec', val: 'Canada' },
                { label: '🇩🇪 Allemagne (DAAD)', val: 'Allemagne' },
                { label: '🇨🇳 Asie / Chine (CSC)', val: 'Chine' },
                { label: '🇨🇭 Suisse (ESKAS)', val: 'Suisse' },
                { label: '🌍 Monde entier', val: 'Monde entier' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setRegion(item.val)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                    region === item.val
                      ? 'border-blue-900 bg-blue-50 text-blue-950 dark:border-blue-500 dark:bg-blue-950/60 dark:text-white ring-2 ring-blue-500/20'
                      : 'border-stone-200 bg-stone-50/50 text-slate-700 hover:bg-stone-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {region === item.val && <Check className="h-4 w-4 text-blue-900 dark:text-blue-400" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-slate-900 dark:text-slate-400"
              >
                Retour
              </button>
              <button
                disabled={!region}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-40 hover:bg-blue-900 transition-all dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <span>Continuer</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Étape 3 : Type de bourse */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              3. Quel type de prise en charge financière recherchez-vous ?
            </p>
            <div className="space-y-2.5">
              {[
                {
                  label: '100% Tout inclus (Voyage, allocation mensuelle, frais de scolarité)',
                  val: 'full',
                  sub: 'Ex: Eiffel, Mastercard, Chevening, DAAD'
                },
                {
                  label: 'Exonération / Financement partiel (Frais de scolarité réduits, mobilité)',
                  val: 'partial',
                  sub: 'Ex: Bourses d’exemption québécoises, aides universitaires'
                },
                {
                  label: 'Toutes les opportunités confondues',
                  val: 'all',
                  sub: 'Afficher le catalogue complet'
                },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setFunding(item.val)}
                  className={`w-full flex items-start justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                    funding === item.val
                      ? 'border-blue-900 bg-blue-50 text-blue-950 dark:border-blue-500 dark:bg-blue-950/60 dark:text-white ring-2 ring-blue-500/20'
                      : 'border-stone-200 bg-stone-50/50 text-slate-700 hover:bg-stone-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div>{item.label}</div>
                    <div className="text-[11px] font-normal text-stone-500 dark:text-slate-400 mt-0.5">
                      {item.sub}
                    </div>
                  </div>
                  {funding === item.val && <Check className="h-4 w-4 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-slate-900 dark:text-slate-400"
              >
                Retour
              </button>
              <button
                disabled={!funding}
                onClick={handleFinish}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white disabled:opacity-40 hover:bg-amber-700 transition-all shadow-md active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-amber-200" />
                <span>Voir mes bourses compatibles</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
