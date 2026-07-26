import { Mail, MapPin } from 'lucide-react';
import { Logo } from './Navbar';
import { useMediaQuery } from '../lib/hooks';
import { navigate, scrollToSection } from '../lib/nav';

type FooterLink = { label: string; section?: string; to?: string };

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Lösungen',
    links: [
      { label: 'Chatbots', section: 'loesungen' },
      { label: 'Buchungssysteme', section: 'loesungen' },
      { label: 'Voice Agents', section: 'loesungen' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Impressum', to: '/impressum' },
      { label: 'Datenschutz', to: '/datenschutz' },
      { label: 'AGB', to: '/agb' },
    ],
  },
];

export function Footer({ plain = false }: { plain?: boolean } = {}) {
  const isMobile = useMediaQuery('(max-width: 639.98px)');

  // Mobile (or when forced, e.g. on legal pages): plain static footer — no sticky-reveal.
  if (plain || isMobile) {
    return (
      <footer className="relative border-t border-white/[0.07] bg-ink-950">
        <FooterInner />
      </footer>
    );
  }

  // Tablet / desktop: sticky-reveal scroll effect — the footer is pinned to the
  // viewport and clipped to its own box, so it "reveals" from underneath on scroll.
  return (
    <footer
      className="relative w-full sm:h-[660px] lg:h-[392px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 w-full sm:h-[660px] lg:h-[392px]">
        <div className="sticky h-full overflow-y-auto sm:top-[calc(100vh-660px)] lg:top-[calc(100vh-392px)]">
          <div className="relative h-full border-t border-white/[0.07] bg-ink-950">
            <FooterInner />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterInner() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-500/40 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-muted/60">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.to ?? `#${l.section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (l.to) navigate(l.to);
                        else if (l.section) scrollToSection(l.section);
                      }}
                      className="text-sm text-muted transition-colors hover:text-offwhite"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-muted/60">Kontakt</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="mailto:info@automaticly.ch" className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-offwhite">
                  <Mail className="h-4 w-4 text-lime-500/70" strokeWidth={1.5} />
                  info@automaticly.ch
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <MapPin className="h-4 w-4 text-lime-500/70" strokeWidth={1.5} />
                Schweiz
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted/50">© 2026 Automaticly KLG. Alle Rechte vorbehalten.</p>
          <p className="font-mono text-xs text-muted/40">Made in Switzerland</p>
        </div>
      </div>
    </>
  );
}
