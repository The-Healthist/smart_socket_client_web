<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[auto] mt-[7vh] absolute"
    >
      <div
        class="text-largest font-bold tracking-wide flex justify-center text-common"
      >
        訂單確認
      </div>
      <div class="flex flex-col gap-4">
        <!-- Order Details -->
        <div class="flex flex-col gap-2.5">
          <div class="flex justify-between items-center">
            <span class="text-base text-common font-normal truncate"
              >插座名稱 :</span
            >
            <div class="text-larger text-common leading-none">
              {{ formDataOrder?.name }}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-base text-common font-normal truncate"
              >插座地址 :</span
            >
            <div class="text-larger text-common leading-none">
              {{ formDataOrder?.location }}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-base text-common font-normal truncate"
              >租用時間 :</span
            >
            <div class="text-larger text-common font-bold leading-none">
              {{ formDataOrder?.quantity }}HKD/H
            </div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-base text-common font-normal truncate"
              >支付金額 :</span
            >
            <div class="text-larger font-bold leading-none text-red-500">
              {{ formDataOrder?.amount }}HKD
            </div>
          </div>
        </div>

        <!-- Payment Details -->
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-row justify-between items-center">
            <div class="flex-none w-3/12 text-base text-common tracking-wider">
              電郵
            </div>
            <input
              id="email"
              v-model="formDataAuth.email"
              type="email"
              class="flex-1 w-0 border rounded shadow-inner px-2 py-0.5 text-base text-common tracking-wide"
              placeholder="請鍵入電郵"
            />
          </div>
          <div v-if="isShowEmailSpan" class="flex h-2.5">
            <span class="text-red-500 text-base">郵箱格式不正確</span>
          </div>

          <div class="flex flex-row justify-between items-center">
            <div class="flex-none w-3/12 text-base text-common tracking-wider">
              電話<span class="text-red-500 text-base text-center w-2.5"
                >*</span
              >
            </div>
            <input
              id="phone"
              v-model="formDataAuth.mobile"
              type="tel"
              class="flex-1 w-0 border rounded shadow-inner px-2 py-0.5 text-base text-common tracking-wide"
              placeholder="請鍵入電話"
            />
          </div>
          <div v-if="isShowPhoneSpan" class="flex h-2.5">
            <span class="text-red-500 text-base"
              >手機號碼不能位空且為6~12位數字</span
            >
          </div>

          <div
            v-if="isRegistering"
            class="flex flex-row justify-between items-center"
          >
            <div class="flex-none w-3/12 text-base text-common tracking-wider">
              密碼<span class="text-red-500 text-base text-center w-2.5"
                >*</span
              >
            </div>
            <input
              id="password"
              v-model="formDataAuth.password"
              type="password"
              class="flex-1 w-0 border rounded shadow-inner px-2 py-0.5 text-base text-common tracking-wide"
              placeholder="請鍵入密碼"
            />
          </div>
          <div v-if="isShowPasswordSpan" class="flex h-2.5">
            <span class="text-red-500 text-small"
              >密碼不能為空且必須是6~16位</span
            >
          </div>

          <div
            v-if="isRegistering"
            class="flex flex-row justify-between items-center"
          >
            <div class="flex-none w-3/12 text-base text-common tracking-wider">
              確認密碼<span class="text-red-500 text-base text-center w-2.5"
                >*</span
              >
            </div>
            <input
              id="confirm-password"
              v-model="formDataAuth.confirmPassword"
              type="password"
              class="flex-1 w-0 border rounded shadow-inner px-2 py-0.5 text-base text-common tracking-wide"
              placeholder="請再次鍵入密碼"
            />
          </div>

          <div v-if="isShowRegister" class="flex items-center justify-end">
            <label
              for="register-checkbox"
              class="text-base text-common font-normal"
            >
              同意
              <a
                href="/path/to/agreement"
                target="_blank"
                class="text-blue-500 text-base"
                >《協議》</a
              >並註冊
            </label>
            <input
              id="register-checkbox"
              v-model="isRegistering"
              type="checkbox"
              class="mr-2 ml-2 w-4 h-4"
            />
          </div>
        </div>

        <div class="flex flex-row justify-between gap-2.5 w-full">
          <InvertedButton @click="router.go(-1)">
            <template #default>
              <div
                class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
              >
                <span
                  class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  返回上級
                </span>
              </div>
            </template>
          </InvertedButton>
          <PrimaryButton class="grow" @click="handlePayment">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <IIcon icon="mingcute:flash-line" class="text-[20px]" />
                <span
                  v-if="!isShowRegister"
                  class="text-larger text-inverted font-bold tracking-wide"
                  >即刻支付</span
                >
                <span
                  v-else
                  class="text-larger text-inverted font-bold tracking-wide"
                  >註冊並支付</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderConfirm">
// 導入Vue相關功能和組件
import { computed, ref, reactive, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";

import { useRouter, useRoute } from "vue-router";
import { Register } from "@/api/auth";
import { showSuccessToast, showFailToast } from "vant";
import { showLoadingToast, closeToast } from "vant";
import {
  decodeOrderData,
  encodeOrderData,
  executePriceFunction,
  validateField
} from "@/typings/data";
import { getSocketInfo } from "@/api/socket";
import { AddOrder, getOrderOnPayMent, payOrder } from "@/api/order";

// 使用主題相關的store
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);

// 使用Vue Router
const router = useRouter();
const route = useRoute();
const device_id = ref("");

interface formdataOrder {
  name: string;
  location: string;
  quantity: string;
  amount?: string;
  device_id: string;
}

// 解析路由查詢參數
const orderQuery = route.query;

