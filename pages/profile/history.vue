<template>
  <div class="page-container bg-light-grey">
    <!-- Header Section: Primary Teal Gradient & Glassmorphism -->
    <div class="header-section shadow-lg">
      <div class="glass-overlay"></div>
      <v-container class="pt-6 pb-12 position-relative" style="z-index: 2">
        <div class="d-flex align-center justify-space-between mb-8">
          <div class="d-flex align-center">
            <v-btn
              icon
              variant="tonal"
              color="white"
              class="mr-4 glass-btn"
              @click="$router.back()"
            >
              <v-icon size="24">mdi-chevron-left</v-icon>
            </v-btn>
            <div>
              <h1 class="text-h5 font-weight-black text-white mb-1">
                ປະຫວັດການຊື້
              </h1>
              <p class="text-caption text-white opacity-80">
                ບົດລາຍງານການເຄື່ອນໄຫວທັງໝົດ
              </p>
            </div>
          </div>
          <v-avatar
            size="48"
            class="glass-avatar border-white-op cursor-pointer"
          >
            <v-icon color="white">mdi-account-circle-outline</v-icon>
          </v-avatar>
        </div>

        <!-- Dashboard Wallet Card -->
        <v-card
          v-if="orders.length > 0"
          class="dashboard-card overflow-visible"
          elevation="0"
        >
          <div class="dashboard-content pa-6">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="d-flex flex-column">
                  <span
                    class="text-caption font-weight-bold text-white opacity-80 mb-1 uppercase tracking-1"
                    >ຍອດລວມທັງໝົດ</span
                  >
                  <div class="d-flex align-end">
                    <span class="text-h3 font-weight-black text-white lh-1">{{
                      formatMoneyLAK(totalMoney).replace(" ₭", "")
                    }}</span>
                    <span class="text-h6 text-white ml-2 mb-1">₭</span>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div
                  class="d-flex justify-space-between align-center h-100 mt-4 mt-sm-0"
                >
                  <div class="stat-item">
                    <span class="text-caption text-white opacity-70"
                      >ອໍເດີ້</span
                    >
                    <div class="text-h6 font-weight-bold text-white">
                      {{ orders.length }}
                    </div>
                  </div>
                  <v-divider
                    vertical
                    color="white"
                    class="mx-4 opacity-20"
                  ></v-divider>
                  <div class="stat-item text-right">
                    <span class="text-caption text-white opacity-70"
                      >ກຳໄລທີໄດ້</span
                    >
                    <div class="text-h6 font-weight-bold text-teal-lighten-4">
                      + {{ formatMoneyLAK(totalProfit) }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <!-- Integrated Line Chart -->
          <div class="chart-container-inner pa-4 bg-teal-darken-4-op-2">
            <Line
              :data="chartData"
              :options="chartOptions"
              style="height: 100px"
            />
          </div>
        </v-card>
      </v-container>
    </div>

    <!-- History List Section -->
    <v-container class="content-section px-4 mt-n4 pb-12">
      <div v-if="Object.keys(groupedOrders).length > 0">
        <div v-for="(items, date) in groupedOrders" :key="date" class="mb-6">
          <!-- Date Header -->
          <div
            class="text-subtitle-2 font-weight-black text-grey-darken-3 mb-3 px-2 d-flex align-center"
          >
            {{ date }}
          </div>

          <v-slide-y-transition group>
            <v-card
              v-for="(order, i) in items"
              :key="i"
              class="merchant-card mb-3 border-0"
              elevation="0"
              @click="order.status === 'PAID' ? openBill(order) : null"
              v-ripple
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-start">
                  <!-- Merchant Logo Placeholder -->
                  <div class="merchant-logo-box mr-4">
                    <span class="logo-text">{{
                      order.order_number.substring(0, 2)
                    }}</span>
                  </div>

                  <div class="flex-grow-1">
                    <div class="d-flex justify-space-between align-start">
                      <div>
                        <h3
                          class="text-body-1 font-weight-black text-grey-darken-4 mb-0"
                        >
                          #{{ order.order_number }}
                        </h3>
                        <div
                          class="text-h6 font-weight-black text-grey-darken-2 my-1"
                        >
                          {{ formatMoneyLAK(order.total_price) }}
                        </div>

                        <div
                          class="d-flex align-center text-caption text-grey-darken-1 mb-3"
                        >
                          <v-icon size="14" class="mr-1"
                            >mdi-clock-outline</v-icon
                          >
                          {{ formatLaoFullDate(order.created_at) }} at
                          {{ formatTime(order.created_at) }}
                        </div>

                        <v-chip
                          :color="getStatusColor(order.status)"
                          variant="flat"
                          size="x-small"
                          class="status-badge-solid font-weight-black"
                          rounded="sm"
                        >
                          {{ getStatusText(order.status) }}
                        </v-chip>
                      </div>

                      <v-btn
                        icon
                        variant="text"
                        size="small"
                        color="grey-lighten-1"
                        class="mt-n2 mr-n2"
                      >
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-slide-y-transition>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="empty-container d-flex flex-column align-center justify-center py-16 text-center"
      >
        <v-icon size="80" color="teal-lighten-4">mdi-receipt-outline</v-icon>
        <h3 class="text-h6 font-weight-black text-grey-darken-1 mt-4">
          ບໍ່ພົບປະຫວັດການສັ່ງຊື້
        </h3>
        <p class="text-body-2 text-grey">
          ທ່ານຍັງບໍ່ມີລາຍການເຄື່ອນໄຫວໃນຂະນະນີ້
        </p>
      </div>
    </v-container>

    <!-- Premium Receipt Dialog -->
    <v-dialog
      v-model="dialog"
      max-width="480"
      transition="dialog-bottom-transition"
    >
      <v-card class="receipt-dialog rounded-xl overflow-hidden elevation-24">
        <div class="receipt-top-gradient"></div>
        <v-card-title
          class="pa-6 d-flex justify-space-between align-center bg-white border-b"
        >
          <div class="d-flex align-center">
            <v-avatar color="primary-lighten-4" size="48" class="mr-4">
              <v-icon color="primary" size="28">mdi-file-document-check</v-icon>
            </v-avatar>
            <div class="d-flex flex-column">
              <span class="text-subtitle-1 font-weight-black text-dark"
                >ໃບບິນການຊຳລະ</span
              >
              <span class="text-caption text-primary font-weight-bold"
                >ID: {{ bill.order_number }}</span
              >
            </div>
          </div>
          <v-btn
            icon
            variant="tonal"
            color="grey"
            density="comfortable"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-0">
          <div class="pa-6 bg-primary-lighten-5">
            <v-row dense>
              <v-col cols="6">
                <div class="receipt-stat-box">
                  <span
                    class="text-caption text-grey-darken-1 font-weight-black mb-1 block"
                    >ຍອດລວມທັງໝົດ</span
                  >
                  <span class="text-h6 font-weight-black text-primary">{{
                    formatMoneyLAK(bill.total_price)
                  }}</span>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="receipt-stat-box text-right">
                  <span
                    class="text-caption text-grey-darken-1 font-weight-black mb-1 block"
                    >ກຳໄລທີໄດ້</span
                  >
                  <span class="text-h6 font-weight-black text-success"
                    >+ {{ formatMoneyLAK(bill.all_profit) }}</span
                  >
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="receipt-image-container bg-dark position-relative">
            <v-img
              v-if="bill.image"
              :src="'http://localhost:8000/' + bill.image"
              contain
              class="receipt-visual"
              max-height="60vh"
            >
              <template v-slot:placeholder>
                <div
                  class="d-flex align-center justify-center fill-height bg-grey-darken-4"
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
        </v-card-text>

        <v-card-actions class="pa-6 bg-white">
          <v-btn
            block
            color="primary"
            height="56"
            variant="flat"
            rounded="xl"
            class="text-h6 font-weight-black"
            @click="dialog = false"
          >
            ປິດໜ້າຕ່າງ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useFormat } from "@/composables/useFormat";
