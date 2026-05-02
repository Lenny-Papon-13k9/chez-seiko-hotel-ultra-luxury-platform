/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
};
