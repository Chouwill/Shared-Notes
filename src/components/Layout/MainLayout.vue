<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '../Footer.vue'

// import NoteIde from '../markIde/NoteIde.vue'
</script>

<template>
  <div class="w-full bg-base-100">
    <!-- Header -->
    <MainHeader class="sticky top-0 z-50" />

    <div class="flex justify-center items-center">
      <main
        class="max-w-[1280px] w-full flex flex-col pb-40 justify-center items-center md:items-stretch"
      >
        <router-view></router-view>
      </main>
    </div>
    <!-- <MainFooter class="fixed bottom-0" /> -->
  </div>
</template>
