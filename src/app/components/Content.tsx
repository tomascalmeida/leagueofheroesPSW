import { useEffect, useState } from "react";
import "./styles.css";
import HeroInfo from "./HeroInfo";
import Loader from "./loader";
import { useHeroes } from "../context/HeroesContext";

export default function Content() {
  const { heroes, favorites } = useHeroes(); // <- vem do contexto
  const [loading, setLoading] = useState(true);

  //tempo para load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const favoriteHeroes = heroes
    .filter((hero) => favorites.includes(hero.id))
    .slice(0, 3);

  return (
    <main>
      <div className="fav-and-heroes">
        <h4 style={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}>
          Top-3 Heróis Favoritos
        </h4>

        <br />

        <div className="imagensClass">
          {favoriteHeroes.map((hero) => (
            <HeroInfo
              key={hero.id}
              nome={hero.name}
              imagem={hero.image}
            />
          ))}
          
        </div>

        <hr style={{ margin: "32px 0", borderColor: "#1f2937" }} />

        <h4 style={{ textAlign: "center", marginBottom: "1%" }}>
          Todos os Heróis
        </h4>

        <div className="imagensClass">
          {heroes.map((hero) => (
            <HeroInfo
              key={hero.id}
              nome={hero.name}
              imagem={hero.image}
            />
          ))}
        </div>
{loading && <Loader />}
        
      </div>
    </main>
  );
}
