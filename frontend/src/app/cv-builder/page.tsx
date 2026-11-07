'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  GraduationCap, 
  Briefcase, 
  Languages, 
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';

interface EducationItem {
  degree: string;
  school: string;
  city: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface ExperienceItem {
  position: string;
  company: string;
  city: string;
  start_date: string;
  end_date: string;
  description: string;
}

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
  educations: EducationItem[];
  experiences: ExperienceItem[];
  skills: string[];
  languages: { name: string; level: string }[];
}

const TEMPLATES = [
  { id: 'bleu-marine', name: 'Bleu Marine Académique', color: 'bg-blue-800' },
  { id: 'minimal', name: 'Minimaliste International', color: 'bg-slate-900' },
  { id: 'forest-green', name: 'Vert Émeraude Excellence', color: 'bg-emerald-800' },
  { id: 'bordeaux', name: 'Bordeaux Prestige', color: 'bg-rose-900' },
  { id: 'modern', name: 'Moderne Tech & IA', color: 'bg-indigo-700' },
];

const DEFAULT_DATA: CVData = {
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
      description: 'Major de promotion. Spécialité algorithmique avancée, bases de données et génie logiciel.',
    },
    {
      degree: 'Baccalauréat Scientifique (Série S1)',
      school: 'Lycée d’Excellence',
      city: 'Saint-Louis',
      start_date: '2020',
      end_date: '2023',
      description: 'Mention Très Bien. Lauréat régional du concours général de mathématiques.',
    }
  ],
  experiences: [
    {
      position: 'Stagiaire Développeur Web & Mobile',
      company: 'AfriTech Solutions',
      city: 'Dakar',
      start_date: 'Juin 2025',
      end_date: 'Octobre 2025',
      description: 'Conception d’API REST sécurisées, modélisation de base de données relationnelle et interfaces réactives.',
    },
    {
      position: 'Responsable Technique & Mentor',
      company: 'Club Informatique Universitaire',
      city: 'Dakar',
      start_date: '2024',
      end_date: 'Présent',
      description: 'Organisation de sessions de mentorat algorithmique pour plus de 80 étudiants en première année.',
    }
  ],
  skills: ['Python', 'JavaScript / TypeScript', 'React & Next.js', 'PHP / Laravel', 'SQL & Modélisation', 'Git & Docker', 'Résolution de problèmes complexes'],
  languages: [
    { name: 'Français', level: 'Langue maternelle / Natif' },
    { name: 'Anglais', level: 'Courant académique (C1 / TOEFL iBT 102)' },
    { name: 'Espagnol', level: 'Intermédiaire (B1)' },
  ],
};

