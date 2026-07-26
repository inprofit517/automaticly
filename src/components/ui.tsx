import { type ReactNode, type HTMLAttributes } from 'react';
import { useReveal } from '../lib/hooks';

/** Reveal wrapper: fades + slides children up on scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Monospace eyebrow label with accent color and leading bullet. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest2 text-lime-500">
      <span className="h-1.5 w-1.5 rounded-full bg-lime-500 shadow-[0_0_12px_2px_rgba(180,255,57,0.6)]" />
      {children}
    </span>
  );
}

/** Primary conversion CTA — accent pill with dark text. Recognizable across the site. */
export function CtaButton({
  children,
  href = '#booking',
  className = '',
  size = 'md',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm sm:text-[15px]',
    lg: 'px-6 py-3.5 text-base',
  };
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full bg-lime-500 font-semibold text-ink-950 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${sizes[size]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 rounded-full bg-lime-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
    </a>
  );
}

/** Ghost/secondary button — bordered, transparent, lightens on hover. */
export function GhostButton({
  children,
  href = '#loesungen',
  className = '',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-5 py-2.5 text-sm sm:text-[15px] font-medium text-offwhite transition-all duration-300 hover:border-lime-500/40 hover:bg-white/[0.05] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${className}`}
    >
      {children}
    </a>
  );
}

/** Subtle bordered surface card with hover glow + accent border shift. */
export function Surface({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.08] bg-ink-850/60 backdrop-blur-sm transition-all duration-300 ${
        hover
          ? 'hover:border-lime-500/25 hover:bg-ink-800/70 hover:-translate-y-1 hover:shadow-card'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
