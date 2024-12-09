<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[auto] mt-[40vh] absolute"
    >
      <div class="text-largest font-bold tracking-wide flex justify-center">
        訂單支付失敗
      </div>
      <div
        class="text-larger font-normal flex flex-row justify-center items-center truncate"
      >
        支付失败?请重新支付
      </div>
      <div class="flex flex-row justify-between gap-2.5 w-full mt-2.5">
        <!-- <InvertedButton @click="router.push({ name: 'OrderConfime' })">
          <template #default>
            <div
              class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
            >
              <span
                class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
              >
                返回订单
              </span>
            </div>
          </template>
        </InvertedButton> -->
        <PrimaryButton class="grow" @click="router.go(-1)">
          <template #default>
            <div
              class="h-[22px] flex flex-row justify-center items-center gap-2"
            >
              <span class="text-larger text-inverted font-bold tracking-wide"
                >返回上级</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="PayedFailed">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const order = route.query;

const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const texts = computed(() => textStore.getTexts);
const router = useRouter();
</script>
