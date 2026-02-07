/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#6C3CE1',
        'primary-light': '#9D7AEA',
        'primary-dark': '#4A1DB8',
        gold: '#F5A623',
        'gold-light': '#FCD34D',
      },
      fontFamily: {
        sans: ['GmarketSans', 'Pretendard Variable', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
    },
  },
  plugins: [],
};
