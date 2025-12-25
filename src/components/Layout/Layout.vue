<script setup>
import Header from '../Header.vue'
import Footer from '../Footer.vue'

import NoteIde from '../markIde/NoteIde.vue'
</script>

<template>
  <div class="w-full bg-base-100">
    <!-- Header -->
    <Header />

    <main class="flex flex-col justify-center items-center">
      <router-view></router-view>
    </main>

    <Footer class="fixed bottom-0"/>
  </div>
</template>
