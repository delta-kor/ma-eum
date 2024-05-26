import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    borderRadius: {
      4: '4px',
      8: '8px',
      16: '16px',
    },
    borderWidth: {
      1: '1px',
      2: '2px',
      3: '3px',
    },
    boxShadow: {
      primary: '0px 4px 4px 0px rgba(70, 167, 235, 0.30)',
      'primary-slated': '0px 4px 8px 4px rgba(173, 210, 236, 0.28)',
    },
    colors: {
      black: '#474E53',
      'gray-100': '#E5EDF2',
      'gray-200': '#CDDAE4',
      'gray-500': '#8D959B',
      'primary-100': '#EDF7FF',
      'primary-200': '#D1ECFF',
      'primary-300': '#B4DBF8',
      'primary-400': '#72BBEE',
      'primary-500': '#3098E1',
      white: '#FFFFFF',
    },
    extend: {
      animation: {
        fade: 'fadeIn 0.5s',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #3098E1 0%, #5EB6F5 100%)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
    fontSize: {
      12: ['12px', '14px'],
      14: ['14px', '17px'],
      16: ['16px', '19px'],
      18: ['18px', '21px'],
      20: ['20px', '24px'],
      22: ['22px', '26px'],
      24: ['24px', '29px'],
      28: ['28px', '33px'],
      32: ['32px', '38px'],
      36: ['36px', '43px'],
    },
    fontWeight: {
      400: '400',
      500: '500',
      600: '600',
      700: '700',
    },
    spacing: {
      0: '0',
      2: '2px',
      4: '4px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      48: '48px',
      64: '64px',
    },
  },
};
export default config;
