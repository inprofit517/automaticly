import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './Navbar';
import { Footer } from './Footer';
import { navigate } from '../lib/nav';

/** Shell for standalone legal pages (Datenschutz, Impressum, …). */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Zurück zur Startseite</span>
            <span className="sm:hidden">Zurück</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-offwhite sm:text-4xl">{title}</h1>
        {updated && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-muted/60">{updated}</p>
        )}
        <div className="mt-10 space-y-9">{children}</div>
      </main>

      <Footer plain />
    </>
  );
}

/** A numbered section used inside legal pages. */
export function LegalSection({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-offwhite">
        <span className="mr-2 font-mono text-lime-500">{n}.</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed2 text-muted sm:text-[15px]">{children}</div>
    </section>
  );
}
