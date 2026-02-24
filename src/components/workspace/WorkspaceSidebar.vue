<script setup lang="ts">
defineProps<{
  avatarUrl: string | null
  displayName: string | undefined
  searchValue: string
  folders: any[]
  renameId: string | null
  favoriteNotes: any[]
}>()

const emit = defineEmits<{
  (e: 'update:searchValue', value: string): void
  (e: 'click-favorite', item: any): void
  (e: 'click-rename-folder', id: string): void
}>()
</script>

<template>
  <div class="md:flex flex-col gap-2 hidden">
    <div class="border border-base-300 w-56">
      <div class="border-b border-base-300 flex flex-col items-start gap-3 p-3">
        <!-- 使用者卡片 -->
        <div class="card card-side w-full flex gap-2 p-4 bg-base-100 shadow-sm">
          <div class="avatar">
            <div class="w-14 h-30 rounded-xl flex items-center">
              <img v-if="avatarUrl" class="w-14 h-14" :src="avatarUrl" />
              <img
                v-else
                class="w-14 h-14"
                alt="使用者頭像"
                src="@/assets/images/default-user.png"
              />
            </div>
          </div>
          <div class="card-body flex justify-center items-center flex-col truncate">
            <div>{{ displayName }}</div>
            <div>新手工程師</div>
          </div>
        </div>

        <!-- 搜尋 -->
        <label class="input">
          <svg
            class="h-[1em] text-base-content/60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            class="search grow"
            placeholder="Search"
            :value="searchValue"
            @input="emit('update:searchValue', ($event.target as HTMLInputElement).value)"
          />
        </label>
      </div>

      <!-- 資料夾 -->
      <div class="flex flex-col justify-center items-center gap-2">
        <div
          v-for="item in folders"
          :key="item.id"
          class="bg-base-200 hover:bg-base-300 w-[90%] flex justify-around p-4 rounded-xl transition-colors"
        >
          <div class="overflow-hidden whitespace-nowrap w-[120px] text-base-content">
            <div>{{ item.name }}</div>
            <label class="input" v-if="renameId === item.id">
              <input type="text" class="w-full" />
            </label>
          </div>

          <button
            class="btn-reset w-[25px] h-[25px] shrink-0 rounded-full"
            @click="emit('click-rename-folder', item.id)"
          >
            <i class="fa-solid fa-pen text-base text-base-content/60 hover:text-base-content"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 精選 -->
    <div>
      <div
        class="menu bg-base-200 rounded-box w-56 flex flex-row items-center gap-2 pl-5 text-base-content"
      >
        <i class="fa-regular fa-bookmark text-sm text-base-content/60"></i>
        <div>我的其他精選</div>
      </div>

      <div class="menu rounded-box w-56 flex flex-row items-center gap-2 pl-5 text-base-content">
        <div class="flex flex-col gap-3 min-w-0 flex-1">
          <div
            v-for="item in favoriteNotes"
            :key="item.note_id"
            class="w-full p-0 bg-white truncate min-w-0 cursor-pointer hover:bg-base-200 rounded transition-colors"
            @click="emit('click-favorite', item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
