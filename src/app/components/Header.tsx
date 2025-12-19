import './styles.css';
import Link from 'next/link';
type HeaderProps = {
  
    my_name: string;
    project_name: string;
  
};

export default function Header({ my_name, project_name }: HeaderProps) {
  return (
    <header className="headerClass">
      <img
        className="imageHeaderClass"
        src="https://logos-world.net/wp-content/uploads/2020/05/Avengers-Emblem.png"
        alt="No image"
      />

      <div className="textContainer">
        <h1>{project_name}</h1>
        <p>Desenvolvido por {my_name}</p>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}

