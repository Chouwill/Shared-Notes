<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { useRoute } from 'vue-router'

const route = useRoute()
const viewerRef = ref(null)
const viewer = ref(null)

const noteData = ref({
  title: '',
  category: '',
  content: '',
  tags: [],
  created_at: '',
})

const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // 使用 Editor.factory() 建立 Viewer（更輕量的 Viewer）
    await nextTick()
    if (viewerRef.value) {
      viewer.value = Editor.factory({
        el: viewerRef.value,
        viewer: true,
        height: 'auto',
        initialValue: noteData.value.content,
      })
    }
  } catch (err) {
    console.error('初始化失敗:', err)
    error.value = '無法載入筆記內容'
  }
})
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto flex flex-col gap-6 py-8">
    <!-- 載入中狀態 -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <!-- 筆記內容 -->
    <div v-else class="flex flex-col gap-6">
      <!-- 筆記標題與資訊 -->
      <div
        class="card bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20 rounded-xl"
      >
        <div class="card-body gap-4 p-6">
          <h1 class="text-3xl font-bold text-base-content">{{ noteData.title }}</h1>

          <!-- 分類與標籤 -->
          <div class="flex flex-wrap items-center gap-3">
            <div v-if="noteData.category" class="badge badge-outline badge-lg">
              {{ noteData.category }}
            </div>
            <div v-for="tag in noteData.tags" :key="tag" class="badge badge-info badge-lg">
              {{ tag }}
            </div>
            <div v-if="noteData.created_at" class="text-sm text-base-content/60 ml-auto">
              {{ new Date(noteData.created_at).toLocaleDateString('zh-TW') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Viewer 區域 -->
      <div class="card bg-base-100 ring-1 ring-base-content/20 shadow-lg rounded-xl">
        <div class="card-body p-6">
          <div ref="viewerRef"></div>
        </div>
      </div>
    </div>
  </div>
</template>
