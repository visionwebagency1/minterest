const preset = require('@minterest/websites-shared/tailwind-preset')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
}
