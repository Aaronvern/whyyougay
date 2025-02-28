/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff5f0',
          100: '#ffe6db',
          200: '#ffd1b8',
          300: '#ffb38a',
          400: '#ff8c5a',
          500: '#ff6a33',
          600: '#ff4d0d',
          700: '#e53d00',
          800: '#c63300',
          900: '#a32b00',
        },
      },
      animation: {
        bounce: 'bounce 2s infinite',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};