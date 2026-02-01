<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { useRoute } from 'vue-router'
import { onvisiteNotes } from '@/api/method'

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

// 從路由參數獲取 id
const noteId = route.params.id as string

// 載入筆記資料的函數
async function visitNotes() {
  if (!noteId) {
    error.value = '缺少筆記 ID'
    return
  }

  // Debug: 檢查實際傳遞的 id
  console.log('🔍 準備載入筆記，ID:', noteId)
  console.log('🔍 ID 類型:', typeof noteId)
  console.log('🔍 完整 URL 會是: /api/notes/public/' + noteId)

  try {
    loading.value = true
    error.value = null

    // 使用公開筆記 API 載入筆記資料
    const res = await onvisiteNotes(noteId)
    const responseData = res.data

    console.log('✅ API 回應:', responseData)

    // API 回應結構: { success, message, note: { ... } }
    // 資料在 responseData.note 中
    const note = responseData.note || responseData

    console.log('✅ 載入的筆記資料:', note)

    // 根據 API 回應結構更新 noteData
    noteData.value = {
      title: note.title || '',
      category: note.category || '',
      content: note.content || '',
      tags: note.tags || [],
      created_at: note.created_at || '',
    }
  } catch (err) {
    console.error('載入筆記失敗:', err)
    error.value = '無法載入筆記內容'
  } finally {
    loading.value = false
    // 等待 loading 狀態更新後，DOM 會重新渲染（v-else 區塊會顯示）
    // 
    await nextTick()

    // 初始化 Viewer（此時 viewerRef 應該已經在 DOM 中了）
    if (viewerRef.value && noteData.value.content) {
      // 如果已經有 Viewer 實例，先銷毀它
      if (viewer.value) {
        viewer.value.destroy()
      }

      // 使用專用的 Viewer 建構函數（更輕量，不包含編輯功能）
      viewer.value = new Viewer({
        el: viewerRef.value,
        height: 'auto',
        initialValue: noteData.value.content,
      })

      console.log('✅ Viewer 初始化完成，內容長度:', noteData.value.content.length)
    } else {
      console.warn('⚠️ Viewer 初始化失敗:', {
        viewerRefExists: !!viewerRef.value,
        hasContent: !!noteData.value.content,
      })
    }
  }
}

onMounted(async () => {
  await visitNotes()
})

// 組件卸載時清理 Viewer 實例
onUnmounted(() => {
  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = null
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
      <div class="card bg-base-100 ring-1 ring-base-content/20 shadow-lg rounded-xl relative z-0">
        <div class="card-body p-6">
          <div ref="viewerRef" class="toastui-editor-contents relative z-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>
