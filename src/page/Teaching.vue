<script setup lang="ts">
import TeachingBanner from '@/components/TeachingPage/TeachingBanner.vue'
import TeachingIntro from '@/components/TeachingPage/TeachingIntro.vue';
import TeachingMarkdown from '@/components/TeachingPage/TeachingMarkdown.vue';
</script>

<template>
  <div class="md:w-full w-[85%]  mx-auto flex flex-col   ">
    <TeachingBanner />
    <TeachingIntro />
    <TeachingMarkdown />
  </div>
</template>
