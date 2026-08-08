<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  showAddFolder: boolean
  folderName: string
  message: boolean
  deleteMessage: string | null
}>()

const emit = defineEmits<{
  (e: 'update:folderName', value: string): void
  (e: 'confirm-add-folder'): void
  (e: 'close-add-folder'): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

defineExpose({
  open() {
    dialogRef.value?.showModal()
  },
  close() {
    dialogRef.value?.close()
  },
})
</script>

<template>
  <!-- 新增資料夾 Dialog -->
  <dialog ref="dialogRef" class="modal">
    <div
      class="modal-box h-[200px] relative border border-base-300 flex justify-center items-center gap-3 flex-col"
    >
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="emit('close-add-folder')"
      >
        ✕
      </button>

      <label class="text-base-content">請輸入新增的資料夾名稱</label>

      <input
        :value="folderName"
        @input="emit('update:folderName', ($event.target as HTMLInputElement).value)"
        type="text"
        class="input"
      />

      <div class="flex gap-3">
        <button @click="emit('confirm-add-folder')" class="btn btn-success">新增</button>
        <button class="btn btn-error" @click="emit('close-add-folder')">取消</button>
      </div>
    </div>
  </dialog>

  <!-- 新增成功訊息 -->
  <div v-if="message" role="alert" class="alert alert-success h-[50px]">
    <span>資料夾：{{ folderName }} 新增成功</span>
  </div>

  <!-- 刪除成功 -->
  <div v-if="deleteMessage" role="alert" class="alert alert-success absolute top-95 left-150">
    <span>{{ deleteMessage }}</span>
  </div>
</template>
