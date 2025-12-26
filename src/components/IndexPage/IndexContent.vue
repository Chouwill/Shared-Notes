<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    cardTitle: 'Markdown 編輯',
    contText: '支援即時預覽。',
  },
  {
    id: 2,
    cardTitle: '標籤與分類',
    contText: '快速找到以前寫過的東西，不當記憶體受害者。',
  },
  {
    id: 3,
    cardTitle: '公開分享',
    contText: '論壇/朋友都方便。',
  },
  {
    id: 4,
    cardTitle: '筆記收藏',
    contText: '收藏各種筆記，豐富自己的知識庫。',
  },
])

const articleLists = ref([
  {
    id: 1,
    title: 'Vue 表單驗證：Zod + PrimeVue 的踩雷整理',
    author: 'chouwill',
    time: '2 小時前',
    tags: ['Vue', 'Zod', 'Form'],
  },
  {
    id: 2,
    title: 'Toast UI Editor：onMounted 初始化與 ref 容器',
    author: 'chouwill',
    time: '昨天',
    tags: ['Editor', 'Vue3'],
  },
  {
    id: 3,
    title: 'Git Flow：feat / fix 的 commit 寫法模板',
    author: 'chouwill',
    time: '3 天前',
    tags: ['Git', 'Workflow'],
  },
  {
    id: 4,
    title: 'Git Flow：feat / fix 的 commit 寫法模板',
    author: 'chouwill',
    time: '3 天前',
    tags: ['Git', 'Workflow'],
  },
  {
    id: 5,
    title: 'Git Flow：feat / fix 的 commit 寫法模板',
    author: 'chouwill',
    time: '3 天前',
    tags: ['Git', 'Workflow'],
  },
])
</script>











<template>
  <div class="h-[900px] flex flex-col gap-4 ">
    <div class="first-title text-3xl text-base-content">你會用到的核心功能</div>

    <p class="text-base text-base-content/80">先把最常用的流程做順：寫、找、分享、再回來整理。</p>

    <div class="flex md:justify-start justify-center items-center md:flex-row flex-wrap gap-4">
      <div
        class="card md:w-[300px] w-[150px] md:h-[120px] h-[150px] bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
        v-for="item in cards"
        :key="item.id"
      >
        <div class="card-body md:w-[270px] w-[150px]">
          <h2 class="card-title font-black text-base-content">
            {{ item.cardTitle }}
          </h2>
          <p class="text-base-content/70">
            {{ item.contText }}
          </p>
        </div>
      </div>
    </div>
    <div class="">
      <div class="flex md:flex-row md:gap-0 flex-col justify-between items-center ">
        <div class="first-title text-3xl text-base-content p-3">所有主題</div>
        <div class="flex gap-3 items-center">
          <div class="flex  gap-5 p-3 items-center">
            <!-- <legend class="fieldset-legend"></legend> -->

            <fieldset class="fieldset">
              <select class="select">
                <option disabled selected>文章分類</option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
              <!-- <span class="label">Optional</span> -->
            </fieldset>

            <label class="input">
              <svg
                class="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
          </div>
        </div>
      </div>

      <div
        class="flex rounded-md md:justify-start  border-base-300 justify-center items-center md:flex-row flex-col flex-wrap gap-4"
      >
        <div
          class="card md:w-full md:h-[100px] h-[165px] bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20"
          v-for="item in articleLists"
          :key="item.id"
        >
          <div class="card-body flex md:gap-0 gap-3 md:flex-row flex-col justify-between">
            <div class="card-left w-full">
              <h2 class="card-title font-black text-base-content">
                {{ item.title }}
              </h2>
              <p class="text-base-content/70">{{ item.author }} • {{ item.time }}</p>
            </div>
            <div class="card-right flex items-center gap-3">
              <div class="card-tag" v-for="(tag, index) in item.tags" :key="index">
                <div class="badge badge-soft badge-info">{{ tag }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center mx-auto">
          <div
            class="join join-vertical lg:join-horizontal mx-auto flex justify-center items-center border-3 border-base-200 rounded-2xl"
          >
            <button class="btn"><i class="fa-solid fa-angle-left"></i></button>

            <p class="btn">1 &nbsp; of &nbsp; 10</p>
            <button class="btn"><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>
      </div>
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
