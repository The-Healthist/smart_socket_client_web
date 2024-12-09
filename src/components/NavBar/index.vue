<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";

const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};
</script>
<!-- 主题切换 -->
<template>
  <VanNavBar fixed placeholder @click-right="onClickRight">
    <template #right>
      <SvgIcon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template>
  </VanNavBar>
</template>

<style scoped></style>
