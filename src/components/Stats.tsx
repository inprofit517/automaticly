import { useCountUp } from '../lib/hooks';
import { Reveal } from './ui';

type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { value: 40, prefix: '+', suffix: '%', label: 'Mehr qualifizierte Anfragen', sub: 'durch sofortige Antworten' },
  { value: 24, suffix: '/7', label: 'Erreichbarkeit', sub: 'ohne Mehrkosten' },
  { value: 70, prefix: '–', suffix: '%', label: 'Weniger administrativer Aufwand', sub: 'durch Automatisierung' },
  { value: 2, suffix: ' Min', prefix: '<', label: 'Antwortzeit auf Kundenanfragen', sub: 'statt Stunden oder Tagen' },
];

export function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-ink-900/40 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="bg-ink-900/60 p-6 sm:p-8">
              <StatCard stat={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value, { decimals: stat.decimals ?? 0 });
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline gap-0.5 font-mono text-3xl font-semibold tracking-tight text-lime-500 sm:text-4xl">
        {stat.prefix && <span>{stat.prefix}</span>}
        <span ref={ref}>{value}</span>
        <span className="text-lime-500/90">{stat.suffix}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-offwhite sm:text-[15px]">{stat.label}</p>
      <p className="mt-1 text-xs text-muted sm:text-sm">{stat.sub}</p>
    </div>
  );
}
