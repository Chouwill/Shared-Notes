<script setup lang="ts"></script>

<template>
  <ul
    class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box md:flex hidden items-center justify-center gap-3"
  >
    <li class="text-base"><RouterLink to="/"> 首頁</RouterLink></li>
    <li class="text-base"><RouterLink to="/about"> 關於 </RouterLink></li>
    <li class="text-base"><RouterLink to="/teaching"> 教學</RouterLink></li>
  </ul>
</template>
