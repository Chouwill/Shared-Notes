import { ref } from 'vue'
import { defineStore } from 'pinia'
import { onLogin, onRegister } from '@/api/method'

export const useAuthStore = defineStore('user', () => {
  const userToken = ref(null)
  const apiStatus = ref(null) //定義儲存api回傳狀態
  const showUser = ref(false)

  async function onLoginForm(data) {
    try {
      const res = await onLogin(data)

      console.log(res.data.token)

      userToken.value = res.data.token

      console.log(userToken.value)
      showUser.value = true
    } catch (error) {
      console.log('登入錯誤', error)
    }
  }
  async function onRegisterForm(data) {
    try {
      const res = await onRegister(data)

      console.log(res.data.success)

      // 儲存紀錄註冊狀態
      apiStatus.value = res.data.success

      console.log(apiStatus)
    } catch (error) {
      console.log('註冊錯誤', error)
    }
  }

  return {
    onLoginForm,
    onRegisterForm,
    userToken,
    apiStatus,
    showUser,
  }
})
