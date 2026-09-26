/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,css,js}",
    "./*/*.{html,css,js}",
    "./*/*/*.{html,css,js}",
  ],
  darkmode: 'class',
  theme: {
    extend: {
        
    },
  },
  plugins: [],
}
