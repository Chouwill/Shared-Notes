<script setup lang="ts">
import { ref } from 'vue'
import HeaderNavLinks from '@/components/Layout/HeaderNavLinks.vue'
import HeaderUserDropdown from '@/components/Layout/HeaderUserDropdown.vue'
import HeaderMobileMenu from '@/components/Layout/HeaderMobileMenu.vue'
import HeaderActions from '@/components/Layout/HeaderActions.vue'
import HeaderAuthModals from '@/components/Auth/HeaderAuthModals.vue'
import { useAuthStore } from '@/stores/auth'

const phoneMenu = ref(false) //手機選單
const drawList = ref(false) // 登入後的控制項
const drawPhoneList = ref(false) // 手機版登入後的控制項

const authStore = useAuthStore()

const authModalRef = ref(null) // 登入彈窗

function openLogin() {
  authModalRef.value?.openLogin()
}

function openRegister() {
  authModalRef.value?.openRegister()
}

function handleMenu() {
  phoneMenu.value = !phoneMenu.value
}

function closeMenu() {
  phoneMenu.value = false
}

function openDraw() {
  drawList.value = !drawList.value
}
function openPhoneDraw() {
  drawPhoneList.value = !drawPhoneList.value
}

function onLogout() {
  authStore.userLogout()
  phoneMenu.value = false
  drawList.value = false
  drawPhoneList.value = false
}
</script>

<template>
  <div
    class="w-full flex justify-center items-center h-[100px] bg-base-200 text-base-content shadow-md backdrop-blur-sm overflow-visible relative"
  >
    <div class="w-full md:w-[85%] mx-auto flex md:justify-between justify-around">
      <div class="w-[90px] h-full flex justify-center items-center">
        <img class="w-full h-[50px]" src="@/assets/images/Shared-Notes.png" alt="Shared-Notes" />
      </div>

      <div class="flex items-center">
        <HeaderNavLinks />
      </div>

      <HeaderMobileMenu
        :open="phoneMenu"
        :show-user="authStore.showUser"
        :draw-phone-list="drawPhoneList"
        :avatar-url="authStore.userProfileData?.avatar_url || null"
        @close-menu="closeMenu"
        @open-login="openLogin"
        @open-register="openRegister"
        @toggle-phone-draw="openPhoneDraw"
        @logout="onLogout"
      />

      <HeaderActions
        :show-user="authStore.showUser"
        :avatar-url="authStore.userProfileData?.avatar_url || null"
        :show-menu-icon="!phoneMenu"
        @open-login="openLogin"
        @open-register="openRegister"
        @toggle-user-dropdown="openDraw"
        @toggle-mobile-menu="handleMenu"
      />
    </div>
    <div>
      <HeaderUserDropdown
        :open="drawList"
        :is-admin="authStore.currentRole === 'admin'"
        @logout="onLogout"
      />
    </div>
    <HeaderAuthModals ref="authModalRef" />
  </div>
</template>

<style scoped></style>
