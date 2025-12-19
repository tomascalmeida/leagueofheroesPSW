import './styles.css';

type FooterProps = {
    my_name: string;
    project_name: string;
  
};

export default function Footer({ my_name, project_name }: FooterProps) {
  return (
    <footer className="footerClass">
      {project_name} - Copyright © 2025 by {my_name}
    </footer>
  );
}
