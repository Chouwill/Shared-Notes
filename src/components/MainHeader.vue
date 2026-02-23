<script setup lang="ts">
import { ref } from 'vue'
import HeaderNavLinks from '@/components/Layout/HeaderNavLinks.vue'
import HeaderUserDropdown from '@/components/Layout/HeaderUserDropdown.vue'
import HeaderMobileMenu from '@/components/Layout/HeaderMobileMenu.vue'
import HeaderActions from '@/components/Layout/HeaderActions.vue'
import RegisterModal from '@/components/Auth/RegisterModal.vue'
import LoginModal from '@/components/Auth/LoginModal.vue'
import { useAuthStore } from '@/stores/auth'


const registerRef = ref(null)
const loginRef = ref(null)

const phoneMenu = ref(false) //手機選單
const drawList = ref(false) // 登入後的控制項
const drawPhoneList = ref(false) // 手機版登入後的控制項

const authStore = useAuthStore()

// authStore.getProfile()

function openRegister() {
  registerRef.value.openRegister()
}
function openLogin() {
  loginRef.value.openLogin()
}

function handleSwitchToLogin() {
  loginRef.value.openLogin()
}

function handleSwitchToRegister() {
  registerRef.value.openRegister()
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
        :show-menu-icon="!phoneMenu"        @open-login="openLogin"
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
    <LoginModal ref="loginRef" @switch-to-register="handleSwitchToRegister" />
    <RegisterModal ref="registerRef" @switch-to-login="handleSwitchToLogin" />
  </div>
</template>

<style scoped></style>
