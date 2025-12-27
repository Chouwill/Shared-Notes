<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    cardTag:"概念",
    cardTitle: '什麼是 Shared Notes？',
    contText: '一個以「技術筆記」為主的共享平台，重點放在可讀性、分類與之後好找回來。',
  },
  {
    id: 2,
    cardTag:"開始",
    cardTitle: '從一篇小筆記開始',
    contText: '不用追求完美，先寫下 3～5 個重點，用粗體、標題把結構拉出來。',
  },
  {
    id: 3,
    cardTag:"整理",
    cardTitle: '靠標籤找回舊內容',
    contText: '每篇至少加上 1～2 個 tag，例如 Vue、Zod、表單驗證，未來好搜尋。',
  },
  {
    id: 4,
    cardTag:"分享",
    cardTitle: '公開或先自己收藏',
    contText: '可以先當成自己的技術備忘錄，之後再挑幾篇整理成可公開的版本。',
  },
])
</script>

<template>
  <div
    class="box py-10 bg-base-100 text-center md:w-full h-auto flex md:flex-row flex-col md:gap-0 gap-4"
  >
    <!-- Left section -->
    <div class="flex flex-col justify-center gap-3">
      <h2 class="text-left md:text-[32px] text-base-content font-black">
        快速理解 Shared Notes 在做什麼
      </h2>

      <p class="py-1 text-left text-base-content/70">
        先不用管後端和權限，只要把筆記寫好、整理好，就已經比大多數人多走一大步。
      </p>

      <div class="flex md:justify-start justify-center items-center md:flex-row flex-wrap gap-4">
      <div
        class="card md:w-[300px] w-[165px] md:h-[170px] h-[270px] bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
        v-for="item in cards"
        :key="item.id"
      >
        <div class="card-body md:w-[270px]  w-full ">
          <div class="text-left text-blue-600">{{ item.cardTag }}</div>
          <h2 class="card-title text-left font-black text-base-content">
            {{ item.cardTitle }}
          </h2>
          <p class="text-base-content/70 text-left">
            {{ item.contText }}
          </p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
