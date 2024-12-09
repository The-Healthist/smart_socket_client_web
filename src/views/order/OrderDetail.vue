<template>
  <div
    :class="` font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-primary/10 h-[140vh]"
  >
    <div
      class="flex flex-col w-full h-full justify-center items-center px-2.5 py-5"
    >
      <div class="w-[95vw] h-full flex flex-col">
        <!-- 訂單詳情 -->

        <div
          class="bg-base w-[95vw] h-[auto] flex flex-col overflow-y-scroll rounded-card mt-[1vh]"
        >
          <div
            class="text-baseC/40 text-largest flex justify-center items-center"
          >
            <!-- <i-icon icon="streamline:return-2" class="text-[20px] text-inverted" /> -->
            訂單詳情
          </div>
          <div
            v-for="order in ordersH"
            :key="order.uuid"
            class="w-[95vw] p-2.5 flex flex-col gap-2 mt-2"
          >
            <div class="flex flex-col gap-2.5">
              <!-- Existing order details -->
              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 truncate">插座名稱 :</span>
                <div class="text-large font-bold">{{ order.device.name }}</div>
              </div>
              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 font-bold truncate"
                  >插座地址 :</span
                >
                <div class="text-large font-bold">
                  {{ order.device.location }}
                </div>
              </div>

              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 truncate">購買時間 :</span>
                <div class="text-large font-bold">{{ order.quantity }}小時</div>
              </div>
              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 truncate">支付金額 :</span>
                <div class="text-large font-bold text-danger">
                  {{ order.price }}HKD
                </div>
              </div>
              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 truncate">支付方式 :</span>
                <div class="text-large font-bold">
                  <!-- {{ order.paymentMethod }} -->
                  銀行卡
                </div>
              </div>

              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 font-normal truncate"
                  >訂單創建時間 :</span
                >
                <div class="text-large font-bold">
                  {{ moment(order.createdAt).format("yyyy/MM/DD HH:ss") }}
                </div>
              </div>

              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 font-normal truncate"
                  >服務開始時間 :</span
                >
                <div class="text-large font-bold">
                  {{ moment(order.startAt).format("yyyy/MM/DD HH:ss") }}
                </div>
              </div>
              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 font-normal truncate"
                  >服務結束時間 :</span
                >
                <div class="text-large font-bold">
                  {{ moment(order.endAt).format("yyyy/MM/DD HH:ss") }}
                </div>
              </div>
              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 font-normal truncate"
                  >訂單編號 :</span
                >
                <div
                  class="text-small font-bold text-baseC/40 flex items-end justify-end"
                >
                  {{ order.uuid }}
                </div>
              </div>
              <div class="flex justify-between items-end row-height">
                <span class="text-base text-baseC/40 font-normal truncate"
                  >設備編號 :</span
                >
                <div
                  class="text-small font-bold text-baseC/40 flex items-end justify-end"
                >
                  {{ order.device.uuid }}
                </div>
              </div>

              <div class="flex justify-between items-center row-height">
                <span class="text-base text-baseC/40 font-normal truncate" />
                <div
                  :class="[
                    'text-large font-bold',
                    status == '已結束'
                      ? 'text-baseC/40'
                      : status == '待支付'
                        ? 'text-primary/60'
                        : 'text-commonBlue'
                  ]"
                >
                  {{ status }}
                </div>
              </div>
              <div
                v-if="status == '待支付'"
                class="flex justify-between gap-2.5 items-center"
              >
                <InvertedButton @click="endOrder(order.uuid)">
                  <template #default>
                    <div
                      class="w-[22vw] h-[22px] flex flex-row justify-center items-center overflow-hidden text-ellipsis"
                    >
                      <span
                        class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                        >取消訂單</span
                      >
                    </div>
                  </template>
                </InvertedButton>
                <PrimaryButton
                  class="grow w-full"
                  @click="PayOrderPending(order.uuid)"
                >
                  <template #default>
                    <div
                      class="grow h-[22px] flex flex-row justify-center items-center gap-2"
                    >
                      <IIcon icon="mingcute:flash-line" class="text-[20px]" />
                      <span
                        class="text-larger text-inverted font-bold tracking-wide"
                        >訂單支付</span
                      >
                    </div>
                  </template>
                </PrimaryButton>
              </div>
              <div
                v-if="status === '使用中'"
                class="flex justify-between items-center w-full"
              >
                <div class="w-full">
                  <div class="flex flex-row gap-2.5 w-full">
                    <InvertedButton>
                      <template #default>
                        <div
                          class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
                          @click="endOrderU(order.uuid)"
                        >
                          <span
                            class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                          >
                            結束使用
                          </span>
                        </div>
                      </template>
                    </InvertedButton>
                    <PrimaryButton
                      class="grow w-full"
                      @click="RenewalOrder(order.uuid)"
                    >
                      <template #default>
                        <div
                          class="grow h-[22px] flex flex-row justify-center items-center gap-2"
                        >
                          <IIcon
                            icon="mingcute:flash-line"
                            class="text-[20px]"
                          />
                          <span
                            class="text-larger text-inverted font-bold tracking-wide"
                            >充值續費</span
                          >
                        </div>
                      </template>
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              class="flex flex-row justify-center items-center gap-2.5 w-full mb-5 mt-2.5"
            >
              <button class="text-primary text-base font-normal">
                有疑問？聯繫客服
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VanDialog
      v-model:show="isShowDialog"
      :show-cancel-button="false"
      :showConfirmButton="false"
      :close-on-click-overlay="true"
    >
      <div
        class="flex flex-col h-[auto] bg-gradient-to-b from-skin-primary/10 to-skin-primary/30 items-center px-2.5 py-5 gap-2.5"
      >
        <h1 class="text-largest test-basec">充值續費</h1>
        <span
          class="flex flex-row justify-start text-baseC/40 text-base w-full ml-2.5"
          >充值時間</span
        >
        <div class="flex flex-row items-center w-full -ml-2.5">
          <span class="text-primary text-base">*</span>
          <div
            class="-mt-2 w-full h-[38px] p-[5px] bg-base justify-center items-center rounded-button border-solid border-[2px]"
          >
            <div class="flex flex-row">
              <input
                id="number"
                v-model="duration"
                type="number"
                placeholder="請輸入充值時間"
                class="w-[60vw] h-[24px] pl-2 rounded-button"
              />
              <span class="text-primary text-large mr-1.5">/小時</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row w-full ml-2 justify-between">
          <span
            class="flex flex-row justify-start text-baseC/40 text-base w-full"
          >
            總計金額</span
          >
          <span v-if="function_price" class="text-primary text-large mr-[26px]"
            >{{ totalPrice }}HKD</span
          >
        </div>
        <span
          v-if="isShowDurationSpan"
          class="h-2.5 w-full -mt-2.5 text-small ml-[2px] text-red-500"
        >
          充值時間需要>0且為整數
        </span>

        <PrimaryButton class="w-[98%]" @click="handleRenewalOrder">
          <template #default>
            <div
              class="h-[24px] flex flex-row justify-center items-center gap-2"
            >
              <IIcon icon="mingcute:flash-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >即刻支付</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>
    </VanDialog>
  </div>
