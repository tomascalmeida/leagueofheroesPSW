"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useHeroes } from "../../context/HeroesContext"; // ajusta o path

export default function HeroFormClient() {
  const { heroes, handleFormSubmit, canEdit } = useHeroes();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [hero, setHero] = useState({
    id: undefined as number | undefined,
    name: "",
    image: "",
    superpower: "",
  });

  useEffect(() => {
    if (!idParam) return;
    const id = Number(idParam);
    const existing = heroes.find((h) => h.id === id);
    if (existing) {
      setHero({
        id: existing.id,
        name: existing.name,
        image: existing.image,
        superpower: existing.superpower ?? "",
      });
    }
  }, [idParam, heroes]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    handleFormSubmit(hero);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* ...o teu JSX... */}
      <button type="button" onClick={() => router.push("/dashboard")}>
        Voltar
      </button>
      <button type="submit" disabled={!canEdit}>
        Gravar
      </button>
    </form>
  );
}
