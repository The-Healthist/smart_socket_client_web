<template>
  <div
    class="rounded-card w-[95vw] p-2.5 hover:bg-primary/10 flex flex-col gap-2"
  >
    <!-- 
     *待支付
     * -->
    <div
      v-if="order.status === OrderStatus.Pending"
      class="flex flex-col gap-2.5"
      @click="handleClick"
    >
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >插座名稱 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.name }}
        </div>
      </div>

      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >插座地址 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.location }}
        </div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >購買時間 :</span
        >
        <div class="text-large font-bold">{{ order.quantity }}H</div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >支付金額 :</span
        >
        <div class="text-large text-danger font-bold">{{ order.price }}HKD</div>
      </div>
      <!-- 開始時間|結束時間 -->
      <!-- <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >開始時間 :</span
        >
        <div class="text-large font-bold text-baseC">
          {{ formatDate(order.startAt) }}
        </div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >結束時間 :</span
        >
        <div class="text-large font-bold text-baseC">
          {{ formatDate(order.endAt) }}
        </div>
      </div> -->
      <!-- 支付方式 -->
      <!-- <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >支付方式 :</span
        >
        <div
          :class="['text-large font-bold', isHistory ? 'text-baseC/40' : '']"
        >
          {{ order.paymentMethod }}
        </div>
      </div> -->

      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate">剩餘 :</span>
        <div class="text-large font-bold">{{ order.quantity }}H</div>
      </div>
      <div>
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC font-normal truncate" />
          <span class="text-large font-bold text-primary/60">待支付</span>
        </div>
      </div>
    </div>
    <!-- *
     *使用中
     * -->
    <div
      v-if="order.status === OrderStatus.Ongoing"
      class="flex flex-col gap-2.5"
      @click="handleClick"
    >
      <!-- 名称 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >插座名稱 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.name }}
        </div>
      </div>
      <!-- 地址 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >插座地址 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.location }}
        </div>
      </div>

      <!-- 開始時間 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >開始時間 :</span
        >
        <div class="text-large font-bold text-baseC">
          {{ formatDate(order.startAt) }}
        </div>
      </div>
      <!-- 結束時間 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >結束時間 :</span
        >
        <div class="text-large font-bold text-baseC">
          {{ formatDate(order.endAt) }}
        </div>
      </div>

      <!-- 剩餘 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate">剩餘 :</span>
        <div class="text-large font-bold">{{ remainingTime }}</div>
      </div>

      <!-- 使用中 -->
      <div v-if="order.status === OrderStatus.Ongoing">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC font-normal truncate" />
          <span class="text-large font-bold text-commonBlue">使用中</span>
        </div>
      </div>
    </div>
    <!-- 
     *已結束||訂單關閉
     * -->
    <div
      v-if="
        order.status === OrderStatus.Ended ||
        order.status === OrderStatus.Closed
      "
      class="flex flex-col gap-2.5"
      @click="handleClick"
    >
      <!-- 插座名稱|插座地址-->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >插座名稱 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.name }}
        </div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >插座地址 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.location }}
        </div>
      </div>
      <!-- 購買時間|支付金額 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >購買時間 :</span
        >
        <div class="text-large font-bold">{{ order.quantity }}H</div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >支付金額 :</span
        >
        <div class="text-large text-danger font-bold">{{ order.price }}HKD</div>
      </div>
      <!-- 訂單編號 -->
      <div
        class="flex justify-between items-end h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >訂單編號 :</span
        >
        <div
          class="text-small font-bold flex items-end justify-end text-baseC/40"
        >
          {{ order.uuid }}
        </div>
      </div>
      <!-- 支付方式 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/40 font-normal truncate"
          >支付方式 :</span
        >
        <div class="text-base font-bold text-baseC/40">
          <!-- {{ order.paymentMethod }} -->支付寶
        </div>
      </div>
      <div v-if="order.status === OrderStatus.Ended">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC/40 font-normal truncate" />
          <span
            :class="[
              'text-large font-bold',
              isHistory ? 'text-baseC/40' : 'text-primary/60'
            ]"
            >已結束</span
          >
        </div>
      </div>
      <div v-if="order.status === OrderStatus.Closed">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC/40 font-normal truncate" />
          <span class="text-large font-bold text-baseC/40">訂單關閉</span>
        </div>
      </div>
    </div>

    <!-- 操作按鈕 -->
    <div>
      <div
        v-if="order.status === OrderStatus.Ongoing"
        class="flex flex-row gap-2.5 w-full"
      >
        <InvertedButton @click="endOrder(order.uuid)">
          <template #default>
            <div
              class="w-[22vw] h-[22px] flex flex-row justify-center items-center overflow-hidden text-ellipsis"
            >
              <span
                class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                >結束使用</span
              >
            </div>
          </template>
        </InvertedButton>
        <PrimaryButton class="grow" @click="renewOrder(order.uuid)">
          <template #default>
            <div
              class="grow h-[22px] flex flex-row justify-center items-center overflow-hidden text-ellipsis gap-2"
            >
              <IIcon icon="mingcute:flash-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >充值續費</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>

      <div
        v-else-if="order.status === OrderStatus.Pending"
        class="flex flex-row gap-2.5 w-full"
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
        <PrimaryButton class="grow" @click="PayOrderPending(order.uuid)">
          <template #default>
            <div
              class="grow h-[22px] flex flex-row justify-center items-center overflow-hidden text-ellipsis gap-2"
            >
              <IIcon icon="mingcute:flash-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >訂單支付</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>
    </div>
    <!-- 有疑問？聯繫客服 -->
    <div
      v-if="
        order.status !== OrderStatus.Pending &&
        order.status !== OrderStatus.Ongoing
      "
      class="flex flex-row justify-center items-center h-[20px] overflow-hidden text-ellipsis gap-2.5 w-full"
    >
      <button class="text-primary text-base font-normal">
        有疑問？聯繫客服
      </button>
    </div>
  </div>
  <!-- 分隔線 -->
  <div
    class="bg-separator/30 flex flex-row justify-center w-full h-[1px] mx-2.5"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { OrderStatus } from "@/typings/order";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import moment from "moment";
import { payOrder, getOrderOnPayMent } from "@/api/order";
import {
  closeToast,
  showFailToast,
  showLoadingToast,
  showSuccessToast
} from "vant";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const props = defineProps({
  order: Object
});
const isHistory = computed(() => {
  return (
    props.order.status === OrderStatus.Ended ||
    props.order.status === OrderStatus.Closed
  );
});
const remainingTime = computed(() => {
  const duration = moment.duration(moment(props.order.endAt).diff(moment()));
  const hours = duration.hours();
  const minutes = duration.minutes();
  return hours > 0
    ? `${hours}h${minutes}min`
    : minutes > 0
      ? `${minutes}min`
      : `無剩餘時間`;
});
const emits = defineEmits(["end-order", "renew-order", "click"]);
const router = useRouter();
const route = useRoute();
const handleClick = () => {
  emits("click", props.order.uuid);
};

const endOrder = (uuid: string) => {
  emits("end-order", uuid);
};

const renewOrder = (uuid: string) => {
  emits("renew-order", uuid);
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
              router.push({
                name: "OrderDetail",
                query: { uuid: res3.data.orderUuid }
              });
            }
          });
        }, 3000);
      }
    });
  });
};

const formatDate = dateString => {
  return moment(dateString).format("YYYY/MM/DD HH:mm");
};
</script>

<style scoped></style>
