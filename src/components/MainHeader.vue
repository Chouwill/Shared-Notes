<script setup lang="ts">
import { ref, watch } from 'vue'
import RegisterModal from '@/components/Auth/RegisterModal.vue'
import LoginModal from '@/components/Auth/LoginModal.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const registerRef = ref(null)
const loginRef = ref(null)
const drawerRef = ref(null)

const menulist = ref(false) //會員中心選單
const phoneMenu = ref(false) //手機選單
const menuStatus = ref(true) //選單狀態
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
  phoneMenu.value = !phoneMenu.value
  menuStatus.value = false

  console.log(phoneMenu.value)
}

function closeMenu() {
  phoneMenu.value = false

  menuStatus.value = true
}

watch(
  () => authStore.showUser,
  (val) => {
    console.log('m1', menulist.value)
  },
)

function openDraw() {
  drawList.value = !drawList.value
  drawPhoneList.value = !drawPhoneList.value
}
function openPhoneDraw() {
  drawPhoneList.value = !drawPhoneList.value
}

function onLogout() {
  authStore.userLogout()
  menulist.value = false
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
        <ul
          class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box md:flex hidden items-center justify-center gap-3"
        >
          <li class="text-base"><RouterLink to="/"> 首頁</RouterLink></li>
          <li class="text-base"><RouterLink to="/about"> 關於 </RouterLink></li>
          <li class="text-base"><RouterLink to="/teaching"> 教學</RouterLink></li>
        </ul>
      </div>

      <div
        class="flex flex-col h-[320px] py-3 items-center absolute right-0 top-[100px] z-50"
        v-if="phoneMenu"
      >
        <ul
          class="menu menu-vertical w-[250px] lg:menu-horizontal rounded-box md:hidden bg-base-200 flex flex-col items-center justify-center gap-3"
        >
          <li class="text-base absolute top-0 w-full flex justify-end items-end" @click="closeMenu">
            <i class="fa-solid fa-x"></i>
          </li>

          <li class="text-base"><RouterLink to="/"> 首頁</RouterLink></li>
          <li class="text-base"><RouterLink to="/about"> 關於 </RouterLink></li>
          <li class="text-base"><RouterLink to="/teaching"> 教學</RouterLink></li>
          <li class="text-base w-[80%]">
            <button
              class="btn btn-primary md:hidden flex w-full"
              @click="openLogin"
              v-if="!authStore.showUser"
            >
              登入
            </button>
          </li>
          <li class="text-base w-[80%]">
            <button
              class="btn btn-soft btn-primary md:hidden flex w-full"
              @click="openRegister"
              v-if="!authStore.showUser"
            >
              註冊
            </button>
          </li>
          <li class="text-base w-[80%] p-2" v-if="authStore.showUser">
            <button
              class="md:hidden flex justify-center items-center w-full border-none"
              @click="openPhoneDraw"
            >
              <img
                :src="authStore.userProfileData?.avatar_url"
                alt="使用者頭像"
                class="w-[50px] h-[50px] object-cover rounded-full"
                v-if="authStore.userProfileData?.avatar_url"
              />
              <img
                class="w-[50px] h-[50px] object-cover rounded-full"
                src="@/assets/images/default-user.png"
                v-if="!authStore.userProfileData?.avatar_url"
                alt="預設User"
              />
            </button>
          </li>
          <!-- 手機選單使用者控制項目 -->
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
              <RouterLink to="/teaching" @click="onLogout"> 登出</RouterLink>
            </div>
          </li>
        </ul>
      </div>

      <div class="member flex justify-center items-center gap-2">
        <button
          class="btn btn-primary md:flex hidden"
          @click="openLogin"
          v-if="!authStore.showUser"
        >
          登入
        </button>
        <button
          class="btn btn-soft btn-primary md:flex hidden"
          @click="openRegister"
          v-if="!authStore.showUser"
        >
          註冊
        </button>
        <button
          class="md:flex hidden justify-center items-center w-full border-none relative"
          @click="openDraw"
          v-if="authStore.showUser"
        >
          <img
            :src="authStore.userProfileData?.avatar_url"
            alt="使用者頭像"
            class="w-[50px] h-[50px] object-cover rounded-full"
            v-if="authStore.userProfileData?.avatar_url"
          />
          <img
            class="w-[50px] h-[50px] object-cover rounded-full"
            src="@/assets/images/default-user.png"
            v-if="!authStore.userProfileData?.avatar_url"
            alt="預設User"
          />
        </button>
        <button
          class="border-none flex md:hidden filter-none hover:filter-none"
          @click="handleMenu"
        >
          <span class="material-symbols-outlined" v-if="menuStatus"> menu </span>
        </button>
        <!-- <button class="btn border-none hidden" v-if="authStore.userProfileData?.avatar_url">
          <img class="w-[50px] h-[50px]" src="@/assets/images/default-user.png" alt="預設User" />
        </button> -->
      </div>
    </div>
    <div>
      <div
        class="bg-base-200 flex flex-col gap-2 absolute w-[120px] right-6 top-20 z-50"
        v-if="drawList"
      >
        <div class="text-base text-right p-1">
          <RouterLink to="/noteProfile"> 個人檔案</RouterLink>
        </div>
        <div class="text-base text-right p-1">
          <RouterLink to="/noteSpace"> 筆記工作站 </RouterLink>
        </div>
        <div class="text-base text-right p-1" v-if="authStore.currentRole === 'admin'">
          <RouterLink to="/manage">管理員後台</RouterLink>
        </div>
        <div class="text-base text-right p-1">
          <RouterLink to="/teaching" @click="onLogout"> 登出</RouterLink>
        </div>
      </div>
    </div>
    <LoginModal ref="loginRef" @switch-to-register="handleSwitchToRegister" />
    <RegisterModal ref="registerRef" @switch-to-login="handleSwitchToLogin" />
  </div>
</template>
