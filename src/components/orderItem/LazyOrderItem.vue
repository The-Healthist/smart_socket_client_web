<template>
  <div
    class="rounded-card w-[95vw] p-2.5 hover:bg-primary/10 flex flex-col gap-2"
  >
    <!-- 訂單詳情點擊區域 -->
    <div class="flex flex-col gap-2.5" @click="handleClick">
      <!-- 訂單信息展示 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >插座名稱 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.name }}
        </div>
      </div>

      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >插座地址 :</span
        >
        <div v-if="order.device" class="text-large">
          {{ order.device.location }}
        </div>
      </div>
      <!-- 歷史訂單 -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >購買時間 :</span
        >
        <div class="text-large font-bold">{{ order.quantity }}H</div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >支付金額 :</span
        >
        <div class="text-large text-danger font-bold">{{ order.price }}HKD</div>
      </div>
      <!-- <div v-if="isHistory" class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis ">
        <span class="text-base text-baseC/60 font-normal truncate"
          >購買時間 :</span
        >
        <div class="text-large font-bold">{{ order.quantity }}H</div>
      </div>
      <div v-if="isHistory" class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis ">
        <span class="text-base text-danger font-normal truncate"
          >支付金額 :</span
        >
        <div class="text-large font-bold">{{ order.price }}HKD</div>
      </div> -->

      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >開始時間 :</span
        >
        <div :class="['text-base font-bold', isHistory ? 'text-baseC/40' : '']">
          {{ formatDate(order.startAt) }}
        </div>
      </div>
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >結束時間 :</span
        >
        <div :class="['text-base font-bold', isHistory ? 'text-baseC/40' : '']">
          {{ formatDate(order.endAt) }}
        </div>
      </div>

      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >支付方式 :</span
        >
        <div
          :class="['text-large font-bold', isHistory ? 'text-baseC/40' : '']"
        >
          {{ order.paymentMethod }}
        </div>
      </div>
      <div
        class="flex justify-between items-end h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >訂單編號 :</span
        >
        <div
          :class="[
            'text-small font-bold flex items-end justify-end',
            isHistory ? 'text-baseC/40' : ''
          ]"
        >
          {{ order.uuid }}
        </div>
      </div>
      <div
        class="flex justify-between items-end h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate"
          >設備編號 :</span
        >
        <div
          :class="[
            'text-small font-bold flex items-end justify-end',
            isHistory ? 'text-baseC/40' : ''
          ]"
        >
          {{ order.device.uuid }}
        </div>
      </div>

      <!-- <div
        v-if="!isHistory && order.status === OrderStatus.Ongoing"
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis "
      >
        <span class="text-base text-baseC font-normal truncate">剩餘 :</span>
        <div class="text-large font-bold">{{ remainingTime }}</div>
      </div> -->
      <div
        class="flex justify-between items-center h-[20px] overflow-hidden text-ellipsis"
      >
        <span class="text-base text-baseC/60 font-normal truncate">剩餘 :</span>
        <div class="text-large font-bold">{{ remainingTime }}</div>
      </div>
      <div v-if="order.status === OrderStatus.Pending">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC font-normal truncate" />
          <span
            :class="[
              'text-large font-bold',
              isHistory ? 'text-baseC/40' : 'text-primary/60'
            ]"
            >待支付</span
          >
        </div>
      </div>
      <div v-if="order.status === OrderStatus.Ongoing">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC font-normal truncate" />
          <span
            :class="[
              'text-large font-bold',
              isHistory ? 'text-baseC/40' : 'text-[#00a5ff]'
            ]"
            >使用中</span
          >
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
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
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
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >支付訂單</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>
      <div v-else-if="order.status === OrderStatus.Ended">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC font-normal truncate" />
          <span
            :class="['text-large font-bold', isHistory ? 'text-baseC/40' : '']"
            >已結束</span
          >
        </div>
      </div>
      <div v-else-if="order.status === OrderStatus.Closed">
        <div class="flex flex-row justify-between gap-2.5 w-full">
          <span class="text-base text-baseC font-normal truncate"
            >訂單狀態 :</span
          >
          <span
            :class="['text-large font-bold', isHistory ? 'text-baseC/40' : '']"
            >已關閉</span
          >
        </div>
      </div>
    </div>
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

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { OrderStatus } from "@/typings/order";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import moment from "moment";

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
const emits = defineEmits(["endOrder", "renewOrder", "click"]);

const handleClick = () => {
  emits("click", props.order.uuid);
};

const endOrder = uuid => {
  emits("endOrder", uuid);
};

const renewOrder = uuid => {
  emits("renewOrder", uuid);
};

const formatDate = dateString => {
  return moment(dateString).format("YYYY/MM/DD HH:mm");
};
</script>

<style scoped></style>
