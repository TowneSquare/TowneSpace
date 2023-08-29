/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary-light': '#b882ff',
      'primary-default': '#9264f8',
      'primary-dark': '#6646ae',
      'secondary-cyan': '00eefd',
      'white': '#ffffff',
      'gray-light-1': '#cccccc',
      'gray-light-2': '#aaaaaa',
      'gray-light-3': '#666666',
      'gray-dark-1': '#404040',
      'gray-dark-2': '#222222',
      'gray-dark-3': '#121212',
      'black': '#000000',
      'white-10': '#ffffff2f'
    },
    extend: {},
    fontFamily: {
      Inter: ['Inter', 'sans-serif']
    },
  },
  plugins: [],
}
