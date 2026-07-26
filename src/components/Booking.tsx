import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CalendarDays, Clock, ShieldCheck, ArrowRight, Video, Check,
  Loader2, AlertCircle, PartyPopper, ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { Eyebrow, Reveal } from './ui';
import { Aurora } from './Backgrounds';
import { useMediaQuery } from '../lib/hooks';

type Slot = { start: string; end: string; label: string };
type Day = { date: string; weekday: number; slots: Slot[] };
type Availability = {
  mock: boolean;
  config: { tz: string; durationMinutes: number };
  days: Day[];
};
type Step = 'date' | 'time' | 'details';

const deWeekday = new Intl.DateTimeFormat('de-CH', { weekday: 'short' });
const deMonth = new Intl.DateTimeFormat('de-CH', { month: 'short' });
const deLong = new Intl.DateTimeFormat('de-CH', { weekday: 'long', day: 'numeric', month: 'long' });

function asLocalDate(dateStr: string) {
  // dateStr = "YYYY-MM-DD" → local noon (display only, avoids tz rollover)
  return new Date(`${dateStr}T12:00:00`);
}

export function Booking() {
  const isMobile = useMediaQuery('(max-width: 639.98px)');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  return (
    <section id="booking" className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <Aurora />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 mask-fade-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>BEREIT FÜR AUTOMATISIERUNG?</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-5xl">
              Lassen Sie uns in 20 Minuten zeigen, was möglich ist.
            </h2>
            <p className="mt-5 text-base leading-relaxed2 text-muted sm:text-lg">
              Buchen Sie ein kostenfreies, unverbindliches Erstgespräch. Wählen Sie Ihren
              Wunschtermin, um sofort die Kalendereinladung inklusive Videolink zu erhalten.
            </p>

            <ul className="mt-7 space-y-3">
              <Benefit icon={<Clock className="h-4 w-4" />} text="20 Minuten, unverbindlich und kostenlos" />
              <Benefit icon={<Video className="h-4 w-4" />} text="Per Video-Call — wo immer Sie gerade sind" />
              <Benefit icon={<ShieldCheck className="h-4 w-4" />} text="Konkrete Empfehlung, kein Verkaufsdruck" />
            </ul>
          </Reveal>

          <Reveal delay={120}>
            {isMobile ? (
              <MobileTrigger onOpen={() => setModalOpen(true)} />
            ) : (
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-br from-lime-500/[0.08] to-violetx-500/[0.06] blur-2xl" aria-hidden="true" />
                <BookingWidget />
              </div>
            )}
          </Reveal>
        </div>
      </div>

      {isMobile && modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}

/** Mobile: a prominent button that opens the full-screen booking sheet. */
function MobileTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full items-center justify-between gap-3 rounded-2xl border border-lime-500/30 bg-ink-850/70 p-5 text-left shadow-card backdrop-blur-sm transition-colors hover:border-lime-500/50"
    >
      <span className="flex items-center gap-3.5">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-500/30 bg-lime-500/[0.08] text-lime-500">
          <CalendarDays className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span>
          <span className="block text-[15px] font-semibold text-offwhite">Freien Termin wählen</span>
          <span className="block font-mono text-[11px] uppercase tracking-widest2 text-muted/70">20 Min · unverbindlich</span>
        </span>
      </span>
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-500 text-ink-950">
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

/** Mobile: full-screen booking sheet. Portaled to <body> so it escapes the
 *  Booking section's stacking context and covers the whole screen. */
function BookingModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[70] flex flex-col bg-ink-950">
      <div className="flex items-center justify-end px-4 pt-4 pb-1">
        <button
          type="button"
          onClick={onClose}
          aria-label="Schliessen"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:text-offwhite"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-10">
        <BookingWidget variant="plain" />
      </div>
    </div>,
    document.body,
  );
}

