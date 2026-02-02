<script setup lang="ts">
import { ref } from 'vue'

const lists = ref([
  {
    id: 1,
    cardTag: '標題',
    cardTitle: '不同層級的標題',
    cardCode: '# H1 / \n## H2 / \n### H3',
  },
  {
    id: 2,
    cardTag: '粗體',
    cardTitle: '凸顯關鍵字',
    cardCode: '**重要內容**',
  },
  {
    id: 3,
    cardTag: '斜體',
    cardTitle: '備註或小提醒',
    cardCode: '*小補充*',
  },
  {
    id: 4,
    cardTag: '程式碼片段',
    cardTitle: '單行程式碼',
    cardCode: '`const x = 1`',
  },
  {
    id: 5,
    cardTag: '程式碼區塊',
    cardTitle: '複數行程式碼',
    cardCode: '```js\nconsole.log("hello")\n```',
  },
  {
    id: 6,
    cardTag: '無序清單',
    cardTitle: '條列需求或步驟',
    cardCode: '- 項目一',
  },
  {
    id: 7,
    cardTag: '引用',
    cardTitle: '整理文件重點',
    cardCode: '> 官方文件建議...',
  },
  {
    id: 8,
    cardTag: '連結',
    cardTitle: '指向外部資源',
    cardCode: '[名稱](https://example.com)',
  },
])
</script>

<template>
  <div class="w-full">
    <div class="py-10 bg-base-100 md:w-full h-auto flex md:flex-row flex-col md:gap-0 gap-4">
      <!-- Left section -->
      <div class="flex flex-col justify-center gap-3 w-full">
        <h2 class="text-left md:text-[32px] text-base-content font-black">常用 Markdown 對照表</h2>

        <p class="py-1 text-left text-base-content/70">
          不需要背全部，只要邊查邊用，幾次之後就會變成自然的寫作格式。
        </p>

        <div class="flex flex-col md:flex-row flex-wrap gap-4 w-full">
          <div
            class="card md:w-full bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
          >
            <div class="card-body w-full">
              <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table class="table">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th>功能</th>
                      <th>效果</th>
                      <th>語法</th>
                      <!-- <th>Favorite Color</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <!-- row 1 -->
                    <tr v-for="item in lists" :key="item.id">
                      <th>{{ item.cardTag }}</th>
                      <td>{{ item.cardTitle }}</td>
                      <td>
                        <div
                          class="w-auto md:w-[350px] p-2 rounded-sm whitespace-pre-line bg-black text-white"
                        >
                          {{ item.cardCode }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
