<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col space-y-2.5 p-2.5 w-[95vw] h-[auto] mt-[4vh] absolute"
    >
      <!-- 圖片 -->
      <div
        class="bg-base rounded-button w-full flex flex-col space-y-2.5 justify-center items-center h-[205px]"
      >
        <img
          v-if="info?.deviceType.pictureUrl"
          class="w-[136px] h-[133.02px] shadow"
          :src="info?.deviceType.pictureUrl"
        />
        <img
          v-else
          class="w-[136px] h-[133.02px]"
          src="@/assets/payDetail/Screenshot 2024-08-20 at 19.18.32 1.png"
        />
        <div class="flex flex-row">
          <span class="text-baseC text-base">{{ info?.name }}</span>

          <span v-if="info?.location" class="text-baseC text-base">{{
            info?.location
          }}</span>
        </div>
        <!-- <span v-else class="text-baseC text-base">位置获取失败</span> -->
      </div>

      <!-- 付費框框 -->

      <div class="flex flex-col w-full">
        <div
          class="border-primary rounded-t-button border-solid border-l-[1px] border-t-[1px] border-r-[1px] flex flex-row w-full justify-center items-center space-x-2.5 px-2.5 pt-2.5"
        >
          <button
            :class="
              optionsValue == 1
                ? 'border-primary rounded-option border-solid border-[1.5px] bg-primary/20'
                : 'border-base/30 rounded-option border-solid border-[1px] opacity-70'
            "
            class="w-[50%] flex flex-row justify-center items-center"
            @click="optionsValue = 1"
          >
            <div class="flex flex-row w-full justify-between p-1.5">
              <div class="flex flex-col items-end">
                <span class="text-baseC text-base font-bold tracking-wide"
                  >1H</span
                >
                <span class="text-small font-normal text-baseC/50 truncate"
                  >Avg:
                  {{
                    executePriceFunction(1, formDataOrder.function_price)
                  }}HKD/H</span
                >
              </div>
              <div class="flex justify-center items-center">
                <span class="text-red-500 text-base font-bold"
                  >{{
                    executePriceFunction(1, formDataOrder.function_price)
                  }}HKD</span
                >
              </div>
            </div>
          </button>
          <button
            :class="
              optionsValue == 2
                ? 'border-primary rounded-option border-solid border-[1.5px] bg-primary/20'
                : 'border-base/30 rounded-option border-solid border-[1px] opacity-70'
            "
            class="w-[50%] flex flex-row justify-center items-center"
            @click="optionsValue = 2"
          >
            <div class="flex flex-row w-full justify-between p-1.5">
              <div class="flex flex-col justify-start items-end">
                <span class="text-baseC text-base font-bold tracking-wide"
                  >2H</span
                >
                <span class="text-small font-normal text-baseC/50 truncate"
                  >Avg:
                  {{
                    executePriceFunction(1, formDataOrder.function_price)
                  }}HKD/H</span
                >
              </div>
              <div class="flex justify-center items-center">
                <span class="text-red-500 text-base font-bold"
                  >{{
                    executePriceFunction(2, formDataOrder.function_price)
                  }}HKD</span
                >
              </div>
            </div>
          </button>
        </div>

        <!-- 輸入 -->
        <div
          class="border-primary rounded-b-card border-solid border-b-[1px] border-l-[1px] border-r-[1px] flex flex-row w-full justify-center items-center space-x-2.5 p-2.5"
        >
          <div
            :class="
              optionsValue == 3
                ? 'border-primary rounded-option border-solid border-[1.5px] bg-primary/20 '
                : 'border-base/30 rounded-option border-solid border-[1px] opacity-70'
            "
            class="flex flex-row w-full justify-center items-center p-2.5"
            @click="optionsValue = 3"
          >
            <div>
              <input
                v-model="inputValue"
                type="number"
                class="w-[177px] h-[34px] text-center truncate py-[5px] rounded-[5px] shadow-inner text-base font-bold"
              />
              <span
                v-show="showInputError"
                class="text-red-500 text-small truncate ml-0.5"
                style="
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
                >值必須大於0且最多為一位小數</span
              >
              <!-- 繁體字提示 -->
            </div>
            <div
              class="text-baseC text-base font-bold w-[15%] flex flex-row justify-center items-center"
            >
              H
            </div>
            <div class="flex flex-col justify-end items-end w-[25%]">
              <span class="text-red-500 text-base font-bold"
                >{{
                  executePriceFunction(
                    inputValue,
                    formDataOrder.function_price
                  )
                }}HKD</span
              >
              <span class="text-baseC/60 text-small truncate"
                >平均:
                {{
                  executePriceFunction(1, formDataOrder.function_price)
                }}HKD/H</span
              >
              <!-- 繁體字提示 -->
            </div>
          </div>
        </div>
      </div>
      <!-- TODO:修改支付成功邏輯 -->
      <PrimaryButton class="grow-x-1" @click="navigateToOrderConfirm">
        <template #default>
          <div
            class="h-[24px] flex flex-row justify-center items-center space-x-2"
          >
            <IIcon icon="mingcute:flash-line" class="text-[20px]" />
            <span class="text-larger text-inverted font-bold tracking-wide"
              >即刻支付</span
            >
          </div>
        </template>
      </PrimaryButton>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
import { reactive, computed, ref, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { idText } from "typescript";
import { getSocketInfo } from "@/api/socket";
import { executePriceFunction } from "@/typings/data";
import { watch } from "fs";

const info = ref<any>();
const router = useRouter();
//獲取網址上的一個id
const socketId = router.currentRoute.value.params.socketId;
// 初始化表單數據
interface formdataOrder {
  name: string;
  location?: string;
  quantity?: string;
  amount?: string;
  pictureUrl?: string;
  function_price?: string;
}
const formDataOrder = ref<formdataOrder>({
  name: "",
  location: "",
  quantity: "",
  amount: "",
  pictureUrl: "",
  function_price: "function calc(amount) {return amount * 2.1}"
});
// TODO:獲取數據

onBeforeMount(async () => {
  try {
    const res: any = await getSocketInfo({ socketId: `${socketId}` });
    info.value = res.data;
    console.log("info.value", info.value);
    formDataOrder.value.name = res.data.name;
    formDataOrder.value.location = res.data.location;
    formDataOrder.value.quantity = res.data.quantity;
    formDataOrder.value.pictureUrl = res.data.pictureUrl;
    formDataOrder.value.function_price = res.data.priceFormula;
    // 記下價格公式
  } catch (error) {
    console.error("Error fetching list info", error);
  }
});

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

const optionsValue = ref(1);
const inputValue = ref(4);

const duration = computed(() => {
  if (optionsValue.value == 1) {
    return 1;
  } else if (optionsValue.value == 2) {
    return 2;
  } else {
    return inputValue.value;
  }
});
const showInputError = ref(false);
const durationValue = ref(4);
const navigateToOrderConfirm = () => {
  if (optionsValue.value == 3) {
    if (inputValue.value <= 0) {
      showInputError.value = true;
      return;
    }
    if (inputValue.value.toString().split(".")[1]?.length > 1) {
      showInputError.value = true;
      return;
    }
  }
  router.push({
    name: "OrderConfirm",
    query: {
      device_id: socketId,
      location: info.value?.location,
      quantity: duration.value,
      amount: executePriceFunction(
        duration.value,
        formDataOrder.value.function_price
      ),
      name: info.value?.name
    }
  });
};
</script>
