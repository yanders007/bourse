'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  GraduationCap, 
  Briefcase, 
  Languages, 
  CheckCircle, 
  Sparkles,
  Plus,
  Trash2,
  Eye
} from 'lucide-react';

interface CVData {
  personal_info: {
    first_name: string;
    last_name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  educations: {
    degree: string;
    school: string;
    city: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
  experiences: {
    position: string;
    company: string;
    city: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
  skills: string[];
  languages: { name: string; level: string }[];
}

const TEMPLATES = [
  { id: 'bleu-marine', name: 'Bleu Marine Académique', color: 'bg-blue-800' },
  { id: 'minimal', name: 'Minimaliste International', color: 'bg-slate-800' },
  { id: 'forest-green', name: 'Vert Émeraude Excellence', color: 'bg-emerald-800' },
  { id: 'bordeaux', name: 'Bordeaux Prestige', color: 'bg-rose-900' },
];

export default function CVBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('bleu-marine');
  const [cvData, setCvData] = useState<CVData>({
    personal_info: {
      first_name: 'Amadou',
      last_name: 'Diallo',
      title: 'Étudiant en Licence Informatique & IA',
      email: 'amadou.diallo@email.com',
      phone: '+221 77 123 45 67',
      address: 'Dakar, Sénégal',
      summary: "Passionné par l'intelligence artificielle et l'ingénierie logicielle. Candidat motivé pour les programmes de bourses d'excellence de Master international, avec un engagement fort pour l'impact technologique en Afrique.",
    },
    educations: [
      {
        degree: 'Licence 3 en Informatique & Mathématiques',
        school: 'Université Cheikh Anta Diop (UCAD)',
        city: 'Dakar',
        start_date: '2023',
        end_date: '2026',
        description: 'Major de promotion. Spécialité algorithmique et génie logiciel.',
      },
    ],
    experiences: [
      {
        position: 'Stagiaire Développeur Web & Mobile',
        company: 'AfriTech Solutions',
        city: 'Dakar',
        start_date: 'Juillet 2025',
        end_date: 'Octobre 2025',
        description: 'Développement d’API REST et conception d’interfaces réactives pour une solution de micro-assurance.',
      },
    ],
    skills: ['Python', 'JavaScript / TypeScript', 'React', 'Laravel / PHP', 'SQL', 'Git & Docker', 'Résolution de problèmes'],
    languages: [
      { name: 'Français', level: 'Natif' },
      { name: 'Anglais', level: 'Courant / B2-C1' },
    ],
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="h-7 w-7 text-blue-600" />
            <span>Générateur de CV Académique International</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Mettez en valeur votre parcours selon les critères d'évaluation des comités de sélection de bourses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimer / Sauvegarder en PDF</span>
          </button>
        </div>
      </div>

      {/* Choix du Template */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 shrink-0">Modèle :</span>
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => setSelectedTemplate(tpl.id)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedTemplate === tpl.id
                ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-xs dark:bg-blue-950 dark:text-blue-300'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <span className={`h-3 w-3 rounded-full ${tpl.color}`}></span>
            <span>{tpl.name}</span>
          </button>
        ))}
      </div>

      {/* Grille : Formulaire à gauche / Aperçu à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORMULAIRE (5 colonnes) */}
        <div className="lg:col-span-5 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white border-b pb-2">
            Informations Personnelles
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">Prénom</label>
              <input
                type="text"
                value={cvData.personal_info.first_name}
                onChange={(e) => setCvData({
                  ...cvData,
                  personal_info: { ...cvData.personal_info, first_name: e.target.value }
                })}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">Nom</label>
              <input
                type="text"
                value={cvData.personal_info.last_name}
                onChange={(e) => setCvData({
                  ...cvData,
                  personal_info: { ...cvData.personal_info, last_name: e.target.value }
                })}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">Titre du Profil / Formation actuelle</label>
            <input
              type="text"
              value={cvData.personal_info.title}
              onChange={(e) => setCvData({
                ...cvData,
                personal_info: { ...cvData.personal_info, title: e.target.value }
              })}
              className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">Email</label>
              <input
                type="email"
                value={cvData.personal_info.email}
                onChange={(e) => setCvData({
                  ...cvData,
                  personal_info: { ...cvData.personal_info, email: e.target.value }
                })}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">Téléphone</label>
              <input
                type="text"
                value={cvData.personal_info.phone}
                onChange={(e) => setCvData({
                  ...cvData,
                  personal_info: { ...cvData.personal_info, phone: e.target.value }
                })}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">Ville, Pays</label>
            <input
              type="text"
              value={cvData.personal_info.address}
              onChange={(e) => setCvData({
                ...cvData,
                personal_info: { ...cvData.personal_info, address: e.target.value }
              })}
              className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div className="text-xs">
            <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">
              Projet d'études & Vision (Résumé)
            </label>
            <textarea
              rows={3}
              value={cvData.personal_info.summary}
              onChange={(e) => setCvData({
                ...cvData,
                personal_info: { ...cvData.personal_info, summary: e.target.value }
              })}
              className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {/* APERÇU DU CV (7 colonnes) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-8 shadow-md dark:border-slate-800 dark:bg-slate-950 print:border-none print:shadow-none print:p-0">
          
          {/* Header CV */}
          <div className="border-b-2 border-blue-600 pb-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {cvData.personal_info.first_name} {cvData.personal_info.last_name}
            </h2>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
              {cvData.personal_info.title}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span>📍 {cvData.personal_info.address}</span>
              <span>✉️ {cvData.personal_info.email}</span>
              <span>📞 {cvData.personal_info.phone}</span>
            </div>
          </div>

          {/* Résumé */}
          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5">
              Profil & Objectif Académique
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {cvData.personal_info.summary}
            </p>
          </div>

          {/* Formations */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 border-b pb-1">
              Formation & Cursus Académique
            </h3>
            {cvData.educations.map((edu, idx) => (
              <div key={idx} className="mb-3 text-xs">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{edu.degree} — {edu.school}</span>
                  <span className="text-blue-600 dark:text-blue-400">{edu.start_date} - {edu.end_date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Expériences / Projets */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 border-b pb-1">
              Expériences & Projets Pratiques
            </h3>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-3 text-xs">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="text-blue-600 dark:text-blue-400">{exp.start_date} - {exp.end_date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Compétences & Langues */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 border-b pb-1">
                Compétences Clés
              </h3>
              <div className="flex flex-wrap gap-1">
                {cvData.skills.map((skill, idx) => (
                  <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 border-b pb-1">
                Langues
              </h3>
              <div className="space-y-1 text-xs">
                {cvData.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{lang.name}</span>
                    <span className="text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
