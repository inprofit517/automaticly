import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrolled } from '../lib/hooks';
import { CtaButton } from './ui';
import { scrollToSection } from '../lib/nav';

const LINKS = [
  { label: 'Lösungen', id: 'loesungen' },
  { label: 'Prozess', id: 'ablauf' },
  { label: 'Team', id: 'team' },
];

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="/"
      onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}
      className={`inline-flex items-center ${className}`}
      aria-label="Automaticly Startseite"
    >
      <img
        src="/logo.png"
        alt="Automaticly"
        width={568}
        height={96}
        className="h-7 w-auto sm:h-8"
      />
    </a>
  );
}

export function Navbar() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          open
            ? 'mt-0 h-16 border-b border-white/[0.06] bg-ink-950/95 backdrop-blur-xl'
            : scrolled
              ? 'mt-2 h-14 rounded-2xl border border-white/[0.07] bg-ink-900/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'
              : 'mt-0 h-16 border-b border-transparent bg-transparent'
        }`}
        style={scrolled && !open ? { width: 'min(100% - 1rem, 72rem)', left: '0', right: '0' } : undefined}
      >
        <div className="flex w-full items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(l.id); }}
                className="group relative text-sm text-muted transition-colors hover:text-offwhite"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center md:flex">
            <CtaButton size="sm">
              Erstgespräch buchen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </CtaButton>
          </div>

          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-offwhite transition-colors hover:border-lime-500/40 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={open}
          >
            <Menu className={`absolute h-5 w-5 transition-all duration-300 ${open ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
            <X className={`absolute h-5 w-5 transition-all duration-300 ${open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — always mounted for smooth enter/exit animations */}
      <div
        className={`fixed inset-0 top-16 z-40 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* Backdrop fade */}
        <div
          className={`absolute inset-0 bg-ink-950/95 backdrop-blur-xl transition-opacity duration-300 ease-out ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <nav className="relative flex flex-col gap-1 px-6 py-8" aria-label="Mobile Navigation">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(l.id); setOpen(false); }}
              style={{ transitionDelay: open ? `${100 + i * 55}ms` : '0ms' }}
              className={`flex items-center justify-between border-b border-white/[0.06] py-4 text-lg text-offwhite transition-all duration-300 ease-out ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              {l.label}
              <ArrowRight className="h-5 w-5 text-lime-500 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          ))}
          <div
            style={{ transitionDelay: open ? `${100 + LINKS.length * 55}ms` : '0ms' }}
            className={`mt-6 transition-all duration-300 ease-out ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <CtaButton size="lg" className="w-full">
              Erstgespräch buchen
              <ArrowRight className="h-4 w-4" />
            </CtaButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
