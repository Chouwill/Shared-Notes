<script setup lang="ts"></script>

<template>
  <div
    class="box py-10 bg-base-100 text-center md:w-full h-auto flex md:flex-row flex-col md:gap-0 gap-4"
  >
    <!-- Left section -->
    <div class="md:w-[50%] flex flex-col justify-center gap-3">
      <h2 class="text-left md:text-[42px] text-base-content font-black">如何使用 Shared Notes</h2>

      <p class="py-1 text-left text-base-content/70">
        這裡整理了基本的 Markdown 語法、寫筆記的流程，以及怎麼在 Shared Notes 裡找到你要的內容。
      </p>

      <div class="flex gap-2">
        <button class="btn btn-primary rounded-xl">
          <router-link to="/noteEditor/edit"><p class="text-white">開始寫筆記</p></router-link>
        </button>
        <button class="btn btn-outline rounded-xl">
          <router-link to="/"> 逛公開筆記 </router-link>
        </button>
      </div>

      <div class="flex flex-row gap-2 py-3">
        <div class="badge badge-soft badge-info">Markdown教學</div>
        <div class="badge badge-soft badge-info">寫作平台</div>
        <div class="badge badge-soft badge-info">平台使用說明</div>
      </div>
    </div>

    <!-- Right section -->
    <div class="md:w-[50%] w-full bg-base-100 h-auto flex items-center justify-center">
      <div
        class="noteCard border border-base-content/20 rounded-xl bg-base-100 shadow-md w-[90%] p-4"
      >
        <div class="cardTop py-2 flex gap-2 mb-4">
          <span class="block w-3 h-3 rounded-full bg-error/40"></span>
          <span class="block w-3 h-3 rounded-full bg-warning/40"></span>
          <span class="block w-3 h-3 rounded-full bg-success/40"></span>
        </div>

        <div class="cardBody flex flex-col gap-3">
          <div class="h-4 rounded-md bg-base-content/20 pt-2 w-[80%]"></div>
          <div class="h-4 rounded-md bg-base-content/20 w-[40%]"></div>
          <div class="h-4 rounded-md bg-base-content/20 w-[30%]"></div>

          <div
            class="h-[125px] flex justify-start items-center rounded-xl bg-black border border-black"
          >
            <div class="text-white text-left">
              <div class="flex flex-col gap-1 p-3">
                <div class="line">- # Vue 表單驗證筆記</div>
                <div class="line">- 使用 Zod 定義 schema</div>
                <div class="line">- 搭配 PrimeVue 顯示錯誤狀態</div>
                <div class="line">- 送出前再整體驗證一次</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
