/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        extendHeight: {
          '0%': { maxHeight: '0' },
          '100%': { maxHeight: '500px' }
        },
        HomeExtendHeight: {
          '0%': { maxHeight: '0' },
          '100%': { maxHeight: '100wh' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        phoneDropDown: {
          '0%': { 
            maxHeight: '0',
            opacity: '0'
          },
          '100%': { 
            maxHeight: 'calc(100vh - 60px)',
            opacity: '1'
          }
        }
      },
      animation: {
        'extendHeight': 'extendHeight 0.2s ease-in-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-in-out forwards',
        'HomeExtendHeight': 'HomeExtendHeight 0.7s ease-in-out forwards',
        'phoneDropDown': 'phoneDropDown 0.3s ease-in-out forwards'
      }
    }
  },
  plugins: [],
}
