import type { Config } from 'tailwindcss'
import { mauve, grass } from '@radix-ui/colors'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...grass,
      },
    },
  },
  plugins: [],
} satisfies Config
