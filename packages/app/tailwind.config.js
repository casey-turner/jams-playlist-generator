/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        '2xl': '1280px',
      }
    },
    extend: {
      colors: {
        'alice-blue': '#D8E9F7',
        'dark-moss-green': '#5C6131',
        'flame': '#DE541E',
        'oxford-blue': '#0A1F38',
        'peach': '#F1D3C7',
        'platinum': '#E8E7E2',

        'ghost-white': '#F8F8FF',
        'cadet-gray': '#88A5AB',
        'light-blue': '#b8dbd9',
        'paynes-gray': '#586f7c',
        'gunmetal': '#2c383e',
        'dark-spring-green': '#04724D',
        'yale-blue': '#043A6B',
        'pear': '#c2e812',
        'battleship-gray': '#82816D',
        'mindaro': '#D8EC82',
        'anti-flash-white': '#eef0f2',



      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}