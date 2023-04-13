/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'green-blinking': 'green-blinking 1s ease-in-out infinite',
        fadeIn: 'fade-in 1s ease-in-out',
      },
      colors: {
        avaOrange: '#f39000',
        'avaOrange-light': '#f39000',
        avaGreen: '#b7c000',
        avaPink: '#e6007e',
      },
      keyframes: {
        'green-blinking': {
          // make background green for a short amount of time
          '0%, 100%': { backgroundColor: '#b7c000' },
          // make background transparent for a short amount of time
          '50%': { backgroundColor: 'transparent' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
