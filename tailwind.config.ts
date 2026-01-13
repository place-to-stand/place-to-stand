import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

// Tailwind configuration for Place to Stand
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        gradientPrimary:
          // 'linear-gradient(135deg, #444aaa 0%, #d7a5d9 23%, #c4cae0 76%, #94e0e4 100%)',
          'linear-gradient(35deg, #6a9ea1ff 0%, #5b6483ff 23%, #704571ff 78%, #3a3e79ff 100%)',
        gradientPrimaryRadial:
          'radial-gradient(circle, #6a9ea1ff 0%, #5b6483ff 33%, #704571ff 66%, #3a3e79ff 100%)',
        gradientSite:
          'linear-gradient(45deg, #444aaa 0%, #d7a5d9 27%, #c4cae0 52%, #94e0e4 100%)',
      },
      colors: {
        accent: '#A3A6C7',
        ink: {
          DEFAULT: '#111827',
          light: '#F9FAFB',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)'],
        logo: ['var(--font-afacad)'],
        sans: ['var(--font-source-sans)'],
        headline: ['var(--font-afacad)'],
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
