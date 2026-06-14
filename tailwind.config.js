/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (teal climb): primary teal #008081 -> accent green #90EE90.
        // Token names kept stable so the whole site re-themes from here.
        'emerald-deep': '#013F40', // deep teal (shadow / dark sections base)
        emerald: '#008081', // PRIMARY teal
        mint: '#42C28C', // teal-green bridge (vivid accent)
        'lime-accent': '#90EE90', // ACCENT green
        'lime-bright': '#B6F5B6', // lightest green
        cream: '#F4F4F4', // brand light
        'near-black': '#0A1512', // teal-tinted dark (the "nice" dark)
        ink: '#071311', // deepest teal-black
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
