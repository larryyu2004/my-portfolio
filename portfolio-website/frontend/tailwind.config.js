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

        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
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
        },

        phoneDropUp: {
          '0%': { 
            maxHeight: 'calc(100vh - 60px)',
            opacity: '1'
          },
          '100%': { 
            maxHeight: '0',
            opacity: '0'
          }
        },

        staggerFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },

        colors: {
          'sd-easy': 'blue',
          'sd-medium': 'yellow',
          'sd-hard': 'red',
        },

        transitionTimingFunction: {
          'cubic-bezier(.6,1.37,.81,.97)': 'cubic-bezier(.6,1.37,.81,.97)',
        }
      },
      animation: {
        'extendHeight': 'extendHeight 0.2s ease-in-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-in-out forwards',
        'fadeOut': 'fadeOut 0.3s ease-in-out forwards',
        'HomeExtendHeight': 'HomeExtendHeight 0.7s ease-in-out forwards',
        'phoneDropDown': 'phoneDropDown 0.5s ease-in-out forwards',
        'phoneDropUp': 'phoneDropUp 0.5s ease-in-out forwards',
        'staggerFadeUp': 'staggerFadeUp 0.5s ease-out forwards',
      }
    }
  },
  plugins: [],
}
