import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ToastProvider } from '@/context/ToastContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Next Bourse | Bourses d'Études Mondiales & Orientation IA",
  description: "Plateforme de référence pour trouver des bourses d'études 100% financées et partielles partout dans le monde (Mastercard, Eiffel, Chevening, DAAD, Erasmus). Conseils personnalisés par IA et générateur de CV.",
  keywords: ["bourses d'études", "bourses afrique", "bourses mastercard", "bourse eiffel", "bourse chevening", "études à l'étranger", "bourse québec", "bourse belgique"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-200">
        <ThemeProvider>
          <FavoritesProvider>
            <ToastProvider>
              <Suspense fallback={<div className="h-16 border-b border-stone-200 bg-white dark:bg-slate-900 dark:border-slate-800" />}>
                <Navbar />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Footer />
            </ToastProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
