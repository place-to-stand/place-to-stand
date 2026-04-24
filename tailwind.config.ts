import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

// Tailwind configuration for Place to Stand Agency
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#A3A6C7',
        ink: {
          DEFAULT: '#111827',
          light: '#F9FAFB',
        },
        slate: '#1e293b',
        cyan: '#94e0e4',
        lavender: '#c4cae0',
        indigo: '#3d3a7a',
        gray: {
          muted: '#7E7B7B',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)'],
        logo: ['var(--font-afacad)'],
        sans: ['var(--font-work-sans)'],
        headline: ['var(--font-ovo)'],
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
        'wave-flow': {
          '0%': {
            transform: 'translateX(-10%)',
          },
          '100%': {
            transform: 'translateX(110%)',
          },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 4.0s ease forwards',
        'fade-down': 'fade-down 4.0s ease forwards',
        'wave-flow': 'wave-flow 30s linear infinite',
      },
    },
  },
  plugins: [animate],
}

export default config
