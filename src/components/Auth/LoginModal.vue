<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

const emit = defineEmits(['switch-to-register'])

const authdialog = ref(null)

const authStore = useAuthStore()

// 登入表單驗證規則
const loginSchema = z.object({
  email: z.string().min(1, { message: '請輸入 Email' }).email({ message: 'Email 格式錯誤' }),

  password: z.string().min(1, { message: '請輸入密碼' }).min(6, { message: '密碼至少 6 碼' }),
})

const { handleSubmit } = useForm({
  validationSchema: toFormValidator(loginSchema),
  initialValues: {
    email: '0202@gmail.com',
    password: 'A1234567a8',
  },
})

const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField('email', undefined, {
  validateOnValueUpdate: false,
})

const {
  value: password,
  errorMessage: passwordError,
  handleBlur: passwordBlur,
} = useField('password', undefined, {
  validateOnValueUpdate: false,
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
  await authStore.onLoginForm({
    email: email.value,
    password: password.value,
  })

  setTimeout(() => {
    if (authStore.userToken) {
      console.log('正常登入')
      authdialog.value.close()
    } else {
      console.log('無法登入')
    }
  }, 2000)
}

const onSubmit = handleSubmit(() => {
  getLogin()
})

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
                placeholder="請輸入 Email"
                v-model="email"
                @blur="emailBlur($event, true)"
                name="email"
              />
            </label>
            <p class="text-red-500 text-center text-sm">{{ emailError }}</p>
          </div>

          <div class="w-full flex flex-col gap-2">
            <label for="">密碼</label>

            <label class="input w-full !outline-none focus:!outline-none">
              <input
                type="text"
                placeholder="請輸入密碼"
                v-model="password"
                @blur="passwordBlur($event, true)"
                name="password"
              />
            </label>
            <p class="text-red-500 text-center text-sm">{{ passwordError }}</p>
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
            <button class="btn btn-active btn-success" @click="onSubmit">登入</button>
          </div>
        </div>

        <!-- 登入成功訊息 -->
        <div class="mt-4 w-full flex flex-col items-center gap-2" v-if="authStore.loginMessage">
          <div role="alert" class="alert alert-success max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ authStore.loginMessage }}</span>
          </div>
        </div>
        <!-- 登入失敗訊息 -->
        <div
          class="mt-4 w-full flex flex-col items-center gap-2"
          v-else-if="authStore.loginErrorMessage"
        >
          <div role="alert" class="alert alert-error max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ authStore.loginErrorMessage }}</span>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
