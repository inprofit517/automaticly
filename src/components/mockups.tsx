import { MessageSquare, CalendarClock, PhoneCall, Send, Check, Mic } from 'lucide-react';

/** Shared chrome wrapper for product mockups. */
function MockFrame({
  label,
  status,
  children,
}: {
  label: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900/80">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-muted/70">{label}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-lime-500">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-lime-500" />
          {status}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/** Chatbot: simulated conversation in WhatsApp/website style. */
export function ChatbotMock() {
  return (
    <MockFrame label="automaticly/chatbot" status="aktiv">
      <div className="space-y-3">
        <Bubble side="in" time="14:02">
          Hallo, haben Sie am Freitag noch einen freien Termin für eine Reinigung?
        </Bubble>
        <Bubble side="out" time="14:02" accent>
          Ja, am Freitag um 14:30 oder 16:00 ist Platz. Soll ich einen Termin für Sie buchen?
        </Bubble>
        <Bubble side="in" time="14:03">
          14:30 passt perfekt, danke!
        </Bubble>
        <Bubble side="out" time="14:03" accent>
          Erledigt. Termin am Freitag, 14:30. Sie bekommen eine SMS-Erinnerung 24h vorher.
        </Bubble>
        <div className="flex items-center gap-2 pt-1">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-ink-800 px-3 py-2">
            <MessageSquare className="h-3.5 w-3.5 text-muted/60" />
            <span className="text-xs text-muted/50">Nachricht schreiben …</span>
          </div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-ink-950">
            <Send className="h-4 w-4" />
          </span>
        </div>
      </div>
    </MockFrame>
  );
}

function Bubble({
  side, time, accent, children,
}: { side: 'in' | 'out'; time: string; accent?: boolean; children: React.ReactNode }) {
  const out = side === 'out';
  return (
    <div className={`flex ${out ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed2 sm:text-[13px] ${
          accent
            ? 'bg-lime-500/[0.12] text-offwhite border border-lime-500/20'
            : out
              ? 'bg-ink-800 text-offwhite border border-white/[0.06]'
              : 'bg-ink-850 text-muted border border-white/[0.05]'
        }`}
      >
        {children}
        <span className={`mt-1 block font-mono text-[9px] ${accent ? 'text-lime-500/70' : 'text-muted/40'}`}>{time}</span>
      </div>
    </div>
  );
}

/** Booking: calendar grid with a selected slot + confirmation. */
export function BookingMock() {
  const slots = ['09:00', '10:30', '13:00', '14:30', '16:00'];
  return (
    <MockFrame label="automaticly/buchung" status="synchronisiert">
      <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-850 p-3">
        <CalendarClock className="h-5 w-5 text-lime-500" strokeWidth={1.5} />
        <div className="flex-1">
          <p className="text-xs font-medium text-offwhite">Freitag, 25. Juli</p>
          <p className="font-mono text-[10px] text-muted/60">Google Kalender · Frei</p>
        </div>
        <span className="font-mono text-[10px] text-lime-500">5 Slots</span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {slots.map((s, i) => (
          <button
            key={s}
            className={`rounded-lg border px-2 py-2.5 text-center font-mono text-[11px] transition-all ${
              i === 3
                ? 'border-lime-500 bg-lime-500/15 text-lime-500 shadow-glow-sm'
                : 'border-white/[0.07] bg-ink-850 text-muted hover:border-white/15'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-lime-500/20 bg-lime-500/[0.06] p-3">
        <Check className="h-4 w-4 text-lime-500" strokeWidth={2} />
        <span className="text-xs text-offwhite">Termin bestätigt — Erinnerung per SMS eingeplant</span>
      </div>
    </MockFrame>
  );
}

/** Voice: call transcript + waveform. */
export function VoiceMock() {
  return (
    <MockFrame label="automaticly/voice-agent" status="im Anruf">
      <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-850 p-3">
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime-500/15">
          <PhoneCall className="h-4 w-4 text-lime-500" strokeWidth={1.5} />
          <span className="absolute inset-0 animate-pulse-soft rounded-full border border-lime-500/40" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-medium text-offwhite">+41 79 *** **42</p>
          <p className="font-mono text-[10px] text-muted/60">Dauer 00:47 · Dringlichkeit: normal</p>
        </div>
        <Waveform />
      </div>

      <div className="mt-3 space-y-2">
        <Line who="Anrufer" text="«Ich hätte gerne einen Termin für nächste Woche.»" />
        <Line who="Voice Agent" text="«Gerne. Ich habe Montag 10:00 oder Dienstag 14:00 frei. Was passt Ihnen besser?»" accent />
        <Line who="Anrufer" text="«Montag 10:00, bitte.»" />
        <Line who="Voice Agent" text="«Erledigt. Sie erhalten gleich eine Bestätigung per SMS.»" accent />
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-ink-850 p-2.5">
        <Mic className="h-3.5 w-3.5 text-lime-500/70" />
        <span className="font-mono text-[10px] text-muted/60">Transkript wird gespeichert …</span>
      </div>
    </MockFrame>
  );
}

function Line({ who, text, accent }: { who: string; text: string; accent?: boolean }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className={`w-20 shrink-0 font-mono text-[10px] ${accent ? 'text-lime-500/80' : 'text-muted/50'}`}>{who}</span>
      <span className={accent ? 'text-offwhite' : 'text-muted'}>{text}</span>
    </div>
  );
}

function Waveform() {
  const bars = [6, 12, 9, 16, 11, 7, 13, 5, 10];
  return (
    <div className="flex items-end gap-0.5">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-0.5 rounded-full bg-lime-500/70"
          style={{ height: `${h}px`, animation: `pulseSoft 1.2s ease-in-out infinite ${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
