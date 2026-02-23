<script setup lang="ts">
defineProps<{
  open: boolean
  showUser: boolean
  menuStatus: boolean
  drawPhoneList: boolean
  avatarUrl?: string | null
}>()

const emit = defineEmits<{
  (e: 'close-menu'): void
  (e: 'open-login'): void
  (e: 'open-register'): void
  (e: 'toggle-phone-draw'): void
  (e: 'logout'): void
}>()
</script>

<template>
  <div
    class="flex flex-col h-[320px] py-3 items-center absolute right-0 top-[100px] z-50"
    v-if="open"
  >
    <ul
      class="menu menu-vertical w-[250px] lg:menu-horizontal rounded-box md:hidden bg-base-200 flex flex-col items-center justify-center gap-3"
    >
      <li
        class="text-base absolute top-0 w-full flex justify-end items-end"
        @click="emit('close-menu')"
      >
        <i class="fa-solid fa-x"></i>
      </li>

      <li class="text-base"><RouterLink to="/"> 首頁</RouterLink></li>
      <li class="text-base"><RouterLink to="/about"> 關於 </RouterLink></li>
      <li class="text-base"><RouterLink to="/teaching"> 教學</RouterLink></li>

      <!-- 未登入：登入/註冊 -->
      <li class="text-base w-[80%]" v-if="!showUser">
        <button class="btn btn-primary md:hidden flex w-full" @click="emit('open-login')">
          登入
        </button>
      </li>

      <li class="text-base w-[80%]" v-if="!showUser">
        <button
          class="btn btn-soft btn-primary md:hidden flex w-full"
          @click="emit('open-register')"
        >
          註冊
        </button>
      </li>

      <!-- 已登入：頭像按鈕 -->
      <li class="text-base w-[80%] p-2" v-if="showUser">
        <button
          class="md:hidden flex justify-center items-center w-full border-none"
          @click="emit('toggle-phone-draw')"
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
      </li>

      <!-- 已登入：控制項 -->
      <li
        class="text-base w-[80%] flex flex-col justify-center items-center gap-2 p-2"
        v-if="drawPhoneList"
      >
        <div class="text-base text-right p-1">
          <RouterLink to="/noteProfile"> 個人檔案</RouterLink>
        </div>
        <div class="text-base text-right p-1">
          <RouterLink to="/noteSpace"> 筆記工作站 </RouterLink>
        </div>
        <div class="text-base text-right p-1">
          <RouterLink to="/teaching" @click="emit('logout')"> 登出</RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>
