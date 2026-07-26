import { Check } from 'lucide-react';
import { Eyebrow, Reveal, CtaButton } from './ui';
import { Aurora } from './Backgrounds';

const POINTS = [
  {
    title: 'Massgeschneidert statt Standardlösung',
    body: 'Wir bauen KI-Systeme, die zu Ihrem Betrieb passen – nicht umgekehrt.',
  },
  {
    title: 'Made & betreut in der Schweiz',
    body: 'Schweizer Datenschutzstandards und ein direkter Ansprechpartner in Ihrer Zeitzone.',
  },
  {
    title: 'Transparente, faire Preisgestaltung',
    body: 'Sie wissen ab Tag eins, was es kostet. Keine versteckten Gebühren, kein Lock-in.',
  },
  {
    title: 'Kein technisches Vorwissen nötig',
    body: 'Wir übernehmen Einrichtung und Wartung. Sie konzentrieren sich auf Ihr Geschäft.',
  },
];

export function Why() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <Aurora className="opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>WARUM AUTOMATICLY</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-5xl">
              Kein Software-Abo. Ein automatisierter Mitarbeiter.
            </h2>
            <p className="mt-5 text-base leading-relaxed2 text-muted sm:text-lg">
              Wir verkaufen keine generischen Software-Lizenzen, sondern entwickeln und betreuen
              massgeschneiderte KI-Systeme für Ihren Betrieb, inklusive persönlicher Betreuung,
              höchsten Schweizer Datenschutzstandards sowie einem direkten Ansprechpartner.
            </p>
            <div className="mt-8">
              <CtaButton size="lg">Kostenloses Erstgespräch buchen</CtaButton>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-4 sm:space-y-3">
              {POINTS.map((p) => (
                <li
                  key={p.title}
                  className="group flex gap-3 sm:gap-4 sm:rounded-2xl sm:border sm:border-white/[0.07] sm:bg-ink-850/50 sm:p-5 sm:transition-all sm:duration-300 sm:hover:border-lime-500/25 sm:hover:bg-ink-800/60"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lime-500/30 bg-lime-500/[0.08] text-lime-500 transition-shadow group-hover:shadow-glow-sm sm:h-8 sm:w-8">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-offwhite sm:text-base">{p.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed2 text-muted sm:mt-1">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
