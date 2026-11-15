'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('next_bourse_favorites');
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  const toggleFavorite = (id: number): boolean => {
    let next: number[];
    let added = false;
    if (favoriteIds.includes(id)) {
      next = favoriteIds.filter((favId) => favId !== id);
      added = false;
    } else {
      next = [...favoriteIds, id];
      added = true;
    }
    setFavoriteIds(next);
    try {
      localStorage.setItem('next_bourse_favorites', JSON.stringify(next));
    } catch {
      // Ignore write errors
    }
    return added;
  };

  const isFavorite = (id: number): boolean => {
    return favoriteIds.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        favoritesCount: mounted ? favoriteIds.length : 0,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
