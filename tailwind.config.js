/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins","Inter"],
      },
      fontSize: {
        xxs: "0.5rem",
        sm1:'0.813rem'
      },
      boxShadow:{
        myShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      }
    },
  },
  plugins: [],
}

