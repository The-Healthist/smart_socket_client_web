<template>
  <!-- Registration Form Container -->
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary min-h-screen flex justify-center items-center p-4"
  >
    <!-- Registration Card -->
    <div class="rounded-card bg-base flex flex-col p-2 w-full max-w-md">
      <!-- Title -->
      <div
        class="text-common text-largest font-bold tracking-wide flex justify-center"
      >
        註冊會員
      </div>

      <!-- Registration Form -->
      <form class="flex flex-col mt-2.5" @submit.prevent="handleRegister">
        <!-- Email Input -->
        <div class="flex flex-row justify-between items-center row-height">
          <div class="flex-none w-[25%] text-base text-common tracking-wider">
            電郵
          </div>
          <input
            id="email"
            v-model="formDataAuth.email"
            type="email"
            class="flex-1 w-0 border rounded shadow-inner px-2 py-1 text-base text-common tracking-wide"
            placeholder="請鍵入電郵"
          />
        </div>
        <div class="flex h-5 ml-[25%]">
          <span
            v-if="isSubmitted && isShowEmailSpan"
            class="text-danger text-sm"
          >
            郵箱格式不正確
          </span>
        </div>

        <!-- Phone Input -->
        <div class="flex flex-row justify-between items-center row-height">
          <div class="flex-none w-[25%] text-base text-common tracking-wider">
            電話<span class="text-danger text-base">*</span>
          </div>
          <input
            id="phone"
            v-model="formDataAuth.mobile"
            type="tel"
            class="flex-1 w-0 border rounded shadow-inner px-2 py-1 text-base text-common tracking-wide"
            placeholder="請鍵入電話"
          />
        </div>
        <div class="flex h-5 ml-[25%]">
          <span
            v-if="isSubmitted && isShowPhoneSpan"
            class="text-danger text-sm"
          >
            手機號碼不能位空且為6~12位數字
          </span>
        </div>

        <!-- Password Input -->
        <div class="flex flex-row justify-between items-center row-height">
          <div class="flex-none w-[25%] text-base text-common tracking-wider">
            密碼<span class="text-danger text-base">*</span>
          </div>
          <input
            id="password"
            v-model="formDataAuth.password"
            type="password"
            class="flex-1 w-0 border rounded shadow-inner px-2 py-1 text-base text-common tracking-wide"
            placeholder="請鍵入密碼"
          />
        </div>
        <div class="flex h-5 ml-[25%]">
          <span
            v-if="isSubmitted && isShowPasswordSpan"
            class="text-danger text-sm"
          >
            密碼不能為空且必須是6~16位
          </span>
        </div>

        <!-- Confirm Password Input -->
        <div class="flex flex-row justify-between items-center row-height">
          <div class="flex-none w-[25%] text-base text-common tracking-wider">
            確認密碼<span class="text-danger text-base">*</span>
          </div>
          <input
            id="confirm-password"
            v-model="formDataAuth.confirmPassword"
            type="password"
            class="flex-1 w-0 border rounded shadow-inner px-2 py-1 text-base text-common tracking-wide"
            placeholder="請再次鍵入密碼"
          />
        </div>
        <div class="flex h-5 ml-[25%]">
          <span
            v-if="isSubmitted && isShowConfirmPasswordSpan"
            class="text-danger text-sm"
          >
            確認密碼與密碼不匹配
          </span>
        </div>

        <!-- Agreement and Register Checkbox -->
        <div class="flex items-center justify-end h-[20px]">
          <label
            for="register-checkbox"
            class="text-base text-common font-normal flex items-center"
          >
            同意
            <a
              href="/path/to/agreement"
              target="_blank"
              class="text-commonBlue text-base ml-1"
            >
              《用戶協議》
            </a>
          </label>
          <input
            id="register-checkbox"
            v-model="isAgreed"
            type="checkbox"
            class="mr-2 w-4 h-4"
          />
        </div>
        <div class="flex h-5 justify-end">
          <span
            v-if="isShowAgreementError && isSubmitted"
            class="text-danger text-sm"
          >
            請同意協議後再註冊
          </span>
        </div>
        <!-- Action Buttons -->
        <div class="flex flex-row justify-between gap-4">
          <!-- 返回登錄按鈕 -->
          <InvertedButton @click="router.push({ name: 'Login' })">
            <template #default>
              <div
                class="w-[auto] h-[20px] mx-2.5 px-2.5 flex flex-row justify-center items-center"
              >
                <span
                  class="text-large text-primary whitespace-nowrap font-bold font-CactusClassicalSerifHK text-center"
                >
                  登入
                </span>
              </div>
            </template>
          </InvertedButton>
          <!-- 提交註冊按鈕 -->
          <PrimaryButton class="w-full" type="submit">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <IIcon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide">
                  立即註冊
                </span>
              </div>
            </template>
          </PrimaryButton>
        </div>
      </form>

      <!-- 已有帳號登錄提示 -->
      <!-- <div class="flex justify-center items-center p-2.5 mt-4">
        <span
          class="text-primary/80 text-sm hover:text-primary cursor-pointer"
          @click="router.push('/login')"
        >
          已有帳號? 點擊登錄
        </span>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts" name="Register">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue"; // 主按鈕組件
