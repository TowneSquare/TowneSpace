/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'black': '000000',
      'white': 'ffffff',
      'gray-light-1': '#d9d9d9',
      'gray-light-2': '#C2C2C2',
      'gray-light-3': '#656565',
      'gray-light-4': '#909090',
      'gray-dark-1': '#404040',
      'gray-dark-2': '#222222',
      'gray-dark-3': '#121212',
    },
    extend: {},
    fontFamily: {
      Inter: ['Inter', 'sans-serif']
    },
  },
  plugins: [],
}
