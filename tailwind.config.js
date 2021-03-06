/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008e58',
      },
      fontFamily: {
        main: ['Noto Sans Tamil', 'Jalnan', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
