<!-- src/components/Dialog/GlobalDialog.vue -->
<template>
  <van-dialog
    v-model:show="isShowLogin"
    :showConfirmButton="false"
    :showCancelButton="false"
    :close-on-click-overlay="true"
  >
    <div
      :class="` font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
      class="text-muted bg-gradient-to-b from-skin-primary/10 to-skin-primary/20 h-[auto] overflow-x-hidden"
    >
      <div
        class="flex flex-col h-[auto] bg-gradient-to-b from-skin-primary/10 to-skin-primary/30 items-center p-2.5 gap-2.5"
      >
        <div class="text-largest font-bold tracking-wide flex justify-center">
          登入已失效
        </div>
        <!-- 登錄表單 -->
        <div class="flex flex-col w-full">
          <!-- 手機號輸入字段 -->
          <div
            class="relative mt-2.5 flex flex-row w-full space-x-2.5 justify-between items-center"
          >
            <div class="text-base whitespace-nowrap w-[15%]">電話</div>
            <input
              v-model="formData.mobile"
              type="number"
              placeholder="手機號碼"
              class="py-1 px-3 border rounded w-full text-lg tracking-wider"
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
            <div class="text-base whitespace-nowrap w-[15%]">密碼</div>
            <input
              v-model="formData.password"
              type="password"
              placeholder="密碼"
              class="py-1 px-3 border rounded w-full text-lg"
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
        </div>
        <div class="flex w-full justify-between items-center gap-2.5 mt-3">
          <InvertedButton @click="handleGuestUserLogin">
            <template #default>
              <div
                class="w-[auto] h-[20px] mx-2.5 flex flex-row justify-center items-center"
              >
                <span
                  class="text-large text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  遊客登入
                </span>
              </div>
            </template>
          </InvertedButton>
          <PrimaryButton class="grow" @click="handleLogin">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide"
                  >重複登入</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDialogStore } from "@/store/dialog/dlalogStore";
import { guestUserLogin } from "@/api/auth";
import { showSuccessToast, showFailToast } from "vant";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { validateField } from "@/typings/data";
import { ref } from "vue";
import { Login } from "@/api/auth";

// Access the Pinia store
const dialogStore = useDialogStore();
const router = useRouter();

const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
// Computed properties to reactively bind to the store's state
const isShowLogin = computed(() => dialogStore.isShowLogin);

const handleGuestUserLogin = async () => {
  try {
    const res: any = await guestUserLogin();
    localStorage.setItem("common_token", res.token);
    localStorage.setItem("isGuest", "true");
    showSuccessToast("遊客登錄成功");
    dialogStore.hideLogin();
  } catch (err: any) {
    showFailToast(`登錄失敗:${err.response?.data?.message || err.message}`);
  }
};
// 表單數據和驗證狀態
const formData = ref({
  mobile: localStorage.getItem("mobile"),
  password: localStorage.getItem("password")
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
      dialogStore.hideLogin();
      showSuccessToast("登錄成功");
    })
    .catch(err => {
      showFailToast(`登錄失敗:${err.response.data.message}`);
      dialogStore.hideLogin();
    });
}
</script>
