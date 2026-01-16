<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between mb-4 px-2">
        <div class="d-flex align-center">
          <v-btn
            icon
            variant="text"
            color="primary"
            class="mr-2"
            @click="$router.back()"
          >
            <v-icon size="28">mdi-arrow-left</v-icon>
          </v-btn>
          <h2 class="text-h6 font-weight-bold text-primary">
            <span>ປະຫວັດການສັ່ງຊື້</span>
          </h2>
        </div>
      </div>

      <v-container fluid class="pa-0">
        <!-- Summary Cards -->
        <v-row dense class="mb-4">
          <v-col cols="12">
            <v-card elevation="0" rounded="xl" color="white" class="border-0">
              <v-card-text class="text-center py-4">
                <div class="text-caption text-medium-emphasis mb-1">
                  ຈຳນວນເງິນທັງໝົດ
                </div>
                <h3 class="text-h5 font-weight-bold text-primary">
                  {{ formatMoneyLAK(getAllTotalPrice) }}
                </h3>
                <div class="text-caption text-medium-emphasis">ກິບ</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              elevation="0"
              rounded="xl"
              color="teal-lighten-5"
              class="border-0"
            >
              <v-card-text class="text-center py-4">
                <div class="text-caption text-medium-emphasis mb-1">
                  ຈຳນວນເຄື່ອງ
                </div>
                <h4 class="text-h6 font-weight-bold text-teal-darken-2">
                  {{ formatNumber(getAllQuantity) }}
                </h4>
                <div class="text-caption text-medium-emphasis">ອັນ</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              elevation="0"
              rounded="xl"
              color="blue-lighten-5"
              class="border-0"
            >
              <v-card-text class="text-center py-4">
                <div class="text-caption text-medium-emphasis mb-1">
                  ເງິນກຳໄລ
                </div>
                <h4 class="text-h6 font-weight-bold text-blue-darken-2">
                  {{ formatMoneyLAK(getAllProfit) }}
                </h4>
                <div class="text-caption text-medium-emphasis">ກິບ</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Order List -->
        <div v-if="orders.length > 0">
          <v-card
            v-for="(order, i) in orders"
            :key="i"
            class="mb-3 rounded-xl border-0"
            elevation="0"
            color="white"
          >
            <v-card-item class="pb-0">
              <template v-slot:prepend>
                <v-avatar color="primary" variant="tonal" class="rounded-lg">
                  <v-icon color="primary">mdi-receipt-text-outline</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1 font-weight-bold">
                Order #{{ order.order_number }}
              </v-card-title>
              <v-card-subtitle class="text-caption">
                {{ formatDate(order.created_at) }} |
                {{ formatTime(order.created_at) }}
              </v-card-subtitle>
              <template v-slot:append>
                <v-chip
                  :color="getStatusColor(order.status)"
                  size="small"
                  variant="flat"
                  class="font-weight-bold"
                  @click="order.status === 'PAID' ? openBill(order) : null"
                >
                  {{ getStatusText(order.status) }}
                </v-chip>
              </template>
            </v-card-item>

            <v-divider class="mx-4 mt-3 border-opacity-10"></v-divider>

            <v-card-text class="py-3">
              <!-- Order Items Preview -->
              <div
                v-for="(item, idx) in order.items.slice(0, 2)"
                :key="idx"
                class="d-flex align-center mb-2"
              >
                <v-avatar size="40" rounded="lg" class="bg-grey-lighten-4 mr-3">
                  <v-img
                    :src="'http://localhost:8000/' + item.product.image"
                    cover
                  ></v-img>
                </v-avatar>
                <div class="flex-grow-1 overflow-hidden">
                  <div class="text-body-2 font-weight-medium text-truncate">
                    {{ item.product.title }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    x{{ item.quantity }}
                  </div>
                </div>
                <div class="text-body-2 font-weight-bold">
                  {{ formatMoneyLAK(item.product.price) }}
                </div>
              </div>
              <div
                v-if="order.items.length > 2"
                class="text-caption text-center text-grey mt-1"
              >
                +{{ order.items.length - 2 }} more items
              </div>

              <div class="bg-grey-lighten-5 rounded-lg pa-3 mt-3">
                <div class="d-flex justify-space-between align-center mb-1">
                  <span class="text-caption text-medium-emphasis">ລາຄາລວມ</span>
                  <span class="text-body-2 font-weight-bold">{{
                    formatMoneyLAK(order.total_price)
                  }}</span>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <span class="text-caption text-medium-emphasis">ກຳໄລ</span>
                  <span class="text-body-2 font-weight-bold text-success"
                    >+{{ formatMoneyLAK(order.all_profit) }}</span
                  >
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="d-flex flex-column align-center justify-center py-16"
        >
          <v-icon size="64" color="grey-lighten-2" class="mb-4"
            >mdi-clipboard-text-clock-outline</v-icon
          >
          <h3 class="text-h6 text-grey-darken-1 font-weight-medium">
            ບໍ່ມີປະຫວັດການສັ່ງຊື້
          </h3>
          <p class="text-body-2 text-grey-lighten-1">
            ທ່ານຍັງບໍ່ທັນໄດ້ສັ່ງຊື້ສິນຄ້າ
          </p>
        </div>
      </v-container>
    </div>

    <!-- Bill Dialog -->
    <v-dialog v-model="dialog" width="500">
      <v-card rounded="xl">
        <v-card-title
          class="bg-primary text-white py-3 px-4 d-flex align-center justify-space-between"
        >
          <span class="text-h6 font-weight-bold">ຫຼັກຖານການໂອນ</span>
          <v-btn
            icon
            variant="text"
            color="white"
            density="compact"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-img
            :src="'http://localhost:8000/' + bill.image"
            cover
            width="100%"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useFormat } from "@/composables/useFormat";
import { storeToRefs } from "pinia";
import { useApiOrderStore } from "@/stores/apiOrder";

const { formatMoneyLAK, formatDate, formatNumber, formatTime } = useFormat();
const apiOrderStore = useApiOrderStore();
const { getOrders } = apiOrderStore;
const { orders } = storeToRefs(apiOrderStore);

const bill = ref({});
const dialog = ref(false);

const openBill = (order) => {
  bill.value = order;
  dialog.value = true;
};

const getStatusColor = (status) => {
  const colors = {
    PENDING: "warning",
    PAID: "success",
    CANCELLED: "error",
  };
  return colors[status] || "grey";
};

const getStatusText = (status) => {
  const texts = {
    PENDING: "ລໍຖ້າ",
    PAID: "ຈ່າຍເງິນແລ້ວ",
    CANCELLED: "ຍົກເລີກ",
  };
  return texts[status] || status;
};

const getAllQuantity = computed(() =>
  orders.value.reduce((total, order) => total + order.total_quantity, 0)
);
const getAllTotalPrice = computed(() =>
  orders.value.reduce((total, order) => total + order.total_price, 0)
);
const getAllProfit = computed(() =>
  orders.value.reduce((total, order) => total + Number(order.all_profit), 0)
);

onMounted(() => {
  getOrders();
});
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
