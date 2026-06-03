/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'emerald-deep': '#0F5C4D',
        emerald: '#1FA67A',
        mint: '#4FD89B',
        'lime-accent': '#7FE3A8',
        'lime-bright': '#9BF5BE',
        cream: '#F4F1EA',
        'near-black': '#0A1512',
        ink: '#08120F',
      },
      fontFamily: {
        // Body
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        // Display / headings
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        // Logo wordmark + tagline (matches the brand lockup)
        logo: ['Poppins', 'system-ui', 'sans-serif'],
        // Editorial italic accent words inside headlines
        accent: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
