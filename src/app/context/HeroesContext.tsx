"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PUBLICID, getHeroesByPublicId, getTopByPublicId, saveHeroes, saveTop } from "../services/api";

export type Hero = { id: number; name: string; image: string; superpower?: string };

type HeroesContextType = {
  heroes: Hero[];
  favorites: number[];
  loading: boolean;

  selectedPublicId: string;
  setSelectedPublicId: (id: string) => void;

  canEdit: boolean;

  handleDelete: (id: number) => void;
  handleToggleFavorite: (id: number) => void;
  addHero: (hero: Omit<Hero, "id">) => void;
  updateHero: (hero: Hero) => void;
  handleFormSubmit: (hero: Partial<Hero>) => void;
};

const HeroesContext = createContext<HeroesContextType | undefined>(undefined);

function extractArray<T>(payload: any, keys: string[] = []): T[] {
  if (Array.isArray(payload)) return payload as T[];
  for (const k of keys) if (Array.isArray(payload?.[k])) return payload[k] as T[];
  if (Array.isArray(payload?.data)) return payload.data as T[];
  return [];
}

export function HeroesProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [selectedPublicId, setSelectedPublicId] = useState(PUBLICID);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const canEdit = useMemo(() => selectedPublicId === PUBLICID, [selectedPublicId]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const [heroesFromApi, topFromApi] = await Promise.all([
          getHeroesByPublicId(selectedPublicId),
          getTopByPublicId(selectedPublicId),
        ]);

        setHeroes(extractArray<Hero>(heroesFromApi, ["heroes"]));
        setFavorites(extractArray<number>(topFromApi, ["top", "favorites"]));
      } catch {
        setHeroes([]);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [selectedPublicId]);

  const persistHeroesIfOwner = async (nextHeroes: Hero[]) => {
    if (!canEdit) return;
    await saveHeroes(nextHeroes);
  };

  const persistTopIfOwner = async (nextFavs: number[]) => {
    if (!canEdit) return;
    await saveTop(nextFavs);
  };

  const handleDelete = (id: number) => {
    if (!canEdit) return;

    setHeroes((prev) => {
      const next = prev.filter((h) => h.id !== id);
      void persistHeroesIfOwner(next);
      return next;
    });

    setFavorites((prev) => {
      const next = prev.filter((x) => x !== id);
      void persistTopIfOwner(next);
      return next;
    });
  };

  const handleToggleFavorite = (id: number) => {
    if (!canEdit) return;

    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      void persistTopIfOwner(next);
      return next;
    });
  };

  const addHero = (hero: Omit<Hero, "id">) => {
    if (!canEdit) return;

    setHeroes((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((h) => h.id)) + 1 : 1;
      const next = [...prev, { ...hero, id: nextId }];
      void persistHeroesIfOwner(next);
      return next;
    });
  };

  const updateHero = (hero: Hero) => {
    if (!canEdit) return;

    setHeroes((prev) => {
      const next = prev.map((h) => (h.id === hero.id ? hero : h));
      void persistHeroesIfOwner(next);
      return next;
    });
  };

  const handleFormSubmit = (hero: Partial<Hero>) => {
    if (!canEdit) return;

    if (hero.id) updateHero(hero as Hero);
    else addHero(hero as Omit<Hero, "id">);

    router.push("/dashboard");
  };

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        favorites,
        loading,
        selectedPublicId,
        setSelectedPublicId,
        canEdit,
        handleDelete,
        handleToggleFavorite,
        addHero,
        updateHero,
        handleFormSubmit,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
}

export function useHeroes() {
  const ctx = useContext(HeroesContext);
  if (!ctx) throw new Error("useHeroes deve ser usado dentro de HeroesProvider");
  return ctx;
}
