import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useAuthStore } from './auth'
import { onCreateFolder, getAllFolder } from '@/api/method'

export const useworkSpace = defineStore(
  'event',
  () => {
    const userAllFolder = ref(null) //取得使用者所有資料夾
    const rawNotes = ref([]) //未分類的筆記

    async function createFolder(data) {
      try {
        const res = await onCreateFolder(data)

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    // 取得工作站所有資料
    async function getAll(data) {
      try {
        const res = await getAllFolder()

        // console.log(res);

        userAllFolder.value = res.data.folders

        rawNotes.value = res.data.uncategorized.notes

        console.log(userAllFolder.value)
        console.log(rawNotes.value)
      } catch (error) {
        console.log(error)
      }
    }

    return {
      createFolder,
      getAll,
      userAllFolder,
      rawNotes,
    }
  },
  {
    persist: {},
  },
)
