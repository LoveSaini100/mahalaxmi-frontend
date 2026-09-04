/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14213D',
          dark: '#0B1630',
          light: '#1E2F54',
          surface: '#152548',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E5C766',
          dark: '#A68218',
          accent: '#DFB738',
        },
        brand: {
          offwhite: '#F8F7F3',
          warmgray: '#F1EFF5',
          text: '#1E293B',
          muted: '#64748B',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        body: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px -2px rgba(201, 162, 39, 0.25)',
        premium: '0 20px 40px -15px rgba(11, 22, 48, 0.12)',
        glow: '0 0 25px rgba(201, 162, 39, 0.35)',
        white: '0 0 18px rgba(255, 255, 255, 0.3)',
        'white-glow': '0 0 25px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
