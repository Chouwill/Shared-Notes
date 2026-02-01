<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { onCreateNote, onuploadImage, onviewerNotes } from '@/api/method'

const route = useRoute()
const editorRef = ref(null)
const editor = ref(null)
const noteId = route.params.id

const noteContext = ref({
  title: '',
  category: '',
  content: '',
  is_public: false,
  tags: [],
  collaborators: [],
})

onMounted(async () => {
  if (noteId) {
    try {
      const res = await onviewerNotes(noteId)
      const data = res.data

      noteContext.value.title = data.title || ''
      noteContext.value.category = data.category || ''
      noteContext.value.content = data.content || ''
      noteContext.value.is_public = data.is_public || false
      noteContext.value.tags = data.tags || []
    } catch (error) {
      console.error('取得筆記失敗:', error)
    }
  }

  await nextTick()

  editor.value = new Editor({
    el: editorRef.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: noteContext.value.content || '',
    hooks: {
      async addImageBlobHook(blob, callback) {
        const formData = new FormData()
        formData.append('image', blob)
        const imageRes = await onuploadImage(formData)
        callback(imageRes.data.image_url)
      },
    },
  })
})

async function createNote() {
  noteContext.value.content = editor.value.getMarkdown()
  await onCreateNote(noteContext.value)
}
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto flex flex-col gap-6 py-8">
    <div
      class="card bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20 rounded-xl"
    >
      <div class="card-body gap-6 p-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-base-content/70">筆記名稱</label>
            <input
              type="text"
              placeholder="請輸入筆記名稱"
              class="input input-bordered w-full rounded-lg"
              v-model="noteContext.title"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-base-content/70">文章分類</label>
            <select class="select select-bordered w-full rounded-lg" v-model="noteContext.category">
              <option disabled>選擇分類</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>
        </div>

        <div
          class="flex md:flex-row flex-col gap-4 md:items-center md:justify-between p-4 rounded-lg bg-base-200/40 dark:bg-base-300/20"
        >
          <div class="flex items-center gap-3">
            <label class="text-base font-medium text-base-content">是否公開分享</label>
            <input type="checkbox" class="toggle toggle-success" v-model="noteContext.is_public" />
          </div>
          <div class="flex items-center gap-3 w-[850px] p-3">
            <label class="text-base font-medium text-base-content">標籤</label>
            <div class="flex flex-row flex-wrap gap-2 min-w-[100px]">
              <div
                v-for="tag in noteContext.tags"
                :key="tag"
                class="badge badge-soft badge-info group cursor-pointer"
              >
                <span>{{ tag }}</span>
              </div>
              <div v-if="noteContext.tags.length === 0" class="text-sm text-base-content/60">
                無標籤
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2 border-t border-base-content/10">
          <button class="btn btn-primary" @click="createNote">修改筆記</button>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <div ref="editorRef"></div>
    </div>
  </div>
</template>
