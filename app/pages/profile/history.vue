<template>
  <div class="page-container">
    <!-- Header -->
    <div class="header-section">
      <v-container class="pt-6 pb-16 position-relative">
        <div class="d-flex align-center mb-6">
          <v-btn
            icon
            variant="tonal"
            color="white"
            size="small"
            class="mr-3 glass-btn"
            @click="$router.back()"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div>
            <h1 class="text-h6 font-weight-bold text-white mb-0">
              ປະຫວັດການຊື້
            </h1>
            <p class="text-caption text-white mb-0" style="opacity: 0.8">
              ບົດລາຍງານການເຄື່ອນໄຫວທັງໝົດ
            </p>
          </div>
        </div>

        <!-- Wallet summary -->
        <v-card v-if="orders.length > 0" class="wallet-card pa-5" flat>
          <!-- Balance -->
          <div class="d-flex align-center mb-3">
            <v-avatar size="38" color="rgba(255,255,255,0.18)" class="mr-3">
              <v-icon color="white" size="20">mdi-wallet-outline</v-icon>
            </v-avatar>
            <span class="text-caption text-white" style="opacity: 0.85">
              <span>ຍອດລວມທັງໝົດ</span> <br>
              <span
              class="text-h3 font-weight-bold text-white"
              style="line-height: 1"
              >{{ formatMoneyLAK(totalMoney).replace(" ₭", "") }}</span
            >
            </span>
          </div>
          <div class="d-flex align-center ga-5">
            <div class="d-flex align-center">
              <v-icon size="15" color="white" class="mr-1" style="opacity: 0.8"
                >mdi-receipt-text-outline</v-icon
              >
              <span class="text-caption text-white mr-1" style="opacity: 0.7"
                >ອໍເດີ້</span
              >
              <span class="text-caption font-weight-bold text-white">{{
                orders.length
              }}</span>
            </div>
            <div class="d-flex align-center">
              <v-icon size="15" color="teal-lighten-4" class="mr-1"
                >mdi-trending-up</v-icon
              >
              <span class="text-caption text-white mr-1" style="opacity: 0.7"
                >ກຳໄລ</span
              >
              <span class="text-caption font-weight-bold text-teal-lighten-4"
                >+ {{ formatMoneyLAK(totalProfit) }}</span
              >
            </div>
          </div>
      
        </v-card>
        
      </v-container>
    </div>

    <!-- History list -->
    <v-container class="px-4 mt-n8 pb-12">
      <!-- Loading skeletons -->
      <template v-if="loading && orders.length === 0">
        <v-card v-for="n in 5" :key="n" class="order-card mb-3" flat border>
          <div class="pa-3">
            <v-skeleton-loader
              type="list-item-avatar-two-line"
            ></v-skeleton-loader>
          </div>
        </v-card>
      </template>

      <div v-else-if="groupedOrders.length > 0">
        <div v-for="group in groupedOrders" :key="group.key" class="mb-5">
         
          <v-slide-y-transition group>
            <v-card
              v-for="(order, i) in group.items"
              :key="i"
              class="order-card mb-3"
              flat
              border
              @click="order.status === 'PAID' ? openBill(order) : null"
            >
              <div class="pa-4 d-flex align-center">
                <!-- Order logo -->
                <div class="logo-box mr-3">
                  {{ order.order_number.substring(0, 2) }}
                </div>

                <div class="flex-grow-1 min-width-0">
                  <div class="d-flex justify-space-between align-center">
                    <span class="text-body-2 font-weight-bold text-truncate">
                      #{{ order.order_number }}
                    </span>
                    <span
                      class="text-subtitle-2 font-weight-bold text-primary ml-2 flex-shrink-0"
                    >
                      {{ formatMoneyLAK(order.total_price) }}
                    </span>
                  </div>

                  <div class="d-flex justify-space-between align-center mt-1">
                    <span
                      class="text-caption text-medium-emphasis d-flex align-center"
                    >
                      <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>
                      {{ formatTime(order.created_at) }}
                    </span>
                    <v-chip
                      :color="getStatusColor(order.status)"
                      variant="tonal"
                      size="x-small"
                      class="font-weight-bold"
                    >
                      {{ getStatusText(order.status) }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-slide-y-transition>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <v-icon size="72" color="grey-lighten-1"
          >mdi-receipt-text-outline</v-icon
        >
        <h3 class="text-subtitle-1 font-weight-bold text-medium-emphasis mt-3">
          ບໍ່ພົບປະຫວັດການສັ່ງຊື້
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          ທ່ານຍັງບໍ່ມີລາຍການເຄື່ອນໄຫວໃນຂະນະນີ້
        </p>
      </div>
    </v-container>

    <!-- Receipt dialog -->
    <v-dialog
      v-model="dialog"
      max-width="460"
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl" class="overflow-hidden">
        <div class="d-flex align-center justify-space-between pa-4">
          <div class="d-flex align-center">
            <v-avatar color="primary-lighten-5" size="44" class="mr-3">
              <v-icon color="primary">mdi-file-document-check-outline</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-2 font-weight-bold">ໃບບິນການຊຳລະ</div>
              <div class="text-caption text-primary font-weight-medium">
                ID: {{ bill.order_number }}
              </div>
            </div>
          </div>
          <v-btn
            icon
            variant="tonal"
            color="grey"
            size="small"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-divider></v-divider>

        <!-- Amounts -->
        <div class="pa-4 bg-grey-lighten-5 d-flex justify-space-between">
          <div>
            <div class="text-caption text-medium-emphasis mb-1">
              <span>ຍອດລວມທັງໝົດ</span>
            </div>
            <div class="text-subtitle-1 font-weight-bold text-primary">
              {{ formatMoneyLAK(bill.total_price) }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-caption text-medium-emphasis mb-1">
              <span>ກຳໄລທີ່ໄດ້</span>
            </div>
            <div class="text-subtitle-1 font-weight-bold text-success">
              + {{ formatMoneyLAK(bill.all_profit) }}
            </div>
          </div>
        </div>

        <!-- Receipt image -->
        <div v-if="bill.image" class="receipt-image-container">
          <v-img
            :src="'http://localhost:8000/' + bill.image"
            contain
            max-height="55vh"
          >
            <template v-slot:placeholder>
              <div
                class="d-flex align-center justify-center fill-height"
                style="min-height: 200px"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                  width="3"
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </div>

        <div class="pa-4">
          <v-btn
            block
            color="primary"
            height="50"
            variant="flat"
            rounded="pill"
            class="font-weight-bold"
            @click="dialog = false"
          >
            ປິດໜ້າຕ່າງ
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useFormat } from "@/composables/useFormat";
import { storeToRefs } from "pinia";
import { useApiOrderStore } from "@/stores/apiOrder";

const { formatMoneyLAK, formatTime } = useFormat();
const apiOrderStore = useApiOrderStore();
const { getOrders } = apiOrderStore;
const { orders } = storeToRefs(apiOrderStore);

const bill = ref({});
const dialog = ref(false);
const loading = ref(true);

const openBill = (order) => {
  if (!order.image) return;
  bill.value = order;
  dialog.value = true;
};

const sortedOrders = computed(() => {
  return [...orders.value].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );
});

