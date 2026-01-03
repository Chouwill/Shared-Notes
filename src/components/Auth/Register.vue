<script setup lang="ts">
import { ref } from 'vue'

const authdialog = ref(null)

function openDialog() {
  console.log(authdialog.value)
  authdialog.value.showModal()
}
defineExpose({
  openDialog,
})
</script>

<template>
  <div>
    <!-- Open the modal using ID.showModal() method -->
    <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
    <dialog ref="authdialog" class="modal">
      <div class="modal-box max-w-xs ">
        <div class="bg-base-200 w-full p-8 flex flex-col gap-3 justify-center items-center">
          <div class="w-full flex flex-col gap-2">
            <label for="">使用者名稱</label>

            <label class="input w-full !outline-none focus:!outline-none">
              <input
                type="text"
                required
                placeholder=""
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
              />
            </label>
          </div>
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
              />
            </label>
          </div>
          <div class="w-full flex flex-col gap-2">
            <button class="btn btn-active btn-success">註冊</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
