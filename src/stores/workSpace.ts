import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useAuthStore } from './auth'
import {
  onCreateFolder,
  getAllFolder,
  onfavoriteNote,
  onPinningNote,
  onReadNotes,
} from '@/api/method'
import { string } from 'zod'

export const useworkSpace = defineStore(
  'event',
  () => {
    const userAllFolder = ref(null) //取得使用者所有資料夾
    const rawNotes = ref([]) //未分類的筆記
    const userReadNoteId = ref(null)
    const isPublicNotes = ref(null)

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

        console.log(res)

        userAllFolder.value = res.data.folders

        rawNotes.value = res.data.uncategorized?.notes || []

        console.log(userAllFolder.value)
        console.log(rawNotes.value)
      } catch (error) {
        console.log(error)
      }
    }

    async function addFavoritelist(id: string, data) {
      try {
        const res = await onfavoriteNote(id, data)
        if (res?.data?.success && res.data) {
          const idx = rawNotes.value.findIndex(
            (n: { note_id?: string; id?: string }) => n?.note_id === id || n?.id === id,
          )
          if (idx >= 0) {
            const notes = rawNotes.value.slice()
            const patch: Record<string, unknown> = {}
            if ('favorite' in res.data) patch.favorite = res.data.favorite
            if ('pinning' in res.data) patch.pinning = res.data.pinning
            notes[idx] = { ...notes[idx], ...patch }
            rawNotes.value = notes
          }
        }
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    async function addPinninglist(id: string, data) {
      try {
        const res = await onPinningNote(id, data)
        if (res?.data?.success && res.data) {
          const idx = rawNotes.value.findIndex(
            (n: { note_id?: string; id?: string }) => n?.note_id === id || n?.id === id,
          )
          if (idx >= 0) {
            const notes = rawNotes.value.slice()
            const patch: Record<string, unknown> = {}
            if ('favorite' in res.data) patch.favorite = res.data.favorite
            if ('pinning' in res.data) patch.pinning = res.data.pinning
            notes[idx] = { ...notes[idx], ...patch }
            rawNotes.value = notes
          }
        }
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    function getReadNote(id) {
      console.log('取得要閱讀的ＩＤ', id)

      userReadNoteId.value = id //儲存正在閱讀的Ｎotes id
    }

    async function onReadisPublicNote() {
      try {
        const res = await onReadNotes()

        console.log('已審核筆記', res.data.notes)
        isPublicNotes.value = res.data.notes
      } catch (error) {
        console.log(error)
      }
    }
    onReadisPublicNote()
    return {
      createFolder,
      getAll,
      addFavoritelist,
      addPinninglist,
      getReadNote,
      onReadisPublicNote,
      userAllFolder,
      rawNotes,
      isPublicNotes,
      userReadNoteId,
    }
  },
  {
    persist: {},
  },
)
