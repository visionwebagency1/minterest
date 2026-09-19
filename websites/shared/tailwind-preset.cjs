/**
 * Gedeelde Tailwind-preset voor de websites-apps (renderer en panel).
 *
 * Dezelfde tokennamen als de hoofdsite (tailwind.config.js in de repo-root), zodat
 * een kleurwijziging in brand.json overal doorwerkt en niets apart bijgehouden
 * hoeft te worden. brand.json is de enige bron van waarheid voor de palette.
 */
const brand = require('./brand.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: brand.colors,
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        logo: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': brand.gradient.brand,
      },
    },
  },
  plugins: [],
}
