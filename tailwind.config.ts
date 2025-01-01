import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'base-family': 'Arial, Helvetica, sans-serif',
      'title-family': '"Hiragino Maru Gothic ProN W6", sans-serif',
    },
    colors: {
      primary: '#234E8E',
      white: '#FFFFFF',
      text: {
        default: '#212121',
        gray: '#666666',
      },
      line: {
        DEFAULT: '#cccccc',
      },
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      'app-title': '22px',
    },
    spacing: {
      '0': '0',
      '1px': '1px',
      '2px': '2px',
      '4px': '4px',
      '8px': '8px',
      '16px': '16px',
      '24px': '24px',
      '32px': '32px',
      'header-height': '58px',
      'min-button-size': '44px',
    },
  },
  plugins: [],
} satisfies Config;