export default function CVBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('bleu-marine');
  const [cvData, setCvData] = useState<CVData>(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'experience' | 'skills'>('profile');
  const [newSkill, setNewSkill] = useState('');

  // Gestion des Formations
  const addEducation = () => {
    setCvData({
      ...cvData,
      educations: [
        ...cvData.educations,
        {
          degree: '',
          school: '',
          city: '',
          start_date: '2024',
          end_date: '2025',
          description: '',
        }
      ]
    });
  };

  const updateEducation = (index: number, field: keyof EducationItem, val: string) => {
    const updated = [...cvData.educations];
    updated[index][field] = val;
    setCvData({ ...cvData, educations: updated });
  };

  const removeEducation = (index: number) => {
    setCvData({
      ...cvData,
      educations: cvData.educations.filter((_, i) => i !== index)
    });
  };

  // Gestion des Expériences
  const addExperience = () => {
    setCvData({
      ...cvData,
      experiences: [
        ...cvData.experiences,
        {
          position: '',
          company: '',
          city: '',
          start_date: '2024',
          end_date: '2025',
          description: '',
        }
      ]
    });
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, val: string) => {
    const updated = [...cvData.experiences];
    updated[index][field] = val;
    setCvData({ ...cvData, experiences: updated });
  };

  const removeExperience = (index: number) => {
    setCvData({
      ...cvData,
      experiences: cvData.experiences.filter((_, i) => i !== index)
    });
  };

  // Gestion des Compétences
  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (!cvData.skills.includes(newSkill.trim())) {
      setCvData({ ...cvData, skills: [...cvData.skills, newSkill.trim()] });
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="h-7 w-7 text-blue-600" />
            <span>Créateur de CV Académique International</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Conçu pour répondre aux standards d'admission des jurys internationaux et comités de bourses mondiales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCvData(DEFAULT_DATA)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            title="Réinitialiser avec les données d'exemple"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Exemple type</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Printer className="h-4 w-4" />
            <span>Télécharger / Imprimer en PDF</span>
          </button>
        </div>
      </div>

      {/* Sélecteur de Modèle Réactif */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 print:hidden">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
          Choisir le modèle de CV :
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                selectedTemplate === tpl.id
                  ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-xs dark:bg-blue-950 dark:text-blue-300 dark:border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <span className={`h-3 w-3 rounded-full ${tpl.color} shadow-xs`}></span>
              <span>{tpl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille : Formulaire à gauche / Aperçu à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================================================
            FORMULAIRE ÉDITEUR (5 colonnes)
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 print:hidden">
          
          {/* Onglets du formulaire */}
          <div className="grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold dark:bg-slate-800">
            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-lg py-1.5 transition-all ${
                activeTab === 'profile' ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`rounded-lg py-1.5 transition-all ${
                activeTab === 'education' ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Études
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`rounded-lg py-1.5 transition-all ${
                activeTab === 'experience' ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Expériences
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`rounded-lg py-1.5 transition-all ${
                activeTab === 'skills' ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Compétences
            </button>
          </div>

          {/* Onglet 1 : Profil & Coordonnées */}
          {activeTab === 'profile' && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Prénom</label>
                  <input
                    type="text"
                    value={cvData.personal_info.first_name}
                    onChange={(e) => setCvData({
                      ...cvData,
                      personal_info: { ...cvData.personal_info, first_name: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Nom</label>
                  <input
                    type="text"
                    value={cvData.personal_info.last_name}
                    onChange={(e) => setCvData({
                      ...cvData,
                      personal_info: { ...cvData.personal_info, last_name: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Titre visé / Domaine d'études actuel</label>
                <input
                  type="text"
                  value={cvData.personal_info.title}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personal_info: { ...cvData.personal_info, title: e.target.value }
                  })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    value={cvData.personal_info.email}
                    onChange={(e) => setCvData({
                      ...cvData,
                      personal_info: { ...cvData.personal_info, email: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Téléphone</label>
                  <input
                    type="text"
                    value={cvData.personal_info.phone}
                    onChange={(e) => setCvData({
                      ...cvData,
                      personal_info: { ...cvData.personal_info, phone: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Ville, Pays de résidence</label>
                <input
                  type="text"
                  value={cvData.personal_info.address}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personal_info: { ...cvData.personal_info, address: e.target.value }
                  })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="text-xs">
                <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                  Objectif académique & Projet d'impact (Résumé)
                </label>
                <textarea
                  rows={4}
                  value={cvData.personal_info.summary}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personal_info: { ...cvData.personal_info, summary: e.target.value }
                  })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Onglet 2 : Formations & Diplômes */}
          {activeTab === 'education' && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Cursus académique</span>
                <button
                  onClick={addEducation}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Ajouter une formation</span>
                </button>
              </div>

              {cvData.educations.map((edu, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="flex items-center justify-between border-b pb-1.5 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Diplôme #{idx + 1}</span>
                    <button
                      onClick={() => removeEducation(idx)}
                      className="text-red-500 hover:text-red-700"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Intitulé du diplôme</label>
                    <input
                      type="text"
                      placeholder="Ex: Licence en Mathématiques et Informatique"
                      value={edu.degree}
                      onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Université / Établissement</label>
                      <input
                        type="text"
                        placeholder="Ex: Université de Dakar"
                        value={edu.school}
                        onChange={(e) => updateEducation(idx, 'school', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Période (Années)</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="2022"
                          value={edu.start_date}
                          onChange={(e) => updateEducation(idx, 'start_date', e.target.value)}
                          className="w-1/2 rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                        <span>-</span>
                        <input
                          type="text"
                          placeholder="2025"
                          value={edu.end_date}
                          onChange={(e) => updateEducation(idx, 'end_date', e.target.value)}
                          className="w-1/2 rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Distinctions & Matières clés</label>
                    <input
                      type="text"
                      placeholder="Ex: Mention Bien, Major de promo, spécialité IA"
                      value={edu.description}
                      onChange={(e) => updateEducation(idx, 'description', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Onglet 3 : Expériences & Projets */}
          {activeTab === 'experience' && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Expériences & Projets</span>
                <button
                  onClick={addExperience}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Ajouter une expérience</span>
                </button>
              </div>

              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="flex items-center justify-between border-b pb-1.5 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Poste #{idx + 1}</span>
                    <button
                      onClick={() => removeExperience(idx)}
                      className="text-red-500 hover:text-red-700"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Poste ou Rôle</label>
                    <input
                      type="text"
                      placeholder="Ex: Développeur Stagiaire, Chercheur Junior"
                      value={exp.position}
                      onChange={(e) => updateExperience(idx, 'position', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Entreprise / Organisation</label>
                      <input
                        type="text"
                        placeholder="Ex: AfriTech Lab"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Période</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="2024"
                          value={exp.start_date}
                          onChange={(e) => updateExperience(idx, 'start_date', e.target.value)}
                          className="w-1/2 rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                        <span>-</span>
                        <input
                          type="text"
                          placeholder="2025"
                          value={exp.end_date}
                          onChange={(e) => updateExperience(idx, 'end_date', e.target.value)}
                          className="w-1/2 rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Missions & Résultats</label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Analyse de données, développement d'une application..."
                      value={exp.description}
                      onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Onglet 4 : Compétences & Langues */}
          {activeTab === 'skills' && (
            <div className="space-y-4 pt-2">
              <div>
                <label className="block mb-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                  Compétences & Outils Techniques
                </label>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="text"
                    placeholder="Ex: Python, Machine Learning, Gestion de projet..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 rounded-xl border border-slate-300 bg-white p-2 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                  <button
                    onClick={addSkill}
                    className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    Ajouter
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cvData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 dark:border-slate-800">
                <label className="block mb-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  Langues Pratiquées
                </label>
                <div className="space-y-2 text-xs">
                  {cvData.languages.map((lang, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={lang.name}
                        onChange={(e) => {
                          const updated = [...cvData.languages];
                          updated[idx].name = e.target.value;
                          setCvData({ ...cvData, languages: updated });
                        }}
                        className="w-1/2 rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        placeholder="Langue"
                      />
                      <input
                        type="text"
                        value={lang.level}
                        onChange={(e) => {
                          const updated = [...cvData.languages];
                          updated[idx].level = e.target.value;
                          setCvData({ ...cvData, languages: updated });
                        }}
                        className="w-1/2 rounded-lg border border-slate-300 bg-white p-2 text-slate-900 font-medium outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        placeholder="Niveau (ex: C1, B2)"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* =========================================================================
            RENDU DU CV - TEMPLATES DYNAMIQUES (7 colonnes)
           ========================================================================= */}
        <div className="lg:col-span-7 bg-slate-100 p-2 sm:p-4 rounded-2xl dark:bg-slate-900/50 print:bg-white print:p-0 print:border-none">
          
          {/* =======================================================================
              TEMPLATE 1 : BLEU MARINE ACADÉMIQUE
             ======================================================================= */}
          {selectedTemplate === 'bleu-marine' && (
            <div className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-lg rounded-xl print:shadow-none print:p-6 print:rounded-none border border-slate-200 print:border-none">
              
              {/* En-tête */}
              <div className="border-b-4 border-blue-900 pb-5">
                <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight font-serif">
                  {cvData.personal_info.first_name} {cvData.personal_info.last_name}
                </h2>
                <p className="text-base font-bold text-blue-700 mt-1">
                  {cvData.personal_info.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600 font-medium">
                  <span>📍 {cvData.personal_info.address}</span>
                  <span>✉️ {cvData.personal_info.email}</span>
                  <span>📞 {cvData.personal_info.phone}</span>
                </div>
              </div>

              {/* Résumé / Objectif */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-2 border-b-2 border-blue-100 pb-1 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-800" />
                  <span>Profil & Objectif de Candidature</span>
                </h3>
                <p className="text-xs leading-relaxed text-slate-700 text-justify">
                  {cvData.personal_info.summary}
                </p>
              </div>

              {/* Formations */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-3 border-b-2 border-blue-100 pb-1 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-blue-800" />
                  <span>Cursus & Titres Universitaires</span>
                </h3>
                <div className="space-y-3.5">
                  {cvData.educations.map((edu, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm font-bold text-blue-950">{edu.degree}</span>
                        <span className="text-blue-700 text-[11px] font-semibold">{edu.start_date} – {edu.end_date}</span>
                      </div>
                      <div className="text-slate-600 font-semibold">{edu.school} {edu.city ? `• ${edu.city}` : ''}</div>
                      {edu.description && <p className="text-slate-600 mt-1 leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expériences */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-3 border-b-2 border-blue-100 pb-1 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-blue-800" />
                  <span>Expériences Professionnelles & Projets</span>
                </h3>
                <div className="space-y-3.5">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm font-bold text-blue-950">{exp.position}</span>
                        <span className="text-blue-700 text-[11px] font-semibold">{exp.start_date} – {exp.end_date}</span>
                      </div>
                      <div className="text-slate-600 font-semibold">{exp.company} {exp.city ? `• ${exp.city}` : ''}</div>
                      {exp.description && <p className="text-slate-600 mt-1 leading-relaxed">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compétences & Langues */}
              <div className="mt-6 grid grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-2.5">
                    Compétences & Outils
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.map((skill, idx) => (
                      <span key={idx} className="rounded-md bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-semibold text-blue-900">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-2.5">
                    Langues
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {cvData.languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-100 pb-1">
                        <span className="font-bold text-slate-800">{lang.name}</span>
                        <span className="text-slate-600 text-[11px] font-medium">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =======================================================================
              TEMPLATE 2 : MINIMALISTE INTERNATIONAL (HARVARD / OXFORD STYLE)
             ======================================================================= */}
          {selectedTemplate === 'minimal' && (
            <div className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-lg rounded-xl print:shadow-none print:p-6 print:rounded-none border border-slate-200 print:border-none font-serif">
              
              {/* En-tête centré épuré */}
              <div className="text-center border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-900">
                  {cvData.personal_info.first_name} {cvData.personal_info.last_name}
                </h2>
                <p className="text-xs italic text-slate-700 mt-1">
                  {cvData.personal_info.title}
                </p>
                <div className="mt-2 text-xs text-slate-600 flex justify-center flex-wrap gap-x-4">
                  <span>{cvData.personal_info.address}</span>
                  <span>•</span>
                  <span>{cvData.personal_info.email}</span>
                  <span>•</span>
                  <span>{cvData.personal_info.phone}</span>
                </div>
              </div>

              {/* Résumé */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                  Objectif Académique
                </h3>
                <p className="text-xs leading-relaxed text-slate-800 font-sans text-justify">
                  {cvData.personal_info.summary}
                </p>
              </div>

              {/* Formations */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-3">
                  Formation Académique
                </h3>
                <div className="space-y-3 font-sans">
                  {cvData.educations.map((edu, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 font-serif">
                        <span className="text-sm">{edu.degree}</span>
                        <span className="text-xs font-normal italic">{edu.start_date} – {edu.end_date}</span>
                      </div>
                      <div className="text-slate-700 italic">{edu.school}, {edu.city}</div>
                      {edu.description && <p className="text-slate-700 mt-0.5">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expériences */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-3">
                  Expériences Notables & Recherches
                </h3>
                <div className="space-y-3 font-sans">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900 font-serif">
                        <span className="text-sm">{exp.position}</span>
                        <span className="text-xs font-normal italic">{exp.start_date} – {exp.end_date}</span>
                      </div>
                      <div className="text-slate-700 italic">{exp.company}, {exp.city}</div>
                      {exp.description && <p className="text-slate-700 mt-0.5">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compétences & Langues */}
              <div className="mt-5 grid grid-cols-2 gap-4 font-sans border-t border-slate-200 pt-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 font-serif mb-1.5">
                    Compétences Clés
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {cvData.skills.join(' • ')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 font-serif mb-1.5">
                    Langues
                  </h3>
                  <div className="space-y-1 text-xs text-slate-700">
                    {cvData.languages.map((l, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="font-semibold">{l.name}</span>
                        <span>{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =======================================================================
              TEMPLATE 3 : VERT ÉMERAUDE EXCELLENCE (DEUX COLONNES)
             ======================================================================= */}
          {selectedTemplate === 'forest-green' && (
            <div className="w-full bg-white text-slate-900 shadow-lg rounded-xl print:shadow-none print:rounded-none overflow-hidden border border-slate-200 print:border-none grid grid-cols-12 min-h-[600px]">
              
              {/* Sidebar gauche émeraude */}
              <div className="col-span-4 bg-emerald-900 text-white p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                    {cvData.personal_info.first_name}<br/>{cvData.personal_info.last_name}
                  </h2>
                  <p className="text-xs font-semibold text-emerald-300 mt-1.5">
                    {cvData.personal_info.title}
                  </p>
                </div>

                <div className="space-y-2 text-[11px] text-emerald-100/90 border-t border-emerald-700/60 pt-4">
                  <div className="font-bold text-white text-xs uppercase tracking-wider mb-1">Contact</div>
                  <div>📍 {cvData.personal_info.address}</div>
                  <div>✉️ {cvData.personal_info.email}</div>
                  <div>📞 {cvData.personal_info.phone}</div>
                </div>

                <div className="space-y-2 border-t border-emerald-700/60 pt-4">
                  <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">Compétences</div>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.map((s, i) => (
                      <span key={i} className="bg-emerald-800/80 text-emerald-100 rounded px-2 py-0.5 text-[10px] font-medium border border-emerald-700/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 border-t border-emerald-700/60 pt-4">
                  <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">Langues</div>
                  <div className="space-y-1.5 text-[11px] text-emerald-100">
                    {cvData.languages.map((l, i) => (
                      <div key={i}>
                        <div className="font-semibold text-white">{l.name}</div>
                        <div className="text-[10px] text-emerald-300">{l.level}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contenu principal droite */}
              <div className="col-span-8 p-6 space-y-6 bg-white">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-b-2 border-emerald-600 pb-1 mb-2">
                    Profil Académique & Impact
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {cvData.personal_info.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-b-2 border-emerald-600 pb-1 mb-3">
                    Formations & Diplômes
                  </h3>
                  <div className="space-y-3">
                    {cvData.educations.map((edu, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span className="font-bold text-emerald-950">{edu.degree}</span>
                          <span className="text-emerald-700 font-semibold text-[11px]">{edu.start_date} – {edu.end_date}</span>
                        </div>
                        <div className="text-slate-600 font-medium">{edu.school} {edu.city ? `• ${edu.city}` : ''}</div>
                        {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-b-2 border-emerald-600 pb-1 mb-3">
                    Expériences & Réalisations
                  </h3>
                  <div className="space-y-3">
                    {cvData.experiences.map((exp, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span className="font-bold text-emerald-950">{exp.position}</span>
                          <span className="text-emerald-700 font-semibold text-[11px]">{exp.start_date} – {exp.end_date}</span>
                        </div>
                        <div className="text-slate-600 font-medium">{exp.company} {exp.city ? `• ${exp.city}` : ''}</div>
                        {exp.description && <p className="text-slate-600 mt-1">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =======================================================================
              TEMPLATE 4 : BORDEAUX PRESTIGE
             ======================================================================= */}
          {selectedTemplate === 'bordeaux' && (
            <div className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-lg rounded-xl print:shadow-none print:p-6 print:rounded-none border border-slate-200 print:border-none">
              
              {/* En-tête bordeaux riche */}
              <div className="bg-rose-950 text-white p-6 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 rounded-t-xl print:rounded-none print:-mx-6 print:-mt-6">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                      {cvData.personal_info.first_name} {cvData.personal_info.last_name}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-rose-200 mt-1">
                      {cvData.personal_info.title}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-rose-100 font-medium space-y-0.5">
                    <div>📍 {cvData.personal_info.address}</div>
                    <div>✉️ {cvData.personal_info.email}</div>
                    <div>📞 {cvData.personal_info.phone}</div>
                  </div>
                </div>
              </div>

              {/* Résumé */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-rose-950 border-b-2 border-rose-900 pb-1 mb-2">
                  Vision & Projet d'Études Supérieures
                </h3>
                <p className="text-xs leading-relaxed text-slate-700 text-justify">
                  {cvData.personal_info.summary}
                </p>
              </div>

              {/* Formations */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-rose-950 border-b-2 border-rose-900 pb-1 mb-3">
                  Cursus d'Excellence
                </h3>
                <div className="space-y-3.5">
                  {cvData.educations.map((edu, idx) => (
                    <div key={idx} className="text-xs border-l-2 border-rose-800 pl-3">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span className="font-bold text-rose-950 text-sm">{edu.degree}</span>
                        <span className="text-rose-800 text-[11px] font-semibold">{edu.start_date} – {edu.end_date}</span>
                      </div>
                      <div className="text-slate-600 font-semibold">{edu.school} {edu.city ? `• ${edu.city}` : ''}</div>
                      {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expériences */}
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-rose-950 border-b-2 border-rose-900 pb-1 mb-3">
                  Expériences & Réalisations
                </h3>
                <div className="space-y-3.5">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={idx} className="text-xs border-l-2 border-rose-800 pl-3">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span className="font-bold text-rose-950 text-sm">{exp.position}</span>
                        <span className="text-rose-800 text-[11px] font-semibold">{exp.start_date} – {exp.end_date}</span>
                      </div>
                      <div className="text-slate-600 font-semibold">{exp.company} {exp.city ? `• ${exp.city}` : ''}</div>
                      {exp.description && <p className="text-slate-600 mt-1">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compétences & Langues */}
              <div className="mt-6 grid grid-cols-2 gap-6 pt-3 border-t border-slate-100">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-950 mb-2">
                    Compétences Stratégiques
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.map((skill, idx) => (
                      <span key={idx} className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[11px] font-semibold text-rose-900">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-950 mb-2">
                    Compétences Linguistiques
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {cvData.languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-100 pb-0.5">
                        <span className="font-bold text-slate-800">{lang.name}</span>
                        <span className="text-rose-900 text-[11px] font-semibold">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =======================================================================
              TEMPLATE 5 : MODERNE TECH & IA
             ======================================================================= */}
          {selectedTemplate === 'modern' && (
            <div className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-lg rounded-xl print:shadow-none print:p-6 print:rounded-none border border-slate-200 print:border-none">
              
              {/* En-tête Moderne avec badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <div className="inline-block bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
                    Candidature Internationale
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {cvData.personal_info.first_name} {cvData.personal_info.last_name}
                  </h2>
                  <p className="text-sm font-semibold text-indigo-600 mt-0.5">
                    {cvData.personal_info.title}
                  </p>
                </div>

                <div className="text-xs text-slate-600 space-y-1 sm:text-right font-medium">
                  <div>📍 {cvData.personal_info.address}</div>
                  <div>✉️ {cvData.personal_info.email}</div>
                  <div>📞 {cvData.personal_info.phone}</div>
                </div>
              </div>

              {/* Résumé */}
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Profil & Motivation</span>
                </h3>
                <p className="text-xs leading-relaxed text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {cvData.personal_info.summary}
                </p>
              </div>

              {/* Formations */}
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span>Formation & Diplômes</span>
                </h3>
                <div className="space-y-3">
                  {cvData.educations.map((edu, idx) => (
                    <div key={idx} className="text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm font-bold text-indigo-950">{edu.degree}</span>
                        <span className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[10px] font-bold">{edu.start_date} – {edu.end_date}</span>
                      </div>
                      <div className="text-slate-600 font-semibold mt-0.5">{edu.school} {edu.city ? `• ${edu.city}` : ''}</div>
                      {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expériences */}
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span>Expériences & Projets</span>
                </h3>
                <div className="space-y-3">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={idx} className="text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm font-bold text-indigo-950">{exp.position}</span>
                        <span className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[10px] font-bold">{exp.start_date} – {exp.end_date}</span>
                      </div>
                      <div className="text-slate-600 font-semibold mt-0.5">{exp.company} {exp.city ? `• ${exp.city}` : ''}</div>
                      {exp.description && <p className="text-slate-600 mt-1">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compétences & Langues */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
                    Technologies & Outils
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.map((skill, idx) => (
                      <span key={idx} className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
                    Langues
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {cvData.languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="font-semibold text-slate-800">{lang.name}</span>
                        <span className="text-indigo-600 font-medium text-[11px]">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
