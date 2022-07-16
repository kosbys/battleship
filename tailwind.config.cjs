/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        ITCMachine: ['ITCMachine', 'sans-serif'],
      },
    },
    gridTemplateRows: {
      10: 'repeat(10, minmax(0, 1fr))',
    },
  },
  plugins: [],
};
