<script setup lang="ts">
defineProps<{
  open: boolean
  isAdmin: boolean
}>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()
</script>

<template>
  <div v-if="open" class="bg-base-200 flex flex-col gap-2 absolute w-[120px] right-6 top-20 z-50">
    <div class="text-base text-right p-1">
      <RouterLink to="/noteProfile"> 個人檔案</RouterLink>
    </div>
    <div class="text-base text-right p-1">
      <RouterLink to="/noteSpace"> 筆記工作站 </RouterLink>
    </div>
    <div class="text-base text-right p-1" v-if="isAdmin">
      <RouterLink to="/manage">管理員後台</RouterLink>
    </div>
    <div class="text-base text-right p-1">
      <RouterLink to="/teaching" @click="emit('logout')"> 登出 </RouterLink>
    </div>
  </div>
</template>
