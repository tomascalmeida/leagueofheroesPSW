import './styles.css';

type HeroInfoProps = {
  nome: string;
  imagem: string;
};

export default function HeroInfo({ nome, imagem }: HeroInfoProps) {
  return (
    <div className="heroBox">
      <img className="heroImage" src={imagem} alt={nome} />
      <h3>{nome}</h3>
    </div>
  );
}
