"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useHeroes } from "../../context/HeroesContext";

type HeroFormState = {
  id?: number;
  name: string;
  image: string;
  superpower: string;
};

export default function HeroFormPage() {
  const { heroes, handleFormSubmit, canEdit } = useHeroes();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [hero, setHero] = useState<HeroFormState>({
    id: undefined,
    name: "",
    image: "",
    superpower: "",
  });

  // Se existir id, carregar herói
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

  const isEditMode = !!hero.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // proteção extra (mesmo que o botão esteja disabled)
    if (!canEdit) return;

    handleFormSubmit({
      id: hero.id,
      name: hero.name,
      image: hero.image,
      superpower: hero.superpower,
    });
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <main className="hero-form">
      <h1>{isEditMode ? "Editar Super-Herói" : "Adicionar Super-Herói"}</h1>

      {!canEdit && (
        <p style={{ color: "crimson", marginTop: 8 }}>
          Estás a ver a lista de outro utilizador. Não podes gravar alterações.
        </p>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={hero.name}
              onChange={handleChange}
              required
              placeholder="Ex: Batman"
              disabled={!canEdit}
            />
          </label>
        </div>

        <div>
          <label>
            Imagem (URL):
            <input
              type="text"
              name="image"
              value={hero.image}
              onChange={handleChange}
              required
              placeholder="https://..."
              disabled={!canEdit}
            />
          </label>
        </div>

        {/* linha inteira */}
        <div className="full">
          <label>
            Superpoder:
            <input
              type="text"
              name="superpower"
              value={hero.superpower}
              onChange={handleChange}
              placeholder="Ex: Super força"
              disabled={!canEdit}
            />
          </label>
        </div>

        {/* ações */}
        <div className="actions">
          <button type="submit" disabled={!canEdit}>
            Gravar
          </button>

          <button type="button" onClick={handleBack} className="btn-back">
            Voltar
          </button>
        </div>
      </form>
    </main>
  );
}
