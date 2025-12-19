// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { HeroesProvider } from './context/HeroesContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'pv33486 - Tomás Almeida',
  description: 'Gerir super-heróis',
};

const data = {
  my_name: 'Tomás Almeida',
  project_name: 'leagueofheroes',
};

export default function RootLayout({
  header,
  children,
  footer,
}: { 
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
 }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HeroesProvider>
          {header}
          {children}
          {footer}
        </HeroesProvider>
      </body>
    </html>
  );
}
