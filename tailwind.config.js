/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary-light': '#9C6EEB',
      'primary-default': '#9264F8',
      'primary-dark': '#7446DA',
      'primary-dark-1': '#B882FF',
      'primary-footer': '#2B2240',
      'secondary-cyan': '00eefd',
      'white': '#ffffff',
      'gray-light-1': '#cccccc',
      'gray-light-2': '#aaaaaa',
      'gray-light-3': '#666666',
      'gray-dark-1': '#404040',
      'gray-dark-2': '#222222',
      'gray-dark-3': '#121212',
      'gray-dark-4': '#1C1C1C',
      'black': '#000000',
      'white-10': '#ffffff2f'
    },
    extend: {},
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
      Permanent: ['Permanent Marker'],
    },
  },
  plugins: [],
}
