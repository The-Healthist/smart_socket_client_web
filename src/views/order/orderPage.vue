<template>
  <!-- 主容器 -->
  <div
    :class="` font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-primary/10 h-[100vh] overflow-x-hidden"
  >
    <!-- 內部容器 -->
    <div
      class="flex flex-col w-full h-full justify-center items-center px-2.5 py-5"
    >
      <!-- 訂單頁面主體 -->
      <div class="w-[95vw] h-full flex flex-col overflow-x-hidden">
        <!-- 頂部切換按鈕 -->
        <div class="flex flex-row gap-0 relative">
          <!-- 使用中按鈕 -->
          <div
            class="w-[47.5vw] h-[42px] flex justify-center items-center relative overflow-y-hidden"
            :class="isUse ? 'bg-primary' : 'bg-base'"
          >
            <!-- 使用中狀態 -->
            <button
              class="w-full h-full flex flex-row gap-2.5 justify-center items-center relative z-10"
              :class="
                isUse
                  ? 'text-primary bg-base rounded-t-bar'
                  : 'text-inverted bg-primary rounded-br-bar'
              "
              @click="isUse = true"
            >
              <span class="text-large">使用中</span>
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            </button>
          </div>
          <!-- 歷史訂單按鈕 -->
          <div
            class="w-[47.5vw] h-[42px] flex justify-center items-center relative overflow-hidden"
            :class="!isUse ? 'bg-primary ' : 'bg-base '"
          >
            <!-- 歷史訂單狀態 -->
            <button
              class="w-full h-full flex flex-row gap-2.5 justify-center items-center relative z-10"
              :class="
                !isUse
                  ? 'text-primary bg-base rounded-t-bar'
                  : 'text-inverted bg-primary rounded-bl-bar'
              "
              @click="isUse = false"
            >
              <i-icon icon="tabler:clock" class="text-[20px]" />
              <span class="text-base">歷史訂單</span>
            </button>
          </div>
        </div>
        <!-- 訂單列表 -->
        <div
          class="bg-base w-[95vw] h-[auto] min-h-[80vh] flex flex-col overflow-y-scroll pb-12"
          :class="
            isUse
              ? 'rounded-tr-bar rounded-b-card'
              : 'rounded-tl-bar rounded-b-card'
          "
        >
          <!-- 訂單為空時顯示 -->
          <div v-if="displayedOrders.length === 0 && ordersH.length === 0">
            <div class="flex flex-col justify-center items-center h-[50vh]">
              <span class="text-baseC">暫無數據</span>
            </div>
          </div>
          <!-- 當前使用中的訂單 -->
          <div v-if="isUse">
            <lazy-component error-text="加載失敗" loading-text="加載中">
              <div v-for="order in orders" :key="order.uuid">
                <LazyOrderItem
                  :key="order.uuid"
                  :order="order"
                  @click="navigateToOrderDetail"
                  @endOrder="endOrderU"
                  @renewOrder="RenewalOrder"
                />
              </div>
            </lazy-component>
          </div>
          <!-- 歷史訂單列表 -->
          <div v-else>
            <lazy-component error-text="加載失敗" loading-text="加載中">
              <div v-for="order in ordersH" :key="order.uuid">
                <LazyOrderItem
                  :key="order.uuid"
                  :order="order"
                  @click="navigateToOrderDetail"
                  @endOrder="endOrderU"
                  @renewOrder="RenewalOrder"
                />
              </div>
            </lazy-component>
          </div>
        </div>
      </div>
    </div>
    <!-- 充值對話框 -->
    <van-dialog
      v-model:show="isShowDialog"
      :show-cancel-button="false"
      :showConfirmButton="false"
      :close-on-click-overlay="true"
    >
      <!-- 對話框內容 -->
      <div
        class="flex flex-col h-[40vh] bg-gradient-to-b from-skin-primary/10 to-skin-primary/30 items-center p-2.5 gap-2.5"
      >
        <h1 class="text-largest test-basec">充值續費</h1>
        <span
          class="flex flex-row justify-start text-baseC text-base w-full ml-2.5"
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
              <span class="text-primary text-base mr-1.5">/小時</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row w-full ml-2 justify-between">
          <span class="flex flex-row justify-start text-baseC text-base w-full">
            總計金額</span
          >
          <span v-if="function_price" class="text-primary text-base mr-[26px]"
            >{{ totalPrice }}HKD</span
          >
        </div>
        <span
          v-if="isShowDurationSpan"
          class="h-2.5 w-full -mt-2.5 text-base ml-[2px] text-red-500"
        >
          充值時間需要>0且為整數
        </span>

        <PrimaryButton class="w-[98%]" @click="handleRenewalOrder">
          <template #default>
            <div
              class="h-[24px] flex flex-row justify-center items-center gap-2"
            >
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >即刻支付</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts" name="OrderPage">
// 導入依賴
import {
  reactive,
  computed,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUnmount
} from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import {
  endOrder,
  getOrder,
  getOrders,
  payOrder,
  renewOrder
} from "@/api/order";
import { showFailToast, showSuccessToast } from "vant";
import { validateField } from "@/typings/data";
import { executePriceFunction } from "@/typings/data";
import { OrderStatus } from "@/typings/order";
import { useOrderStore } from "@/store/order/orderStore";
import LazyOrderItem from "@/components/orderItem/LazyOrderItem.vue";
// 初始化數據和計算屬性
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
const orderStore = useOrderStore();

