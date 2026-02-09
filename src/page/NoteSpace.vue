<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { useRoute, useRouter } from 'vue-router'
import { useworkSpace } from '@/stores/workSpace'
import { useAuthStore } from '@/stores/auth'

import { onEditFolder, onDeleteNote } from '@/api/method'

const router = useRouter()
const deleteMessage=ref(null)

const workSpace = useworkSpace()
const authStore = useAuthStore()

interface IarticleNote {
  id: string
  noteId: string
  title: string
  updateDate: string
  isFavorite: boolean
  tags: Array<string>
  pinning: boolean
  folderId: string
}

interface Ifolders {
  id: string
  name: string
}

const articleNotes = ref<IarticleNote[]>([
  {
    id: '1',
    noteId: '',
    title: 'ddd',
    updateDate: '00000',
    isFavorite: false,
    tags: ['1', '2'],
    pinning: false,
    folderId: '',
  },
])
const folders = ref<Ifolders[]>([])

const renameInput = ref(null)

const favoriteNotes = ref<Ifolders[]>([])

const selectedNote = ref<number[]>([])

const addFolderdialog = ref<null>(null)

const folderName = ref<string>('請輸入資料夾名稱')
const editFolderName = ref({
  name: '',
})

const createFolderName = ref({
  name: '',
})

const message = ref(false)

const dropdown = ref<string | null>(null)

function getAllInformation() {
  workSpace.getAll()
}

getAllInformation()

function addFolderName() {
  console.log(folderName.value)
  if (!folderName.value) return

  createFolderName.value.name = folderName.value

  console.log('createFolderName', createFolderName.value)

  workSpace.createFolder(createFolderName.value)

  closeDialog()

  message.value = true

  setTimeout(() => {
    message.value = false
  }, 1500)
}

function addFolder() {
  addFolderdialog.value.showModal()
}

function addfavoriteNote(item) {
  console.log('加入收藏', item)

  workSpace.addFavoritelist(item.note_id, { favorite: !item.favorite })

  workSpace.getAll()
}

function addPinningNote(item) {
  console.log('加入收藏', item)

  workSpace.addPinninglist(item.note_id, { pinning: !item.pinning })

  workSpace.getAll()
}

function closeDialog() {
  addFolderdialog.value.close()
}

function selectOption(id: string) {
  // dropdown.value = dropdown.value === id ? null : id
  if (dropdown.value === id) {
    dropdown.value = null
  } else {
    dropdown.value = id
  }
}

function renameFolder(id) {
  renameInput.value = id
  console.log('renameInput:', renameInput.value)

  if (dropdown.value === id) {
    dropdown.value = null
    console.log('-----')
  } else {
    dropdown.value = id
  }
}

async function saveName(id) {
  console.log('saveName 被調用了')

  console.log(folderName.value)
  try {
    const res = await onEditFolder(renameInput.value, { name: editFolderName.value.name })

    console.log(res)

    workSpace.getAll()
  } catch (error) {
    console.log(error)
  }
}

function deleteFolder(id: string) {
  console.log(id)

  const filterResult = folders.value.filter(function (item) {
    return item.id !== id
  })

  console.log(filterResult)
  folders.value = filterResult
}

function addNotes() {
  router.push('/noteEditor/edit')
}

async function viewNotes(id) {
  console.log(id)

  workSpace.getReadNote(id)
  router.push(`/noteViewer/${id}`)
}

async function deleteNote(item) {
  console.log('準備刪除', item)
  try {
    const res = await onDeleteNote()

    console.log(res);
    deleteMessage.value = res.data.message //儲存刪除筆記訊息
    console.log(res.data.message)
    console.log(deleteMessage.value)

    setTimeout(() => {
      deleteMessage.value = null
      workSpace.getAll()
    }, 3000)


  } catch (error) {
    console.log(error)
    console.log(error.response.data.success)
    deleteMessage.value = error.response.data.success

    setTimeout(() => {
      deleteMessage.value = null
    }, 3000)  }
}
</script>

