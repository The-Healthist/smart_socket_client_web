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
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <!-- <nav-bar /> -->
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <div class="fixed-center">
        <Tabbar />
      </div>
    </van-config-provider>
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