</template>

<script setup lang="ts" name="OrderDetails">
import { computed, onBeforeMount, ref } from "vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { getOrder, payOrder } from "@/api/order";

import moment from "moment"; // Import moment
import { OrderStatus } from "@/typings/order";
import { endOrder, renewOrder } from "@/api/order";
import { executePriceFunction, validateField } from "@/typings/data";
import { getOrderOnPayMent } from "@/api/order";
import {
  closeToast,
  showFailToast,
  showLoadingToast,
  showSuccessToast
} from "vant";

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();
//轉換成字符串
const orderId = router.currentRoute.value.query.uuid;
// console.log(orderId);
const ordersH = ref([]);
const status = ref("");
onBeforeMount(async () => {
  if (typeof orderId === "string") {
    {
      getOrder({ uuid: orderId })
        .then((res: any) => {
          console.log(res);
          let data = res.data;
          ordersH.value = [data];
          duration.value = data.quantity;
          // Handle different statuses
          if (data.status === OrderStatus.Pending) {
            status.value = "待支付";
          } else if (data.status === OrderStatus.Ongoing) {
            // Logic to show buttons for ending the order and renewing, similar to orderPage
            status.value = "使用中";
          } else if (data.status === OrderStatus.Ended) {
            status.value = "已結束";
          } else if (data.status === OrderStatus.Closed) {
            status.value = "訂單關閉";
          }
          // console.log(ordersH.value);
        })
        .catch(error => {
          console.error("Failed to fetch order details:", error);
        });
    }
  }
});

