/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',         // for App Router
    './pages/**/*.{js,ts,jsx,tsx}',       // for Page Router
    './components/**/*.{js,ts,jsx,tsx}',  // reusable components
    './src/**/*.{js,ts,jsx,tsx}',         // entire src folder if applicable
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
      },
      colors: {
        gold: {
          400: '#facc15',
          500: '#f59e0b',
          700: '#b45309',
        }
      }
    }
  },
  plugins: [],
};


