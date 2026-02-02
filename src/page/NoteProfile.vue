<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useworkSpace } from '@/stores/workSpace'
import { onuploadProfile, oneditProfile } from '@/api/method'

const userStore = useAuthStore()
const workSpace = useworkSpace()

// 編輯/預覽模式切換
const isEditMode = ref(false)

// Tab 切換（所有公開筆記 / 讚賞列表）
const activeTab = ref('notes')

// Loading 狀態
const isLoading = ref(false)

// 編輯表單資料（用於雙向綁定）
const editForm = ref({
  display_name: '',
  avatar_url: '',
  birthday: '',
  bio: '',
})

const fromError = ref(null)
const errorTimer = ref(null)

// 使用 computed 來確保響應式更新
const profileData = computed(() => userStore.userProfileData)

async function getUserProfile() {
  try {
    isLoading.value = true
    await userStore.getProfile()
    console.log('載入的個人資料:', userStore.userProfileData)
  } catch (error) {
    console.error('載入個人資料失敗:', error)
  } finally {
    isLoading.value = false
  }
}

// 組件掛載時載入資料
onMounted(() => {
  getUserProfile()
})

// 切換到編輯模式
function enterEditMode() {
  if (!profileData.value) {
    console.warn('個人資料尚未載入')
    return
  }
  // 將現有資料複製到編輯表單
  editForm.value = {
    display_name: profileData.value.display_name || '',
    avatar_url: profileData.value.avatar_url || '',
    birthday: profileData.value.birthday || '',
    bio: profileData.value.bio || '',
  }
  isEditMode.value = true
}

// 取消編輯
function cancelEdit() {
  isEditMode.value = false
}

// 取得上傳的圖片檔案
async function updateDateAvatar(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    alert('請選擇圖片檔案')
    return
  }

  // 先預覽圖片
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    if (result) {
      editForm.value.avatar_url = result
    }
  }
  reader.readAsDataURL(file)

  // 上傳圖片
  const fd = new FormData()
  fd.append('avatar', file)

  try {
    const res = await onuploadProfile(fd)
    console.log('更新的會員大頭貼', res)

    if (res.data?.avatar_url) {
      editForm.value.avatar_url = res.data.avatar_url
      await getUserProfile()
    }
  } catch (error) {
    console.log(error)
    alert('上傳失敗，請稍後再試')
    // 上傳失敗時恢復原來的頭像
    editForm.value.avatar_url = profileData.value?.avatar_url || ''
  }
}

// 更新會員檔案
async function updateDateProfile() {
  try {
    // 清除之前的錯誤和計時器
    if (errorTimer.value) {
      clearTimeout(errorTimer.value)
      errorTimer.value = null
    }
    fromError.value = null

    const res = await oneditProfile(editForm.value)
    console.log(res)

    userStore.getProfile()
    isEditMode.value = false // 成功後關閉編輯模式
  } catch (error) {
    console.log(error)
    fromError.value = error.response?.data?.message || error.message || '更新失敗'
    console.log(fromError.value)

    // 5 秒後自動清除錯誤訊息
    if (errorTimer.value) {
      clearTimeout(errorTimer.value)
    }
    errorTimer.value = setTimeout(() => {
      fromError.value = null
      errorTimer.value = null
    }, 5000)
  }
}

// 格式化日期顯示
function formatDate(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}
</script>

