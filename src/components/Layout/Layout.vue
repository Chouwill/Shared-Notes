<script setup>
import Header from '../Header.vue'

import NoteIde from '../markIde/NoteIde.vue'
</script>

<template>
  <div class="w-full bg-base-100">
    <!-- Header -->
    <Header />

    <main class="flex flex-col justify-center items-center">
      <router-view></router-view>
    </main>
  </div>
</template>
