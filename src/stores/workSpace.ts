import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useAuthStore } from './auth'
import {
  onCreateFolder,
  getAllFolder,
  getAllNotes,
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
    const favoritelistNotes = ref(null)

    async function createFolder(data) {
      try {
        const res = await onCreateFolder(data)

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    // 取得工作站筆記資料
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

    // 取得工作站收藏筆記資料
    async function getFavorites() {
      try {
        const res = await getAllNotes()

        console.log(res)
        console.log(res.data.favorites)
        favoritelistNotes.value = res.data.favorites

        console.log('fav', favoritelistNotes.value)
      } catch (error) {
        console.log(error)
      }
    }

    getFavorites()

    async function addFavoritelist(id: string, data: { favorite: boolean }) {
      try {
        const res = await onfavoriteNote(id, data)

        if (res?.data?.success) {
          const idx = rawNotes.value.findIndex(
            (n: { note_id?: string; id?: string }) => n?.note_id === id || n?.id === id,
          )

          if (idx >= 0) {
            const notes = rawNotes.value.slice()

            notes[idx] = {
              ...notes[idx],
              favorite: data.favorite, // 👈 只改 favorite
            }

            rawNotes.value = notes
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    async function addPinninglist(id: string, data: { pinning: boolean }) {
      try {
        const res = await onPinningNote(id, data)

        if (res?.data?.success) {
          const idx = rawNotes.value.findIndex(
            (n: { note_id?: string; id?: string }) => n?.note_id === id || n?.id === id,
          )

          if (idx >= 0) {
            const notes = rawNotes.value.slice()

            notes[idx] = {
              ...notes[idx],
              pinning: data.pinning, // 👈 只改 pinning
            }

            rawNotes.value = notes
          }
        }
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
      getFavorites,
      onReadisPublicNote,
      userAllFolder,
      rawNotes,
      favoritelistNotes,
      isPublicNotes,
      userReadNoteId,
    }
  },
  {
    persist: {},
  },
)
