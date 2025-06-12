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
        background: {
          DEFAULT: '#ffffff',
          dark: '#0A0A0A',
        },
        foreground: {
          DEFAULT: '#000000',
          dark: '#ffffff',
        },
        primary: {
          DEFAULT: '#00A5A8',
          light: '#00C5C8',
          dark: '#0082CC',
        },
        border: {
          DEFAULT: 'rgba(0, 0, 0, 0.1)',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
        card: {
          light: 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(10, 10, 10, 0.9)',
        },
        accent: {
          DEFAULT: '#00E5FF',
          dark: '#00B2CC',
          light: '#40E0FF',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      },
      perspective: {
        '1000': '1000px'
      }
    },
  },
  plugins: [],
}

export default config;
