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

      <!-- Order List -->
      <v-container fluid class="pa-0">
        <div class="d-flex align-center mb-3 px-2">
          <v-icon color="primary" class="mr-2">mdi-history</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold text-primary">
            ລາຍການສັ່ງຊື້
          </h3>
        </div>

        <div v-if="filteredOrders.length > 0">
          <v-card
            v-for="(order, i) in filteredOrders"
            :key="i"
            class="mb-3 rounded-xl border-0"
            elevation="0"
            color="white"
            @click="order.status === 'PAID' ? openBill(order) : null"
            link
          >
            <div class="pa-4">
              <div class="d-flex justify-space-between align-start mb-4">
                <div class="d-flex">
                  <v-avatar
                    color="primary-lighten-5"
                    size="50"
                    class="rounded-lg mr-3"
                  >
                    <v-icon color="primary" size="24"
                      >mdi-receipt-text-outline</v-icon
                    >
                  </v-avatar>
                  <div>
                    <div class="text-subtitle-1 font-weight-bold mb-1">
                      {{ hiddenOrderID(order.order_number) }}
                    </div>
                    <div class="d-flex align-center text-caption text-grey">
                      <v-icon size="14" class="mr-1">mdi-calendar-clock</v-icon>
                      {{ formatDate(order.created_at) }}
                      {{ formatTime(order.created_at) }}
                    </div>
                  </div>
                </div>
                <v-chip
                  :color="getStatusColor(order.status)"
                  size="small"
                  variant="flat"
                  class="font-weight-bold text-uppercase"
                  label
                >
                  {{ getStatusText(order.status) }}
                </v-chip>
              </div>

              <v-divider class="mb-3 border-opacity-10"></v-divider>

              <div class="d-flex justify-space-between align-center">
                <span class="text-body-2 text-medium-emphasis">ຍອດລວມ</span>
                <span class="text-h6 font-weight-bold text-primary">{{
                  formatMoneyLAK(order.total_price)
                }}</span>
              </div>
            </div>
          </v-card>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="d-flex flex-column align-center justify-center py-16"
        >
          <v-icon size="64" color="grey-lighten-2" class="mb-4"
            >mdi-clipboard-text-off-outline</v-icon
          >
          <h3 class="text-h6 text-grey-darken-1 font-weight-medium">
            ບໍ່ພົບຂໍ້ມູນການສັ່ງຊື້
          </h3>
          <p class="text-body-2 text-grey-lighten-1">ລອງຄົ້ນຫາດ້ວຍຄຳອື່ນ</p>
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
        <v-card-text class="pa-0 bg-black d-flex justify-center">
          <v-img
            :src="'http://localhost:8000/' + bill.image"
            contain
            max-height="80vh"
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
import hiddenOrderID from "@/utils/hiddenOrderID";

const { formatMoneyLAK, formatDate, formatTime } = useFormat();
const apiOrderStore = useApiOrderStore();
const { getOrders } = apiOrderStore;
const { orders } = storeToRefs(apiOrderStore);

const search = ref("");
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
    PAID: "ສຳເລັດ",
    CANCELLED: "ຍົກເລີກ",
  };
  return texts[status] || status;
};

const filteredOrders = computed(() => {
  if (!search.value) return orders.value;
  const lowerSearch = search.value.toLowerCase();
  return orders.value.filter(
    (order) =>
      order.order_number?.toLowerCase().includes(lowerSearch) ||
      order.status?.toLowerCase().includes(lowerSearch)
  );
});

onMounted(() => {
  getOrders();
});
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
