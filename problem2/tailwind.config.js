/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {

    extend: {
      colors: {
        dark: '#2F2F2F'
      },
      padding: {
        'custom-calc': 'calc(100vw - 100%)',
      },
    },
  },
  plugins: [],
}