import { storeToRefs } from "pinia";
import { useApiOrderStore } from "@/stores/apiOrder";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
);

const { formatMoneyLAK, formatDate, formatTime } = useFormat();
const apiOrderStore = useApiOrderStore();
const { getOrders } = apiOrderStore;
const { orders } = storeToRefs(apiOrderStore);

const bill = ref({});
const dialog = ref(false);

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

// Grouping logic for the date-based list
const groupedOrders = computed(() => {
  const groups = {};
  sortedOrders.value.forEach((order) => {
    const d = new Date(order.created_at);
    // Format: "Wed, 04 Sep"
    const dateStr = d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(order);
  });
  return groups;
});

const formatLaoFullDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

const getStatusColor = (status) => {
  const colors = {
    PENDING: "#ffa000",
    PAID: "#3A9D95",
    CANCELLED: "#f44336",
    FAILED: "#f44336",
  };
  return colors[status] || "#9e9e9e";
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

const chartData = computed(() => {
  const historyOrders = [...orders.value].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );

  return {
    labels: historyOrders.map((o) => formatDate(o.created_at)),
    datasets: [
      {
        label: "Profit Trend",
        borderColor: "#FFFFFF",
        borderWidth: 2.5,
        pointRadius: 0,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.45)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
        data: historyOrders.map((o) => parseFloat(o.all_profit || 0)),
        fill: true,
        tension: 0.5,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};

onMounted(() => {
  getOrders();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@300;400;500;700;800;900&display=swap");

.page-container {
  font-family: "Noto Sans Lao", sans-serif !important;
  min-height: 100vh;
  background-color: #f7f7f7 !important;
}

.header-section {
  background: linear-gradient(135deg, #3a9d95 0%, #2d7a74 100%);
  position: relative;
  border-bottom-left-radius: 44px;
  border-bottom-right-radius: 44px;
}

.glass-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66 3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-4c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm34-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.glass-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dashboard-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  ) !important;
  backdrop-filter: blur(15px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 32px !important;
}

.bg-teal-darken-4-op-2 {
  background: rgba(0, 77, 64, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Merchant Style Card */
.merchant-card {
  border-radius: 18px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.3s ease;
  background-color: white !important;
}

.merchant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06) !important;
}

.merchant-logo-box {
  width: 48px;
  height: 48px;
  background: #f0f4f4;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  font-weight: 900;
  color: #3a9d95;
  font-size: 16px;
}

.status-badge-solid {
  padding: 4px 12px !important;
  height: auto !important;
  font-size: 10px !important;
  letter-spacing: 0.5px;
  border-radius: 6px !important;
}

.lh-1 {
  line-height: 1;
}

.block {
  display: block;
}

.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

.shadow-primary {
  box-shadow: 0 15px 35px rgba(58, 157, 149, 0.35) !important;
}

/* Receipt Dialog */
.receipt-top-gradient {
  height: 12px;
  background: linear-gradient(90deg, #3a9d95, #64ffda);
}

.receipt-stat-box {
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 2.22rem !important;
  }
}
</style>
