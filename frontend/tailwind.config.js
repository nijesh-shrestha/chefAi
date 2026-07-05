/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flour: '#F7F3EC',
        char: '#221D1A',
        saffron: {
          DEFAULT: '#E3A62F',
          dark: '#C68A1F',
        },
        basil: {
          DEFAULT: '#3F6C51',
          dark: '#2E5240',
        },
        clay: {
          DEFAULT: '#8B4A3B',
          dark: '#6E3A2E',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '1rem',
      },
    },
  },
  plugins: [],
}
