<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import { onCreateNote } from '@/api/method'

const editorRef = ref(null)
const editor = ref(null)

const customTags = ref('')

const noteContext = ref({
  title: '',
  category: '',
  content: '',
  is_public: false,
  tags: [],
  collaborators: [],
})

// api 要求

// {
//   "title": "我的筆記標題",
//   "content": "# Markdown 內容\n\n這是筆記的內容...",
//   "is_public": false,
//   "folder_id": null,
//   "category": "技術筆記",
//   "tags": ["JavaScript", "Vue3"],
//   "collaborators": ["user-id-2", "user-id-3"]
// }

onMounted(() => {
  // console.log(editorRef.value)
  editor.value = new Editor({
    // el: document.querySelector("#editor"),
    el: editorRef.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
  })
})

async function createNote() {
  console.log('customTags', customTags.value)
  const markdown = editor.value.getMarkdown()
  // console.log(noteContext.value)
  // console.log(markdown)

  noteContext.value.content = markdown

  noteContext.value.tags.push(customTags.value)

  console.log(noteContext.value)

  try {
    const res = await onCreateNote(noteContext.value)

    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto flex flex-col gap-6 py-8">
    <!-- 表單設定區域 -->
    <div
      class="card bg-base-100 ring-1 ring-base-content/20 shadow-lg dark:border dark:border-base-content/20 rounded-xl"
    >
      <div class="card-body gap-6 p-6">
        <!-- 筆記名稱與分類 -->
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
              <option disabled selected>選擇分類</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>
        </div>

        <!-- 公開設定與標籤 -->
        <div
          class="flex md:flex-row flex-col gap-4 md:items-center md:justify-between p-4 rounded-lg bg-base-200/40 dark:bg-base-300/20"
        >
          <div class="flex items-center gap-3">
            <label class="text-base font-medium text-base-content">是否公開分享</label>
            <input type="checkbox" class="toggle toggle-success" v-model="noteContext.is_public" />
          </div>
          <div class="flex items-center gap-3 w-[850px] p-3">
            <label class="text-base font-medium text-base-content">自定義的標籤</label>
            <input
              type="text"
              placeholder=""
              class="input input-xs w-[150px] p-3"
              v-model="customTags"
            />

            <div class="flex flex-row flex-wrap gap-2 min-w-[100px]">
              <div class="badge badge-soft badge-info group cursor-pointer">
                <span>Markdown</span>
                <button
                  class="hidden group-hover:flex w-4 h-4 ml-2 border border-base-content/30 justify-center items-center rounded-full hover:bg-base-content/10 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2 border-t border-base-content/10">
          <button class="btn btn-primary" @click="createNote">建立筆記</button>
        </div>
      </div>
    </div>

    <!-- 編輯器區域 -->
    <div class="flex-1">
      <!-- <NoteIde /> -->
      <div ref="editorRef"></div>
    </div>
  </div>
</template>
