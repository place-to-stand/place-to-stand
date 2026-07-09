import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

// Tailwind configuration for Place to Stand Agency — Dark Blueprint Theme
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Blueprint grid spacing — multiples of the 24px base grid (--grid).
      // Use these for structural spacing so elements stay on-grid.
      spacing: {
        'grid-half': 'calc(var(--grid) / 2)', // 12
        'grid-1': 'var(--grid)', // 24
        'grid-2': 'calc(var(--grid) * 2)', // 48
        'grid-3': 'calc(var(--grid) * 3)', // 72
        'grid-4': 'calc(var(--grid) * 4)', // 96
        'grid-5': 'calc(var(--grid) * 5)', // 120
        'grid-6': 'calc(var(--grid) * 6)', // 144
        'grid-8': 'calc(var(--grid) * 8)', // 192
      },
      maxWidth: {
        content: 'calc(var(--grid) * 48)', // 1152 — the one grid-aligned container width
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, #2a2b30 1px, transparent 1px)',
        'grid-lines':
          'linear-gradient(to right, #1a1b1f 1px, transparent 1px), linear-gradient(to bottom, #1a1b1f 1px, transparent 1px)',
      },
      colors: {
        bg: {
          DEFAULT: '#0e0f11',
          card: '#1a1b1f',
          elevated: '#242529',
          // Translucent panel over the dot grid — mutes the dots for readability
          // while keeping some background darkness and faint texture.
          panel: 'rgba(22, 24, 28, 0.88)',
        },
        text: {
          DEFAULT: '#e8e6e3',
          muted: '#a8a8ac',
        },
        accent: {
          DEFAULT: '#b5f542',
          muted: 'rgba(181, 245, 66, 0.15)',
          secondary: '#b4b4b4',
        },
        border: {
          DEFAULT: '#2a2b30',
          light: '#3a3b40',
        },
        // Mid-grey for schematic line-work — readable on card backgrounds,
        // where border-light is too dark to see.
        line: '#6e7078',
        // Keep old tokens as aliases for backward compatibility during migration
        ink: {
          DEFAULT: '#0e0f11',
          light: '#e8e6e3',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)'],
        logo: ['var(--font-space-grotesk)'],
        sans: ['var(--font-source-sans)'],
        headline: ['var(--font-space-grotesk)'],
      },
      lineHeight: {
        tighter: '1.2',
        tightest: '1.1',
      },
      transitionDuration: {
        '2500': '2500ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 4.0s ease forwards',
        'fade-down': 'fade-down 4.0s ease forwards',
        'scan-line': 'scan-line 8s linear infinite',
      },
    },
  },
  plugins: [animate],
}

export default config
