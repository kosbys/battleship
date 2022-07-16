/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        ITCMachine: ['ITCMachine', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
