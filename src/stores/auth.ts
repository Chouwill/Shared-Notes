import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { onLogin, onRegister, onGetProfile } from '@/api/method'
import router from '@/router'

export const useAuthStore = defineStore(
  'user',
  () => {
    const userToken = ref(null)
    const apiStatus = ref(null) //定義儲存api回傳狀態
    const showUser = ref(false)
    const currentRole = ref(null)

    function initAuth() {
      if (userToken.value) {
        showUser.value = true
      }
    }

    initAuth()

    const userProfileData = ref(null)
    const loginMessage = ref(null)
    const loginErrorMessage = ref(null)
    const registerMessage = ref(null)
    const registerErrorMessage = ref(null)
    let messageTimer: ReturnType<typeof setTimeout> | null = null
    let registerMessageTimer: ReturnType<typeof setTimeout> | null = null

    async function onLoginForm(data) {
      if (messageTimer) {
        clearTimeout(messageTimer)
        messageTimer = null
      }
      loginMessage.value = null
      loginErrorMessage.value = null
      try {
        const res = await onLogin(data)
        console.log(res)

        loginMessage.value = res.data.message
        console.log(res.data.token)

        userToken.value = res.data.token

        currentRole.value = res.data.user.role

        console.log(userToken.value)
        console.log('login訊息', loginMessage.value)
        showUser.value = true
        getProfile()
        messageTimer = setTimeout(() => {
          loginMessage.value = null
          messageTimer = null
        }, 2000)
      } catch (error) {
        console.log('登入錯誤', error)
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message ?? error.message)
          : '未知錯誤'
        loginErrorMessage.value = message
        console.log('登入錯誤', loginErrorMessage.value)
        messageTimer = setTimeout(() => {
          loginErrorMessage.value = null
          messageTimer = null
        }, 2000)
      }
    }
    async function onRegisterForm(data) {
      if (registerMessageTimer) {
        clearTimeout(registerMessageTimer)
        registerMessageTimer = null
      }
      registerMessage.value = null
      registerErrorMessage.value = null
      try {
        const res = await onRegister(data)

        console.log(res.data.success)

        // 儲存紀錄註冊狀態
        apiStatus.value = res.data.success

        console.log(apiStatus)
        registerMessage.value = res.data.message
        registerMessageTimer = setTimeout(() => {
          registerMessage.value = null
          registerMessageTimer = null
        }, 5000)
      } catch (error) {
        console.log('註冊錯誤', error)
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message ?? error.message)
          : '未知錯誤'
        registerErrorMessage.value = message
        registerMessageTimer = setTimeout(() => {
          registerErrorMessage.value = null
          registerMessageTimer = null
        }, 5000)
      }
    }
    //  取得個人會員檔案
    async function getProfile() {
      try {
        const res = await onGetProfile()

        // console.log(res)

        userProfileData.value = res.data.profile

        console.log('會員檔案', userProfileData.value)
      } catch (error) {
        console.log(error)
      }
    }

    function userLogout() {
      userToken.value = null
      showUser.value = false
      userProfileData.value = null
      loginMessage.value = null
      loginErrorMessage.value = null
      registerMessage.value = null
      registerErrorMessage.value = null
      localStorage.removeItem('user-token')
      router.push('/')
    }

    return {
      onLoginForm,
      onRegisterForm,
      getProfile,
      userLogout,
      userToken,
      apiStatus,
      showUser,
      currentRole,
      userProfileData,
      loginMessage,
      loginErrorMessage,
      registerMessage,
      registerErrorMessage,
    }
  },
  {
    persist: {
      // 自定義keyName
      key: 'user-token',
      // 持久化指定儲存的變數
      pick: ['userToken', 'userProfileData', 'showUser'],
    },
  },
)
