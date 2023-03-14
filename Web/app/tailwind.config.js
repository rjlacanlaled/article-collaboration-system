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
        '900': '900px',
        '800': '800px',
       },
      height: {
        '700': '700px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
