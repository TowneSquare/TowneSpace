/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'primary-light': '#9C6EEB',
      'primary-default': '#9264F8',
      'primary-dark': '#7446DA',
      'primary-dark-1': '#B882FF',
      'primary-footer': '#2B2240',
      'secondary-cyan': '00eefd',
      white: '#ffffff',
      'gray-light-1': '#cccccc',
      'gray-light-2': '#aaaaaa',
      'gray-light-3': '#666666',
      'gray-dark-1': '#404040',
      'gray-dark-2': '#222222',
      'gray-dark-3': '#121212',
      'gray-dark-4': '#1C1C1C',
      'gray-dark-5': '#D9D9D9',
      black: '#000000',
      'white-10': '#ffffff2f',
    },
    backgroundImage: {
      'gradient-gray-1':
        'linear-gradient(180deg, rgba(18, 18, 18, 0.00) 0%, #151515 80%)',
      'upload-element':
        "url('data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23CCCCCCFF' stroke-width='2' stroke-dasharray='12%2c 14' stroke-dashoffset='21' stroke-linecap='square'/%3e%3c/svg%3e')",
    },
    extend: {},
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
      Permanent: ['Permanent Marker'],
    },
  },
  plugins: [],
};
