/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alice-blue': '#D8E9F7',
        'dark-moss-green': '#5C6131',
        'flame': '#DE541E',
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