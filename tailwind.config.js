/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#daefff',
          200: '#bde4ff',
          300: '#90d5ff',
          400: '#5bbdff',
          500: '#339cff',
          600: '#1b7ef5',
          700: '#1466e1',
          800: '#1753b6',
          900: '#19488f',
          950: '#152d5c',
        },
        teal: {
          50: '#effdfa',
          100: '#d7f8f0',
          200: '#b0f0e4',
          300: '#79e2d5',
          400: '#40cabf',
          500: '#24ada8',
          600: '#1c8a8a',
          700: '#1b6e6f',
          800: '#1c5859',
          900: '#1a494a',
          950: '#0c2f31',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 42, 67, 0.04), 0 4px 16px rgba(16, 42, 67, 0.06)',
        'card-hover': '0 2px 4px rgba(16, 42, 67, 0.06), 0 8px 24px rgba(16, 42, 67, 0.1)',
      },
    },
  },
  plugins: [],
};
