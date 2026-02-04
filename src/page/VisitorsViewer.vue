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

const noteId = route.params.id as string

async function visitNotes() {
  if (!noteId) {
    error.value = '缺少筆記 ID'
    return
  }

  console.log('🔍 準備載入筆記，ID:', noteId)
  console.log('🔍 ID 類型:', typeof noteId)
  console.log('🔍 完整 URL 會是: /api/notes/public/' + noteId)

  try {
    loading.value = true
    error.value = null

    const res = await onvisiteNotes(noteId)
    const responseData = res.data

    console.log('✅ API 回應:', responseData)

    const note = responseData.note || responseData

    console.log('✅ 載入的筆記資料:', note)

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
    await nextTick()

    if (viewerRef.value && noteData.value.content) {
      if (viewer.value) {
        viewer.value.destroy()
      }

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

onUnmounted(() => {
  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = null
  }
})
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto flex flex-col gap-6 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div v-else class="flex flex-col gap-6">
      <div
        class="card bg-base-100 ring-1 ring-base-content/10 shadow-md dark:border dark:border-base-content/10 rounded-xl"
      >
        <div class="card-body gap-5 p-6 md:p-7">
          <h1 class="text-3xl md:text-4xl font-bold text-base-content leading-tight mb-2">
            {{ noteData.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-3 pt-2 border-t border-base-content/5">
            <div v-if="noteData.category" class="badge badge-outline badge-lg">
              {{ noteData.category }}
            </div>
            <div v-for="tag in noteData.tags" :key="tag" class="badge badge-info badge-lg">
              {{ tag }}
            </div>
            <div v-if="noteData.created_at" class="text-sm text-base-content/55 ml-auto">
              {{ new Date(noteData.created_at).toLocaleDateString('zh-TW') }}
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 ring-1 ring-base-content/10 shadow-md rounded-xl relative z-0">
        <div class="card-body p-6 md:p-7">
          <div ref="viewerRef" class="toastui-editor-contents relative z-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>