function BookingWidget({ variant = 'card' }: { variant?: 'card' | 'plain' }) {
  const [data, setData] = useState<Availability | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ when: string; joinUrl: string | null } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json: Availability) => alive && setData(json))
      .catch((err) => alive && setLoadError(err.message));
    return () => { alive = false; };
  }, []);

  const activeDay = useMemo(
    () => data?.days.find((d) => d.date === selectedDate) ?? null,
    [data, selectedDate],
  );

  function pickDate(date: string) {
    setSelectedDate(date);
    setSlot(null);
    setStep('time');
  }
  function pickSlot(s: Slot) {
    setSlot(s);
    setSubmitError(null);
    setStep('details');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: slot.start, ...form }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Buchung fehlgeschlagen.');
      setConfirmed({ when: json.when, joinUrl: json.joinUrl ?? null });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Buchung fehlgeschlagen.');
    } finally {
      setSubmitting(false);
    }
  }

  const shell =
    variant === 'plain'
      ? 'relative flex flex-col'
      : 'relative flex min-h-[400px] flex-col rounded-2xl border border-white/[0.09] bg-ink-850/70 p-5 shadow-card backdrop-blur-sm sm:min-h-[488px] sm:p-6';

  // --- Success -------------------------------------------------------------
  if (confirmed) {
    return (
      <div className={shell}>
        <div className="my-auto flex flex-col items-center py-6 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-lime-500/30 bg-lime-500/10 text-lime-500">
            <PartyPopper className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-offwhite">Termin bestätigt!</h3>
          <p className="mt-2 text-sm leading-relaxed2 text-muted">
            Ihr Erstgespräch ist gebucht. Eine Kalendereinladung
            {confirmed.joinUrl ? ' mit Video-Link' : ''} ist unterwegs an{' '}
            <span className="text-offwhite">{form.email}</span>.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-lime-500/20 bg-lime-500/[0.06] px-4 py-3 font-mono text-sm text-lime-500">
            <CalendarDays className="h-4 w-4" strokeWidth={1.6} />
            {confirmed.when}
          </div>
          {confirmed.joinUrl && (
            <a
              href={confirmed.joinUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-offwhite hover:underline"
            >
              <Video className="h-4 w-4" /> Video-Link öffnen
            </a>
          )}
        </div>
      </div>
    );
  }

  // --- Loading / error -----------------------------------------------------
  if (loadError) {
    return (
      <div className={shell}>
        <WidgetHeader />
        <div className="my-auto flex flex-col items-center gap-2 py-10 text-center">
          <AlertCircle className="h-6 w-6 text-lime-500/70" />
          <p className="text-sm text-muted">Verfügbarkeit konnte nicht geladen werden.</p>
          <p className="font-mono text-[11px] text-muted/50">Läuft der Buchungs-Server? (npm run server)</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={shell}>
        <WidgetHeader />
        <div className="my-auto flex items-center justify-center gap-2 py-14 text-muted">
          <Loader2 className="h-5 w-5 animate-spin text-lime-500" />
          <span className="text-sm">Freie Termine werden geladen …</span>
        </div>
      </div>
    );
  }

  const dateLabel = selectedDate ? deLong.format(asLocalDate(selectedDate)) : '';

  // --- Wizard --------------------------------------------------------------
  return (
    <div className={shell}>
      <WidgetHeader mock={data.mock} />
      <StepIndicator step={step} />

      <div className="mt-5 sm:h-[352px] sm:overflow-y-auto sm:pr-0.5">
      {/* STEP 1 — pick a day */}
      {step === 'date' && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted/60">
            An welchem Tag passt es Ihnen?
          </p>
          {data.days.length === 0 ? (
            <p className="mt-3 text-sm text-muted/60">Aktuell keine freien Termine. Bitte später erneut versuchen.</p>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {data.days.slice(0, 12).map((d) => {
                const dt = asLocalDate(d.date);
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => pickDate(d.date)}
                    className="group flex flex-col items-center rounded-xl border border-white/[0.07] bg-ink-900/50 px-2 py-3 transition-all hover:-translate-y-0.5 hover:border-lime-500/40 hover:bg-lime-500/[0.06]"
                  >
                    <span className="font-mono text-[9px] uppercase text-muted/50">{deWeekday.format(dt)}</span>
                    <span className="text-lg font-semibold text-offwhite group-hover:text-lime-500">{dt.getDate()}</span>
                    <span className="font-mono text-[9px] uppercase text-muted/40">{deMonth.format(dt)}</span>
                    <span className="mt-1 font-mono text-[9px] text-lime-500/70">{d.slots.length} frei</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STEP 2 — pick a time */}
      {step === 'time' && activeDay && (
        <div>
          <BackRow onClick={() => setStep('date')} label={dateLabel} />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-muted/60">
            Freie Zeiten wählen
          </p>
          {activeDay.slots.length > 0 ? (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {activeDay.slots.map((s) => (
                <button
                  key={s.start}
                  type="button"
                  onClick={() => pickSlot(s)}
                  className="rounded-lg border border-white/[0.07] bg-ink-900/50 px-2 py-2.5 font-mono text-xs text-muted transition-all hover:-translate-y-0.5 hover:border-lime-500/50 hover:bg-lime-500/[0.08] hover:text-lime-500"
                >
                  {s.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted/60">Keine freien Zeiten an diesem Tag.</p>
          )}
        </div>
      )}

      {/* STEP 3 — collect details */}
      {step === 'details' && slot && (
        <form onSubmit={submit}>
          <BackRow onClick={() => setStep('time')} label={`${dateLabel} · ${slot.label} Uhr`} />

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-lime-500/25 bg-lime-500/[0.06] px-4 py-3">
            <Check className="h-4 w-4 text-lime-500" strokeWidth={2} />
            <span className="text-sm text-offwhite">
              {dateLabel}, <span className="font-medium text-lime-500">{slot.label} Uhr</span> · 20 Min
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name" required value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
              <Field label="E-Mail" type="email" required value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
            </div>
            <Field label="Telefon (optional)" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />

            {submitError && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" /> {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:shadow-glow disabled:opacity-60"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Wird gebucht …</>
              ) : (
                <>Termin verbindlich buchen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
              )}
            </button>
            <p className="text-center font-mono text-[10px] text-muted/40">
              Sie erhalten sofort eine Kalendereinladung. Keine Kosten, jederzeit stornierbar.
            </p>
          </div>
        </form>
      )}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'date', label: 'Datum' },
    { key: 'time', label: 'Zeit' },
    { key: 'details', label: 'Details' },
  ];
  const idx = steps.findIndex((s) => s.key === step);
  return (
    <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest2">
      {steps.map((s, i) => {
        const state = i < idx ? 'done' : i === idx ? 'active' : 'todo';
        return (
          <div key={s.key} className="flex items-center gap-1.5">
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                state === 'active'
                  ? 'bg-lime-500 text-ink-950'
                  : state === 'done'
                    ? 'border border-lime-500/40 text-lime-500'
                    : 'border border-white/10 text-muted/40'
              }`}
            >
              {state === 'done' ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : i + 1}
            </span>
            <span className={state === 'active' ? 'text-offwhite' : 'text-muted/40'}>{s.label}</span>
            {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-muted/25" />}
          </div>
        );
      })}
    </div>
  );
}

function BackRow({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-offwhite"
    >
      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      <span className="capitalize">{label}</span>
      <span className="ml-1 text-muted/40">ändern</span>
    </button>
  );
}

function WidgetHeader({ mock }: { mock?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
      <div className="flex items-center gap-2.5">
        <CalendarDays className="h-5 w-5 text-lime-500" strokeWidth={1.5} />
        <span className="font-mono text-xs uppercase tracking-widest2 text-offwhite">Erstgespräch buchen</span>
      </div>
      {mock ? (
        <span className="font-mono text-[10px] text-amber-400/80">TESTMODUS</span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-lime-500">
          <Check className="h-3 w-3" /> 20 MIN
        </span>
      )}
    </div>
  );
}

function Field({
  label, value, onChange, type = 'text', required, textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    'w-full rounded-lg border border-white/[0.08] bg-ink-900/60 px-3 py-2.5 text-sm text-offwhite placeholder:text-muted/40 outline-none transition-colors focus:border-lime-500/50';
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest2 text-muted/60">{label}</span>
      {textarea ? (
        <textarea rows={2} required={required} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function Benefit({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-offwhite sm:text-[15px]">
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lime-500/25 bg-lime-500/[0.06] text-lime-500">
        {icon}
      </span>
      {text}
    </li>
  );
}
