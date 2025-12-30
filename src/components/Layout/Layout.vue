<script setup>
import Header from '../Header.vue'
import Footer from '../Footer.vue'

import NoteIde from '../markIde/NoteIde.vue'
</script>

<template>
  <div class="w-full bg-base-100">
    <!-- Header -->
    <Header class="sticky top-0 z-20" />

    <div class="flex justify-center items-center">
      <main class="max-w-[1280px]  w-full flex flex-col pb-40 justify-center items-center md:items-stretch ">
        <router-view></router-view>
      </main>
    </div>
    <Footer class="fixed bottom-0" />
  </div>
</template>
