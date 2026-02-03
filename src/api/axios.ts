import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: { 'X-Custom-Header': 'foobar' },
})

export default instance

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  // console.log("config",config);
  // const token = localStorage.getItem('user-token')
  // const userToken = JSON.parse(token).userToken

  if (authStore.userToken) {
    // 登入後，取得token
    console.log('userToken', authStore.userToken)
    config.headers.Authorization = `Bearer ${authStore.userToken}`

    // console.log('config.headers.Authorization ', config.headers.Authorization )
  } else {
    // token 尚未存在
    console.log('尚未登入')
  }

  // console.log("config",config);

  return config
})
