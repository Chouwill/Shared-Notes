<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar.vue'
import WorkspaceNoteList from '@/components/workspace/WorkspaceNoteList.vue'
import WorkspaceDialogs from '@/components/workspace/WorkspaceDialogs.vue'
import { useRouter } from 'vue-router'
import { useworkSpace } from '@/stores/workSpace'
import { useAuthStore } from '@/stores/auth'
import { onEditFolder, onDeleteNote } from '@/api/method'

const router = useRouter()
const workSpace = useworkSpace()
const authStore = useAuthStore()

/* -------------------- UI State -------------------- */

const searchNoteValue = ref('')
const renameInput = ref<string | null>(null)
const folderName = ref('')
const message = ref(false)
const deleteMessage = ref<string | null>(null)
const dropdown = ref<string | null>(null)
const dialogsRef = ref<any>(null)

/* -------------------- Init -------------------- */

onMounted(async () => {
  await Promise.all([workSpace.getAll(), workSpace.getFavorites()])
})

/* -------------------- Folder -------------------- */

async function addFolderName() {
  if (!folderName.value.trim()) return

  await workSpace.createFolder({ name: folderName.value })

  closeDialog()
  folderName.value = ''

  message.value = true
  setTimeout(() => (message.value = false), 1500)
}

function closeDialog() {
  dialogsRef.value?.close()
}

function renameFolder(id: string) {
  renameInput.value = id
  dropdown.value = null
}

async function saveName() {
  if (!renameInput.value) return

  await onEditFolder(renameInput.value, { name: folderName.value })
  await workSpace.getAll()
  renameInput.value = null
}

function selectOption(id: string) {
  dropdown.value = dropdown.value === id ? null : id
}

/* -------------------- Notes -------------------- */

function addNotes() {
  router.push('/noteEditor/edit')
}

async function viewNotes(id: string) {
  await workSpace.getReadNote(id)
  router.push(`/noteViewer/${id}`)
}

async function addfavoriteNote(item: any) {
  await workSpace.addFavoritelist(item.note_id, {
    favorite: !item.favorite,
  })
}

async function addPinningNote(item: any) {
  await workSpace.addPinninglist(item.note_id, {
    pinning: !item.pinning,
  })
}

function openFavoriteNote(item: any) {
  const currentUserId = authStore.userProfileData?.id ?? authStore.userProfileData?.user_id

  const isAuthor = item.author_id && currentUserId && item.author_id === currentUserId

  if (isAuthor) {
    workSpace.getReadNote(item.note_id)
    router.push(`/noteViewer/${item.note_id}`)
  } else {
    router.push(`/visiteNotes/${item.note_id}`)
  }
}

async function deleteNote(item: any) {
  try {
    const res = await onDeleteNote(item.note_id)
    deleteMessage.value = res.data.message

    setTimeout(async () => {
      deleteMessage.value = null
      await workSpace.getAll()
    }, 2000)
  } catch (error: any) {
    deleteMessage.value = error?.response?.data?.message ?? '刪除失敗'
    setTimeout(() => (deleteMessage.value = null), 2000)
  }
}

/* -------------------- Search -------------------- */

const filterSearch = computed(() => {
  if (!searchNoteValue.value.trim()) {
    return workSpace.rawNotes
  }

  return workSpace.rawNotes.filter((note) =>
    note.title.toLowerCase().includes(searchNoteValue.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="md:w-full w-[85%] h-auto overflow-y-scroll mx-auto flex border border-base-300">
    <WorkspaceSidebar
      :avatar-url="authStore.userProfileData?.avatar_url || null"
      :display-name="authStore.userProfileData?.display_name"
      :search-value="searchNoteValue"
      :folders="workSpace.userAllFolder"
      :rename-id="renameInput"
      :favorite-notes="workSpace.favoritelistNotes ?? []"
      @update:searchValue="searchNoteValue = $event"
      @click-favorite="openFavoriteNote"
      @click-rename-folder="renameFolder"
    />

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
        <WorkspaceNoteList
          :notes="filterSearch"
          @view="viewNotes"
          @pin="addPinningNote"
          @favorite="addfavoriteNote"
          @delete="deleteNote"
        />
      </div>
    </div>

    <WorkspaceDialogs
      ref="dialogsRef"
      :folder-name="folderName"
      :message="message"
      :delete-message="deleteMessage"
      @update:folderName="folderName = $event"
      @confirm-add-folder="addFolderName"
      @close-add-folder="closeDialog"
    />
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
