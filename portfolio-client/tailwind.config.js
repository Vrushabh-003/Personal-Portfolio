/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#f8f9fa',
        'dark-bg': '#121212',
        'light-text': '#212529',
        'dark-text': '#e9ecef',
        'primary': '#007bff',
        'secondary': '#6c757d',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}