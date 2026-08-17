/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#080909',
          900: '#0B0D0D',
          850: '#101313',
          800: '#151919',
          700: '#1E2424',
          600: '#2A3232',
        },
        brand: {
          accent: '#10B981',
          accentGlow: '#00FF94',
          mint: '#05D474',
          darkAccent: 'rgba(16, 185, 129, 0.15)',
        },
        surface: {
          card: 'rgba(255, 255, 255, 0.025)',
          cardHover: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.2)',
          glass: 'rgba(11, 13, 13, 0.75)',
        },
        offwhite: {
          DEFAULT: '#F3F5F5',
          muted: '#8E9898',
          subtle: '#626C6C',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        tightest: '0.95',
        tighter: '1.02',
      },
      boxShadow: {
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
        'glow-emerald-lg': '0 0 60px -10px rgba(16, 185, 129, 0.4)',
        'glass-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
