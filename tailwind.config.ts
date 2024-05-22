import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: {
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#474E53',
      'primary-100': '#EDF7FF',
      'primary-200': '#D1ECFF',
      'primary-300': '#B4DBF8',
      'primary-400': '#72BBEE',
      'primary-500': '#3098E1',
      'gray-100': '#E5EDF2',
      'gray-200': '#CDDAE4',
      'gray-500': '#8D959B',
    },
  },
  plugins: [],
};
export default config;
