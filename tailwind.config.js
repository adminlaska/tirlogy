/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00A5A8',
        'primary-dark': '#008486',
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        'background-dark': '#0A0A0A',
        'foreground-dark': '#FFFFFF',
        border: '#E5E7EB',
        'border-dark': '#1F2937',
      },
    },
  },
  plugins: [],
}