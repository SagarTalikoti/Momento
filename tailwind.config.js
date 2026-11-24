/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf5fc',
          100: '#f6ecf9',
          200: '#edd9f4',
          300: '#dfb9ec',
          400: '#cb8ee0',
          500: '#8E2C8F',
          600: '#7c2d8c',
          700: '#661e73',
          800: '#541c5c',
          900: '#42144a',
          950: '#2b0a31',
        },
        festive: {
          red: '#a51f2c',
          crimson: '#cc4637',
          gold: '#fff1cd',
          cream: '#fff8e9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
