<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { useRoute } from 'vue-router'
import { onvisiteNotes, onMemberNoteView, onfavoriteNote } from '@/api/method'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const viewerRef = ref(null)
const viewer = ref(null)

const userStore = useAuthStore()

const currentNote = ref(null)

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

watch(
  () => userStore.userToken,
  (newToken, oldToken) => {
    if (!oldToken && newToken) {
      visitNotes()
    }
  },
)

// 觀看網站公開筆記
async function visitNotes() {
  if (!noteId) {
    error.value = '缺少筆記 ID'
    return
  }

  try {
    loading.value = true
    error.value = null

    const res = userStore.userToken ? await onMemberNoteView(noteId) : await onvisiteNotes(noteId)
    const responseData = res.data
    const note = responseData.note || responseData

    currentNote.value = note
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
    } else {
      console.warn('Viewer 初始化失敗:', {
        viewerRefExists: !!viewerRef.value,
        hasContent: !!noteData.value.content,
      })
    }
  }
}

// 點收藏
async function addfavoriteNote() {
  const newVal = !currentNote.value.favorite // 切換收藏狀態
  try {
    await onfavoriteNote(currentNote.value.note_id, { favorite: newVal }) // 把切換的值送出去
    // 直接更新畫面，不用重整。
    currentNote.value = { ...currentNote.value, favorite: newVal }
  } catch (error) {
    console.error('收藏切換失敗', error)
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
        class="card relative bg-base-100 ring-1 ring-base-content/10 shadow-md dark:border dark:border-base-content/10 rounded-xl"
      >
        <div class="card-body gap-5 p-6 md:p-7">
          <div class="flex justify-between">
            <h1 class="text-3xl md:text-4xl font-bold text-base-content leading-tight mb-2">
              {{ noteData.title }}
            </h1>
            <div class="flex items-center justify-center gap-3">
              <button class="absolute top-0" type="button" @click="addfavoriteNote">
                <i
                  v-if="currentNote?.favorite"
                  class="fa-solid fa-bookmark text-sm text-base-content/60 text-[35px]"
                ></i>
                <i
                  v-else
                  class="fa-regular fa-bookmark text-sm text-base-content/60 text-[35px]"
                ></i>
              </button>
            </div>
          </div>
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

<style scoped>
.fa-solid,
.fa-brands,
.fa-solid::before,
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

.fa-regular,
.fa-regular::before {
  font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome 6 Pro' !important;
  font-weight: 400 !important;
  font-style: normal !important;
  font-variant: normal !important;
  text-rendering: auto !important;
  line-height: 1 !important;
  display: inline-block !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}
</style>
