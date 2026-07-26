import { type LucideIcon } from 'lucide-react';
import { MessageSquare, CalendarClock, PhoneCall, Check, Globe, UserCheck, Bell, Repeat, Mic, AlertCircle, FileText } from 'lucide-react';
import { Eyebrow, Reveal, CtaButton } from './ui';
import { ChatbotMock, BookingMock, VoiceMock } from './mockups';

type Feature = { icon: LucideIcon; text: string };

type Block = {
  id: string;
  tag: string;
  icon: LucideIcon;
  title: string;
  body: string;
  features: Feature[];
  mock: React.ReactNode;
  reverse?: boolean;
};

const BLOCKS: Block[] = [
  {
    id: 'chatbots',
    tag: 'BLOCK 01 — CHATBOTS',
    icon: MessageSquare,
    title: 'KI-Chatbots, die wie Ihr bestes Teammitglied antworten',
    body: 'Unsere Chatbots beantworten Kundenanfragen auf Ihrer Website immer sofort, präzise und markengerecht. Dabei kennen sie Ihre spezifischen Angebote, Preise sowie FAQs.',
    features: [
      { icon: Check, text: 'Rund um die Uhr im Einsatz' },
      { icon: Globe, text: 'Mehrsprachig (DE/FR/IT/EN)' },
      { icon: UserCheck, text: 'Nahtlose Übergabe an echte Mitarbeitende bei Bedarf' },
    ],
    mock: <ChatbotMock />,
  },
  {
    id: 'buchung',
    tag: 'BLOCK 02 — BUCHUNG',
    icon: CalendarClock,
    title: 'Terminbuchung, die von alleine läuft',
    body: 'Kunden buchen, verschieben oder stornieren Termine direkt über Chat, Telefon sowie Website. Ihr Kalender synchronisiert sich vollautomatisch, ohne Doppelbuchungen oder Telefonschlaufen.',
    features: [
      { icon: Bell, text: 'Automatische Erinnerungen per SMS/E-Mail' },
      { icon: Repeat, text: 'Sync mit Google/Outlook Kalender' },
      { icon: Check, text: 'Reduziert No-Shows spürbar' },
    ],
    mock: <BookingMock />,
    reverse: true,
  },
  {
    id: 'voice',
    tag: 'BLOCK 03 — VOICE',
    icon: PhoneCall,
    title: 'Ihr Telefon wird nie wieder unbesetzt sein',
    body: 'Unsere KI-Voice-Agents nehmen Anrufe entgegen, beantworten Fragen und vereinbaren Termine mit einer völlig natürlichen Stimme, sogar ausserhalb der regulären Geschäftszeiten.',
    features: [
      { icon: Mic, text: 'Natürliche Gesprächsführung' },
      { icon: AlertCircle, text: 'Erkennt Dringlichkeit und leitet weiter' },
      { icon: FileText, text: 'Vollständige Anrufprotokolle & Transkripte' },
    ],
    mock: <VoiceMock />,
  },
];

export function Solutions() {
  return (
    <section id="loesungen" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <Eyebrow>UNSERE LÖSUNGEN</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-5xl">
            Drei KI-Bausteine. Ein automatisiertes Kundenerlebnis.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {BLOCKS.map((b) => (
            <SolutionBlock key={b.id} block={b} />
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <CtaButton size="lg">
            Kostenloses Erstgespräch buchen
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

function SolutionBlock({ block }: { block: Block }) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${block.reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-lime-500/30 bg-lime-500/[0.06] text-lime-500">
            <block.icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-muted/70">{block.tag}</span>
        </div>
        <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight tracking-tight text-offwhite sm:text-3xl">
          {block.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed2 text-muted">{block.body}</p>
        <ul className="mt-6 space-y-3">
          {block.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3 text-sm text-offwhite sm:text-[15px]">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime-500/25 bg-lime-500/[0.06] text-lime-500">
                <f.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              {f.text}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-br from-lime-500/[0.07] via-transparent to-violetx-500/[0.07] blur-2xl" aria-hidden="true" />
          <div className="relative rounded-2xl border border-white/[0.08] bg-ink-850/70 p-4 shadow-card backdrop-blur-sm sm:p-5">
            {block.mock}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
