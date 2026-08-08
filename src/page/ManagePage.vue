<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { onGetPublicNote, onReviewNote } from '@/api/method'
import { useworkSpace } from '@/stores/workSpace'

const workSpace = useworkSpace()
// 假資料
const mockNotes = [
  {
    note_id: '11161f92-8404-4748-adb3-3d7363f7b933',
    title: 'Vue 3 組合式 API 完整教學',
    content:
      '這是一篇關於 Vue 3 組合式 API 的詳細教學文章，包含 ref、reactive、computed 等核心概念...',
    is_public: true,
    author_id: 'cce75fc0-63ab-49ed-b636-e5c04a792c13',
    folder_id: null,
    category: 'Crimson',
    tags: ['Vue', 'JavaScript', '前端'],
    collaborators: [],
    created_at: '2026-02-09T10:30:00Z',
    updated_at: '2026-02-09T10:30:00Z',
    favorite: false,
    pinning: false,
    review_status: 'pending',
    review_messages: [],
    review_id: null,
  },
]

const notes = ref([])
const loading = ref(false)
const message = ref(null)
const selectedNote = ref(null)
const reviewModal = ref(null)
const reviewStatus = ref('approved')
const reviewMessage = ref('')
const currentReviewNote = ref(null) //正在審核的文章

// 載入假資料
async function fetchReviewNotes() {
  try {
    const res = await onGetPublicNote()

    console.log(res)
    console.log('admin', res)
    console.log('admin', res.data.notes)

    notes.value = [...res.data.notes]

    console.log(notes.value)
  } catch (error) {
    console.log(error)
  }
}

// 顯示訊息
function showMessage(msg) {
  message.value = msg
  setTimeout(() => {
    message.value = null
  }, 3000)
}

// 開啟審核對話框
function openReviewModal(note, status) {
  selectedNote.value = note
  reviewStatus.value = status
  reviewMessage.value = ''
  currentReviewNote.value = note.note_id

  console.log('審核對話框', currentReviewNote.value, reviewStatus.value, reviewMessage.value)

  if (reviewModal.value) {
    reviewModal.value.showModal()

    console.log('審核對話框', selectedNote.value, reviewStatus.value, reviewMessage.value)
  }
}

// 關閉審核對話框
function closeReviewModal() {
  if (reviewModal.value) {
    reviewModal.value.close()
  }
}

// 執行審核（僅更新本地狀態）
async function submitReview() {
  if (!selectedNote.value) return // 選取通過或拒絕
  const reviewData = {
    status: reviewStatus.value,
    message: reviewMessage.value,
  }
  try {
    const res = await onReviewNote(currentReviewNote.value, reviewData)
    console.log('審核文章', res)
    workSpace.onReadisPublicNote()
    // 更新本地狀態：找到對應的 note 並更新 review_status
    const noteIndex = notes.value.findIndex((note) => note.note_id === currentReviewNote.value)
    if (noteIndex !== -1) {
      notes.value[noteIndex].review_status = reviewStatus.value
    }

    // 顯示成功訊息
    showMessage(`文章已${reviewStatus.value === 'approved' ? '通過' : '拒絕'}審核`)

    closeReviewModal() //關閉審核彈窗
  } catch (error) {
    console.log(error)
    showMessage('審核失敗，請稍後再試')
  }
}

