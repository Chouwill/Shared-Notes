<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['switch-to-register'])

const authdialog = ref(null)

const authStore = useAuthStore()

const loginForm = ref({
  email: 'red@gmail.com',
  password: 'redA123456',
})

function openLogin() {
  console.log(authdialog.value)
  authdialog.value.showModal()
}

function closeModal() {
  authdialog.value.close()
  console.log(authStore.userToken)
}
defineExpose({
  openLogin,
  closeModal,
})

async function getLogin() {
  await authStore.onLoginForm(loginForm.value)
  setTimeout(() => {
    if (authStore.userToken) {
      console.log('正常登入')

      authdialog.value.close()
    } else {
      console.log('無法登入')
    }
  }, 2000)
}

function switchToRegister() {
  authdialog.value.close()

  emit('switch-to-register')
}
</script>

<template>
  <div>
    <!-- Open the modal using ID.showModal() method -->
    <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
    <dialog ref="authdialog" class="modal">
      <div class="modal-box max-w-xs border-4 relative bg-base-200">
        <button class="border rounded-full absolute top-1 right-1" @click="closeModal">
          <img class="w-[30px]" src="@/assets/images/icon-close.png" alt="" />
        </button>
        <div class="w-full p-10 flex flex-col gap-3 justify-center items-center">
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
          <div class="w-full flex flex-col gap-2 justify-center items-center">
            <div class="flex gap-3 items-center" @click="switchToRegister">
              <img src="@/assets/images/go-icon.png" alt="" class="w-[30px]" />
              <p
                class="text-[13px] text-center text-base-content/70 cursor-pointer transition-colors hover:text-primary active:text-primary/80"
              >
                還不是會員? 加入會員
              </p>
            </div>
          </div>

          <div class="w-full flex flex-col gap-2">
            <button class="btn btn-active btn-success" @click="getLogin">登入</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
