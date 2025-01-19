import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A5A8',
          dark: '#0082CC',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0A0A0A',
          light: '#F5F5F5',
        },
        accent: {
          DEFAULT: '#00E5FF',
          dark: '#00B2CC',
        },
        border: {
          DEFAULT: '#E5E5E5',
          dark: '#2A2A2A',
        },
        foreground: {
          DEFAULT: '#111111',
          dark: '#FFFFFF',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config;
