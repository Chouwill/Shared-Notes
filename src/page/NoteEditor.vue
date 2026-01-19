<script setup lang="ts">
import { ref } from 'vue'
const isPiblic = ref(false)
import NoteIde from '@/components/markIde/NoteIde.vue'
</script>

<template>
  <div class="md:w-full w-[85%] mx-auto flex flex-col">
    <div class="p-5 border-6 flex justify-center items-center flex-wrap gap-3">
      <div class="w-[832px] flex gap-3 justify-center items-center">
        <div class="w-100 flex gap-3 justify-center items-center">
          <label for="">筆記名稱</label>
          <input type="text" placeholder="Type here" class="input" />
        </div>
        <div class="w-100 flex gap-3 items-center">
          <label for="">文章分類</label>
          <select class="select">
            <option disabled selected>Pick a color</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
      </div>

      <div class="w-[750px] p-3 flex gap-3 justify-between items-center border-1">
        <div class="w-100 flex gap-3 items-center">
          <label for="">是否公開分享</label>
          <input type="checkbox" class="toggle toggle-success" v-model="isPiblic" />
        </div>

        <div class="flex flex-row gap-2 w-100" v-if="isPiblic">
          <div class="badge badge-soft badge-info group">
            <div>Markdown</div>
            <button
              class="hidden group-hover:flex w-5 h-5 border-1 justify-center items-center rounded-full"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
    <NoteIde />
  </div>
</template>
