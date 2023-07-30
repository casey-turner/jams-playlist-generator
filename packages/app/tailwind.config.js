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
      },
      fontFamily: {
        'this': ['this', 'sans-serif']
      },
    },
  },
  plugins: [
   require("@tailwindcss/forms")
 ],
}