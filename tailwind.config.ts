import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8', // Google Blue
        gray: {
          50: '#f9f9f9',
          100: '#f1f3f4', // light bg
          200: '#dadce0',
          900: '#202124', // Google text
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
}

export default config
