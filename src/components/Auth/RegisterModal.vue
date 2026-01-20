<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authdialog = ref(null)

const authStore = useAuthStore()

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
defineExpose({
  openRegister,
  closeModal,
})

async function getRegister() {
  await authStore.onRegisterForm(registerForm.value)

  console.log('api狀態：', authStore.apiStatus)
  // 判斷api 狀態
  if (authStore.apiStatus) {
    console.log('正常註冊')

    authdialog.value.close()
  } else {
    console.log('無法註冊')
  }
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

            <label class="input w-full outline-none! focus:outline-none!">
              <input
                type="text"
                required
                placeholder=""
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
                v-model="registerForm.email"
              />
            </label>
          </div>

          <div class="w-full flex flex-col gap-2">
            <label for="">密碼</label>

            <label class="input w-full outline-none! focus:!outline-none!">
              <input
                type="text"
                required
                placeholder=""
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
                v-model="registerForm.password"
              />
            </label>
          </div>
          <div class="w-full flex flex-col gap-2">
            <label for="">確認密碼</label>

            <label class="input w-full !outline-none focus:!outline-none">
              <input
                type="text"
                required
                placeholder=""
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
                v-model="registerForm.doublePassword"
              />
            </label>
          </div>
          <div class="w-full flex flex-col gap-2">
            <fieldset class="fieldset">
              <label class="label w-[200px]!">
                <input type="checkbox" class="checkbox" />
                <p class="text-[10px]">本服務為學習用途，不提供第三方。</p>
              </label>
            </fieldset>
          </div>

          <div class="w-full flex flex-col gap-2">
            <button class="btn btn-active btn-success" @click="getRegister">註冊</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
