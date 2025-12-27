<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    cardTag: '標題',
    cardTitle: '用井字號把層級拉出來，方便閱讀與之後目錄化。',
    cardCode: '# 標題一 \n ## 標題二 \n ### 標題三',
  },
  {
    id: 2,
    cardTag: '粗體與斜體',
    cardTitle: '用粗體標記關鍵字，斜體標記小提醒或註解。',
    cardCode: '**這是重點** \n  *這是小註解*',
  },
  {
    id: 3,
    cardTag: '程式碼區塊',
    cardTitle: '貼 JS / TS / Vue 片段時，用程式碼區塊包起來。',
    cardCode: '```js\nconst schema = z.object({\n  name: z.string().min(1),\n})\n```',
  },

  {
    id: 4,
    cardTag: '清單',
    cardTitle: '適合列步驟、條列需求或待辦事項。',
    cardCode: '- 初始化表單資料\n- 建立 Zod schema\n- 綁定錯誤訊息',
  },
  {
    id: 5,
    cardTag: '引用',
    cardTitle: '整理官方文件重點或他人建議時很好用。',
    cardCode: '> 表單驗證應該盡量貼近 UI 流程\n> 而不是硬塞在單一 submit 事件裡。',
  },
  {
    id: 6,
    cardTag: '連結',
    cardTitle: '把原始文件或延伸閱讀補在文末。',
    cardCode: '[Zod 官方文件](https://zod.dev)\n[Vue 文檔](https://vuejs.org)',
  },
])
</script>

<template>
  <div
    class="box py-10 bg-base-100 text-center md:w-full h-auto flex md:flex-row flex-col md:gap-0 gap-4"
  >
    <!-- Left section -->
    <div class="flex flex-col justify-center gap-3">
      <h2 class="text-left md:text-[32px] text-base-content font-black">常用 Markdown 語法</h2>

      <p class="py-1 text-left text-base-content/70">
        Shared Notes 主打的是「清楚好讀」的技術筆記，以下是實際寫程式筆記時會用到的基本語法。
      </p>

      <div class="flex md:justify-star  justify-center items-center   md:flex-row flex-wrap gap-4">
        <div
          class="card md:w-[357px] w-[165px] md:h-[250px] h-[315px] bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
          v-for="item in cards"
          :key="item.id"
        >
          <div class="card-body  w-full">
            <div class="text-left text-blue-600">{{ item.cardTag }}</div>
            <h2 class="card-title text-sm text-left font-black text-base-content">
              {{ item.cardTitle }}
            </h2>

            <div
              class="h-auto  p-2 flex justify-start items-center rounded-xl bg-black border border-primary/40"
            >
              <div class="text-white text-left">
                <div class="flex flex-col gap-1">
                  <p class="whitespace-pre-line text-white text-left">
                    {{ item.cardCode }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
