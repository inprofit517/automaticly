import { Eyebrow, Reveal } from './ui';

type Member = {
  name: string;
  role: string;
  bio: string;
};

const TEAM: Member[] = [
  {
    name: 'Lis Neziri',
    role: 'Tech Lead',
    bio: 'Verantwortet bei Automaticly die gesamte Technik. Er entwickelt massgeschneiderte KI-Systeme für Chatbots, Buchungen und Sprachassistenten.',
  },
  {
    name: 'Elia Jenzer',
    role: 'Kundenberatung',
    bio: 'Leitet strategische Kundenprojekte und Erstgespräche. Er begleitet unsere Partner kompetent bis zur erfolgreichen digitalen Implementierung.',
  },
  {
    name: 'Noah Tercier',
    role: 'Projektberatung',
    bio: 'Analysiert individuelle Geschäftsprozesse im Detail, berät Interessenten umfassend und konzipiert anschliessend die exakt passende Automatisierungslösung.',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <Eyebrow>DAS TEAM</Eyebrow>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-5xl">
            Ihre Spezialisten
            <br className="sm:hidden" />{' '}
            für automatisierte
            <br className="sm:hidden" />{' '}
            Unternehmensprozesse
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <article className="group relative flex h-full flex-col items-center rounded-2xl border border-white/[0.08] bg-ink-850/60 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-500/25 hover:bg-ink-800/70 hover:shadow-card">
                <div className="relative">
                  <span className="absolute -inset-1 rounded-full bg-lime-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-lime-500/30 bg-gradient-to-b from-ink-800 to-ink-900">
                    <span className="font-mono text-lg font-semibold tracking-tight text-lime-500">{initials(m.name)}</span>
                  </div>
                </div>

                <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-offwhite">{m.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-lime-500/80">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed2 text-muted">{m.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
