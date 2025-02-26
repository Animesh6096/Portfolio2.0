/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#633AF0',
        'dark-bg': '#0a0a1a',
        'deep-black': '#030014',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#d1d5db',
            h1: {
              color: '#e9d5ff',
            },
            h2: {
              color: '#e9d5ff',
            },
            h3: {
              color: '#e9d5ff',
            },
            strong: {
              color: '#e9d5ff',
            },
            a: {
              color: '#a855f7',
              '&:hover': {
                color: '#9333ea',
              },
            },
            code: {
              color: '#e9d5ff',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};