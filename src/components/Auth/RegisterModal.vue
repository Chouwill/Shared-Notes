<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

const emit = defineEmits(['switch-to-login'])

const authdialog = ref(null)

const authStore = useAuthStore()

// 註冊表單驗證規則
const registerSchema = z
  .object({
    email: z.string().min(1, { message: '請輸入 Email' }).email({ message: 'Email 格式錯誤' }),

    password: z.string().min(1, { message: '請輸入密碼' }).min(6, { message: '密碼至少 6 碼' }),

    doublePassword: z.string().min(1, { message: '請輸入確認密碼' }),

    agree: z.literal(true, {
      errorMap: () => ({ message: '請先同意服務條款' }),
    }),
  })
  .refine((data) => data.password === data.doublePassword, {
    message: '兩次密碼不一致',
    path: ['doublePassword'],
  })

const { handleSubmit } = useForm({
  validationSchema: toFormValidator(registerSchema),
  initialValues: {
    email: '',
    password: '',
    doublePassword: '',
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
const {
  value: doublePassword,
  errorMessage: doublePasswordError,
  handleBlur: doublePasswordBlur,
} = useField('doublePassword', undefined, {
  validateOnValueUpdate: false,
})
const {
  value: agree,
  errorMessage: agreeError,
  handleBlur: agreeBlur,
} = useField('agree', undefined, {
  validateOnValueUpdate: false,
})

const registerForm = ref({
  email: '',
  password: '',
  doublePassword: '',
})

function openRegister() {
  console.log(authdialog.value)
  authdialog.value.showModal()
}

function closeModal() {
  authdialog.value.close()
  console.log(authStore.userToken)
}

async function getRegister() {
  await authStore.onRegisterForm({
    email: email.value,
    password: password.value,
  })

  console.log('api狀態：', authStore.apiStatus)
  // 判斷api 狀態
  if (authStore.apiStatus) {
    console.log('正常註冊')
    setTimeout(() => {
      authdialog.value.close()
    }, 2000)
  } else {
    console.log('無法註冊')
  }
}

const onRegister = handleSubmit(() => {
  getRegister()
})

// 切換至登入函式
function switchToLogin() {
  authdialog.value.close()
  emit('switch-to-login') // 通知父組件
}

defineExpose({
  openRegister,
  closeModal,
})
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

            <label class="input w-full outline-none! focus:outline-none!">
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

            <label class="input w-full outline-none! focus:!outline-none!">
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
          <div class="w-full flex flex-col gap-2">
            <label for="">確認密碼</label>

            <label class="input w-full !outline-none focus:!outline-none">
              <input
                type="text"
                placeholder="請輸入密碼"
                v-model="doublePassword"
                @blur="doublePasswordBlur($event, true)"
                name="doublePassword"
              />
            </label>
            <p class="text-red-500 text-center text-sm">{{ doublePasswordError }}</p>
          </div>
          <div class="w-full flex flex-col gap-2">
            <fieldset class="fieldset">
              <label class="label w-[200px]!">
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="agree"
                  @blur="agreeBlur($event, true)"
                  name="agree"
                />
                <p class="text-[10px]">本服務為學習用途，不提供第三方。</p>
              </label>
              <p class="text-red-500 text-center text-sm">{{ agreeError }}</p>
            </fieldset>
          </div>
          <div class="w-full flex flex-col gap-2 justify-center items-center">
            <div class="flex gap-3 items-center" @click="switchToLogin">
              <img src="@/assets/images/go-icon.png" alt="" class="w-[30px]" />
              <p
                class="text-[13px] text-center text-base-content/70 cursor-pointer transition-colors hover:text-primary active:text-primary/80"
              >
                已有帳號，立即登入
              </p>
            </div>
          </div>

          <div class="w-full flex flex-col gap-2">
            <button class="btn btn-active btn-success" @click="onRegister">註冊</button>
          </div>
        </div>

        <!-- 註冊成功訊息 -->
        <div class="mt-4 w-full flex flex-col items-center gap-2" v-if="authStore.registerMessage">
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
            <span>{{ authStore.registerMessage }}</span>
          </div>
        </div>
        <!-- 註冊失敗訊息 -->
        <div
          class="mt-4 w-full flex flex-col items-center gap-2"
          v-else-if="authStore.registerErrorMessage"
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
            <span>{{ authStore.registerErrorMessage }}</span>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