<template>
  <div class="w-full max-w-[1280px] mx-auto py-3 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="profileData" class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 min-w-0">
      <aside class="lg:w-64 w-full shrink-0">
        <div class="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
          <div class="flex flex-col items-center gap-3 sm:gap-4 lg:items-start">
            <div class="avatar mb-2 sm:mb-4">
              <div
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-base-content/10 overflow-hidden bg-base-200 flex items-center justify-center"
              >
                <img
                  v-if="profileData.avatar_url"
                  :src="profileData.avatar_url"
                  alt="頭像"
                  class="w-full h-full object-cover"
                  @error="
                    (e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }
                  "
                />
                <i v-else class="fa-solid fa-user text-2xl sm:text-3xl text-base-content/40"></i>
              </div>
            </div>
            <h1
              class="text-lg sm:text-xl font-bold text-base-content mb-1 text-center lg:text-left"
            >
              {{ profileData.display_name || '' }}
            </h1>

            <div class="flex gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
              <div>
                <span class="font-semibold">{{ workSpace.rawNotes.length }}個</span>
                <span class="text-base-content/60 ml-1">筆記</span>
              </div>
            </div>

            <p
              class="text-xs sm:text-sm text-base-content/70 leading-relaxed mb-3 sm:mb-4 text-center lg:text-left px-2 sm:px-0"
            >
              {{ profileData.bio || '' }}
            </p>

            <div
              v-if="profileData.birthday"
              class="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-base-content/60 mb-4 sm:mb-6"
            >
              <i class="fa-regular fa-calendar"></i>
              <span>{{ formatDate(profileData.birthday) }}</span>
            </div>

            <button v-if="!isEditMode" class="btn btn-primary btn-sm" @click="enterEditMode">
              <i class="fa-solid fa-pen"></i>
              修改個人資料
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 min-w-0">
        <div
          v-if="!isEditMode"
          class="mb-4 sm:mb-6 border-b border-base-content/10 overflow-x-hidden"
        >
          <div class="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden -mx-1 px-1">
            <button
              @click="activeTab = 'notes'"
              class="pb-2 sm:pb-3 px-1 text-sm sm:text-base font-medium transition-colors relative whitespace-nowrap"
              :class="
                activeTab === 'notes'
                  ? 'text-base-content border-b-2 border-primary'
                  : 'text-base-content/60 hover:text-base-content'
              "
            >
              所有公開筆記
            </button>
          </div>
        </div>

        <div v-if="isEditMode" class="bg-base-100 rounded-lg p-4 sm:p-6 shadow-sm">
          <div class="mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-base-content mb-1 sm:mb-2">
              編輯個人資料
            </h2>
            <p class="text-xs sm:text-sm text-base-content/60">更新您的公開個人資訊</p>
          </div>

          <div class="space-y-4 sm:space-y-6 flex flex-col gap-3 sm:gap-4">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div class="flex items-center gap-3 sm:gap-4 w-full sm:flex-1 min-w-0">
                <div class="avatar shrink-0">
                  <div
                    class="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-base-content/10 overflow-hidden shrink-0 bg-base-200 flex items-center justify-center"
                  >
                    <img
                      v-if="editForm.avatar_url"
                      :src="editForm.avatar_url"
                      alt="頭像預覽"
                      class="w-full h-full object-cover"
                      @error="
                        (e) => {
                          ;(e.target as HTMLImageElement).style.display = 'none'
                        }
                      "
                    />
                    <i v-else class="fa-solid fa-user text-xl sm:text-2xl text-base-content/40"></i>
                  </div>
                </div>
                <!-- <input
                  v-model="editForm.avatar_url"
                  type="text"
                  placeholder="輸入頭像網址"
                  class="input input-bordered flex-1 min-w-0 text-sm sm:text-base"
                  disabled
                /> -->
              </div>

              <input
                ref="avatarFileInput"
                type="file"
                accept="image/*"
                class="file-input file-input-bordered file-input-primary w-full min-w-0 sm:max-w-xs text-xs sm:text-sm"
                @change="updateDateAvatar"
              />
            </div>

            <div>
              <label class="block text-xs sm:text-sm font-semibold text-base-content mb-1 sm:mb-2">
                顯示名稱
              </label>
              <input
                v-model="editForm.display_name"
                type="text"
                placeholder="輸入顯示名稱"
                class="input input-bordered w-full min-w-0 text-sm sm:text-base"
              />
            </div>

            <div>
              <label class="block text-xs sm:text-sm font-semibold text-base-content mb-1 sm:mb-2">
                生日
              </label>
              <input
                v-model="editForm.birthday"
                type="date"
                class="input input-bordered w-full min-w-0 text-sm sm:text-base"
              />
            </div>

            <div>
              <label class="block text-xs sm:text-sm font-semibold text-base-content mb-1 sm:mb-2">
                個人簡介
              </label>
              <textarea
                v-model="editForm.bio"
                class="textarea textarea-bordered w-full min-w-0 h-20 sm:h-24 text-sm sm:text-base"
                placeholder="說說您自己..."
              ></textarea>
            </div>
            <div
              v-if="fromError"
              class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
            >
              <div role="alert" class="alert alert-error">
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
                <span>{{ fromError }}</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <button
                class="btn btn-ghost btn-sm sm:btn-md flex-1 sm:flex-none"
                @click="cancelEdit"
              >
                取消
              </button>
              <button
                class="btn btn-primary btn-sm sm:btn-md flex-1 sm:flex-none"
                @click="updateDateProfile"
              >
                儲存
              </button>
            </div>
          </div>
        </div>

        <div class="" v-else>
          <div v-if="activeTab === 'notes'" class="space-y-3 sm:space-y-4 py-3">
            <div
              v-if="workSpace.rawNotes.length === 0"
              class="bg-base-100 rounded-lg p-8 text-center text-base-content/60"
            >
              目前沒有任何公開筆記
            </div>
            <div class="flex flex-col gap-4 min-w-0">
              <div
                v-for="note in workSpace.rawNotes"
                :key="note.id"
                class="bg-base-100 w-full md:w-[70%] relative flex flex-col gap-4 p-5 sm:p-6 md:p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-base-content/5 hover:border-base-content/15 rounded-xl shadow-sm min-w-0"
              >
                <h3
                  class="w-full text-xl sm:text-2xl font-bold text-base-content mb-1 hover:text-primary transition-colors break-words leading-tight"
                >
                  {{ note.title }}
                </h3>

                <p
                  class="text-sm sm:text-base text-base-content/65 mb-2 sm:mb-3 leading-relaxed line-clamp-2 break-words"
                >
                  {{ note.content }}
                </p>

                <div
                  class="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-base-content/55 relative mt-auto pt-2 border-t border-base-content/5"
                >
                  <div class="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <span class="truncate">
                      {{ (note.created_at || note.updated_at).split('T')[0] }}
                    </span>
                  </div>

                  <div
                    class="flex items-center gap-1.5 sm:gap-2 absolute top-2 right-0 md:relative md:top-auto md:right-auto"
                  >
                    <i
                      class="fa-solid fa-bookmark text-base sm:text-lg hover:text-primary active:text-primary transition-colors"
                    ></i>
                    <span>{{ note.favoriteCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="space-y-3 sm:space-y-4">
            <div
              v-if="likedNotes.length === 0"
              class="bg-base-100 rounded-lg p-8 text-center text-base-content/60"
            >
              目前沒有任何讚賞的筆記
            </div>
            <div
              v-for="note in likedNotes"
              :key="note.id"
              class="bg-base-100 flex flex-col gap-2 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-base-content/10"
            >
              <h3
                class="text-lg block sm:text-xl font-bold text-base-content py-2 hover:text-primary transition-colors"
              >
                {{ note.title }}
              </h3>

              <p
                class="text-sm sm:text-base text-base-content/70 mb-3 sm:mb-4 leading-relaxed line-clamp-2"
              >
                {{ note.content }}
              </p>

              <div
                class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-base-content/60"
              >
                <div class="flex items-center gap-1 sm:gap-1.5">
                  <i class="fa-regular fa-calendar text-xs"></i>
                  <span>{{ note.date }}</span>
                </div>

                <div class="flex items-center gap-1 sm:gap-1.5">
                  <i class="fa-regular fa-heart text-xs"></i>
                  <span>{{ note.likeCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-else class="flex justify-center items-center py-20">
      <div class="text-center">
        <p class="text-base-content/60 mb-4">無法載入個人資料</p>
        <button class="btn btn-primary btn-sm" @click="getUserProfile">重新載入</button>
      </div>
    </div>
  </div>
</template>

<style>
.fa-solid,
.fa-regular,
.fa-brands,
.fa-solid::before,
.fa-regular::before,
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
  font-weight: 400 !important;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

* {
  max-width: 100%;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
