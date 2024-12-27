import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      text: {
        default: '#212121',
      },
    },
    fontSize: {
      base: '16px',
    },
    spacing: {
      '1px': '1px',
      '2px': '2px',
      '4px': '4px',
      '8px': '8px',
      '16px': '16px',
      '24px': '24px',
      '32px': '32px',
    },
  },
  plugins: [],
} satisfies Config;
