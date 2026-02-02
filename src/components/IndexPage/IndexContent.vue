<script setup lang="ts">
import { ref, computed } from 'vue'
import { useworkSpace } from '@/stores/workSpace'
import router from '@/router'

const workSpace = useworkSpace()

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

// const articleLists = ref([
//   {
//     id: 1,
//     title: 'Vue 表單驗證：Zod + PrimeVue 的踩雷整理',
//     author: 'chouwill',
//     time: '2 小時前',
//     tags: ['Vue', 'Zod', 'Form'],
//   },
//   {
//     id: 2,
//     title: 'Toast UI Editor：onMounted 初始化與 ref 容器',
//     author: 'chouwill',
//     time: '昨天',
//     tags: ['Editor', 'Vue3'],
//   },
//   {
//     id: 3,
//     title: 'Git Flow：feat / fix 的 commit 寫法模板',
//     author: 'chouwill',
//     time: '3 天前',
//     tags: ['Git', 'Workflow'],
//   },
//   {
//     id: 4,
//     title: 'Git Flow：feat / fix 的 commit 寫法模板',
//     author: 'chouwill',
//     time: '3 天前',
//     tags: ['Git', 'Workflow'],
//   },
//   {
//     id: 5,
//     title: 'Git Flow：feat / fix 的 commit 寫法模板',
//     author: 'chouwill',
//     time: '3 天前',
//     tags: ['Git', 'Workflow'],
//   },
// ])

// 分頁相關狀態
const currentPage = ref(1)
const itemsPerPage = ref(3) // 每頁顯示 3 筆文章

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(workSpace.rawNotes.length / itemsPerPage.value)
})

// 計算當前頁要顯示的文章
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return workSpace.rawNotes.slice(start, end)
})

// 上一頁
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 下一頁
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function visitNotes(id) {
  console.log(id)

  router.push(`/visiteNotes/${id}`)
}
</script>

<template>
  <div class="h-[900px] flex flex-col gap-4">
    <div class="first-title text-3xl text-base-content">你會用到的核心功能</div>

    <p class="text-base text-base-content/80">先把最常用的流程做順：寫、找、分享、再回來整理。</p>

    <div class="flex md:justify-start justify-center items-center md:flex-row flex-wrap gap-5">
      <div
        class="card md:w-[300px] w-[150px] md:h-[140px] h-[170px] bg-base-100 ring-1 ring-base-content/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border dark:border-base-content/10 rounded-xl"
        v-for="item in cards"
        :key="item.id"
      >
        <div class="card-body md:w-[270px] w-[150px] p-5 md:p-6 flex flex-col gap-2.5">
          <h2 class="card-title text-lg md:text-xl font-bold text-base-content mb-0 leading-tight">
            {{ item.cardTitle }}
          </h2>
          <p class="text-sm md:text-base text-base-content/65 leading-relaxed mt-auto">
            {{ item.contText }}
          </p>
        </div>
      </div>
    </div>
    <div class="">
      <div class="flex md:flex-row md:gap-0 flex-col justify-between items-center">
        <div class="first-title text-3xl text-base-content p-3">所有主題</div>
        <div class="flex gap-3 items-center">
          <div class="flex gap-5 p-3 items-center">
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
        class="flex rounded-md md:justify-start border-base-300 justify-center items-center md:flex-row flex-col flex-wrap gap-4"
      >
        <div
          class="card md:w-full md:h-[140px] cursor-pointer h-auto min-h-[165px] bg-base-100 ring-1 ring-base-content/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border dark:border-base-content/10 rounded-xl"
          v-for="item in paginatedArticles"
          :key="item.note_id"
          @click="visitNotes(item.note_id)"
        >
          <div class="card-body flex md:gap-4 gap-4 md:flex-row flex-col justify-between p-5 md:p-6">
            <div class="card-left w-full flex flex-col gap-2.5">
              <h2 class="card-title text-xl md:text-2xl font-bold text-base-content leading-tight mb-0">
                {{ item.title }}
              </h2>
              <p 
                v-if="item.content" 
                class="text-sm md:text-base text-base-content/60 leading-relaxed line-clamp-2 mb-1"
              >
                {{ item.content.substring(0, 120) }}{{ item.content.length > 120 ? '...' : '' }}
              </p>
              <p class="text-xs md:text-sm text-base-content/50 mt-auto">Shared Notes • {{ item.updated_at.split('T')[0] }}</p>
            </div>
            <div class="card-right flex items-start md:items-center gap-2 md:gap-3 flex-shrink-0">
              <div class="card-tag" v-for="(tag, index) in item.tags" :key="index">
                <div class="badge badge-soft badge-info text-xs md:text-sm">{{ tag }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center mx-auto mt-4">
          <div
            class="join join-vertical lg:join-horizontal mx-auto flex justify-center items-center border-3 border-base-200 rounded-2xl w-fit"
          >
            <button
              class="btn btn-ghost lg:w-auto w-full min-w-[120px] lg:min-w-0"
              :disabled="currentPage === 1"
              @click="goToPreviousPage"
            >
              <i class="fa-solid fa-angle-left"></i>
            </button>

            <p class="btn btn-ghost lg:w-auto w-full min-w-[120px] lg:min-w-0 text-center">
              {{ currentPage }} &nbsp; of &nbsp; {{ totalPages }}
            </p>
            <button
              class="btn btn-ghost lg:w-auto w-full min-w-[120px] lg:min-w-0"
              :disabled="currentPage === totalPages"
              @click="goToNextPage"
            >
              <i class="fa-solid fa-angle-right"></i>
            </button>
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
