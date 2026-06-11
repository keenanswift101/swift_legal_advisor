/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060e1f',
          900: '#0a1628',
          800: '#0f2042',
          700: '#152a5a',
          600: '#1e3a6e',
          500: '#2a4f8e',
        },
        gold: {
          600: '#a07810',
          500: '#c9a227',
          400: '#d4af37',
          300: '#e0c060',
          200: '#f0d88a',
          100: '#faf0c8',
        },
        legal: {
          bg: '#0a1628',
          surface: '#0f2042',
          border: '#1e3a6e',
          text: '#e8edf5',
          muted: '#8fa3c8',
        },
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
