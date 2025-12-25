<script setup lang="ts"></script>

<template>
  <div class="box bg-base-100 text-center md:w-full h-[500px] flex md:flex-row flex-col md:gap-0 gap-4 ">
    <!-- Left section -->
    <div class="md:w-[50%] flex flex-col justify-around md:gap-0 gap-3">
      <h2 class="text-left md:text-[42px] text-base-content">把重點寫得精準，也展示得乾淨。</h2>

      <p class="py-3 text-left text-base-content/70">支援 Markdown 編輯、標籤整理、公開分享。</p>

      <div class="flex gap-2">
        <!-- 主按鈕：吃 theme.primary -->
        <button class="btn btn-primary rounded-xl">開始寫筆記</button>

        <!-- 副按鈕：使用 outline，不破壞背景 -->
        <button class="btn btn-outline rounded-xl">逛公開筆記</button>
      </div>

      <div class="flex flex-row gap-2 py-3">
        <div class="badge badge-soft badge-info">Markdown</div>
        <div class="badge badge-soft badge-info">標籤分類</div>
        <div class="badge badge-soft badge-info">分享連結</div>
        <div class="badge badge-soft badge-info">收藏</div>
      </div>
    </div>

    <!-- Right section -->
    <div class="md:w-[50%] w-full  bg-base-100 h-auto flex items-center justify-center">
      <div
        class="noteCard border border-base-content/20 rounded-xl bg-base-100 shadow-md w-[90%] p-4"
      >
        <!-- macOS 頂部三顆點 -->
        <div class="cardTop py-2 flex gap-2 border-b border-base-content/10 mb-4">
          <span class="block w-3 h-3 rounded-full bg-error/40"></span>
          <span class="block w-3 h-3 rounded-full bg-warning/40"></span>
          <span class="block w-3 h-3 rounded-full bg-success/40"></span>
        </div>

        <!-- Skeleton-like Body -->
        <div class="cardBody flex flex-col gap-3">
          <div class="h-4 rounded-md bg-base-content/20 w-[70%]"></div>
          <div class="h-4 rounded-md bg-base-content/20 w-[40%]"></div>
          <div class="h-4 rounded-md bg-base-content/20 w-[30%]"></div>

          <!-- 大區塊 -->
          <div class="h-[90px] rounded-xl bg-primary/20 border border-primary/40"></div>

          <div class="h-4 rounded-md bg-base-content/20 w-[70%]"></div>
          <div class="h-4 rounded-md bg-base-content/20 w-[40%]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.noteCard {
  backdrop-filter: blur(6px);
}
</style>
