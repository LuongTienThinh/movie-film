/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '10vw': '10vw',
        '20vw': '20vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '80vw': '80vw',
      },
      minWidth: (theme) => theme('width'),
      maxWidth: (theme) => theme('width'),

      height: {
        'fvh': 'calc(100vh - 214px - 60px)',
        '10vh': '10vh',
        '20vh': '20vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '80vh': '80vh',
      },
      minHeight: (theme) => theme('height'),
      maxHeight: (theme) => theme('height'),

      backgroundColor: {
        'red-light': '#EB4034',
        'red': '#FE2828',
        'blue-light': '#3B5998',
        'blue': '#0029FF',
        'green': '#04C700',
      },
      colors: {
        'blue': '#0029FF',
      },
      boxShadow: {
        'sd-1': '0 4px 4px 0 rgb(0, 0, 0, .25)',
        'inner-1': 'inset 0 0 2px gray',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
        '2/5': '40%',
        '3/10': '30%',
        '7/10': '70%',
        '9/10': '90%',
        'p1': '5px',
        'p2': '10px',
        'p3': '15px',
        'p4': '20px',
        'p5': '25px',
        'p6': '30px',
        'p7': '35px',
        'p8': '40px',
        'p9': '45px',
        'p10': '50px',
        'p12': '60px',
        'p14': '70px',
        'p16': '80px',
        'p18': '90px',
        'p20': '100px',
      },
      margin: (theme) => theme('spacing'),
      padding: (theme) => theme('spacing'),
      borderRadius: (theme) => theme('spacing'),
      gap: (theme) => theme('spacing'),
      lineHeight: (theme) => theme('spacing'),

      strokeWidth: {
        '0.75': '0.75',
        '1.25': '1.25',
        '1.5': '1.5',
        '2.5': '2.5',
      },
      transformOrigin: {
        'left-center': 'left center'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.translate-x-y-center': {
          'transform': 'translate(-50%, -50%)',
        },
      })
    })
  ],
}

