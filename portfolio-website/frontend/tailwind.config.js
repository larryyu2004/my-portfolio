/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        extendHeight: {
          '0%': { maxHeight: '0' },
          '100%': { maxHeight: '500px' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'extendHeight': 'extendHeight 0.2s ease-in-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-in-out forwards'
      }
    }
  },
  plugins: [],
}
