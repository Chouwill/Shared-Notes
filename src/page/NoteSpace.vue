<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'

interface InoteLists {
  id: string
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

const noteLists = ref<InoteLists[]>([
  {
    id: '1',
    title: 'ddd',
    updateDate: '00000',
    isFavorite: false,
    tags: ['1', '2'],
    pinning: false,
    folderId: '',
  },
])
const folders = ref<Ifolders[]>([])
const favoriteNotes = ref<Ifolders[]>([])

const selectedNote = ref<number[]>([])

const addFolderdialog = ref<null>(null)

const folderName = ref<string>('請輸入資料夾名稱')

const message = ref(false)

function addFolderName() {
  console.log(folderName.value)
  if (!folderName.value) return // 如果沒有名字就不做動作

  folders.value = [...folders.value, { id: nanoid(), name: folderName.value }]

  console.log(folders.value)
  closeDialog()

  message.value = true

  setTimeout(() => {
    message.value = false
  }, 1500)
}

function addFolder() {
  addFolderdialog.value.showModal()
  // const name = prompt('新資料夾')
}

function addfavoriteNotes(item) {
  // console.log('22', item)

  if (item.isFavorite === false) {
    item.isFavorite = !item.isFavorite
    console.log('更新的資料', noteLists.value)
  }
}

function closeDialog() {
  addFolderdialog.value.close()
}
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto py-8 flex border-2">
    <div class="flex flex-col gap-10">
      <div class="!border overflow-x-hidden w-56">
        <div class="border p-3 bg-[#2D01A5]">
          <button class="w-full h-[25px] flex flex-row items-center gap-3">
            <i class="fa-solid fa-plus text-sm"></i>
            <div class="flex flex-row text-base-200">建立我的筆記</div>
          </button>
        </div>
        <details class="rounded-box">
          <summary class="menu-title">我的筆記</summary>
          <ul>
            <li v-for="item in folders" :key="item.id" class="pl-3 text-base-200">
              <div class="flex overflow-x-hidden items-center gap-3">
                <!-- 文字區：只能吃剩餘空間，超過就裁 -->
                <div class="flex-1 min-w-0 overflo-x-hidden truncate p-1ㄙㄩㄣ">
                  <p class="text-black">{{ item.name }}</p>
                </div>

                <!-- 按鈕區：固定寬度，永不換行 -->
                <button class="btn-reset w-[25px] h-[25px] shrink-0 rounded-full">
                  <i class="fa-solid fa-pen text-base text-black"></i>
                </button>
              </div>
            </li>
          </ul>
        </details>
      </div>
      <div>
        <div class="menu bg-base-200 rounded-box w-56 flex flex-row items-center gap-2 pl-5">
          <i class="fa-regular fa-bookmark text-sm"></i>
          <div>收藏</div>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <div class="!border w-[150px]">
        <button
          @click="addFolder"
          class="btn-reset w-[75px] h-[25px] rounded-full"
        >
          <i class="fa-solid fa-plus text-base"></i>
          <div>新增資料夾</div>
        </button>
      </div>
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>文章標題</th>
            <th>更新時間</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="item in noteLists" :key="item.id">
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle h-10 w-10">
                    <img src="../assets/images/google-font-docs.svg" alt="" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ item.title }}</div>
                  <div class="text-sm opacity-50">{{ item.title }}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="badge badge-ghost badge-sm">{{ item.updateDate }}</span>
            </td>
            <td class="border-5">
              <div class="flex">
                <button class=" w-[25px] h-[25px] rounded-full">
                  <i class="fa-solid fa-thumbtack text-base"></i>
                </button>
                <button class=" w-[25px] h-[25px] rounded-full">
                  <i class="fa-solid fa-tag text-base"></i>
                </button>
                <button class=" w-[25px] h-[25px] rounded-full">
                  <i class="fa-solid fa-pen text-base"></i>
                </button>

                <button class=" w-[25px] h-[25px] flex justify-center items-center rounded-full">
                  <!-- <img
                    class="w-[16px] h-[16px]"
                    src="../assets/images/bookmark-regular-full.svg"
                    alt=""
                  /> -->
                  <i class="fa-solid fa-bookmark"></i>
                </button>

                <button
                  @click="addfavoriteNotes(item)"
                  class="btn-reset w-[32px] h-[32px] flex justify-center items-center  rounded-full relative z-10"
                  style="min-width: 32px; min-height: 32px"
                >
                  <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>

    <dialog ref="addFolderdialog" class="modal">
      <div
        class="modal-box h-[200px] relative border-2 flex justify-center items-center gap-3 flex-col"
      >
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

        <label>請輸入新增的資料夾名稱</label>
        <input v-model="folderName" type="text" placeholder="" class="input" />

        <div class="flex gap-3">
          <button @click="addFolderName" class="btn btn-success">新增</button>
          <button class="btn btn-error">取消</button>
        </div>
      </div>
    </dialog>

    <div v-if="message" role="alert" class="alert alert-success h-[50px]">
      <span>資料夾：{{ folderName }} 新增成功</span>
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
