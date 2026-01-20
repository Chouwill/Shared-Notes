import { ref } from 'vue'
import { defineStore } from 'pinia'
import { onLogin } from '@/api/method'

export const useAuthStore = defineStore('user', () => {
  const userToken = ref(null)

  async function onLoginForm(data) {
    try {
      const res = await onLogin(data)

      console.log(res.data.token)

      userToken.value = res.data.token

      console.log(userToken.value)
    } catch (error) {
      console.log('登入錯誤', error)
    }
  }

  return {
    onLoginForm,
    userToken,
  }
})
