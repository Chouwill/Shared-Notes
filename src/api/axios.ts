import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const instance = axios.create({
  baseURL,
  timeout: 7000,
})

export default instance

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.userToken) {
    config.headers.Authorization = `Bearer ${authStore.userToken}`
  }

  return config
})