<template>
  <div class="md:w-full w-[85%] h-auto overflow-y-scroll mx-auto flex border border-base-300">
    <div class="md:flex flex-col gap-2 hidden">
      <div class="border border-base-300 w-56">
        <div class="border-b border-base-300 flex flex-col items-start gap-3 p-3">
          <div class="card card-side w-full flex gap-2 p-4 bg-base-100 shadow-sm">
            <div class="avatar">
              <div class="w-14 h-30 rounded-xl flex items-center">
                <img
                  v-if="authStore.userProfileData?.avatar_url"
                  class="w-14 h-14"
                  :src="authStore.userProfileData?.avatar_url"
                />
                <img v-else alt="使用者頭像" src="../assets/images/default-user.png" />
              </div>
            </div>
            <div class="card-body flex justify-center items-center flex-col truncate">
              <div>{{ authStore.userProfileData?.display_name }}</div>
              <div>新手工程師</div>
            </div>
          </div>

          <label class="input">
            <svg
              class="h-[1em] text-base-content/60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" class="search grow" placeholder="Search" />
          </label>
        </div>

        <!-- <div class="font-black text-base text-base-content p-3">資料夾</div>
        <div class=" p-3">
          <div class="">
            <div class="w-full flex justify-start items-center gap-2 p-3" v-for="item in workSpace.userAllFolder">
              <i class="fa-regular fa-folder text-[18px]"></i>
              <h2 class="text-[15px] font-black">{{ item.name }}</h2>
            </div>
          </div>
        </div> -->

        <div class="flex flex-col justify-center items-center gap-2">
          <div
            v-for="item in folders"
            :key="item.id"
            class="bg-base-200 hover:bg-base-300 w-[90%] flex justify-around p-4 rounded-xl transition-colors"
          >
            <div class="folder overflow-hidden whitespace-nowrap w-[120px] text-base-content">
              <div>{{ item.name }}</div>
              <label class="input" v-if="renameInput === item.id">
                <input type="text" class="w-full" placeholder="" />
              </label>
            </div>
            <button
              class="btn-reset w-[25px] h-[25px] shrink-0 rounded-full"
              @click="renameFolder(item.id)"
            >
              <i class="fa-solid fa-pen text-base text-base-content/60 hover:text-base-content"></i>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          class="menu bg-base-200 rounded-box w-56 flex flex-row items-center gap-2 pl-5 text-base-content"
        >
          <i class="fa-regular fa-bookmark text-sm text-base-content/60"></i>
          <div>收藏</div>
        </div>
        <div class="menu rounded-box w-56 flex flex-row items-center gap-2 pl-5 text-base-content">
          <div class="flex flex-col gap-3 min-w-0 flex-1">
            <div
              v-for="item in workSpace.rawNotes"
              :key="item.note_id"
              class="w-full p-0 bg-white truncate min-w-0 cursor-pointer"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="flex gap-2 md:p-2 justify-end p-4">
        <div class="flex w-[280px] gap-2">
          <div class="flex-1"></div>
          <button class="btn btn-primary flex-1" @click="addNotes">
            <i class="fa-solid fa-plus text-base"></i>
            <div>新增筆記</div>
          </button>
          <!-- <button class="btn flex-1" @click="addFolder">
            <i class="fa-solid fa-plus text-base"></i>
            <div>新增資料夾</div>
          </button> -->
        </div>
      </div>

      <div
        class="border border-base-300 flex gap-3 flex-wrap md:justify-start justify-center items-start"
      >
        <!-- <div class="w-full flex justify-start items-center gap-2 p-3">
          <i class="fa-regular fa-folder text-[22px]"></i>
          <h2 class="text-[20px] font-black">資料夾</h2>
        </div> -->
        <!-- <div
          class="card bg-base-100 border border-base-300 md:w-[320px] w-full shadow-sm"
          v-for="item in workSpace.userAllFolder"
          :key="item.id"
        >
          <div class="card-body flex flex-row justify-between">
            <div class="w-full">
              <h2 class="file-title font-black text-base text-base-content">
                {{ item.name }}
              </h2>
              <div v-if="renameInput === item.id" class="flex gap-2">
                <label class="input">
                  <input
                    type="text"
                    class="w-full"
                    placeholder="----"
                    v-model="editFolderName.name"
                  />
                </label>
                <button class="btn btn-primary btn-sm p-2" @click="saveName">保存</button>
              </div>

              <p class="text-sm text-base-content/60 w-[70%] pl-2">{{ item.notes.length }}個項目</p>
            </div>

            <div class="flex flex-col justify-center items-end relative">
              <button @click="selectOption(item.id)">
                <img src="@/assets/images/icon-more.png" class="w-[25px] h-[25px]" alt="" />
              </button>
              <ul
                class="menu bg-base-200 rounded-box w-36 absolute top-14 right-0 z-[5] text-base-content"
                v-if="dropdown === item.id"
              >
                <li>
                  <button @click="renameFolder(item.id)">
                    <i class="fa-solid fa-pen text-base-content/60"></i>
                    編輯資料夾
                  </button>
                </li>
                <li>
                  <button class="hover:text-error" @click="deleteFolder(item.id)">
                    <i class="fa-solid fa-trash"></i>
                    刪除資料夾
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <div class="w-full md:p-5">
          <div class="w-full flex items-center gap-2 p-3">
            <span class="material-symbols-outlined"> sell </span>

            <h2 class="text-[20px] font-black">無標籤</h2>
          </div>
          <ul class="list bg-base-100 rounded-box shadow-md w-full flex flex-col pr-5">
            <li
              class="list-row flex justify-between cursor-pointer"
              v-for="item in workSpace.rawNotes"
              :key="item.note_id"
              @click="viewNotes(item.note_id)"
            >
              <div class="flex gap-2">
                <img
                  class="shrink-0 w-[20px]"
                  src="@/assets/images/google-font-docs.svg"
                  alt="檔案"
                />
                <div class="md:w-[150px] w-[50px] overflow-hidden whitespace-nowrap">
                  {{ item.title }}
                </div>
              </div>
              <!-- <div>{{ item.created_at }}</div> -->
              <div>2026-01-01</div>

              <div class="flex gap-3">
                <!-- <button @click="renameFolder(item.id)" class="flex items-center">
                  <i class="fa-solid fa-pen text-base-content/60 text-[14px]"></i>
                </button> -->
                <button @click.stop="addPinningNote(item)" class="flex items-center">
                  <span
                    class="material-symbols-outlined text-[20px] transition-transform duration-150 active:scale-95"
                    :class="item.pinning ? 'text-base-content' : 'text-base-content/50'"
                    :style="{
                      fontVariationSettings: item.pinning
                        ? `'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 20`
                        : `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20`,
                    }"
                  >
                    keep
                  </span>
                </button>

                <button class="flex items-center gap-2" @click.stop="addfavoriteNote(item)">
                  <i
                    class="fa-regular fa-bookmark text-sm text-base-content/60 text-[14px]"
                    v-if="item.favorite"
                  ></i>
                  <i
                    class="fa-solid fa-bookmark text-sm text-base-content/60 text-[14px]"
                    v-else
                  ></i>
                </button>
                <!-- 刪除筆記功能 -->
                <button class="flex items-center gap-2" @click.stop="deleteNote(item)">
                  <i class="fa-solid fa-trash text-sm text-base-content/60 text-[14px]"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <dialog ref="addFolderdialog" class="modal">
      <div
        class="modal-box h-[200px] relative border border-base-300 flex justify-center items-center gap-3 flex-col"
      >
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

        <label class="text-base-content">請輸入新增的資料夾名稱</label>
        <input v-model="folderName" type="text" placeholder="" class="input" />

        <div class="flex gap-3">
          <button @click="addFolderName" class="btn btn-success">新增</button>
          <button class="btn btn-error">取消</button>
        </div>
      </div>
    </dialog>

    <!-- 編輯資料夾名稱彈窗 -->

    <div v-if="message" role="alert" class="alert alert-success h-[50px]">
      <span>資料夾：{{ folderName }} 新增成功</span>
    </div>


    <div class="absolute top-95 left-150">
      <!-- 成功訊息 -->
      <div role="alert" class="alert alert-success" v-if="deleteMessage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ deleteMessage }}</span>
      </div>
      <!-- 錯誤訊息 -->
      <div role="alert" class="alert alert-error" v-if="deleteMessage == false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>筆記刪除失敗</span>
      </div>
    </div>
  </div>
</template>

<style>
/* 確保 Font Awesome 圖示正確顯示 */
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
