import { type CSSProperties } from 'react';

/**
 * Decorative neural-net / network graphic used as background texture.
 * Pure SVG with subtle animated dashes + pulsing nodes. No clipart.
 */
export function NetworkGraphic({
  className = '',
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  const nodes: { cx: number; cy: number; r: number; delay: number }[] = [
    { cx: 80, cy: 120, r: 2.5, delay: 0 },
    { cx: 220, cy: 60, r: 2, delay: 0.8 },
    { cx: 360, cy: 180, r: 3, delay: 1.4 },
    { cx: 180, cy: 240, r: 2, delay: 2 },
    { cx: 440, cy: 90, r: 2.5, delay: 0.4 },
    { cx: 560, cy: 200, r: 2, delay: 1.1 },
    { cx: 640, cy: 60, r: 3, delay: 1.8 },
    { cx: 700, cy: 260, r: 2, delay: 0.6 },
    { cx: 300, cy: 330, r: 2.5, delay: 2.4 },
    { cx: 520, cy: 330, r: 2, delay: 1.2 },
  ];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [2, 4], [4, 5], [5, 6], [1, 4], [3, 2],
    [2, 8], [5, 8], [6, 7], [4, 6], [8, 9], [5, 9], [7, 9],
  ];

  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 800 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B4FF39" stopOpacity="0" />
          <stop offset="50%" stopColor="#B4FF39" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="net-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B4FF39" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B4FF39" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        return (
          <line
            key={i}
            x1={na.cx}
            y1={na.cy}
            x2={nb.cx}
            y2={nb.cy}
            stroke="url(#net-line)"
            strokeWidth="1"
            strokeDasharray="4 8"
            style={{
              ['--dash-delay' as string]: `${i * 0.15}s`,
              animation: `dash 4s linear infinite ${i * 0.15}s`,
            } as CSSProperties}
          />
        );
      })}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r * 3} fill="url(#net-node)" style={{ animation: `pulseSoft 5s ease-in-out infinite ${n.delay}s` }} />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill="#B4FF39" style={{ animation: `pulseSoft 4s ease-in-out infinite ${n.delay}s` }} />
        </g>
      ))}
    </svg>
  );
}

/** Aurora glow blobs used behind hero / CTA. */
export function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-lime-500/15 blur-[120px] animate-aurora-slow" />
      <div className="absolute right-[5%] top-[20%] h-[360px] w-[360px] rounded-full bg-violetx-500/12 blur-[110px] animate-aurora-slow-2" />
      <div className="absolute left-[2%] bottom-[5%] h-[320px] w-[320px] rounded-full bg-ice-500/8 blur-[120px] animate-float" />
    </div>
  );
}
