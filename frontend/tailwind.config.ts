import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006937',
          dark: '#064D5F',
          light: '#A4EAB5',
          soft: '#CDDF7D'
        },
        secondary: {
          sky: '#CAEAF2'
        },
        slate: {
          950: '#0f172a'
        }
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        h1: ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        label: ['0.9375rem', { lineHeight: '1.5', fontWeight: '600' }],
        small: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        xsmall: ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }]
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 35px -15px rgba(15, 23, 42, 0.45)',
        card: '0 20px 45px -20px rgba(37, 99, 235, 0.25)'
      }
    }
  },
  plugins: []
}

export default config

