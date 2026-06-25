import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

// Tailwind configuration for Place to Stand Agency — Dark Blueprint Theme
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
        },
        text: {
          DEFAULT: '#e8e6e3',
          muted: '#8a8a8d',
        },
        accent: {
          DEFAULT: '#b5f542',
          muted: 'rgba(181, 245, 66, 0.15)',
        },
        border: {
          DEFAULT: '#2a2b30',
          light: '#3a3b40',
        },
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
