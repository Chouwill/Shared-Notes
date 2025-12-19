<script setup></script>

<template>
  <div class="w-full h-[100px] bg-blue-300 text-white flex justify-around items-center">
    <div class="flex justify-center items-center">
      <img class="w-[150px] h-[50px]" src="../assets/images/Shared-Notes.png" alt="" />
    </div>
    <div class="w-[260px] bg-amber-600 rounded-3xl border">
      <div role="tablist " class="tabs tabs-box flex justify-around">
        <a role="tab" class="tab">首頁</a>
        <a role="tab" class="tab tab-active">公開筆記</a>
        <a role="tab" class="tab">標籤</a>
        <a role="tab" class="tab">關於</a>
      </div>
    </div>
    <div class="flex gap-3">
      <button class="btn btn-neutral rounded-3xl">登入</button>
      <button class="btn btn-primary rounded-3xl">註冊</button>
    </div>
  </div>
</template>