// 初始化表單數據
const formDataOrder = ref<formdataOrder>({
  name: "",
  location: "",
  quantity: "",
  amount: "",
  device_id: device_id.value
});
const formDataAuth = ref({
  email: "",
  mobile: "",
  password: "",
  confirmPassword: ""
});
interface formdataRegister {
  email?: string;
  mobile: string;
  password: string;
  token: string;
  formData: string;
}
const formDataRegister = ref<formdataRegister>({
  email: "",
  mobile: "",
  password: "",
  token: "",
  formData: ""
});
const isRegistering = ref(false);
const isShowRegister = ref(false);

// 計算屬性用於驗證表單字段
const isValidEmail = computed(() =>
  validateField("email", formDataAuth.value.email)
);
const isValidPhone = computed(() =>
  validateField("mobile", formDataAuth.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formDataAuth.value.password)
);

// 控制錯誤信息顯示
const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);

// 註冊處理函數
async function handleRegister() {
  // 更新錯誤信息顯示狀態
  isShowEmailSpan.value = formDataAuth.value.email && !isValidEmail.value;
  isShowPhoneSpan.value = !formDataAuth.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value =
    !formDataAuth.value.password || !isValidPassword.value;
  isShowConfirmPasswordSpan.value =
    formDataAuth.value.password !== formDataAuth.value.confirmPassword;

  // 驗證表單數據
  if (
    isShowEmailSpan.value ||
    isShowPhoneSpan.value ||
    isShowPasswordSpan.value ||
    isShowConfirmPasswordSpan.value
  ) {
    showFailToast("請正確填寫所有必填字段!");
    return;
  } else {
    Register(formDataRegister.value)
      .then((res: any) => {
        console.log("res", res);

        if (res.token) {
          localStorage.setItem("common_token", res.token);
          localStorage.setItem("isGuest", "false");
          localStorage.setItem("mobile", formDataAuth.value.mobile);
          localStorage.setItem("email", formDataAuth.value.email);
          showSuccessToast("註冊成功,請在手機上確認");
          // router.push({ path: "/afterRegister" });
        } else if (res.error) {
          showFailToast(`註冊失敗:${res.error.response.data.message}`);
        }
      })
      .catch(err => {
        showFailToast(`註冊失敗:${err.response.data.message}`);
      });
  }
}

// 支付處理函數
const handlePayment = () => {
  let queryString = new URLSearchParams({
    mobile: formDataAuth.value.mobile,
    email: formDataAuth.value.email,
    quantity: formDataOrder.value.quantity,
    amount: formDataOrder.value.amount,
    device_id: device_id.value
  }).toString();
  let decodedString = decodeURIComponent(queryString);

  // 換成需要的數據結構字符串了
  formDataRegister.value = {
    mobile: formDataAuth.value.mobile,
    password: formDataAuth.value.password,
    formData: encodeOrderData(decodedString),
    token: localStorage.getItem("common_token") as string
  };

  // 添加郵箱
  if (formDataAuth.value.email) {
    formDataRegister.value = {
      ...formDataRegister.value,
      email: formDataAuth.value.email
    };
  }

  if (isShowRegister.value && isRegistering.value) {
    handleRegister();
  }
  // 註冊成功後添加訂單
  AddOrder({
    quantity: parseInt(formDataOrder.value.quantity),
    deviceUuid: device_id.value,
    remark: formDataOrder.value.location
  })
    .then((res: any) => {
      payOrder({
        uuid: res.data.uuid
      }).then((res2: any) => {
        console.log("res2", res2);
        router.push({
          name: "PayedAfter",
          query: {
            orderId: res2.data.orderUuid
          }
        });
      });
      //TODO: 支付訂單
    })
    .catch(err => {
      showFailToast(`支付失敗:${err.response.data.message}`);
    });
};

// 組件掛載前的邏輯
onBeforeMount(async () => {
  const infoQuery = route.query;
  let isGuest = localStorage.getItem("isGuest");
  isShowRegister.value = isGuest === "true" ? true : false;
  // 如果token存在，則表示是鏈接由qq直接跳轉過來的
  if (infoQuery.token) {
    isShowRegister.value = false; //不顯示註冊按鈕
    //設置token mobile 選填email 時間
    localStorage.setItem("common_token", infoQuery.token as string);
    localStorage.setItem("mobile", infoQuery.mobile as string);
    formDataAuth.value.mobile = infoQuery.mobile as string;
    formDataOrder.value.quantity = infoQuery.quantity as string;
    if (infoQuery.email) {
      localStorage.setItem("email", infoQuery.email as string);
      formDataAuth.value.email = infoQuery.email as string;
    }
    device_id.value = infoQuery.device_id as string;
    // 獲取設備詳細信息
    getSocketInfo({ socketId: device_id.value })
      .then((res: any) => {
        formDataOrder.value.location = res.data.location;
        formDataOrder.value.name = res.data.name;
        formDataOrder.value.amount = executePriceFunction(
          parseInt(formDataOrder.value.quantity),
          res.data.priceFormula
        ).toString();
      })
      .catch(err => {
        showFailToast(`獲取信息失敗:${err.response.data.message}`);
      });
  }
  //不是由鏈接跳轉,正常過來的
  else {
    device_id.value = infoQuery.device_id as string;
    formDataOrder.value.device_id = device_id.value;
    formDataOrder.value.location = orderQuery.location as string;
    formDataOrder.value.name = orderQuery.name as string;
    formDataOrder.value.quantity = orderQuery.quantity as string;
    formDataOrder.value.amount = orderQuery.amount as string;
  }

  let mobile = localStorage.getItem("mobile");
  let email = localStorage.getItem("email");

  formDataAuth.value.mobile = formDataAuth.value.mobile
    ? formDataAuth.value.mobile
    : mobile;
  formDataAuth.value.email = formDataAuth.value.email
    ? formDataAuth.value.email
    : email;
});
</script>
