/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      // 'sans': ['Open Sans', 'Helvetica', 'Arial', 'sans-serif'],
      'sans': ["ColfaxAI", "-apple-system", "BlinkMacSystemFont", "Helvetica", "sans-serif"],
    },
    extend: {
      width: {
        '1500': '1500px',
        '1200': '1200px',
        '1000': '1000px',
        '900': '900px',
        '800': '800px',
        '700': '700px',
        '600': '600px',
        '500': '500px',
       },
      height: {
        '700': '700px',
        '650': '650px',
        '600': '600px',
        '550': '550px',
        '500': '500px',
        '400': '400px',
      },
      maxWidth: {
        '195': '195px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
