<script setup lang="ts">
import { ref } from 'vue'
import { C } from 'vue-router/dist/router-CWoNjPRp.mjs'

const cardList = ref([
  {
    id: 1,
    title: '這是一個什麼樣的網站？',
    context:
      'Shared Notes 不是部落格，也不是單純的筆記工具，它是一個讓「尚未成熟的理解」也能被記錄與分享的空間。',
  },
  {
    id: 2,
    title: '為什麼要做？',
    context: '答案只是終點。 Shared Notes 想保存的是思考走過的路。',
  },
  {
    id: 3,
    title: '適合誰？',
    context: '適合正在學習、正在整理思路的人。 如果你在意理解，而不只是完成，那你會喜歡這裡。',
  },
])
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto py-8">
    <div class="md:text-[42px] text-base-content">關於 Shared Notes</div>
    <div class="content">
      Shared Notes 是一個為工程師與學習者打造的共享筆記平台， 專注於「實作、理解與真實
      <br />學習過程」的紀錄。 這不是教學網站，而是一個留下思考痕跡的地方。
    </div>
    <div>這不是教學網站，而是一個留下思考痕跡的地方。</div>
    <div class="card-list flex md:flex-row flex-col gap-5 py-8">
      <div
        class="card bg-base-100 md:w-96 w-full shadow-sm ring-1 ring-base-content/20"
        v-for="item in cardList"
        :key="item.id"
      >
        <div class="card-body">
          <div class="card-title !font-black text-[25px]">{{ item.title }}</div>
          <p>
            {{ item.context }}
          </p>
        </div>
      </div>
    </div>

    <div class="text-2xl">
      <a href="" >開始嘗試使用 <i class="fa-solid fa-arrow-right-long"></i></a>
    </div>
  </div>
</template>


<style>
  /* 確保 Font Awesome 圖示正確顯示 */
  .fa-solid,
  .fa-regular,
  .fa-brands,
  .fa-solid::before,
  .fa-regular::before,
  .fa-brands::before {
    font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome 6 Pro' !important;
    font-weight: 900 !important;
    font-style: normal !important;
    font-variant: normal !important;
    text-rendering: auto !important;
    line-height: 1 !important;
    display: inline-block !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
  }
  </style>
