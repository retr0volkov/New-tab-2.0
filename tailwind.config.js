/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./scripts/*/*.{html, css}"],
  theme: {
    extend: {
      backgroundImage: {
        'back': "url('./img/dark_background.png')",
        'dark-back': "url('./img/dark_background.png')",
      }},
  },
  plugins: [],
}