// Group orders by day (newest first) for the sectioned list
const groupedOrders = computed(() => {
  const groups = {};
  sortedOrders.value.forEach((order) => {
    const d = new Date(order.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!groups[key]) {
      groups[key] = { key, date: d, items: [] };
    }
    groups[key].items.push(order);
  });
  return Object.values(groups);
});

// Friendly label: ມື້ນີ້ (Today) / ມື້ວານນີ້ (Yesterday) / full date
const groupLabel = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today - d) / 86400000);

  if (diffDays === 0) return "ມື້ນີ້";
  if (diffDays === 1) return "ມື້ວານນີ້";
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

const getStatusColor = (status) => {
  const colors = {
    PENDING: "warning",
    PAID: "success",
    CANCELLED: "error",
    FAILED: "error",
  };
  return colors[status] || "grey";
};

const getStatusText = (status) => {
  const texts = {
    PENDING: "PENDING",
    PAID: "SUCCESS",
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
  };
  return texts[status] || status;
};

const totalMoney = computed(() => {
  return orders.value.reduce(
    (sum, order) => sum + parseFloat(order.total_price || 0),
    0,
  );
});

const totalProfit = computed(() => {
  return orders.value.reduce(
    (sum, order) => sum + parseFloat(order.all_profit || 0),
    0,
  );
});

onMounted(async () => {
  try {
    await getOrders();
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f7f8f8;
}

/* Header */
.header-section {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    #2d7a74 100%
  );
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
}

.glass-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Wallet summary card */
.wallet-card {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px !important;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

/* Order cards */
.order-card {
  border-radius: 16px !important;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.order-card:hover {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
}

.logo-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  font-weight: 800;
  font-size: 14px;
}

.min-width-0 {
  min-width: 0;
}

/* Receipt image */
.receipt-image-container {
  background: #1e1e1e;
  display: flex;
  justify-content: center;
}
</style>
