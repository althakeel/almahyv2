/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'light': '#FFB6B6',
          'gold': '#DE3B34',
          'bronze': '#CECDCB',
          'gray': '#CECDCB',
          'dark': '#160A0A',
        }
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        fadein: 'fadein 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
