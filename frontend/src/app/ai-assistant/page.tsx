'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
} from 'lucide-react';
import { scholarshipApi } from '@/lib/api';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  "Quelles sont les bourses 100% financées ouvertes pour un master en informatique ?",
  "Comment candidater à la bourse Eiffel depuis l'Afrique francophone ?",
  "Quels sont les critères pour le programme Mastercard Foundation ?",
  "Aide-moi à rédiger une lettre de motivation percutante pour une bourse",
  "Quelles sont les bourses disponibles sans exigence de test IELTS/TOEFL ?",
];

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const initialScholarship = searchParams?.get('scholarship_title');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: initialScholarship
        ? `Bonjour ! Je vois que vous vous intéressez à la bourse **${initialScholarship}**. Comment puis-je vous aider ? (Critères d'éligibilité, documents à préparer, rédaction de votre projet d'études...)`
        : "Bonjour ! Je suis **Next IA**, votre conseiller virtuel spécialisé dans les bourses d'études internationales pour les étudiants africains. Indiquez-moi votre filière, votre niveau actuel (Licence, Master, Doctorat) ou vos pays cibles, et je vous guiderai vers les meilleures opportunités !",
      time: 'Maintenant',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: 'À l\'instant',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await scholarshipApi.askAI(text.trim(), {
        context_scholarship: initialScholarship,
      });

      const aiResponse = res?.reply || res?.message || res?.data?.response;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse || generateSmartFallback(text),
        time: 'À l\'instant',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: generateSmartFallback(text),
        time: 'À l\'instant',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  function generateSmartFallback(prompt: string): string {
    const lower = prompt.toLowerCase();
    
    if (lower.includes('eiffel') || lower.includes('france')) {
      return `### 🇫🇷 Bourses France Excellence Eiffel & Études en France
- **Public éligible** : Étudiants internationaux de moins de 27 ans pour le Master, et moins de 32 ans pour le Doctorat.
- **Financement** : 1 181 € / mois pour Master (1 800 € pour Doctorat) + billet d'avion aller-retour + sécurité sociale + priorité résidence Crous.
- **Procédure cruciale** : Vous **ne postulez pas directement sur le site de Campus France**, mais auprès d'une université française partenaire qui accepte de porter votre dossier de candidature d'excellence.
- **Date limite typique** : Janvier pour la rentrée de septembre.`;
    }

    if (lower.includes('mastercard')) {
      return `### 🌍 Programme de Bourses Mastercard Foundation
- **Couverture 100% totale** : Frais de scolarité, logement, ordinateur portable, billet d'avion et allocation mensuelle complète.
- **Profil recherché** : Étudiants d'Afrique subsaharienne avec un dossier académique d'excellence et un **engagement communautaire / associatif prouvé**.
- **Universités partenaires** : Sciences Po Paris, UC Berkeley, Université d'Édimbourg, McGill, Université de Toronto, etc.
- **Conseil clé** : Votre lettre de motivation doit démontrer concrètement comment vos études permettront d'impacter le continent africain à votre retour.`;
    }

    if (lower.includes('informatique') || lower.includes('computer') || lower.includes('ia') || lower.includes('data')) {
      return `### 💻 Opportunités en Informatique & Intelligence Artificielle
Pour un étudiant en informatique ou génie logiciel, voici les meilleures opportunités :
1. **Erasmus Mundus (Union Européenne)** : Plusieurs masters d'excellence financés à 1 400 € / mois (ex: BDMA en Big Data, SARENA, MERIT).
2. **Bourses DAAD EPOS (Allemagne)** : Formations en informatique appliquée au développement durable (TU Munich, RWTH Aachen).
3. **Bourses du Gouvernement Chinois (CSC)** : Cursus complets en IA et Big Data avec gratuité totale des frais et logement offert.`;
    }

    if (lower.includes('lettre') || lower.includes('motivation')) {
      return `### ✍️ Structure d'une Lettre de Motivation Gagnante pour Bourse :
1. **L'Accroche (Paragraphe 1)** : Qui vous êtes, votre parcours actuel en Afrique, et l'intitulé exact de la formation convoitée.
2. **Votre Valeur Académique (Paragraphe 2)** : Vos projets réalisés, vos résultats et vos compétences distinctives.
3. **Le Choix de l'Institution & de la Bourse (Paragraphe 3)** : Pourquoi cette université et en quoi leur pédagogie répond à vos ambitions.
4. **Le Projet de Retour et d'Impact (Paragraphe 4 - Crucial)** : Quels défis de votre pays ou de votre région comptez-vous résoudre avec ce diplôme ?`;
    }

    return `Merci pour votre question ! Pour vous donner les opportunités les plus adaptées et financées à 100%, pouvez-vous me préciser :
1. Votre filière exacte (Informatique, Santé, Économie, Ingénierie...) ?
2. Votre niveau actuel (Licence 3, Master 1, Bac...) ?
3. Vos pays de destination préférés (France, Canada, Allemagne, Royaume-Uni, Chine, Turquie...) ?`;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Next IA - Conseiller Académique</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  En ligne
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Alimenté par Google Gemini pour l'orientation des étudiants africains
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Boîte de discussion */}
      <div className="flex flex-col h-[600px] rounded-3xl border border-slate-200/90 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-900">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40 dark:bg-slate-950/30">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-200/90 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="prose prose-xs dark:prose-invert max-w-none whitespace-pre-line">
                    {msg.text}
                  </div>
                  <span
                    className={`mt-1.5 block text-[10px] text-right ${
                      isUser ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-bl-none border border-slate-200 bg-white px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-2">Next IA analyse votre demande...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions rapides */}
        <div className="border-t border-slate-100 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900 overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
              Idées :
            </span>
            <div className="flex gap-1.5 whitespace-nowrap">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input d'envoi */}
        <div className="border-t border-slate-200 p-3 sm:p-4 bg-white dark:border-slate-800 dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Posez votre question sur une bourse, votre filière, vos chances d'admission..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-40 active:scale-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
        <p className="mt-3 text-xs text-slate-500">Chargement de l'assistant IA...</p>
      </div>
    }>
      <AIAssistantContent />
    </Suspense>
  );
}
