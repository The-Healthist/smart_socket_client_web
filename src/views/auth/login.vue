<template>
  <!-- 主容器，動態類用於主題設置 -->
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currentRounded} theme-fontsize-${currentFontSize}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <!-- 登錄表單的卡片容器 -->
    <div
      class="rounded-card bg-base flex flex-col p-2 w-[95vw] h-[auto] mt-[20vh] absolute"
    >
      <!-- 登錄標題 -->
      <div
        class="test-base text-common text-largest font-bold tracking-wide flex justify-center"
      >
        會員登入
      </div>

      <!-- 登錄表單 -->
      <div class="flex flex-col w-full">
        <!-- 手機號輸入字段 -->
        <div
          class="relative mt-2.5 flex flex-row w-full space-x-2.5 justify-between items-center"
        >
          <div class="text-base text-common whitespace-nowrap w-[15%]">
            電話
          </div>
          <input
            v-model="formData.mobile"
            type="number"
            placeholder="手機號碼"
            class="text-common py-1 px-3 border rounded w-full text-lg tracking-wider"
          />
        </div>
        <!-- 手機號驗證錯誤信息 -->
        <div class="flex h-2.5 ml-[15%]">
          <span
            v-if="!isValidPhone && isShowPhoneSpan"
            class="text-red-500 text-sm"
            >手機號碼不能位空且為6~12位數字</span
          >
        </div>
        <!-- 密碼輸入字段 -->
        <div
          class="relative mt-2.5 flex flex-row justify-between space-x-2.5 items-center"
        >
          <div class="text-base text-common whitespace-nowrap w-[15%]">
            密碼
          </div>
          <input
            v-model="formData.password"
            type="password"
            placeholder="密碼"
            class="text-common py-1 px-3 border rounded w-full text-lg"
          />
        </div>
        <!-- 密碼驗證錯誤信息 -->
        <div class="flex h-2.5 ml-[15%]">
          <span
            v-if="!isValidPassword && isShowPasswordSpan"
            class="text-red-500 text-sm"
            >密碼不能為空且必須是6~16位</span
          >
        </div>
        <!-- 遊客登錄和常規登錄按鈕 -->
        <div class="flex justify-between items-center gap-2.5 mt-3">
          <InvertedButton @click="router.push('/register')">
            <template #default>
              <div
                class="w-[auto] h-[20px] mx-2.5 px-2.5 flex flex-row justify-center items-center"
              >
                <span
                  class="text-large text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  注册
                </span>
              </div>
            </template>
          </InvertedButton>
          <PrimaryButton class="grow" @click="handleLogin()">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide"
                  >即刻登入</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </div>

      <!-- 註冊頁面鏈接 -->
      <div class="flex justify-center items-center p-2.4 mt-2.5">
        <span
          class="text-primary/80 text-base hover:text-primary cursor-pointer"
          @click="handleLoginGuest()"
          >游客登入</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Login">
// 導入和設置
import { computed, ref, onMounted } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { showFailToast, showSuccessToast } from "vant";
import { validateField } from "@/typings/data";
import { Login, guestUserLogin } from "@/api/auth";

// 主題相關的響應式狀態和計算屬性
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();

// 表單數據和驗證狀態
const formData = ref({
  mobile: "13583325035",
  password: "test1234"
});
const isValidPhone = computed(() =>
  validateField("mobile", formData.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formData.value.password)
);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);

// 登錄操作的處理函數
const loginAfter = ref<any>();
async function handleLogin() {
  isShowPhoneSpan.value = !formData.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value = !formData.value.password || !isValidPassword.value;

  if (isShowPhoneSpan.value || isShowPasswordSpan.value) {
    console.error("請正確填寫所有必填字段！");
    return;
  }

  Login(formData.value)
    .then(res => {
      loginAfter.value = res;
      localStorage.setItem("common_token", loginAfter.value.token);
      console.log("common_token", localStorage.getItem("common_token"));
      localStorage.setItem("mobile", formData.value.mobile);
      localStorage.setItem("password", formData.value.password);
      localStorage.setItem("isGuest", "false");
      router.push({ path: "/home" });
      showSuccessToast("登錄成功");
    })
    .catch(err => {
      showFailToast(`登錄失敗:${err.response.data.message}`);
    });
}

async function handleLoginGuest() {
  isShowPhoneSpan.value = false;
  isShowPasswordSpan.value = false;
  guestUserLogin()
    .then(res => {
      loginAfter.value = res;
      console.log("loginAfter", loginAfter.value);
      localStorage.setItem("common_token", loginAfter.value.token);
      localStorage.setItem("isGuest", "true");
      showSuccessToast("遊客登錄成功");
      router.push({ name: "Home" });
    })
    .catch(err => {
      showFailToast(`登錄失敗:${err.response.data.message}`);
    });
}

// 在组件挂载时重定向到正确的 URL
// onMounted(() => {
//   if (
//     window.location.href.includes("#/login") &&
//     !window.location.href.includes("?")
//   ) {
//     const newUrl = window.location.href.replace("#/login", "?#/login");
//     router.replace(newUrl);
//   }
// });
</script>
