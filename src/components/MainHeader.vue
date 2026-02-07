<script setup lang="ts">
import { ref } from 'vue'
import RegisterModal from '@/components/Auth/RegisterModal.vue'
import LoginModal from '@/components/Auth/LoginModal.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const registerRef = ref(null)
const loginRef = ref(null)
const drawerRef = ref(null)

const menulist = ref(false) //會員中心選單

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

function closeDrawer() {
  if (drawerRef.value) {
    drawerRef.value.checked = false
  }
}

function handleMenu() {
  menulist.value = !menulist.value

  console.log(menulist.value)
}
</script>

<template>
  <div
    class="w-full flex justify-center items-center h-[100px] bg-base-200 text-base-content shadow-md backdrop-blur-sm"
  >
    <div class="drawer drawer-end md:drawer-open w-full">
      <input id="mobile-drawer" type="checkbox" class="drawer-toggle" ref="drawerRef" />
      <div class="drawer-content w-full flex justify-center">
        <div class="w-full max-w-[1280px] h-full grid grid-cols-3 items-center">
          <div class="flex justify-start items-center gap-3 w-full">
            <label
              for="mobile-drawer"
              class="btn btn-ghost drawer-button md:hidden p-2 absolute right-3"
              aria-label="開啟選單"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <router-link to="/">
              <img
                class="md:w-[150px] md:h-[50px]"
                src="../assets/images/Shared-Notes.png"
                alt=""
              />
            </router-link>
          </div>
          <div class="flex justify-center items-center">
            <div class="hidden md:block bg-base-300 rounded-3xl border border-base-300">
              <div role="tablist" class="tabs tabs-box flex justify-around">
                <RouterLink role="tab" class="tab" to="/"> 首頁 </RouterLink>
                <RouterLink role="tab" class="tab" to="/about"> 關於 </RouterLink>
                <RouterLink role="tab" class="tab" to="/teaching"> 教學</RouterLink>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center gap-3 border">
            <template v-if="!authStore.showUser">
              <button
                class="btn btn-outline btn-primary rounded-3xl hidden md:block"
                @click="openLogin"
              >
                登入
              </button>
              <button class="btn btn-primary rounded-3xl hidden md:block" @click="openRegister">
                註冊
              </button>
            </template>
            <div v-else class="flex-none">
              <div class="dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost avatar"  @click="handleMenu">
                  <div class="w-10 rounded-full">
                    <img
                      v-if="authStore.userProfileData?.avatar_url"
                      alt="使用者頭像"
                      :src="authStore.userProfileData?.avatar_url"
                    />
                    <img v-else alt="使用者頭像" src="../assets/images/default-user.png" />
                  </div>
                </div>
                <ul
                  tabindex="-1"
                  class="menu menu-sm dropdown-content   absolute md:top-12 md:right-30  top-15 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  v-if="menulist"
                >
                  <li @click="goUserProfile">
                    <a class="justify-between">Profile</a>
                  </li>
                  <li @click="goWorkSpace"><a>工作區</a></li>
                  <li @click="authStore.userLogout()"><a>登出 </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-side md:hidden z-50 !bg-base-200">
        <label for="mobile-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 pb-6 w-64 !bg-transparent text-base-content shadow-xl">
          <li class="mb-4">
            <div class="flex items-center gap-2 pb-4 border-b border-base-content/10">
              <img class="w-[120px] h-[40px]" src="../assets/images/Shared-Notes.png" alt="" />
            </div>
          </li>
          <li>
            <RouterLink
              to="/"
              class="text-lg font-medium rounded-lg px-4 py-2 block transition-colors text-base-content/70 hover:text-base-content hover:bg-base-content/5"
              exact-active-class="text-primary font-semibold bg-primary/10 "
              @click="closeDrawer"
            >
              首頁
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="text-lg font-medium rounded-lg px-4 py-2 block transition-colors text-base-content/70 hover:text-base-content hover:bg-base-content/5"
              exact-active-class="text-primary font-semibold bg-primary/10 "
              @click="closeDrawer"
            >
              關於
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/teaching"
              class="text-lg font-medium rounded-lg px-4 py-2 block transition-colors text-base-content/70 hover:text-base-content hover:bg-base-content/5"
              exact-active-class="text-primary font-semibold bg-primary/10"
              @click="closeDrawer"
            >
              教學
            </RouterLink>
          </li>
          <!-- 登入、註冊按鈕 -->
          <li v-if="!authStore.showUser" class="mt-4 pt-4 border-t border-base-content/10">
            <div class="flex flex-col gap-3">
              <button
                class="btn btn-outline btn-primary w-full rounded-lg"
                @click="(openLogin(), closeDrawer())"
              >
                登入
              </button>
              <button
                class="btn btn-primary w-full rounded-lg"
                @click="(openRegister(), closeDrawer())"
              >
                註冊
              </button>
            </div>
          </li>
          <li
            v-if="authStore.showUser"
            class="mt-4 pt-4 border-t border-base-content/10 flex flex-col gap-2"
          >
            <RouterLink
              to="/noteProfile"
              class="text-lg font-medium rounded-lg px-4 py-2 block transition-colors bg-yellow-200 hover:bg-yellow-300"
              @click="closeDrawer"
            >
              Profile
            </RouterLink>
            <a
              class="text-lg font-medium rounded-lg px-4 py-2 block transition-colors bg-yellow-200 hover:bg-yellow-300 cursor-pointer"
              @click="(goWorkSpace(), closeDrawer())"
              >工作區</a
            >
            <a
              class="text-lg font-medium rounded-lg px-4 py-2 block transition-colors bg-yellow-200 hover:bg-yellow-300 cursor-pointer"
              @click="(authStore.userLogout(), closeDrawer())"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>

    <RegisterModal ref="registerRef" @switch-to-login="handleSwitchToLogin" />
    <LoginModal ref="loginRef" @switch-to-register="handleSwitchToRegister" />
  </div>
</template>
