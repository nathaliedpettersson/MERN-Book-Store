/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'custom-cobolt': '#013fa5',
        'custom-orange': '#e38648',
        'custom-grey': '#262626',
        'custom-snow': '#fdf7fa'
      }
    },
  },
  plugins: [],
}

