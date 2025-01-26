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
      primary: {
        light: '#ADC6EB',
        DEFAULT: '#234E8E',
      },
      attention: '#E00000',
      white: '#FFFFFF',
      text: {
        default: '#212121',
        gray: '#666666',
      },
      line: {
        DEFAULT: '#CCCCCC',
      },
      icon: {
        gray: '#888888',
      },
      'line-chart': {
        'x-axis': '#999999',
        'x-grid': '#999999',
        'x-grid-label': '#999999',
        'y-grid': '#999999',
        'y-grid-label': '#999999',
      },
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
    zIndex: {
      header: '10',
    },
    extend: {
      fontSize: {
        '2xs': '10px',
        'app-title': '22px',
        'page-title': '20px',
      },
    },
  },
  plugins: [],
} satisfies Config;
