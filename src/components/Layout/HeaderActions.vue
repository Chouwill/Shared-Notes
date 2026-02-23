<script setup lang="ts">
defineProps<{
  showUser: boolean
  avatarUrl?: string | null
  showMenuIcon: boolean
}>()

const emit = defineEmits<{
  (e: 'open-login'): void
  (e: 'open-register'): void
  (e: 'toggle-user-dropdown'): void
  (e: 'toggle-mobile-menu'): void
}>()
</script>

<template>
  <div class="member flex justify-center items-center gap-2">
    <!-- 未登入 -->
    <button v-if="!showUser" class="btn btn-primary md:flex hidden" @click="emit('open-login')">
      登入
    </button>

    <button
      v-if="!showUser"
      class="btn btn-soft btn-primary md:flex hidden"
      @click="emit('open-register')"
    >
      註冊
    </button>

    <!-- 已登入：桌機頭像 -->
    <button
      v-if="showUser"
      class="md:flex hidden justify-center items-center w-full border-none relative"
      @click="emit('toggle-user-dropdown')"
    >
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        alt="使用者頭像"
        class="w-[50px] h-[50px] object-cover rounded-full"
      />
      <img
        v-else
        class="w-[50px] h-[50px] object-cover rounded-full"
        src="@/assets/images/default-user.png"
        alt="預設User"
      />
    </button>

    <!-- 手機：漢堡 -->
    <button
      class="border-none flex md:hidden filter-none hover:filter-none"
      @click="emit('toggle-mobile-menu')"
    >
      <span class="material-symbols-outlined" v-if="showMenuIcon"> menu </span>
    </button>
  </div>
</template>
