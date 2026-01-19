<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authdialog = ref(null)

const authStore = useAuthStore()

const loginForm = ref({
  email: 'guest@gmail.com',
  password: '1W23456r78',
})

function openLogin() {
  console.log(authdialog.value)
  authdialog.value.showModal()
}
defineExpose({
  openLogin,
})

function getLogin() {
  authStore.onLoginForm(loginForm.value)
}
</script>

<template>
  <div>
    <!-- Open the modal using ID.showModal() method -->
    <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
    <dialog ref="authdialog" class="modal">
      <div class="modal-box max-w-xs">
        <div class="bg-base-200 w-full p-8 flex flex-col gap-3 justify-center items-center">
          <div class="w-full flex flex-col gap-2">
            <label for="">帳號</label>

            <label class="input w-full !outline-none focus:!outline-none">
              <input
                type="text"
                required
                placeholder=""
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
                v-model="loginForm.email"
              />
            </label>
          </div>

          <div class="w-full flex flex-col gap-2">
            <label for="">密碼</label>

            <label class="input w-full !outline-none focus:!outline-none">
              <input
                type="text"
                required
                placeholder=""
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
                v-model="loginForm.password"
              />
            </label>
          </div>
          <div class="w-full flex flex-col gap-2">
            <button class="btn btn-active btn-success" @click="getLogin">登入</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
