<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const loginRef = ref(null)
const registerRef = ref(null)

function openLogin() {
  loginRef.value?.openLogin()
}

function openRegister() {
  registerRef.value?.openRegister()
}

defineExpose({
  openLogin,
  openRegister,
})
</script>

<template>
  <LoginModal ref="loginRef" />
  <RegisterModal ref="registerRef" />
</template>
