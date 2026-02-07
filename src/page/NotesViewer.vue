<script setup lang="ts">
import { onMounted, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useworkSpace } from '@/stores/workSpace'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { onuploadImage, onviewerNotes, onEditNote } from '@/api/method'

const workSpace = useworkSpace()
const route = useRoute()
const editorRef = ref(null)
const editor = ref(null)
const noteId = route.params.id

const currentNoteId = ref(null)

const noteContext = reactive({
  title: '',
  category: '',
  content: '',
  is_public: false,
  tags: [],
  collaborators: [],
})

async function userViewerNotes() {
  try {
    const res = await onviewerNotes(workSpace.userReadNoteId)

    console.log(res)

    console.log('作者取回筆記', res.data?.note)
    currentNoteId.value = res.data.note.note_id
    noteContext.title = res.data.note.title
    noteContext.category = res.data.note.category
    noteContext.content = res.data.note.content
    noteContext.is_public = res.data.note.is_public
    noteContext.tags = res.data.note.tags
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await userViewerNotes()
  editor.value = new Editor({
    el: editorRef.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: noteContext.content || '',
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

async function editNote() {
  try {
    const res = await onEditNote(currentNoteId.value, noteContext)

    console.log(res)
  } catch (error) {
    console.log(error)
  }
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
            <label class="text-sm font-medium text-base-content/70">筆記名稱111</label>
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
          <button class="btn btn-primary" @click="editNote">修改筆記</button>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <div ref="editorRef"></div>
    </div>
  </div>
</template>
