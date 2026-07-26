import { ArrowRight, ArrowDown } from 'lucide-react';
import { CtaButton, GhostButton, Eyebrow } from './ui';
import { Aurora, NetworkGraphic } from './Backgrounds';

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 sm:pt-32">
      {/* Background layers */}
      <Aurora />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-60" aria-hidden="true" />
      <NetworkGraphic className="pointer-events-none absolute inset-x-0 top-24 h-[440px] w-full opacity-40" />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="hero-in flex justify-center" style={{ animationDelay: '0.05s' }}>
          <Eyebrow>
            <span className="text-center">KI-AUTOMATISIERUNG<br className="sm:hidden" /> FÜR SCHWEIZER KMU</span>
          </Eyebrow>
        </div>

        <h1 className="hero-in mt-6 text-balance text-[26px] font-semibold leading-[1.12] tracking-tightest text-offwhite sm:text-6xl sm:leading-[1.05] lg:text-[68px]" style={{ animationDelay: '0.14s' }}>
          Ihr Unternehmen.
          <br />{' '}
          <span className="text-gradient">Rund um die Uhr</span> erreichbar.
          <br />{' '}
          Ohne zusätzliches Personal.
        </h1>

        <div className="hero-in mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-6 sm:w-auto sm:flex-row sm:items-center" style={{ animationDelay: '0.26s' }}>
          <CtaButton size="lg" className="w-full !text-sm sm:w-auto sm:!text-base">
            Kostenloses Erstgespräch buchen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </CtaButton>
          <GhostButton className="w-full sm:w-auto">
            Lösungen ansehen
            <ArrowDown className="h-4 w-4" />
          </GhostButton>
        </div>

        {/* Key metrics — stacked: big number over label */}
        <div className="hero-in mx-auto mt-11 flex items-start justify-center gap-5 sm:gap-14" style={{ animationDelay: '0.38s' }}>
          {[
            { value: '24/7', label: 'Erreichbarkeit' },
            { value: '99%', label: 'Genauigkeit' },
            { value: <>&lt;1s</>, label: 'Antwortzeit' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-mono text-4xl font-semibold leading-none tracking-tight text-lime-500 sm:text-5xl">
                {s.value}
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-widest2 text-muted sm:text-xs">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
