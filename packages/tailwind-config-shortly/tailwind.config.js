const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/**/*.{js,ts,jsx,tsx}`, '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f4e8ff',
          200: '#ebd5ff',
          300: '#dbb4fe',
          400: '#c384fc',
          500: '#aa55f7',
          600: '#9333ea',
          700: '#7c22ce',
          800: '#6821a8',
          900: '#541c87',
          950: '#380764',
        },
        secondary: colors.fuchsia,
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
