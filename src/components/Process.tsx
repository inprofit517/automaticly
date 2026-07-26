import { Search, Wrench, Activity } from 'lucide-react';
import { Eyebrow, Reveal } from './ui';

const STEPS = [
  {
    n: '01',
    icon: Search,
    title: 'Analyse',
    body: 'Wir analysieren Ihre Kundenkontaktpunkte und identifizieren, wo Automatisierung den grössten Hebel bringt.',
  },
  {
    n: '02',
    icon: Wrench,
    title: 'Umsetzung',
    body: 'Wir entwickeln und integrieren Ihre massgeschneiderte Lösung – Chatbot, Buchungssystem oder Voice Agent.',
  },
  {
    n: '03',
    icon: Activity,
    title: 'Betrieb & Optimierung',
    body: 'Wir überwachen die Performance, optimieren laufend und stehen Ihnen als technischer Partner zur Seite.',
  },
];

export function Process() {
  return (
    <section id="ablauf" className="relative border-y border-white/[0.06] bg-ink-900/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <Eyebrow>SO EINFACH GEHT'S</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-5xl">
            Von der Idee zur Automatisierung in drei Schritten
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px lg:block">
            <div className="mx-auto h-full max-w-5xl">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="#B4FF39" strokeWidth="1" strokeDasharray="6 10" style={{ animation: 'dash 3s linear infinite' }} />
              </svg>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 140} className="relative">
                <div className="flex items-center gap-4 lg:block">
                  <div className="relative z-10 inline-flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-ink-850">
                    <s.icon className="h-8 w-8 text-lime-500" strokeWidth={1.5} />
                    <span className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-lime-500/30 bg-ink-900 font-mono text-xs font-semibold text-lime-500">
                      {s.n}
                    </span>
                  </div>
                </div>
                <div className="mt-5 lg:mt-6">
                  <h3 className="text-xl font-semibold tracking-tight text-offwhite">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed2 text-muted sm:text-[15px]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
