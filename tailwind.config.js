/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'sidebar': '7px -1px 12px rgba(0, 0, 0, 0.11);',
      
      },
    },
  },
  plugins: [],
}