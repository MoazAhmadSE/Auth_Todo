/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        myDark: "#101820",
        myYellow: "#FEE715",
      }
    },
  },
  plugins: [],
}

