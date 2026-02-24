<script setup lang="ts">
defineProps<{
  notes: any[]
}>()

const emit = defineEmits<{
  (e: 'view', id: string): void
  (e: 'pin', item: any): void
  (e: 'favorite', item: any): void
  (e: 'delete', item: any): void
}>()
</script>

<template>
  <div class="w-full md:p-5">
    <div class="w-full flex items-center gap-2 p-3">
      <span class="material-symbols-outlined"> sell </span>
      <h2 class="text-[20px] font-black">無標籤</h2>
    </div>

    <ul class="list bg-base-100 rounded-box shadow-md w-full flex flex-col pr-5">
      <li
        class="list-row flex justify-between cursor-pointer"
        v-for="item in notes"
        :key="item.note_id"
        @click="emit('view', item.note_id)"
      >
        <div class="flex gap-2">
          <img class="shrink-0 w-[20px]" src="@/assets/images/google-font-docs.svg" />
          <div class="md:w-[150px] w-[50px] overflow-hidden whitespace-nowrap">
            {{ item.title }}
          </div>
        </div>

        <div>2026-01-01</div>

        <div class="flex gap-3">
          <!-- Pin -->
          <button @click.stop="emit('pin', item)">
            <span
              class="material-symbols-outlined text-[20px]"
              :class="item.pinning ? 'text-base-content' : 'text-base-content/50'"
              :style="{
                fontVariationSettings: item.pinning ? `'FILL' 1` : `'FILL' 0`,
              }"
            >
              keep
            </span>
          </button>

          <!-- Favorite -->
          <button @click.stop="emit('favorite', item)">
            <i
              v-if="item.favorite"
              class="fa-solid fa-bookmark text-base-content/60 text-[14px]"
            ></i>
            <i v-else class="fa-regular fa-bookmark text-base-content/60 text-[14px]"></i>
          </button>

          <!-- Delete -->
          <button @click.stop="emit('delete', item)">
            <i class="fa-solid fa-trash text-base-content/60 text-[14px]"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fa-solid,
.fa-brands,
.fa-solid::before,
.fa-brands::before {
  font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome 6 Pro' !important;
  font-weight: 900 !important;
  font-style: normal !important;
  font-variant: normal !important;
  text-rendering: auto !important;
  line-height: 1 !important;
  display: inline-block !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

.fa-regular,
.fa-regular::before {
  font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome 6 Pro' !important;
  font-weight: 400 !important;
  font-style: normal !important;
  font-variant: normal !important;
  text-rendering: auto !important;
  line-height: 1 !important;
  display: inline-block !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}
</style>
