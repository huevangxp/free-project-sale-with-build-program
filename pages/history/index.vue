<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between mb-4 px-2">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-history</v-icon>
          <h2 class="text-h6 font-weight-bold text-primary">
            <span>ປະຫວັດການສັ່ງຊື້</span>
          </h2>
        </div>
      </div>

      <!-- Order List -->
      <v-container fluid class="pa-0">
        <div v-if="orders.length > 0">
          <v-card
            v-for="(order, i) in orders"
            :key="i"
            class="mb-3 rounded-xl border-0"
            elevation="0"
            color="white"
          >
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar color="primary" variant="tonal" class="rounded-lg">
                  <v-icon color="primary">mdi-shopping-outline</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1 font-weight-bold">
                Order #{{ order.id }}
              </v-card-title>
              <v-card-subtitle class="text-caption">
                {{ formatDate(order.created_at) }}
              </v-card-subtitle>
              <template v-slot:append>
                <v-chip
                  :color="getStatusColor(order.status)"
                  size="small"
                  variant="flat"
                  class="font-weight-medium"
                >
                  {{ order.status }}
                </v-chip>
              </template>
            </v-card-item>

            <v-divider class="mx-4 border-opacity-10"></v-divider>

            <v-card-text class="py-3">
              <div class="d-flex justify-space-between align-center">
                <span class="text-body-2 text-medium-emphasis">ລວມທັງໝົດ</span>
                <span class="text-h6 font-weight-bold text-primary">
                  {{ formatMoneyLAK(order.total_price || 0) }}
                </span>
              </div>
            </v-card-text>

            <!-- <v-card-actions class="px-4 pb-4 pt-0">
              <v-btn
                block
                variant="tonal"
                color="primary"
                class="rounded-lg text-capitalize"
                size="small"
              >
                ເບິ່ງລາຍລະອຽດ
              </v-btn>
            </v-card-actions> -->
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
          <v-btn
            color="primary"
            variant="flat"
            rounded="pill"
            class="mt-6 px-8"
            to="/product"
          >
            ເລືອກຊື້ສິນຄ້າ
          </v-btn>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiOrderStore } from "@/stores/apiOrder";
import { useFormat } from "@/composables/useFormat";
import moment from "moment";

const { formatMoneyLAK } = useFormat();
const apiOrderStore = useApiOrderStore();
const { orders } = storeToRefs(apiOrderStore);
const { getOrders } = apiOrderStore;

onMounted(() => {
  getOrders();
});

const formatDate = (date) => {
  if (!date) return "";
  return moment(date).format("DD/MM/YYYY HH:mm");
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "warning";
    case "success":
      return "success";
    case "cancel":
      return "error";
    default:
      return "grey";
  }
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
