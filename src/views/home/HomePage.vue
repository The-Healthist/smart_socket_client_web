<template>
  <!-- 主模板容器 -->
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary/30 to-skin-primary h-[140vh]"
  >
    <!-- 内容区域 -->
    <div>
      <div class="flex flex-col w-full space-y-4 p-2.5 absolute">
        <!-- 卡片区域 -->
        <div class="rounded-card w-full h-[115px] bg-base/90">
          <img
            src="@/assets/homePage/Screenshot 2024-08-20 at 18.35.23 1.png"
            alt="homePage"
            class="w-full h-full fill-transparent opacity-80 rounded-card"
          />
        </div>
        <div class="flex flex-row space-x-4 w-full h-[100px]">
          <div class="rounded-card w-[50vw] h-[100px] bg-base/90">
            <img
              src="@/assets/homePage/Screenshot 2024-08-20 at 18.41.09 1.png"
              alt="homePage"
              class="w-full h-full fill-transparent opacity-80 rounded-card"
            />
          </div>
          <div class="rounded-card w-[50vw] h-[100px] bg-base/90">
            <div
              class="h-[100px] pl-[78.50px] pt-[47px] bg-white rounded-xl justify-end items-center inline-flex"
            >
              <div
                class="origin-top-left rotate-[-14.65deg] text-center text-[#8c4040] text-2xl font-bold font-['Inter'] tracking-wide"
              >
                誠招加盟
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-card w-full h-[115px] bg-base/90">
          <img
            src="@/assets/homePage/Screenshot 2024-08-20 at 18.35.23 1.png"
            alt="homePage"
            class="w-full h-full fill-transparent opacity-80 rounded-card"
          />
        </div>
        <!-- 功能选项区 -->
        <div
          class="rounded-card bg-base/90 text-mutedC flex flex-row justify-between gap-2.5 w-full h-[77px] px-5 py-2.5"
        >
          <!-- 插座信息 -->
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <IIcon icon="mdi:power-socket-uk" class="text-[36px]" />
            <div>附近插座</div>
          </div>
          <!-- 购买产品 -->
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <IIcon icon="icon-park-outline:shopping" class="text-[36px]" />
            <div>產品購買</div>
          </div>
          <!-- 加入我们 -->
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <IIcon icon="bi:people" class="text-[36px]" />
            <div>加入我們</div>
          </div>
          <!-- 使用指南 -->
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <IIcon icon="hugeicons:safari" class="text-[36px]" />
            <div>使用指南</div>
          </div>
        </div>
        <!-- 按钮区 -->
        <div
          class="rounded-card bg-base flex flex-col space-y-2.5 p-2.5 h-[287px]"
        >
          <div class="rounded-button w-full h-[235px] bg-slate-200" />
          <div class="flex flex-row justify-between space-x-2.5 w-full">
            <InvertedButton>
              <template #default>
                <div
                  class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
                >
                  <span class="text-base text-primary font-bold text-center">
                    遠程啟動
                  </span>
                </div>
              </template>
            </InvertedButton>
            <PrimaryButton
              class="grow"
              @click="router.push({ name: 'Scanner' })"
            >
              <template #default>
                <div
                  class="h-[22px] flex flex-row justify-center items-center space-x-2 ml-2.5"
                >
                  <IIcon icon="mingcute:flash-line" class="text-[20px]" />
                  <span
                    class="text-larger text-inverted font-bold tracking-wide"
                    >掃碼租用</span
                  >
                </div>
              </template>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
// 引入Vue相关功能
import { reactive, computed, onMounted } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
// 引入主题相关的存储库
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";

const router = useRouter();
// 使用主题存储库
const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
// 使用圆角存储库
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
// 使用字体大小存储库
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
// 使用文本存储库
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const texts = computed(() => textStore.getTexts);
// 使用Vue

onMounted(() => {
  window.scrollTo(0, window.innerHeight * 0.25);
});
</script>
