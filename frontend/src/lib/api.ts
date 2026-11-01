import axios from 'axios';
import { Scholarship, Statistics, FilterParams } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8011/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Intercepteur pour injecter le token d'auth si présent dans le localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const scholarshipApi = {
  // Liste des bourses avec pagination
  getAll: async (params?: FilterParams) => {
    try {
      const response = await api.get('/scholarships', { params });
      return response.data;
    } catch (error) {
      console.warn('Erreur API backend, utilisation des données de secours:', error);
      return { success: false, data: [] };
    }
  },

  // Recherche avancée
  search: async (params: FilterParams) => {
    try {
      const response = await api.get('/scholarships/search', { params });
      return response.data;
    } catch (error) {
      console.warn('Erreur API search:', error);
      return { success: false, data: [] };
    }
  },

  // Détail d'une bourse
  getById: async (id: string | number) => {
    const response = await api.get(`/scholarships/${id}`);
    return response.data;
  },

  // Statistiques
  getStats: async (): Promise<Statistics> => {
    try {
      const response = await api.get('/statistics');
      return response.data.data;
    } catch (error) {
      return {
        scholarships: 560,
        countries: 42,
        universities: 180,
        fully_funded: 320,
      };
    }
  },

  // Pays disponibles
  getCountries: async () => {
    try {
      const response = await api.get('/scholarships/countries');
      return response.data.data || [];
    } catch (error) {
      return [];
    }
  },

  // Chat Gemini IA
  askAI: async (message: string, context?: any) => {
    const response = await api.post('/gemini/chat', { message, context });
    return response.data;
  },
};
