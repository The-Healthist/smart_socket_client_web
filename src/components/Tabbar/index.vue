<template>
  <div
    :class="`font-${currentText} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} `"
  >
    <div
      class="bg-base/90 rounded-bar text-mutedC px-5 py-[5px] fixed bottom-2 gap-3 flex justify-center items-center shadow"
    >
      <router-link
        to="/home"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/home') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="ion:home-outline" class="text-[24px]" />
        <div>首頁</div>
      </router-link>
      <router-link
        to="/order"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/order') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="cil:list" class="text-[24px]" />
        <div>訂單</div>
      </router-link>
      <router-link
        to="/auth"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/auth') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="ion:person-outline" class="text-[24px]" />
        <div>我的</div>
      </router-link>
      <router-link
        to="/setting"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/setting') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="uil:setting" class="text-[24px]" />
        <div>设置</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";

const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const currentText = computed(() => textStore.getText);

// Access the current route
const route = useRoute();

// Function to check if the current route matches the path
const isActive = (path: string) => route.path === path;
</script>
