<script setup lang="ts">
import Tabbar from "@/components/Tabbar/index.vue";

import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { computed } from "vue";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
</script>
<template>
  <div class="app-wrapper flex flex-col h-full w-full">
    <VanConfigProvider :theme="useDarkMode() ? 'dark' : 'light'">
      <!-- <nav-bar /> -->
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="cachedViews">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
      <div class="fixed-center">
        <Tabbar />
      </div>
    </VanConfigProvider>
  </div>
</template>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-center {
  position: fixed;
  bottom: -2%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
