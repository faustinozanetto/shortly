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
        background: colors.zinc,
        primary: colors.purple,
        secondary: colors.fuchsia,
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        rotate: {
          '0%, 100%': {
            transform: 'translateX(-80px) translateY(40px) rotate(25deg)',
          },
          '50%': {
            transform: 'translateX(0) translateY(0) rotate(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'hero-background': 'rotate 10s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
