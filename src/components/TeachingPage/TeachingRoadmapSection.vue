<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    cardTag: '目前',
    cardTitle: 'v1.0 · 靜態展示版',
    contText: ['首頁版型與筆記列表', '關於與教學頁', '基本 Markdown 說明'],
  },
  {
    id: 2,
    cardTag: '下一步',
    cardTitle: 'v1.2 · 假資料 CRUD',
    contText: ['在前端使用假資料管理筆記', '支援新增、編輯、刪除', '保留現在的 UI 結構'],
  },
  {
    id: 3,
    cardTag: '之後',
    cardTitle: 'v2.0 · 後端與登入',
    contText: ['串接實際資料庫或後端 API', '會員登入與個人筆記空間', '真正可公開分享的筆記連結'],
  },
])
</script>

<template>
  <div
    class="box w-full justify-center items-center py-10 bg-base-100 text-center md:w-full h-auto flex flex-col gap-7"
  >
    <!-- Left section -->
    <div class="flex flex-col justify-center gap-3 ">
      <h2 class="text-left md:text-[32px] text-base-content font-black">專案 開發計畫</h2>

      <p class="py-1 text-left text-base-content/70">
        現在你看到的是作品集版本，未來會持續補上實際後端與會員機制，讓它更接近真的產品。
      </p>

      <div class="flex  justify-center items-center md:flex-row flex-wrap gap-4">
        <div
          class="card range-1 md:w-[412px] w-[200px] md:h-[190px] h-[270px] bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
          v-for="(item, line) in cards"
          :key="item.id"
        >
          <div class="card-body md:w-[350px] w-full flex justify-center items-center">
            <div class="text-left text-blue-600">{{ item.cardTag }}</div>
            <h2 class="card-title text-left font-black text-base-content">
              {{ item.cardTitle }}
            </h2>
            <ol class="list-disc">
              <li v-for="(text, idx) in item.contText" :key="idx" class="text-left">
                {{ text }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div
      class="card  flex md:w-[95%] bg-blue-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
    >
      <div class="card-body flex flex-row justify-around items-center    w-full">
        <div class=" w-[50%] text-left">
          <div class="text-2xl font-black">準備開始你的下一篇技術筆記了嗎？</div>
          <p class="text-sm">不需要一次寫出完美文章，只要先把今天學到的兩三個重點記下來，就很夠用了。</p>
        </div>

        <div class="w-[50%] flex justify-end gap-3">
          <button class="btn btn-neutral rounded-3xl">開始寫筆記</button>
          <button class="btn btn-primary rounded-3xl">返回首頁</button>
        </div>
      </div>
    </div>
  </div>
</template>


