/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070A',
          900: '#0B0F14',
          850: '#0F141B',
          800: '#141B24',
          700: '#1C2530',
        },
        lime: {
          DEFAULT: '#B4FF39',
          400: '#C9FF6B',
          500: '#B4FF39',
          600: '#8FD11A',
        },
        violetx: {
          500: '#7C5CFF',
          400: '#9B85FF',
        },
        ice: {
          400: '#8FD4FF',
          500: '#00C2FF',
        },
        offwhite: '#F3F5F7',
        muted: '#9AA3AE',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tight: '-0.02em',
        wide2: '0.08em',
        widest2: '0.22em',
      },
      lineHeight: {
        tight: '1.05',
        relaxed2: '1.6',
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(180,255,57,0.35)',
        'glow-sm': '0 0 40px -12px rgba(180,255,57,0.30)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -24px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'aurora-slow': 'aurora 24s ease-in-out infinite',
        'aurora-slow-2': 'aurora2 30s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 5s ease-in-out infinite',
        dash: 'dash 3s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(0,-6%,0) scale(1.12)', opacity: '0.75' },
        },
        aurora2: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.05)', opacity: '0.45' },
          '50%': { transform: 'translate3d(4%,4%,0) scale(0.95)', opacity: '0.6' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
        dash: {
          to: { 'stroke-dashoffset': '-200' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
