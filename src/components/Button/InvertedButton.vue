<!-- 背景色是primary 的按钮 -->
<template>
  <button
    class="border-primary bg-base text-primary rounded-button border-[2px] active::opacity-70 p-2.5 text-xl font-bold"
  >
    <slot />
  </button>
</template>
<script setup lang="ts"></script>
