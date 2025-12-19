<script setup>
import Header from '../Header.vue'

import NoteIde from '../markIde/NoteIde.vue'
</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <Header />

    <main class="flex-1 relative mt-[100px] px-6">
      <div class="text-slate-600"><NoteIde /></div>
    </main>
  </div>
</template>