import InvertedButton from "@/components/Button/InvertedButton.vue"; // 反轉按鈕組件
import { useThemeStore } from "@/store/theme/themeStore"; // 主題存儲
import { useRoundedStore } from "@/store/theme/roundStore"; // 圓角存儲
import { useFontSizeStore } from "@/store/theme/fontsizeStore"; // 字體大小存儲
import { useTextStore } from "@/store/theme/textStore"; // 文本存儲
import { useRouter } from "vue-router"; // 路由功能
import { Register as RegisterAPI } from "@/api/auth"; // 註冊API
import { showSuccessToast, showFailToast } from "vant"; // 提示信息組件
import { validateField } from "@/typings/data"; // 數據驗證

// 使用存儲和計算屬性
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();

// 表單數據
const formDataAuth = ref({
  email: "",
  mobile: "",
  password: "",
  confirmPassword: ""
});

// 驗證字段
const isValidEmail = computed(() =>
  validateField("email", formDataAuth.value.email)
);
const isValidPhone = computed(() =>
  validateField("mobile", formDataAuth.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formDataAuth.value.password)
);

// 顯示錯誤信息的狀態
const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);
const isShowAgreementError = ref(false);

// 新增 isSubmitted 狀態
const isSubmitted = ref(false);

// 同意協議的狀態
const isAgreed = ref(false);

// 處理註冊邏輯
async function handleRegister() {
  // 設置提交狀態為 true
  isSubmitted.value = true;

  // 重置錯誤狀態
  isShowEmailSpan.value = false;
  isShowPhoneSpan.value = false;
  isShowPasswordSpan.value = false;
  isShowConfirmPasswordSpan.value = false;
  isShowAgreementError.value = false;
  // 檢查是否同意協議
  if (!isAgreed.value) {
    isShowAgreementError.value = true;
    showFailToast("請同意協議後再註冊!");
    return;
  }

  // 驗證表單字段
  isShowEmailSpan.value = formDataAuth.value.email && !isValidEmail.value;
  isShowPhoneSpan.value = !formDataAuth.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value =
    !formDataAuth.value.password || !isValidPassword.value;
  isShowConfirmPasswordSpan.value =
    formDataAuth.value.password !== formDataAuth.value.confirmPassword;

  if (
    isShowEmailSpan.value ||
    isShowPhoneSpan.value ||
    isShowPasswordSpan.value ||
    isShowConfirmPasswordSpan.value
  ) {
    showFailToast("請正確填寫所有必填字段!");
    return;
  }

  // 構建註冊參數
  interface Factor {
    email?: string;
    mobile: string;
    password: string;
    token?: string;
  }

  let factor: Factor = {
    mobile: formDataAuth.value.mobile,
    password: formDataAuth.value.password
  };

  if (formDataAuth.value.email) {
    factor.email = formDataAuth.value.email;
  }

  const isGuest = localStorage.getItem("isGuest") === "true";
  const token = localStorage.getItem("common_token");
  if (isGuest && token) {
    factor.token = token;
  }

  try {
    const res: any = await RegisterAPI(factor);
    console.log(res);
    localStorage.setItem("common_token", res.token);
    localStorage.setItem("mobile", formDataAuth.value.mobile);
    localStorage.setItem("password", formDataAuth.value.password);
    localStorage.setItem("isGuest", "false");
    if (formDataAuth.value.email) {
      localStorage.setItem("email", formDataAuth.value.email);
    }
    showSuccessToast("註冊成功");
    router.push({ name: "Home" });
  } catch (err: any) {
    console.error(err);
    showFailToast(`註冊失敗: ${err.response?.data?.message || err.message}`);
  }
}
</script>
<style scoped>
.row-height {
  height: 30px; /* Maintain consistent row height */
}
input:disabled {
  background-color: #e5e7eb; /* Gray background for disabled input */
  cursor: not-allowed;
}
</style>
