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
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* For Webkit Browsers (Chrome, Safari) */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* For Firefox and others */
          '-ms-overflow-style': 'none',     // IE and Edge
          'scrollbar-width': 'none',        // Firefox
        },
      });
    },
  ],
}