const isShowDialog = ref(false);
const renewOrderId = ref("");
const duration = ref(2);
const totalPrice = computed(() =>
  executePriceFunction(duration.value, function_price.value)
);
const isShowDurationSpan = ref(false);
const isValidDuration = computed(() =>
  validateField("numberM", duration.value)
);
const endOrderU = async (id: string) => {
  endOrder({ uuid: id })
    .then(res => {
      console.log(res);
      let data: any = res;
      ordersH.value = data;
      console.log(ordersH.value);
      showSuccessToast("訂單已取消");
    })
    .catch(err => {
      console.log(err);
      showFailToast(`訂單取消失敗:${err.response.data.message}`);
    });
};
const function_price = ref();
const RenewalOrder = async (uuid: string) => {
  getOrder({ uuid: uuid })
    .then((res: any) => {
      if (res.data.device.priceFormula) {
        console.log(res.data.device.priceFormula);
        function_price.value = res.data.device.priceFormula;
      } else {
        console.log("Price formula not found");
      }
    })
    .catch(err => {
      console.log(err);
      showFailToast(`獲取訂單失敗:${err.response.data.message}`);
    });
  renewOrderId.value = uuid;
  isShowDialog.value = true;
};
const handleRenewalOrder = async () => {
  if (!isValidDuration.value) {
    isShowDurationSpan.value = true;
    return;
  }
  renewOrder({ uuid: renewOrderId.value, duration: duration.value }).then(
    (res: any) => {
      console.log(res);
      payOrder({ uuid: res.data.uuid })
        .then((res2: any) => {
          console.log(res2);
          router.push({
            name: "PayedAfter",
            query: { orderId: res.data.uuid }
          });
        })
        .catch(err => {
          console.log(err);
          showFailToast(`支付失敗:${err.response.data.message}`);
        });
      isShowDialog.value = false;
    }
  );
};

const PayOrderPending = (uuid: string) => {
  payOrder({
    uuid
  }).then((res: any) => {
    console.log(res);
    getOrderOnPayMent({
      uuid: res.data.orderUuid
    }).then((res2: any) => {
      console.log("res2", res2.data);
      if (res2.data.status === "failed") {
        showFailToast(`支付失敗:${res2.data.message}`);
      } else if (res2.data.status === "success") {
        showSuccessToast("支付成功");
        router.push({ name: "Order" });
      } else {
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `正在支付中(${second})`;
          } else {
            clearInterval(timer);
            closeToast();
          }
        }, 1000);
        const toast = showLoadingToast({
          duration: 0,
          forbidClick: true,
          message: "正在支付中(3)"
        });
        setTimeout(() => {
          getOrderOnPayMent({
            uuid: res.data.orderUuid
          }).then((res3: any) => {
            console.log("res3", res3.data);
            if (res3.data.status === "failed") {
              showFailToast(`支付失敗:${res3.data.message}`);
              router.push({
                name: "OrderDetail",
                query: { uuid: res3.data.orderUuid }
              });
            } else if (res3.data.status === "success") {
              router.push({ name: "Order" });
            } else {
              showFailToast(`出錯了:${res3.data.message}`);
            }
          });
        }, 3000);
      }
    });
  });
};
</script>
