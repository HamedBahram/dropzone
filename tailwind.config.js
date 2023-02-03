const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    },
    extend: {
      fontFamily: {
        sans: [`var(--font-montserrat)`, 'sans-serif'],
        serif: ['var(--font-display)', 'serif']
      },
      colors: {
        primary: colors.blue,
        secondary: colors.rose,
        neutral: colors.stone,
        alert: colors.amber,
        danger: colors.red
      }
    }
  },
  plugins: []
}
