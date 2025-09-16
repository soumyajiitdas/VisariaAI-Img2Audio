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
      colors: {
        gold: {
          400: '#facc15',
          500: '#f59e0b',
          700: '#b45309',
        },
        // Custom colors using CSS variables for theming
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        card: 'var(--color-card)',
        'card-border': 'var(--color-card-border)',
        input: 'var(--color-input)',
        'input-border': 'var(--color-input-border)',
        button: 'var(--color-button)',
        'button-text': 'var(--color-button-text)',
        'button-hover': 'var(--color-button-hover)',
      }
    }
  },
  plugins: [],
};


