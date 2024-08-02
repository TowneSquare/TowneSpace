/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    placeholder: {
      'font-semibold': 'font-semibold',
      'font-bold': 'font-bold',
      'font-regular': 'font-regular',
    },
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
    },
    extend: {
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        100: '25rem',
        replace: '29.375rem',
        '3_4_scr': '75vh',
        dialog: '32rem',
      },
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
      width: {
        'button-1': '150px',
      },
    },
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
      Permanent: ['Permanent Marker'],
      outfit: ['Outfit', 'sans-serif'],
    },
  },
  plugins: [],
};
