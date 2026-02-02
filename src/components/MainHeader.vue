<script setup lang="ts">
import { ref } from 'vue'
import RegisterModal from '@/components/Auth/RegisterModal.vue'
import LoginModal from '@/components/Auth/LoginModal.vue'
import { useAuthStore } from '@/stores/auth'

import { useRouter } from 'vue-router'
import router from '@/router'

const registerRef = ref(null)
const loginRef = ref(null)

const authStore = useAuthStore()

authStore.getProfile()

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

function goWorkSpace() {
  router.push('/noteSpace')
}
function goUserProfile() {
  router.push('/noteProfile')
}
</script>

<template>
  <div
    class="w-full flex justify-center items-center h-[100px] bg-base-200 text-base-content shadow-md backdrop-blur-sm"
  >
    <div class="w-full max-w-[1280px] h-full px-4 flex justify-between items-center">
      <div class="flex justify-center items-center">
        <img class="w-[150px] h-[50px]" src="../assets/images/Shared-Notes.png" alt="" />
      </div>
      <div class="w-[130px] hidden md:block bg-base-300 rounded-3xl border border-base-300">
        <div role="tablist" class="tabs tabs-box flex justify-around">
          <!-- <a role="tab" class="tab">首頁</a> -->
          <RouterLink role="tab" class="tab" to="/"> 首頁 </RouterLink>

          <!-- <a
            role="tab"
            class="tab tab-active bg-primary text-primary-content rounded-[40px] px-[10px]"
            >公開筆記</a
          >

          <a role="tab" class="tab">標籤</a> -->
          <!-- <a role="tab" class="tab">關於</a> -->
          <RouterLink role="tab" class="tab" to="/about"> 關於 </RouterLink>
          <RouterLink role="tab" class="tab" to="/teaching"> 教學</RouterLink>
        </div>
      </div>
      <div class="flex gap-3" v-show="authStore.showUser == false">
        <button class="btn btn-neutral rounded-3xl" @click="openLogin">登入</button>
        <button class="btn btn-primary rounded-3xl" @click="openRegister">註冊</button>
        <div class="dropdown dropdown-end hidden md:block">
          <div tabindex="0" role="button" class="btn m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              class="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabindex="-1"
            class="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Light"
                value="light"
                checked
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Dark"
                value="dark"
              />
            </li>
          </ul>
        </div>
      </div>
      <div v-if="authStore.showUser">
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  :src="authStore.userProfileData?.avatar_url"
                />
              </div>
            </div>
            <ul
              tabindex="-1"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li @click="goUserProfile">
                <a class="justify-between">
                  Profile
                  <!-- <span class="badge">New</span> -->
                </a>
              </li>
              <!-- <li><a>Settings</a></li> -->
              <li @click="goWorkSpace"><a>工作區</a></li>
              <li @click="authStore.userLogout()"><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <RegisterModal ref="registerRef" @switch-to-login="handleSwitchToLogin" />
    <LoginModal ref="loginRef" @switch-to-register="handleSwitchToRegister" />
  </div>
</template>