const isUse = ref(true);
const orders = ref([]);
const displayedOrders = computed(() => orders.value);
const ordersH = ref([]);

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

const pagination = ref({
  pageNum: 1,
  pageSize: 5
});
const totalPage = ref(10);
const paginationH = ref({
  pageNum: 1,
  pageSize: 5
});
const totalPageH = ref(10);

// 結束訂單函數
const endOrderU = async (id: string) => {
  endOrder({ uuid: id })
    .then(res => {
      console.log(res);
      let data: any = res;
      orders.value = data;
      console.log(orders.value);
      showSuccessToast("訂單已取消");
      fetchOrders();
    })
    .catch(err => {
      console.log(err);
      showFailToast(`取消訂單失敗:${err.response.data.message}`);
    });
};
const function_price = ref();
// 續費訂單函數
const RenewalOrder = async (uuid: string) => {
  getOrder({ uuid: uuid })
    .then((res: any) => {
      if (res.data.device.priceFormula) {
        console.log(res.data.device.priceFormula);
        function_price.value = res.data.device.priceFormula;
        fetchOrders();
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
// 處理續費訂單
const handleRenewalOrder = async () => {
  if (!isValidDuration.value) isShowDurationSpan.value = true;
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

// 獲取訂單數據
const fetchOrders = async () => {
  let mobile = localStorage.getItem("mobile");
  getOrders({
    mobile: mobile,
    status: OrderStatus.OrderStatusNoneFinished,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize
  })
    .then(res => {
      const after: any = res;
      orders.value = [...orders.value, ...after.data];
      orderStore.addOrder(after.data);
      totalPage.value = after.pagination.total;
    })
    .catch(err => {
      console.log(err);
      showFailToast(`歷史訂單失敗:${err.response.data.message}`);
    });

  getOrders({
    mobile: mobile,
    status: OrderStatus.OrderStatusFinished,
    pageNum: paginationH.value.pageNum,
    pageSize: paginationH.value.pageSize
  })
    .then(res => {
      const after: any = res;
      ordersH.value = [...ordersH.value, ...after.data];
      orderStore.addOrderH(after.data);
      totalPageH.value = after.pagination.total;
    })
    .catch(err => {
      console.log(err);
      showFailToast(`歷史訂單失敗:${err.response.data.message}`);
    });
};

// 組件掛載前執行
onBeforeMount(async () => {
  if (
    orderStore.getOrderList.length === 0 &&
    orderStore.getOrderListH.length === 0
  ) {
    fetchOrders();
  } else {
    orders.value = orderStore.getOrderList;
    ordersH.value = orderStore.getOrderListH;
  }
});

// 導航到訂單詳情
const navigateToOrderDetail = uuid => {
  router.push({
    name: "OrderDetail",
    query: { uuid: uuid }
  });
};

const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (bottomOfWindow) {
    if (isUse.value && pagination.value.pageNum < totalPage.value) {
      pagination.value.pageNum += 1;
      fetchOrders();
    } else if (!isUse.value && paginationH.value.pageNum < totalPageH.value) {
      paginationH.value.pageNum += 1;
      fetchOrders();
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
