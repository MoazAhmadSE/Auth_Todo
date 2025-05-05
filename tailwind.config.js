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
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.input-style': {
          width: '100%',
          color: '#e2e8f0',
          backgroundColor: 'transparent',
          borderWidth: '2px',
          // borderColor: '#475569',
          padding: '0.5rem',
          borderRadius: '0.75rem',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          outline: 'none',
        },
      });
    },

  ],
}

