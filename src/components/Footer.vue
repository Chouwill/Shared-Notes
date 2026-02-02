<script setup></script>

<template>
  <div
    class="w-full h-[100px] bg-base-200 text-base-content flex justify-around items-center shadow-md"
  >
    <!-- 左側 -->
    <div class="flex flex-col px-2 py-1 rounded">
      <div class="font-black text-lg">Shared Notes</div>
      <div class="text-sm text-base-content/60">共享筆記論壇 · 作品集專案</div>
    </div>

    <div class="w-[290px] hidden md:block"></div>

    <!-- GitHub Link -->
    <div>
      <a
        href="https://github.com/Chouwill/Shared-Notes"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link block text-lg font-black underline-offset-4 hover:underline"
      >
        GitHub
      </a>
    </div>
  </div>
</template>

<style scoped>
.github-link {
  color: var(--fallback-bc, oklch(var(--bc) / 1));
}
</style>
