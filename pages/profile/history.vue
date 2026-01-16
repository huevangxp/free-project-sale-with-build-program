<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <!-- Header Section -->
    <div class="bg-primary pt-4 pb-6 px-4 rounded-b-xl">
      <div class="d-flex align-center justify-space-between mb-4">
        <div>
          <h1 class="text-h5 font-weight-bold text-white mb-1">My Orders</h1>
          <p class="text-body-2 text-white text-opacity-80">
            Check your order status
          </p>
        </div>
        <div class="d-flex align-center">
          <v-btn icon variant="text" color="white" @click="$router.back()">
            <v-icon size="28">mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-container fluid class="px-4 mt-4">
      <div class="d-flex align-center mb-4">
        <v-icon color="primary" class="mr-2">mdi-history</v-icon>
        <h2 class="text-h6 font-weight-bold text-primary">Recent Orders</h2>
      </div>

      <div v-if="filteredOrders.length > 0">
        <v-card
          v-for="(order, i) in filteredOrders"
          :key="i"
          class="mb-3 rounded-xl border-0"
          elevation="3"
          color="white"
          @click="order.status === 'PAID' ? openBill(order) : null"
        >
          <div class="pa-4">
            <div class="d-flex justify-space-between align-start mb-4">
              <div class="d-flex">
                <v-avatar
                  color="teal-lighten-5"
                  size="50"
                  class="rounded-lg mr-3"
                >
                  <v-icon color="primary" size="24"
                    >mdi-shopping-outline</v-icon
                  >
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold mb-1">
                    {{ hiddenOrderID(order.order_number) }}
                  </div>
                  <div class="text-caption text-grey">
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
              <span class="text-body-2 text-medium-emphasis">Total Amount</span>
              <span class="text-h6 font-weight-bold text-primary">{{
                formatMoneyLAK(order.total_price)
              }}</span>
            </div>
          </div>
        </v-card>
      </div>

      <!-- Empty State -->
      <div v-else class="d-flex flex-column align-center justify-center py-16">
        <v-icon size="64" color="grey-lighten-2" class="mb-4"
          >mdi-clipboard-text-clock-outline</v-icon
        >
        <h3 class="text-h6 text-grey-darken-1 font-weight-medium">
          No orders found
        </h3>
      </div>
    </v-container>

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
    PENDING: "PENDING",
    PAID: "DELIVERED", // Mapping PAID to DELIVERED as per image style for success state, or keep as PAID
    CANCELLED: "CANCELLED",
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
