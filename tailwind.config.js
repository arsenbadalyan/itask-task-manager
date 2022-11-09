/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#00ABB3',
        'sec-color': '#3C4048',
        'custom-gray': '#B2B2B2',
        'custom-white': '#EAEAEA',
      },
    },
  },
  plugins: [],
};
