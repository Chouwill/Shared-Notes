import type { Config } from 'tailwindcss'
import { mauve, grass } from '@radix-ui/colors'

// Tailwind CSS v4 不需要這個檔案，配置已移至 src/style.css
// 保留此檔案僅用於 TypeScript 類型支援和擴展配色
export default {
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...grass,
      },
    },
  },
} satisfies Config
