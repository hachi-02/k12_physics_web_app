import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tier: {
          primary: {
            light: '#FEF3C7',
            DEFAULT: '#F59E0B',
            dark: '#B45309',
            accent: '#10B981',
            bg: '#FFFBEB',
          },
          middle: {
            light: '#CFFAFE',
            DEFAULT: '#06B6D4',
            dark: '#0E7490',
            accent: '#3B82F6',
            bg: '#F0FDFA',
          },
          high: {
            light: '#E0E7FF',
            DEFAULT: '#6366F1',
            dark: '#4338CA',
            accent: '#8B5CF6',
            bg: '#F8FAFC',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
