/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'baskerville': ['Baskerville', 'serif'],
      },
      colors: {
        'frali-gold': '#D4AF37',
        'frali-dark': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
