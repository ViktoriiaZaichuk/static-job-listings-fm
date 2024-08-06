/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#5ba4a4',
        'light-cyan-bg': '#effafa',
        'light-cyan-tablets': '#eef6f6',
        'dark-cyan': '#7b8e8e',
        'dark-cyan-bg': '#2c3a3a',
      },
      fontFamily: {
        sans: ["League Spartan", 'sans-serif'],
      }
    },
  },
  plugins: [],
}

