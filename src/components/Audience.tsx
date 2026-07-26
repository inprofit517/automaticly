import {
  Stethoscope, Scale, Hammer, Sparkles, Building2, GraduationCap,
} from 'lucide-react';
import { Eyebrow, Reveal } from './ui';

const AUDIENCES = [
  { icon: Stethoscope, label: 'Arztpraxen & Zahnarztpraxen' },
  { icon: Scale, label: 'Anwaltskanzleien & Treuhänder' },
  { icon: Hammer, label: 'Handwerk & Gewerbe' },
  { icon: Sparkles, label: 'Beauty & Wellness' },
  { icon: Building2, label: 'Immobilien' },
  { icon: GraduationCap, label: 'Coaches & Berater' },
];

export function Audience() {
  return (
    <section id="fuer-wen" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <Eyebrow>FÜR WEN</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-5xl">
            Gebaut für Schweizer KMU, die keine Zeit für verpasste Chancen haben
          </h2>
          <p className="mt-5 text-base leading-relaxed2 text-muted sm:text-lg">
            Egal ob Praxis, Kanzlei, Handwerksbetrieb oder Dienstleister: Wenn Kunden anrufen,
            schreiben oder einen Termin buchen wollen, muss eine zuverlässige Lösung bereitstehen.
            Automaticly übernimmt genau das.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-1 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.label} delay={i * 70}>
              <div className="group flex h-full items-center gap-3 py-1.5 sm:gap-4 sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-ink-850/60 sm:p-7 sm:backdrop-blur-sm sm:transition-all sm:duration-300 sm:hover:-translate-y-1 sm:hover:border-lime-500/25 sm:hover:bg-ink-800/70 sm:hover:shadow-card">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-ink-800 text-lime-500 transition-colors group-hover:border-lime-500/40 sm:h-11 sm:w-11">
                  <a.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-medium text-offwhite sm:text-[15px]">{a.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