// 格式化日期
function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}/${month}/${day} ${hours}:${minutes}`
}

// 取得審核狀態標籤樣式
function getStatusBadgeClass(status) {
  switch (status) {
    case 'pending':
      return 'badge-warning badge-outline'
    case 'approved':
      return 'badge-success badge-outline'
    case 'rejected':
      return 'badge-error badge-outline'
    default:
      return 'badge-neutral badge-outline'
  }
}

// 取得審核狀態文字
function getStatusText(status) {
  switch (status) {
    case 'pending':
      return '待審核'
    case 'approved':
      return '已通過'
    case 'rejected':
      return '已拒絕'
    default:
      return status
  }
}

onMounted(() => {
  fetchReviewNotes()
})
</script>

<template>
  <div class="min-h-screen bg-base-200/50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 標題區域 -->
      <div class="mb-6">
        <div class="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-base-content mb-2">文章審核管理</h1>
              <p class="text-base-content/60">管理所有使用者的文章審核狀態</p>
            </div>
            <button
              class="btn btn-primary btn-sm gap-2"
              @click="fetchReviewNotes"
              :disabled="loading"
            >
              <span v-if="loading" class="loading loading-spinner loading-xs"></span>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {{ loading ? '載入中...' : '重新整理' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 訊息提示 -->
      <transition name="fade">
        <div v-if="message" class="mb-4">
          <div class="alert alert-info shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ message }}</span>
          </div>
        </div>
      </transition>

      <!-- 文章列表表格 -->
      <div class="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 overflow-hidden">
        <div class="p-6 border-b border-base-300/50">
          <h2 class="text-xl font-semibold text-base-content">待審核文章列表</h2>
        </div>

        <!-- 表格 -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr class="bg-base-200/50">
                <th class="text-left font-semibold text-base-content/80">標題</th>
                <th class="text-center font-semibold text-base-content/80">作者 ID</th>
                <th class="text-center font-semibold text-base-content/80">分類</th>
                <th class="text-center font-semibold text-base-content/80">公開</th>
                <th class="text-center font-semibold text-base-content/80">標籤</th>
                <th class="text-center font-semibold text-base-content/80">審核狀態</th>
                <th class="text-center font-semibold text-base-content/80">建立時間</th>
                <th class="text-center font-semibold text-base-content/80">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="8" class="text-center py-12">
                  <span class="loading loading-spinner loading-lg text-primary"></span>
                </td>
              </tr>
              <tr v-else-if="notes.length === 0">
                <td colspan="8" class="text-center py-12">
                  <div class="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12 text-base-content/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p class="text-base-content/60">目前沒有待審核的文章</p>
                  </div>
                </td>
              </tr>
              <tr
                v-else
                v-for="note in notes"
                :key="note.note_id"
                class="hover:bg-base-200/30 transition-colors border-b border-base-300/30"
              >
                <td class="py-4">
                  <div class="max-w-xs">
                    <div class="font-semibold text-base-content mb-1 line-clamp-1">
                      {{ note.title || '-' }}
                    </div>
                    <div class="text-xs text-base-content/50 line-clamp-2 leading-relaxed">
                      {{ note.content?.substring(0, 60) || '-' }}
                    </div>
                  </div>
                </td>
                <td class="text-center py-4">
                  <div
                    class="text-xs font-mono text-base-content/70 bg-base-200/50 px-2 py-1 rounded inline-block"
                  >
                    {{ note.author_id?.substring(0, 8) || '-' }}...
                  </div>
                </td>
                <td class="text-center py-4">
                  <span v-if="note.category" class="badge badge-sm badge-outline badge-primary">
                    {{ note.category }}
                  </span>
                  <span v-else class="text-base-content/40">-</span>
                </td>
                <td class="text-center py-4">
                  <div class="flex justify-center">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      :checked="note.is_public"
                      disabled
                    />
                  </div>
                </td>
                <td class="text-center py-4">
                  <div class="flex flex-wrap gap-1 justify-center max-w-[150px]">
                    <span
                      v-for="tag in (note.tags || []).slice(0, 2)"
                      :key="tag"
                      class="badge badge-xs badge-ghost"
                    >
                      {{ tag }}
                    </span>
                    <span
                      v-if="(note.tags || []).length > 2"
                      class="badge badge-xs badge-ghost text-base-content/50"
                    >
                      +{{ (note.tags || []).length - 2 }}
                    </span>
                    <span
                      v-if="(note.tags || []).length === 0"
                      class="text-base-content/40 text-xs"
                    >
                      -
                    </span>
                  </div>
                </td>
                <td class="text-center py-4">
                  <span
                    class="badge badge-sm font-medium"
                    :class="getStatusBadgeClass(note.review_status)"
                  >
                    {{ getStatusText(note.review_status) }}
                  </span>
                </td>
                <td class="text-center py-4">
                  <div class="text-xs text-base-content/70 whitespace-nowrap">
                    {{ formatDate(note.created_at) }}
                  </div>
                </td>
                <td class="text-center py-4">
                  <div class="flex gap-1.5 justify-center">
                    <button
                      class="btn btn-xs btn-success gap-1"
                      @click="openReviewModal(note, 'approved')"
                      :disabled="note.review_status === 'approved'"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      通過
                    </button>
                    <button
                      class="btn btn-xs btn-error gap-1"
                      @click="openReviewModal(note, 'rejected')"
                      :disabled="note.review_status === 'rejected'"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      拒絕
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 審核對話框 -->
    <dialog ref="reviewModal" class="modal">
      <div class="modal-box max-w-md">
        <h3 class="font-bold text-xl mb-6 flex items-center gap-2">
          <span
            class="badge badge-lg"
            :class="reviewStatus === 'approved' ? 'badge-success' : 'badge-error'"
          >
            {{ reviewStatus === 'approved' ? '✓' : '✗' }}
          </span>
          {{ reviewStatus === 'approved' ? '通過審核' : '拒絕審核' }}
        </h3>

        <div v-if="selectedNote" class="space-y-4">
          <div class="bg-base-200/50 rounded-lg p-4">
            <label class="label py-0 mb-2">
              <span class="label-text font-semibold">文章標題</span>
            </label>
            <div class="text-base-content font-medium">{{ selectedNote.title }}</div>
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">審核訊息（選填）</span>
            </label>
            <textarea
              v-model="reviewMessage"
              class="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="輸入審核意見..."
              rows="4"
            ></textarea>
          </div>
        </div>

        <div class="modal-action gap-2 pt-2">
          <button class="btn btn-ghost" @click="closeReviewModal">取消</button>
          <button
            class="btn gap-2"
            :class="reviewStatus === 'approved' ? 'btn-success' : 'btn-error'"
            @click="submitReview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            確認{{ reviewStatus === 'approved' ? '通過' : '拒絕' }}
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop bg-black/50">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
